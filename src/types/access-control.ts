export type Permission = {
  id: string;
  name: string;
  description?: string;
  masterId: string;
  master?: {
    id: string;
    name: string;
    description?: string;
  };
};

export type MasterPermission = {
  id: string;
  name: string;
  description?: string;
  permissions?: Permission[];
};

export type RolePermissionJoint = {
  id: string;
  roleId: string;
  permissionId: string;
  permission: Permission;
};

export type Role = {
  id: string;
  name: string;
  description?: string;
  permissions?: RolePermissionJoint[];
  createdAt: string;
  updatedAt: string;
};

export type SystemUser = {
  id: string;
  email: string;
  name: string;
  roleId: string;
  isActive: boolean;
  role: {
    id: string;
    name: string;
    description?: string;
    permissions?: {
      permission: {
        id: string;
        name: string;
        description?: string;
      };
    }[];
  };
  createdAt: string;
  updatedAt: string;
};
