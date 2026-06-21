"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { KeyRound, AlertCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { DataTable, PageToolbar, TableActions, Pagination } from "@/components/shared";
import { PermissionModal } from "@/components/access-control/permission-modal";
import { permissionService } from "@/services/permissionService";
import { roleService } from "@/services/roleService";
import type { Permission, Role, MasterPermission } from "@/types/access-control";

/* ── Fallback local mockup data if backend is offline ────────────────── */
const MOCK_PERMISSIONS: Permission[] = [
  { id: "p-1", name: "user:create", description: "Create System User", masterId: "m-1", master: { id: "m-1", name: "user" } },
  { id: "p-2", name: "user:read", description: "Read System User", masterId: "m-1", master: { id: "m-1", name: "user" } },
  { id: "p-3", name: "user:update", description: "Update System User", masterId: "m-1", master: { id: "m-1", name: "user" } },
  { id: "p-4", name: "role:create", description: "Create Role", masterId: "m-2", master: { id: "m-2", name: "role" } },
  { id: "p-5", name: "role:read", description: "Read Role", masterId: "m-2", master: { id: "m-2", name: "role" } },
  { id: "p-6", name: "participant:create", description: "Create Participant", masterId: "m-3", master: { id: "m-3", name: "participant" } },
  { id: "p-7", name: "participant:read", description: "Read Participant", masterId: "m-3", master: { id: "m-3", name: "participant" } },
];

const MOCK_ROLES: Role[] = [
  {
    id: "r-1",
    name: "SUPER_ADMIN",
    description: "Super Admin role",
    permissions: [],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "r-2",
    name: "ADMIN",
    description: "Admin role",
    permissions: [
      { id: "rp-1", roleId: "r-2", permissionId: "p-2", permission: MOCK_PERMISSIONS[1] },
      { id: "rp-2", roleId: "r-2", permissionId: "p-7", permission: MOCK_PERMISSIONS[6] },
    ],
    createdAt: "",
    updatedAt: "",
  },
];

const MOCK_MASTERS: MasterPermission[] = [
  { id: "m-1", name: "user", description: "User management" },
  { id: "m-2", name: "role", description: "Role management" },
  { id: "m-3", name: "participant", description: "Participant management" },
];

