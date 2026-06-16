"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://trendsbird.org/banglabid/api";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: any, status: number, data: any = null) {
    // Ensure message is a readable string even when backend returns an object
    let messageStr: string;
    try {
      messageStr = typeof message === "string" ? message : JSON.stringify(message, null, 2);
    } catch (e) {
      messageStr = String(message);
    }
    super(messageStr);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

let activeCsrfToken: string | null = null;

interface CacheEntry {
  data: any;
  timestamp: number;
}

const GET_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15000; // 15 seconds cache lifetime
const IN_FLIGHT_REQUESTS = new Map<string, Promise<any>>();

/** Helper to extract cookies in the client browser */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

/** Try to fetch a fresh CSRF token from the backend `GET /auth/csrf` endpoint. */
async function fetchCsrfToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL.replace(/\/+$/,'')}/auth/csrf`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) return null;
    const body = await res.json().catch(() => null);
    if (body && typeof body === 'object') {
      const token = body?.data?.csrfToken || body?.csrfToken;
      if (token) {
        activeCsrfToken = token;
        return token;
      }
    }
    // Fallback: try reading the cookie set by the server
    const cookieToken = getCookie('csrf_token');
    if (cookieToken) {
      activeCsrfToken = cookieToken;
      return cookieToken;
    }
    return null;
  } catch (e) {
    return null;
  }
}

/** Standard request runner */
async function request<T>(
  path: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  body: any = null,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}/${path.replace(/^\//, "")}`;
  const headers = new Headers(options.headers || {});

  // For POST/PATCH/DELETE mutations, clear all cached GET entries
  if (method !== "GET") {
    GET_CACHE.clear();
  }

  // Handle CSRF if available (required for NestJS CsrfGuard on unsafe methods)
  if (method !== "GET") {
    const csrfToken = activeCsrfToken || getCookie("csrf_token");
    if (csrfToken) {
      headers.set("X-CSRF-Token", csrfToken);
    }
  }

  // Handle GET cache and in-flight check
  if (method === "GET") {
    const bypassCache = headers.get("x-bypass-cache") === "true";
    if (!bypassCache) {
      // 1. Check completed cache first
      const cached = GET_CACHE.get(url);
      const now = Date.now();
      if (cached && now - cached.timestamp < CACHE_TTL_MS) {
        console.log(`[API Client] Returning cached GET response for ${path}`);
        return cached.data as T;
      }

      // 2. Check if a request for this URL is already active (in-flight)
      const inFlight = IN_FLIGHT_REQUESTS.get(url);
      if (inFlight) {
        console.log(`[API Client] Collapsing concurrent GET request for ${path}`);
        return inFlight as Promise<T>;
      }
    }
  }

  const executePromise = (async () => {
    // Default headers
    if (body && !(body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    let retries = 0;
    const maxRetries = 2;
    const retryDelay = 800; // 800ms

    try {
        // Ensure we have a CSRF token for unsafe methods before attempts
        if (method !== 'GET') {
          const existing = activeCsrfToken || getCookie('csrf_token');
          if (!existing) {
            await fetchCsrfToken();
          }
          const finalToken = activeCsrfToken || getCookie('csrf_token');
          if (finalToken) headers.set('X-CSRF-Token', finalToken);
        }

        while (true) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const config: RequestInit = {
          ...options,
          method,
          headers,
          signal: controller.signal,
          credentials: "include", // Ensure cookies are sent
        };

        if (body) {
          config.body = body instanceof FormData ? body : JSON.stringify(body);
        }

        try {
          const response = await fetch(url, config);
          clearTimeout(timeoutId);

          if (response.status === 429 && retries < maxRetries) {
            retries++;
            console.warn(`[API Client] Rate limited (429) on ${path}. Retrying in ${retryDelay}ms... (Attempt ${retries}/${maxRetries})`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            continue;
          }

          let responseData: any = null;
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            responseData = await response.json();
          } else {
            responseData = await response.text();
          }

          // If we get forbidden and it looks like a CSRF problem, try refreshing CSRF and retry once
          if (response.status === 403 && retries < maxRetries) {
            const msg = (responseData && typeof responseData === 'object') ? (responseData?.message || responseData?.error?.message || String(responseData)) : String(responseData || '');
            if (msg && /csrf|token/i.test(msg)) {
              const newToken = await fetchCsrfToken();
              if (newToken) {
                headers.set('X-CSRF-Token', newToken);
                retries++;
                console.warn(`[API Client] Refreshed CSRF token and retrying ${path} (Attempt ${retries}/${maxRetries})`);
                await new Promise((resolve) => setTimeout(resolve, retryDelay));
                continue;
              }
            }
          }

          if (!response.ok) {
            let errMessage = responseData?.message || responseData?.error || `Request failed with status ${response.status}`;
            if (Array.isArray(errMessage)) {
              errMessage = errMessage.join(", ");
            }
            throw new ApiError(errMessage, response.status, responseData);
          }

          // Capture CSRF token if returned in response body
          if (responseData && typeof responseData === "object") {
            if (responseData.csrfToken) {
              activeCsrfToken = responseData.csrfToken;
            } else if (responseData.data && typeof responseData.data === "object" && responseData.data.csrfToken) {
              activeCsrfToken = responseData.data.csrfToken;
            }
          }

          // Handle NestJS TransformInterceptor wrapper if present
          let finalData = responseData;
          if (responseData && typeof responseData === "object" && "data" in responseData && "success" in responseData) {
            if ("meta" in responseData) {
              // For paginated responses, we need both data and meta
              finalData = { data: responseData.data, meta: responseData.meta };
            } else {
              // For standard responses, just unwrap the data
              finalData = responseData.data;
            }
          }

          // Store in GET Cache if successful
          if (method === "GET") {
            GET_CACHE.set(url, {
              data: finalData,
              timestamp: Date.now(),
            });
          }

          return finalData as T;
        } catch (error: any) {
          clearTimeout(timeoutId);
          if (error instanceof ApiError) {
            throw error;
          }
          if (error.name === "AbortError") {
            if (retries < maxRetries) {
              retries++;
              console.warn(`[API Client] Request timed out on ${path}. Retrying... (Attempt ${retries}/${maxRetries})`);
              continue;
            }
            throw new ApiError("Request timed out. The server is taking too long to respond.", 408);
          }
          throw error;
        }
      }
    } catch (error: any) {
      if (error instanceof ApiError) {
        throw error;
      }
      // Network or server offline errors
      console.error("API request failed:", error);
      throw new ApiError("Could not connect to the backend server. Please make sure the server is online.", 503);
    } finally {
      if (method === "GET") {
        IN_FLIGHT_REQUESTS.delete(url);
      }
    }
  })();

  if (method === "GET" && headers.get("x-bypass-cache") !== "true") {
    IN_FLIGHT_REQUESTS.set(url, executePromise);
  }

  return executePromise;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestInit) => request<T>(path, "GET", null, options),
  post: <T>(path: string, body?: any, options?: RequestInit) => request<T>(path, "POST", body, options),
  patch: <T>(path: string, body?: any, options?: RequestInit) => request<T>(path, "PATCH", body, options),
  delete: <T>(path: string, options?: RequestInit) => request<T>(path, "DELETE", null, options),
};
