"use client";

import { apiClient } from "@/lib/api-client";
import type { Role } from "@/types/access-control";

export const roleService = {
  getAll: async (): Promise<Role[]> => {
    return apiClient.get<Role[]>("roles");
  },

  getOne: async (id: string): Promise<Role> => {
    return apiClient.get<Role>(`roles/${id}`);
  },

  create: async (data: { name: string; description?: string; permissionIds?: string[] }): Promise<Role> => {
    return apiClient.post<Role>("roles", data);
  },

  update: async (id: string, data: { name?: string; description?: string; permissionIds?: string[] }): Promise<Role> => {
    return apiClient.patch<Role>(`roles/${id}`, data);
  },

  delete: async (id: string): Promise<Role> => {
    return apiClient.delete<Role>(`roles/${id}`);
  },

  assignPermission: async (roleId: string, permissionId: string): Promise<Role> => {
    return apiClient.post<Role>(`roles/${roleId}/permissions/${permissionId}`);
  },

  removePermission: async (roleId: string, permissionId: string): Promise<Role> => {
    return apiClient.delete<Role>(`roles/${roleId}/permissions/${permissionId}`);
  },

  assignAllPermissions: async (roleId: string): Promise<Role> => {
    return apiClient.post<Role>(`roles/${roleId}/permissions/assign-all`);
  }
};
