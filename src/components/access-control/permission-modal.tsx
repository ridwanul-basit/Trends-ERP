"use client";

import { useState, useEffect } from "react";
import { X, KeyRound, AlertCircle, Loader2 } from "lucide-react";
import type { Permission, MasterPermission } from "@/types/access-control";

type PermissionModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: { masterId: string; action: string; description?: string; newMaster?: { name: string; description?: string } }) => void;
  editData?: Permission | null;
  masterPermissions: MasterPermission[];
  loading?: boolean;
};

export function PermissionModal({
  open,
  onClose,
  onSave,
  editData,
  masterPermissions,
  loading = false,
}: PermissionModalProps) {
  const [masterId, setMasterId] = useState("");
  const [action, setAction] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const [isCreatingMaster, setIsCreatingMaster] = useState(false);
  const [newMasterName, setNewMasterName] = useState("");
  const [newMasterDescription, setNewMasterDescription] = useState("");

  useEffect(() => {
    if (editData) {
      setMasterId(editData.masterId || "");
      // Extract action from permission name (e.g. "user:create" → "create")
      const [, act] = editData.name.split(":");
      setAction(act || "");
      setDescription(editData.description || "");
    } else {
      setMasterId(masterPermissions[0]?.id || "");
      setAction("");
      setDescription("");
      setIsCreatingMaster(false);
      setNewMasterName("");
      setNewMasterDescription("");
    }
    setError("");
  }, [editData, open, masterPermissions]);

  const resetAndClose = () => {
    setMasterId("");
    setAction("");
    setDescription("");
    setError("");
    setIsCreatingMaster(false);
    setNewMasterName("");
    setNewMasterDescription("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isCreatingMaster) {
      if (!newMasterName.trim()) {
        setError("Module name is required (e.g. report, system).");
        return;
      }
    } else {
      if (!masterId) {
        setError("Please select a module (master permission).");
        return;
      }
    }

    if (!action.trim()) {
      setError("Action name is required (e.g. create, read, update, delete).");
      return;
    }

    onSave({
      masterId: isCreatingMaster ? "" : masterId,
      action: action.trim().toLowerCase(),
      description: description.trim() || undefined,
      newMaster: isCreatingMaster
        ? {
          name: newMasterName.trim().toLowerCase(),
          description: newMasterDescription.trim() || undefined,
        }
        : undefined,
    });
  };

  if (!open) return null;

  const isEditing = !!editData;
  const selectedMaster = masterPermissions.find((m) => m.id === masterId);
  const previewMasterName = isCreatingMaster
    ? newMasterName.trim().toLowerCase() || "<module>"
    : selectedMaster?.name || "<module>";
  const previewName = `${previewMasterName}:${action.trim().toLowerCase() || "___"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={resetAndClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-100 bg-white shadow-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl border-b border-slate-100 p-5 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <KeyRound className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                {isEditing ? "Edit Permission" : "New Permission"}
              </h2>
              <p className="text-[10px] text-slate-400">
                {isEditing
                  ? "Update module, action, or description."
                  : "Register a new capability right for the system."}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-3.5 py-2.5 text-[11px] text-red-700 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Module / Master Permission */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold text-slate-600">
                Module (Master Permission) <span className="text-red-500">*</span>
              </label>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsCreatingMaster(!isCreatingMaster)}
                  className="text-[10px] cursor-pointer font-bold text-primary hover:underline"
                >
                  {isCreatingMaster ? "Select Existing" : "Create New Module"}
                </button>
              )}
            </div>

            {isCreatingMaster ? (
              <div className="space-y-3 rounded-lg border border-brand-green/20 bg-emerald-50/30 p-3">
                <div>
                  <input
                    type="text"
                    value={newMasterName}
                    onChange={(e) => setNewMasterName(e.target.value)}
                    placeholder="New module name (e.g. analytics)"
                    className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 lowercase"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newMasterDescription}
                    onChange={(e) => setNewMasterDescription(e.target.value)}
                    placeholder="Short description for this module..."
                    className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />
                </div>
              </div>
            ) : (
              <select
                value={masterId}
                onChange={(e) => setMasterId(e.target.value)}
                disabled={isEditing}
                className="h-9 w-full cursor-pointer rounded-lg border border-slate-200 bg-surface px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  Select a module...
                </option>
                {masterPermissions.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} {m.description ? `— ${m.description}` : ""}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Action */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
              Action Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="e.g. create, read, update, delete, export"
              className="h-9 w-full rounded-lg border border-slate-200 bg-surface px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 lowercase"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              The backend will auto-generate the permission key as{" "}
              <code className="font-mono text-[9px] bg-slate-100 px-1 py-0.5 rounded">
                {previewName || "<module>:<action>"}
              </code>
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of what this right controls..."
              className="h-9 w-full rounded-lg border border-slate-200 bg-surface px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
            />
          </div>

          {/* Live Preview */}
          {previewName && action.trim() && (
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-1">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Preview
              </p>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                  {previewMasterName}
                </span>
                <span className="text-slate-300">→</span>
                <span className="font-mono text-xs font-bold text-slate-800">
                  {previewName}
                </span>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={resetAndClose}
              className="h-8 cursor-pointer rounded-lg px-4 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-white transition hover:bg-brand-green/90 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <KeyRound className="h-3.5 w-3.5" />
              )}
              {isEditing ? "Update Permission" : "Create Permission"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
