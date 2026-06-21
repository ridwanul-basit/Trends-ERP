"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { DataTable, PageToolbar, TableActions, Pagination } from "@/components/shared";
import { RoleModal } from "@/components/access-control/role-modal";
import { roleService } from "@/services/roleService";
import { permissionService } from "@/services/permissionService";
import type { Role, Permission } from "@/types/access-control";

/* ── Fallback local mockup seed data if backend API is offline ────────── */
const MOCK_ROLES: Role[] = [
  {
    id: "r-1",
    name: "SUPER_ADMIN",
    description: "Super Administrator with full platform access permissions.",
    permissions: [],
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "r-2",
    name: "ADMIN",
    description: "Standard contest administrator managing contestants and questions.",
    permissions: [],
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "r-3",
    name: "DATA_ENTRY",
    description: "Operator capable of registering participants only.",
    permissions: [],
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
  },
];

const MOCK_PERMISSIONS: Permission[] = [
  { id: "p-1", name: "user:create", description: "Create System User", masterId: "m-1" },
  { id: "p-2", name: "user:read", description: "Read System User", masterId: "m-1" },
  { id: "p-3", name: "user:update", description: "Update System User", masterId: "m-1" },
  { id: "p-4", name: "role:create", description: "Create Role", masterId: "m-2" },
  { id: "p-5", name: "role:read", description: "Read Role", masterId: "m-2" },
  { id: "p-6", name: "participant:create", description: "Create Participant", masterId: "m-3" },
  { id: "p-7", name: "participant:read", description: "Read Participant", masterId: "m-3" },
];

