"use client";

import { apiClient } from "@/lib/api-client";
import type { SystemUser } from "@/types/access-control";

export const userService = {
  getAll: async (): Promise<SystemUser[]> => {
    return apiClient.get<SystemUser[]>("users");
  },

  getOne: async (id: string): Promise<SystemUser> => {
    return apiClient.get<SystemUser>(`users/${id}`);
  },

  create: async (data: { email: string; password?: string; name: string; roleId: string }): Promise<SystemUser> => {
    return apiClient.post<SystemUser>("users", data);
  },

  update: async (
    id: string,
    data: { email?: string; password?: string; name?: string; roleId?: string; isActive?: boolean }
  ): Promise<SystemUser> => {
    return apiClient.patch<SystemUser>(`users/${id}`, data);
  },

  deactivate: async (id: string): Promise<SystemUser> => {
    return apiClient.delete<SystemUser>(`users/${id}`);
  }
};
