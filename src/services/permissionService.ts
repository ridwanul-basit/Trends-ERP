"use client";

import { apiClient } from "@/lib/api-client";
import type { Permission, MasterPermission } from "@/types/access-control";

export const permissionService = {
  getAll: async (): Promise<Permission[]> => {
    return apiClient.get<Permission[]>("permissions");
  },
  
  getMasterPermissions: async (): Promise<MasterPermission[]> => {
    return apiClient.get<MasterPermission[]>("master-permissions");
  },

  createMasterPermission: async (data: { name: string; description?: string }): Promise<MasterPermission> => {
    return apiClient.post<MasterPermission>("master-permissions", data);
  },

  getOne: async (id: string): Promise<Permission> => {
    return apiClient.get<Permission>(`permissions/${id}`);
  },

  create: async (data: { action: string; masterId: string; description?: string }): Promise<Permission> => {
    return apiClient.post<Permission>("permissions", data);
  },

  update: async (id: string, data: { action?: string; masterId?: string; description?: string }): Promise<Permission> => {
    return apiClient.patch<Permission>(`permissions/${id}`, data);
  },

  delete: async (id: string): Promise<Permission> => {
    return apiClient.delete<Permission>(`permissions/${id}`);
  }
};
