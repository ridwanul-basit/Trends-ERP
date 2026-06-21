"use client";

import { useState, useEffect, useMemo } from "react";
import { X, ShieldCheck, AlertCircle, CheckSquare, Square } from "lucide-react";
import type { Role, Permission } from "@/types/access-control";

type RoleModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description?: string; permissionIds: string[] }) => void;
  editData?: Role | null;
  allPermissions: Permission[];
};

export function RoleModal({ open, onClose, onSave, editData, allPermissions }: RoleModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");

  // Group all system permissions by their module (master permission name)
  const groupedPermissions = useMemo(() => {
    const groups: Record<string, Permission[]> = {};
    allPermissions.forEach((p) => {
      // e.g. name is "user:create", split by ":" to get group/master name
      const [group] = p.name.split(":");
      const groupKey = group.replace(/[-_]/g, " ").toUpperCase();
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(p);
    });
    return groups;
  }, [allPermissions]);

  useEffect(() => {
    if (editData) {
      setName(editData.name.replace(/_/g, " ").toUpperCase());
      setDescription(editData.description || "");
      // Load current assigned permissions
      const ids = editData.permissions?.map((p) => p.permissionId) || [];
      setSelectedPermissionIds(new Set(ids));
    } else {
      setName("");
      setDescription("");
      setSelectedPermissionIds(new Set());
    }
    setError("");
  }, [editData, open]);

  const resetAndClose = () => {
    setName("");
    setDescription("");
    setSelectedPermissionIds(new Set());
    setError("");
    onClose();
  };

  const togglePermission = (id: string) => {
    setSelectedPermissionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleGroup = (groupKey: string, permissionsInGroup: Permission[]) => {
    const allSelected = permissionsInGroup.every((p) => selectedPermissionIds.has(p.id));
    setSelectedPermissionIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        // Deselect all
        permissionsInGroup.forEach((p) => next.delete(p.id));
      } else {
        // Select all
        permissionsInGroup.forEach((p) => next.add(p.id));
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedPermissionIds(new Set(allPermissions.map((p) => p.id)));
  };

  const handleClearAll = () => {
    setSelectedPermissionIds(new Set());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Role name is required.");
      return;
    }

    // Convert display name back to DB format (lowercase and snake/underscore style)
    const dbName = name.trim().toUpperCase().replace(/\s+/g, "_");

    onSave({
      name: dbName,
      description: description.trim(),
      permissionIds: Array.from(selectedPermissionIds),
    });

    resetAndClose();
  };

  if (!open) return null;

  const isEditing = !!editData;
  const isSuperAdmin = editData?.name === "SUPER_ADMIN";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={resetAndClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-100 bg-white shadow-2xl mx-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                {isEditing ? "Edit Role & Permissions" : "New Role"}
              </h2>
              <p className="text-[10px] text-slate-400">
                {isEditing ? "Modify name, details, and adjust capability options." : "Create a customized authorization group."}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Container (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-[11px] text-red-700 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Role details row */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                Role Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSuperAdmin}
                placeholder="e.g. DATA_ENTRY or CALL_CENTER"
                className="h-9 w-full rounded-lg border border-slate-200 bg-surface px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description of duties..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-surface px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              />
            </div>
          </div>

          {/* Grouped Permissions Matrix Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Permission Rights Matrix
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-[9px] font-bold cursor-pointer text-primary hover:underline"
                >
                  Select All
                </button>
                <span className="text-slate-300 text-[9px]">•</span>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-[9px] font-bold cursor-pointer text-slate-400 hover:text-slate-600 hover:underline"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Matrix groups */}
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {Object.entries(groupedPermissions).map(([groupKey, permissions]) => {
                const groupSelectedCount = permissions.filter((p) => selectedPermissionIds.has(p.id)).length;
                const isAllGroupSelected = groupSelectedCount === permissions.length;

                return (
                  <div key={groupKey} className="rounded-xl border border-slate-100 bg-slate-50/30 p-3.5 space-y-2.5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        {groupKey}
                      </h4>
                      <button
                        type="button"
                        onClick={() => toggleGroup(groupKey, permissions)}
                        className="text-[9px] font-bold cursor-pointer text-primary hover:underline flex items-center gap-1"
                      >
                        {isAllGroupSelected ? "Deselect Group" : "Select Group"}
                      </button>
                    </div>

                    {/* Permission items grid */}
                    <div className="grid gap-2 grid-cols-2">
                      {permissions.map((p) => {
                        const isChecked = selectedPermissionIds.has(p.id);
                        const [, action] = p.name.split(":");
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => togglePermission(p.id)}
                            className={`flex items-center gap-2 rounded-lg border p-2 text-left text-[11px] transition ${isChecked
                              ? "border-brand-green bg-emerald-50/20 text-slate-800 font-medium"
                              : "border-slate-100 bg-white text-slate-500 hover:border-slate-200"
                              }`}
                          >
                            {isChecked ? (
                              <CheckSquare className="h-4 w-4 cursor-pointer shrink-0 text-brand-green" />
                            ) : (
                              <Square className="h-4 w-4 cursor-pointer shrink-0 text-slate-300" />
                            )}
                            <span className="flex-1 truncate">
                              <span className="block font-bold text-[10px] text-slate-700 capitalize">
                                {action.replace(/-/g, " ")}
                              </span>
                              {p.description && (
                                <span className="block text-[9px] text-slate-400 truncate">
                                  {p.description}
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={resetAndClose}
              className="h-8 cursor-pointer rounded-lg px-4 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-white transition hover:bg-brand-green/90"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {isEditing ? "Update Role" : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
