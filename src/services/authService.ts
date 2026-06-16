"use client";

import { apiClient } from "@/lib/api-client";
import type { AuthSession, SessionUser } from "@/types/auth";

export const authService = {
  login: async (email: string, password: string): Promise<AuthSession> => {
    return apiClient.post<AuthSession>("auth/login", { email, password });
  },

  logout: async (): Promise<void> => {
    return apiClient.post<void>("auth/logout");
  },

  me: async (): Promise<{ user: SessionUser }> => {
    const user = await apiClient.get<SessionUser>("auth/me");
    return { user };
  },

  forgotPassword: async (email: string): Promise<{ success: boolean; message?: string }> => {
    return apiClient.post<{ success: boolean; message?: string }>("auth/forgot-password", { email });
  },

  getCsrf: async (): Promise<{ csrfToken: string }> => {
    return apiClient.get<{ csrfToken: string }>("auth/csrf");
  }
};
