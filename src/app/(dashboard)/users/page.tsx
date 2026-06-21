"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Users, AlertCircle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { confirmAction } from "@/lib/toast-utils";
import { DataTable, PageToolbar, TableActions, Pagination } from "@/components/shared";
import { UserModal } from "@/components/access-control/user-modal";
import { userService } from "@/services/userService";
import { roleService } from "@/services/roleService";
import type { SystemUser, Role } from "@/types/access-control";

/* ── Local mock backup data if backend is offline ───────────────────── */
const MOCK_ROLES: Role[] = [
  { id: "r-1", name: "SUPER_ADMIN", description: "Super Admin role", createdAt: "", updatedAt: "" },
  { id: "r-2", name: "ADMIN", description: "Admin role", createdAt: "", updatedAt: "" },
  { id: "r-3", name: "DATA_ENTRY", description: "Data Entry role", createdAt: "", updatedAt: "" },
  { id: "r-4", name: "CALL_CENTER", description: "Call Center role", createdAt: "", updatedAt: "" },
];

const MOCK_USERS: SystemUser[] = [
  {
    id: "u-1",
    email: "superadmin@trendserp.com",
    name: "Sifat Rahman",
    roleId: "r-1",
    isActive: true,
    role: { id: "r-1", name: "SUPER_ADMIN", description: "Super Admin role" },
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "u-2",
    email: "admin@trendserp.com",
    name: "Tahmid Hasan",
    roleId: "r-2",
    isActive: true,
    role: { id: "r-2", name: "ADMIN", description: "Admin role" },
    createdAt: "2026-06-02T11:30:00Z",
    updatedAt: "2026-06-02T11:30:00Z",
  },
  {
    id: "u-3",
    email: "dataentry@trendserp.com",
    name: "Mst. Jannat",
    roleId: "r-3",
    isActive: true,
    role: { id: "r-3", name: "DATA_ENTRY", description: "Data Entry role" },
    createdAt: "2026-06-03T09:15:00Z",
    updatedAt: "2026-06-03T09:15:00Z",
  },
];

export default function UsersPage() {
  /* ── Core State ────────────────────────────────── */
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMock, setIsUsingMock] = useState(false);

  /* ── UI Controls State ─────────────────────────── */
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);

  /* ── Fetch Data from API ──────────────────────── */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [fetchedUsers, fetchedRoles] = await Promise.all([
        userService.getAll(),
        roleService.getAll(),
      ]);
      setUsers(fetchedUsers);
      setRoles(fetchedRoles);
      setIsUsingMock(false);
    } catch (err: any) {
      if (err.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (err.status === 403) {
        setError("Access Denied: You do not have permissions to view this resource.");
        setUsers([]);
        setRoles([]);
        setIsUsingMock(false);
        return;
      }
      console.warn("Failed to connect to backend api server, falling back to mock data.", err);
      // Fallback gracefully
      setUsers(MOCK_USERS);
      setRoles(MOCK_ROLES);
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
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.name.toLowerCase().includes(q)
    );
  }, [users, search]);

  const lastPage = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(currentPage, lastPage);

  const paged = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, safePage, perPage]);

  /* ── Save / Create / Edit Handler ─────────────── */
  const handleSave = async (data: {
    email: string;
    name: string;
    password?: string;
    roleId: string;
    isActive?: boolean;
  }) => {
    try {
      if (editingUser) {
        // Edit API action
        if (isUsingMock) {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === editingUser.id
                ? {
                  ...u,
                  ...data,
                  role: roles.find((r) => r.id === data.roleId) || u.role,
                  updatedAt: new Date().toISOString(),
                }
                : u
            )
          );
        } else {
          const updated = await userService.update(editingUser.id, data);
          setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? updated : u)));
        }
      } else {
        // Create API action
        if (isUsingMock) {
          const newMockUser: SystemUser = {
            id: `u-${Date.now()}`,
            email: data.email,
            name: data.name,
            roleId: data.roleId,
            isActive: true,
            role: roles.find((r) => r.id === data.roleId) || { id: data.roleId, name: "USER" },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setUsers((prev) => [newMockUser, ...prev]);
        } else {
          const created = await userService.create({
            email: data.email,
            password: data.password || "123456",
            name: data.name,
            roleId: data.roleId,
          });
          setUsers((prev) => [created, ...prev]);
        }
      }
      setShowModal(false);
      setEditingUser(null);
      toast.success(editingUser ? "User updated successfully." : "User created successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save user info.");
    }
  };

  /* ── Deactivate User Handler ──────────────────── */
  const handleDeactivate = async (id: string, name: string) => {
    try {
      if (isUsingMock) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, isActive: false } : u))
        );
      } else {
        await userService.deactivate(id);
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: false } : u)));
      }
      toast.success(`Account deactivated.`);
    } catch (err: any) {
      toast.error(err.message || "Failed to deactivate account.");
    }
  };

  const handleEditClick = (user: SystemUser) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const headers = [
    { label: "Name" },
    { label: "Email Address" },
    { label: "Assigned Role" },
    { label: <span className="block text-center">Status</span> },
    { label: "Created At", className: "hidden md:table-cell" },
    { label: <span className="block ">Action</span> },
  ];

  return (
    <div className="space-y-4">
      {/* ─── Page Toolbar ───────────────────────────────────────── */}
      <PageToolbar
        title="User Management"
        description="Configure admin portal operators, accounts, and assigned roles."
        searchValue={search}
        searchPlaceholder="Search by name, email, role..."
        onSearchChange={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        actionLabel="Add Operator"
        onAction={() => {
          setEditingUser(null);
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
              Could not reach backend API at trendserp.com. Serving local database state for test actions.
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
        colSpan={6}
        isLoading={loading}
        isEmpty={paged.length === 0}
        emptyIcon={Users}
        emptyMessage="No system users found"
        emptyDescription="System users will appear here once added or synchronized."
      >
        {paged.map((u) => (
          <tr key={u.id} className="hover:bg-slate-50 transition-colors">
            {/* Name */}
            <td className="whitespace-nowrap px-5 py-3 font-semibold text-slate-800">
              {u.name}
            </td>

            {/* Email */}
            <td className="whitespace-nowrap px-5 py-3 font-mono text-[11px] text-slate-600">
              {u.email}
            </td>

            {/* Role */}
            <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-700 text-xs">
              <span className="rounded-lg bg-slate-100 px-2 py-1 uppercase text-[9px] tracking-wider text-slate-600 font-bold">
                {u.role.name.replace(/_/g, " ")}
              </span>
            </td>

            {/* Status */}
            <td className="whitespace-nowrap px-5 py-3 text-center">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold ring-1 ring-inset ${u.isActive
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                    : "bg-rose-50 text-rose-700 ring-rose-600/20"
                  }`}
              >
                {u.isActive ? "Active" : "Deactivated"}
              </span>
            </td>

            {/* Created At */}
            <td className="whitespace-nowrap px-5 py-3 text-slate-500 text-[11px] hidden md:table-cell">
              {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
            </td>

            {/* Actions */}
            <TableActions
              id={u.id}
              name={u.name}
              baseUrl="/users"
              showView={false}
              showEdit={true}
              showDelete={u.isActive} // Only show deactivate action if active
              onEdit={() => handleEditClick(u)}
              onDelete={() => handleDeactivate(u.id, u.name)}
              confirmMessage={`Are you sure you want to deactivate ${u.name}'s admin portal account?`}
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
      <UserModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        editData={editingUser}
        roles={roles}
      />
    </div>
  );
}