export default function RolesPage() {
  /* ── Core State ────────────────────────────────── */
  const [roles, setRoles] = useState<Role[]>([]);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMock, setIsUsingMock] = useState(false);

  /* ── UI Controls State ─────────────────────────── */
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  /* ── Fetch Data ────────────────────────────────── */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [fetchedRoles, fetchedPermissions] = await Promise.all([
        roleService.getAll(),
        permissionService.getAll(),
      ]);
      setRoles(fetchedRoles);
      setAllPermissions(fetchedPermissions);
      setIsUsingMock(false);
    } catch (err: any) {
      if (err.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (err.status === 403) {
        setError("Access Denied: You do not have permissions to view this resource.");
        setRoles([]);
        setAllPermissions([]);
        setIsUsingMock(false);
        return;
      }
      console.warn("Failed to fetch roles from API, utilizing local mock sandbox.", err);
      setRoles(MOCK_ROLES);
      setAllPermissions(MOCK_PERMISSIONS);
      setIsUsingMock(true);
      setError("Cannot connect to backend server. Operating in mock sandbox mode.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ── Derived Search and Paginated Arrays ───────── */
  const filtered = useMemo(() => {
    if (!search.trim()) return roles;
    const q = search.toLowerCase();
    return roles.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q))
    );
  }, [roles, search]);

  const lastPage = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, lastPage);

  const paged = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, safePage, perPage]);

  /* ── Save / Create / Edit Handler ─────────────── */
  const handleSave = async (data: {
    name: string;
    description?: string;
    permissionIds: string[];
  }) => {
    try {
      if (editingRole) {
        // Edit Role
        if (isUsingMock) {
          setRoles((prev) =>
            prev.map((r) =>
              r.id === editingRole.id
                ? {
                  ...r,
                  name: data.name,
                  description: data.description,
                  permissions: data.permissionIds.map((pId) => ({
                    id: `rp-${Date.now()}-${pId}`,
                    roleId: r.id,
                    permissionId: pId,
                    permission: allPermissions.find((p) => p.id === pId)!,
                  })),
                  updatedAt: new Date().toISOString(),
                }
                : r
            )
          );
        } else {
          const updated = await roleService.update(editingRole.id, data);
          setRoles((prev) => prev.map((r) => (r.id === editingRole.id ? updated : r)));
        }
      } else {
        // Create Role
        if (isUsingMock) {
          const newId = `r-${Date.now()}`;
          const newMockRole: Role = {
            id: newId,
            name: data.name,
            description: data.description,
            permissions: data.permissionIds.map((pId) => ({
              id: `rp-${Date.now()}-${pId}`,
              roleId: newId,
              permissionId: pId,
              permission: allPermissions.find((p) => p.id === pId)!,
            })),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setRoles((prev) => [...prev, newMockRole]);
        } else {
          const created = await roleService.create(data);
          setRoles((prev) => [...prev, created]);
        }
      }
      setShowModal(false);
      setEditingRole(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to save role updates.");
    }
  };

  /* ── Delete Role Handler ──────────────────────── */
  const handleDelete = async (id: string, name: string) => {
    if (name === "SUPER_ADMIN") {
      toast.error("System role 'SUPER_ADMIN' cannot be deleted.");
      return;
    }

    try {
      if (isUsingMock) {
        setRoles((prev) => prev.filter((r) => r.id !== id));
      } else {
        await roleService.delete(id);
        setRoles((prev) => prev.filter((r) => r.id !== id));
      }
      toast.success("Role deleted successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete role.");
    }
  };

  const handleEditClick = (role: Role) => {
    setEditingRole(role);
    setShowModal(true);
  };

  const headers = [
    { label: "Role Code / Name" },
    { label: "Description" },
    { label: <span className="block text-center">Granted Permissions</span> },
    { label: "Last Updated", className: "hidden md:table-cell" },
    { label: <span className="block ">Action</span> },
  ];

  return (
    <div className="space-y-4">
      {/* ─── Page Toolbar ───────────────────────────────────────── */}
      <PageToolbar
        title="Access Control: Roles"
        description="Define and manage permission groups to authorize system operators."
        searchValue={search}
        searchPlaceholder="Search roles..."
        onSearchChange={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        actionLabel="New Role"
        onAction={() => {
          setEditingRole(null);
          setShowModal(true);
        }}
        onReload={fetchData}
        perPage={perPage}
        onPerPageChange={(v) => {
          setPerPage(v);
          setCurrentPage(1);
        }}
      />

      {/* ─── Mock Warning Alert ─────────────────────────────────── */}
      {isUsingMock && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-xs text-amber-800 shadow-sm animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <span className="font-bold">Offline Sandboxed Mode: </span>
              Could not reach backend API at trendserp.com. Serving local mock database.
            </div>
          </div>
          <button
            onClick={fetchData}
            className="flex items-center gap-1 cursor-pointer font-bold underline hover:text-amber-950 transition"
          >
            <RefreshCw className="h-3 w-3 animate-spin" /> Retry Connection
          </button>
        </div>
      )}

      {/* ─── Data Table ────────────────────────────────────────── */}
      <DataTable
        headers={headers}
        colSpan={5}
        isLoading={loading}
        isEmpty={paged.length === 0}
        emptyIcon={ShieldCheck}
        emptyMessage="No roles found"
        emptyDescription="Define roles to organize access controls."
      >
        {paged.map((r) => (
          <tr key={r.id} className="hover:bg-slate-50 transition-colors">
            {/* Role Code */}
            <td className="whitespace-nowrap px-5 py-3 font-semibold text-slate-800">
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-emerald-800 ring-1 ring-emerald-600/10">
                {r.name.replace(/_/g, " ").toUpperCase()}
              </span>
            </td>

            {/* Description */}
            <td className="px-5 py-3 text-slate-600 max-w-[280px] truncate">
              {r.description || <span className="text-slate-400 italic">No description provided</span>}
            </td>

            {/* Granted Permissions count */}
            <td className="whitespace-nowrap px-5 py-3 text-center">
              {r.name === "SUPER_ADMIN" ? (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold uppercase text-blue-700 ring-1 ring-blue-600/10">
                  ALL (WILDCARD)
                </span>
              ) : (
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-100 px-1.5 text-[11px] font-bold text-slate-700">
                  {r.permissions?.length ?? 0}
                </span>
              )}
            </td>

            {/* Last Updated */}
            <td className="whitespace-nowrap px-5 py-3 text-slate-500 text-[11px] hidden md:table-cell">
              {r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : "—"}
            </td>

            {/* Actions */}
            <TableActions
              id={r.id}
              name={r.name}
              baseUrl="/roles"
              showView={false}
              showEdit={true}
              showDelete={r.name !== "SUPER_ADMIN"}
              onEdit={() => handleEditClick(r)}
              onDelete={() => handleDelete(r.id, r.name)}
              confirmMessage={`Are you sure you want to delete the role "${r.name}"? This will detach it from any users assigned to it.`}
            />
          </tr>
        ))}
      </DataTable>

      {/* ─── Pagination ────────────────────────────────────────── */}
      <Pagination
        currentPage={safePage}
        lastPage={lastPage}
        onPageChange={setCurrentPage}
      />

      {/* ─── Modal ─────────────────────────────────────────────── */}
      <RoleModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingRole(null);
        }}
        onSave={handleSave}
        editData={editingRole}
        allPermissions={allPermissions}
      />
    </div>
  );
}
