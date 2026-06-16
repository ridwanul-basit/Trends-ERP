"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { restoreSession, clearSession } from "@/store/slices/auth-slice";

import { authService } from "@/services/authService";

function SessionHydrator() {
  useEffect(() => {
    // Check if session was already restored from cookie in the auth-slice initialState
    const currentState = store.getState().auth;
    if (currentState.session && currentState.hydrated) {
      // Session loaded from cookie — skip calling /auth/me to avoid unnecessary API requests
      return;
    }

    // No cookie session found — must call /auth/me to check
    fullHydrate();
  }, []);

  return null;
}

/** Silent background refresh — updates session if backend responds, but never logs you out on transient errors */
async function backgroundRefresh() {
  try {
    const hasCsrfCookie = typeof document !== "undefined" &&
      document.cookie.split(";").some((item) => item.trim().startsWith("csrf_token="));

    if (!hasCsrfCookie) {
      await authService.getCsrf();
    }

    const data = await authService.me();
    if (data?.user) {
      const role = (data.user as any).role?.name || data.user.role || "user";
      const permissions = data.user.permissions || [];
      store.dispatch(
        restoreSession({
          user: { ...data.user, role, permissions },
        })
      );
    }
    // If data.user is null but no error, the token is invalid — clear session
    if (data && !data.user) {
      store.dispatch(clearSession());
    }
  } catch (err: any) {
    // Only log out on explicit 401 (token expired/invalid)
    if (err?.status === 401) {
      console.warn("[Session] Backend returned 401 — clearing session.");
      store.dispatch(clearSession());
    } else {
      // 429, network errors, timeouts — keep the existing cookie session
      console.warn("[Session] Background refresh failed (non-auth error). Keeping existing session.", err?.status || err);
    }
  }
}

/** Full hydration — used when no cookie session exists */
async function fullHydrate() {
  try {
    const hasCsrfCookie = typeof document !== "undefined" &&
      document.cookie.split(";").some((item) => item.trim().startsWith("csrf_token="));

    if (!hasCsrfCookie) {
      await authService.getCsrf();
    }

    const data = await authService.me();
    if (data?.user) {
      const role = (data.user as any).role?.name || data.user.role || "user";
      const permissions = data.user.permissions || [];
      store.dispatch(
        restoreSession({
          user: { ...data.user, role, permissions },
        })
      );
    } else {
      store.dispatch(restoreSession(null));
    }
  } catch (err: any) {
    if (err?.status === 401) {
      store.dispatch(restoreSession(null));
    } else {
      // Transient error (429, timeout, network) — mark as hydrated but no session
      console.warn("[Session] Full hydration failed.", err?.status || err);
      store.dispatch(restoreSession(null));
    }
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionHydrator />
      {children}
    </Provider>
  );
}