export default function PermissionsPage() {
  /* ── Core State ────────────────────────────────── */
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [masterPermissions, setMasterPermissions] = useState<MasterPermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMock, setIsUsingMock] = useState(false);

  /* ── UI Controls State ─────────────────────────── */
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  /* ── Modal State ───────────────────────────────── */
  const [showModal, setShowModal] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);

  /* ── Fetch Data ────────────────────────────────── */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [fetchedPermissions, fetchedRoles, fetchedMasters] = await Promise.all([
        permissionService.getAll(),
        roleService.getAll(),
        permissionService.getMasterPermissions(),
      ]);
      setPermissions(fetchedPermissions);
      setRoles(fetchedRoles);
      setMasterPermissions(fetchedMasters);
      setIsUsingMock(false);
    } catch (err: any) {
      if (err.status === 401) {
        // Mock fallback instead of redirecting
        console.warn("Got 401 Unauthorized, but proceeding to mock data since there is no backend yet.");
      } else if (err.status === 403) {
        setError("Access Denied: You do not have permissions to view this resource.");
        setPermissions([]);
        setRoles([]);
        setMasterPermissions([]);
        setIsUsingMock(false);
        return;
      }
      console.warn("Failed to fetch permissions from API, utilizing local mock database.", err);
      setPermissions(MOCK_PERMISSIONS);
      setRoles(MOCK_ROLES);
      setMasterPermissions(MOCK_MASTERS);
      setIsUsingMock(true);
      setError("Cannot connect to backend server. Operating in mock sandbox mode.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ── Create / Update Permission ────────────────── */
  const handleSave = async (data: { masterId: string; action: string; description?: string; newMaster?: { name: string; description?: string } }) => {
    setSaving(true);
    try {
      if (isUsingMock) {
        // Offline mock mode — local state only
        let finalMasterId = data.masterId;
        let masterName = "module";

        if (data.newMaster) {
          finalMasterId = `m-mock-${Date.now()}`;
          masterName = data.newMaster.name;
          const newMasterObj: MasterPermission = {
            id: finalMasterId,
            name: masterName,
            description: data.newMaster.description,
          };
          setMasterPermissions((prev) => [...prev, newMasterObj]);
        } else {
          masterName = masterPermissions.find((m) => m.id === finalMasterId)?.name || "module";
        }
        if (editingPermission) {
          setPermissions((prev) =>
            prev.map((p) =>
              p.id === editingPermission.id
                ? {
                  ...p,
                  name: `${masterName}:${data.action}`,
                  description: data.description || p.description,
                  masterId: finalMasterId,
                  master: { id: finalMasterId, name: masterName },
                }
                : p
            )
          );
        } else {
          const newPerm: Permission = {
            id: `p-mock-${Date.now()}`,
            name: `${masterName}:${data.action}`,
            description: data.description,
            masterId: finalMasterId,
            master: { id: finalMasterId, name: masterName },
          };
          setPermissions((prev) => [newPerm, ...prev]);
        }
      } else {
        // Live API mode
        let finalMasterId = data.masterId;

        if (data.newMaster) {
          const createdMaster = await permissionService.createMasterPermission(data.newMaster);
          finalMasterId = createdMaster.id;
          setMasterPermissions((prev) => [...prev, createdMaster]);
        }

        if (editingPermission) {
          const updated = await permissionService.update(editingPermission.id, { ...data, masterId: finalMasterId });
          setPermissions((prev) => prev.map((p) => (p.id === editingPermission.id ? updated : p)));
        } else {
          const created = await permissionService.create({ ...data, masterId: finalMasterId });
          setPermissions((prev) => [created, ...prev]);
        }
      }
      setShowModal(false);
      setEditingPermission(null);
    } catch (err: any) {
      console.error("Failed to save permission:", err);
      toast.error(err?.message || "Failed to save permission. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete Permission ─────────────────────────── */
  const handleDelete = async (id: string) => {
    try {
      if (isUsingMock) {
        setPermissions((prev) => prev.filter((p) => p.id !== id));
      } else {
        await permissionService.delete(id);
        setPermissions((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err: any) {
      console.error("Failed to delete permission:", err);
      toast.error(err?.message || "Failed to delete permission. It may be assigned to a role.");
    }
  };

  /* ── Derived Search and Paginated Arrays ───────── */
  const filtered = useMemo(() => {
    if (!search.trim()) return permissions;
    const q = search.toLowerCase();
    return permissions.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.master?.name && p.master.name.toLowerCase().includes(q))
    );
  }, [permissions, search]);

  const lastPage = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, lastPage);

  const paged = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, safePage, perPage]);

  /** Identify which roles are explicitly assigned to a permission */
  const getAssignedRoles = useCallback(
    (permissionId: string) => {
      const assigned = roles.filter((role) => {
        if (role.name === "SUPER_ADMIN") return true; // Super Admin has everything
        return role.permissions?.some((rp) => rp.permissionId === permissionId);
      });
      return assigned;
    },
    [roles]
  );

  const headers = [
    { label: "Permission Key / Name" },
    { label: "Module / Category" },
    { label: "Description" },
    { label: <span className="block ">Assigned Roles</span> },
    { label: <span className="block ">Action</span> },
  ];

  return (
    <div className="space-y-4">
      {/* ─── Page Toolbar ───────────────────────────────────────── */}
      <PageToolbar
        title="Access Control: Permissions"
        description={`System capability rights and module keys. (${filtered.length} total)`}
        searchValue={search}
        searchPlaceholder="Search permissions..."
        onSearchChange={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        actionLabel="New Permission"
        onAction={() => {
          setEditingPermission(null);
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
        emptyIcon={KeyRound}
        emptyMessage="No permissions found"
        emptyDescription="Click New Permission to add one, or permissions will auto-sync from backend modules."
      >
        {paged.map((p) => {
          const assignedRoles = getAssignedRoles(p.id);
          return (
            <tr key={p.id} className="hover:bg-slate-50 transition-colors">
              {/* Permission Key */}
              <td className="whitespace-nowrap px-5 py-3 font-mono text-[11px] font-bold text-slate-800">
                {p.name}
              </td>

              {/* Module/Category */}
              <td className="whitespace-nowrap px-5 py-3 text-xs">
                <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                  {p.master?.name || p.name.split(":")[0]}
                </span>
              </td>

              {/* Description */}
              <td className="px-5 py-3 text-slate-600 text-xs">
                {p.description || `${p.name.replace(":", " ")} rights`}
              </td>

              {/* Assigned Roles tags list */}
              <td className="px-5 py-3 ">
                <div className="flex flex-wrap gap-1.5">
                  {assignedRoles.map((role) => (
                    <span
                      key={role.id}
                      className={`inline-block rounded-md px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${role.name === "SUPER_ADMIN"
                        ? "bg-slate-100 text-slate-600"
                        : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10"
                        }`}
                    >
                      {role.name.replace(/_/g, " ")}
                    </span>
                  ))}
                  {assignedRoles.length === 0 && (
                    <span className="text-[10px] text-slate-400 italic">None</span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <TableActions
                id={p.id}
                name={p.name}
                baseUrl="/permissions"
                showView={false}
                showEdit={true}
                showDelete={true}
                onEdit={() => {
                  setEditingPermission(p);
                  setShowModal(true);
                }}
                onDelete={() => handleDelete(p.id)}
              />
            </tr>
          );
        })}
      </DataTable>

      {/* ─── Pagination ────────────────────────────────────────── */}
      <Pagination
        currentPage={safePage}
        lastPage={lastPage}
        onPageChange={setCurrentPage}
      />

      {/* ─── Permission Modal ──────────────────────────────────── */}
      <PermissionModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingPermission(null);
        }}
        onSave={handleSave}
        editData={editingPermission}
        masterPermissions={masterPermissions}
        loading={saving}
      />
    </div>
  );
}
