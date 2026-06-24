"use client";

import { X } from "lucide-react";
import { FormActions, CustomAction } from "./form-actions";

type ActionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: { label: string; value: string | React.ReactNode }[];
  actions?: CustomAction[];
};

export function ActionModal({
  isOpen,
  onClose,
  title,
  data,
  actions,
}: ActionModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors border border-slate-200 bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content (Key-Value pairs) */}
          <div className="p-6 overflow-y-auto">
            <div className="flex flex-col border border-slate-100 rounded-lg overflow-hidden bg-white">
              {data.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-5 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-700 sm:col-span-1">{item.label}</span>
                  <span className="text-xs text-slate-600 sm:col-span-2">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          {actions && actions.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-100 bg-white">
              <FormActions customActions={actions} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
