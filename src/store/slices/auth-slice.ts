"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession } from "@/types/auth";

// Cookie helper functions
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax`;
}

function eraseCookie(name: string) {
  if (typeof document === "undefined") return;
  // Try multiple path / domain / attribute combinations to ensure the cookie is actually removed
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const paths = ["/", "/api", "/banglabid", "/banglabid/api"];
  for (const p of paths) {
    document.cookie = `${name}=; path=${p}; ${expiry}; SameSite=Lax`;
    document.cookie = `${name}=; path=${p}; ${expiry}`;
    document.cookie = `${name}=; path=${p}; ${expiry}; Secure; SameSite=None`;
  }
  // Also try without path (current path only)
  document.cookie = `${name}=; ${expiry}`;
}

function getStoredSession(): AuthSession | null {
  const stored = getCookie("portal_session");
  if (!stored) return null;
  try {
    return JSON.parse(decodeURIComponent(stored));
  } catch {
    return null;
  }
}

type AuthState = {
  session: AuthSession | null;
  hydrated: boolean;
};

const initialState: AuthState = {
  session: getStoredSession(),
  hydrated: typeof window !== "undefined", // Hydrated immediately if on the client side
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<AuthSession>) {
      state.session = action.payload;
      state.hydrated = true;
      setCookie("portal_session", encodeURIComponent(JSON.stringify(action.payload)));
      setCookie("user_role", action.payload.user.role || "user");
    },
    restoreSession(state, action: PayloadAction<AuthSession | null>) {
      state.session = action.payload;
      state.hydrated = true;
      if (action.payload) {
        setCookie("portal_session", encodeURIComponent(JSON.stringify(action.payload)));
        setCookie("user_role", action.payload.user.role || "user");
      } else {
        eraseCookie("portal_session");
        eraseCookie("user_role");
      }
    },
    clearSession(state) {
      state.session = null;
      state.hydrated = true;
      // Clear all auth-related cookies
      eraseCookie("portal_session");
      eraseCookie("csrf_token");
      eraseCookie("access_token");
      eraseCookie("refresh_token");
      eraseCookie("user_role");
    },
  },
});

export const { clearSession, restoreSession, setSession } = authSlice.actions;
export const authReducer = authSlice.reducer;
