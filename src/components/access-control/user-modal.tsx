"use client";

import { useState, useEffect } from "react";
import { X, UserPlus, AlertCircle } from "lucide-react";
import type { SystemUser, Role } from "@/types/access-control";

type UserModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: { email: string; name: string; password?: string; roleId: string; isActive?: boolean }) => void;
  editData?: SystemUser | null;
  roles: Role[];
};

export function UserModal({ open, onClose, onSave, editData, roles }: UserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setEmail(editData.email);
      setPassword(""); // Clear password field during edits
      setRoleId(editData.roleId);
      setIsActive(editData.isActive);
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setRoleId(roles[0]?.id || "");
      setIsActive(true);
    }
  }, [editData, open, roles]);

  const resetAndClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRoleId("");
    setIsActive(true);
    setError("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Valid email address is required.");
      return;
    }

    if (!editData && (!password || password.length < 6)) {
      setError("Password is required and must be at least 6 characters long.");
      return;
    }

    if (editData && password && password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!roleId) {
      setError("Please select a role.");
      return;
    }

    onSave({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      roleId,
      isActive,
      ...(password ? { password } : {}),
    });

    resetAndClose();
  };

  if (!open) return null;

  const isEditing = !!editData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={resetAndClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-100 bg-white shadow-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between rounded-2xl border-b border-slate-100 p-5 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <UserPlus className="h-4.5 w-4.5" />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                {isEditing ? "Edit System User" : "New System User"}
              </h2>
              <p className="text-[10px] text-slate-400">
                {isEditing ? "Modify account profile & access level." : "Register a new admin portal operator."}
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

          {/* Name */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ridwanul Basit"
              className="h-9 w-full rounded-lg border border-slate-200 bg-surface px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@trendserp.com"
              className="h-9 w-full rounded-lg border border-slate-200 bg-surface px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
              Password {isEditing ? <span className="text-[9px] font-normal text-slate-400">(leave blank to keep unchanged)</span> : <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isEditing ? "••••••••" : "At least 6 characters"}
              className="h-9 w-full rounded-lg border border-slate-200 bg-surface px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
              Role Selection <span className="text-red-500">*</span>
            </label>
            <select
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="h-9 w-full cursor-pointer rounded-lg border border-slate-200 bg-surface px-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
            >
              <option value="">Select a Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name.replace(/_/g, " ").toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Status Toggle (only when editing) */}
          {isEditing && (
            <div className="flex items-center justify-between py-1.5">
              <div>
                <span className="block text-xs font-semibold text-slate-700">Account Status</span>
                <span className="block text-[10px] text-slate-400">Toggle whether this user can login.</span>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isActive ? "bg-brand-green" : "bg-slate-200"
                  }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActive ? "translate-x-4" : "translate-x-0"
                    }`}
                />
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
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
              <UserPlus className="h-3.5 w-3.5" />
              {isEditing ? "Save Changes" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
