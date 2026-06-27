"use client";

import { useEffect, useState, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { FormField, FormFieldProps } from "./form-field";
import { FormActions } from "./form-actions";

export type FormModalField = Omit<FormFieldProps, "value" | "onChange"> & {
  name: string;
};

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FormModalField[];
  onSubmit: (data: Record<string, any>) => void;
  isSubmitting?: boolean;
  submitText?: string;
  gridCols?: 1 | 2;
  /** Optional custom content rendered after fields (for competency ratings etc.) */
  children?: ReactNode;
  /** Max width of the modal box, defaults to max-w-md */
  maxWidth?: string;
};

export function FormModal({
  isOpen,
  onClose,
  title,
  fields,
  onSubmit,
  isSubmitting = false,
  submitText = "Save",
  gridCols = 1,
  children,
  maxWidth = "max-w-md",
}: FormModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className={cn("w-full rounded-xl bg-white shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]", maxWidth)}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
            <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 cursor-pointer hover:bg-slate-200 hover:text-slate-600 transition-colors border border-slate-200 bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit}>
              {/* Standard fields */}
              {fields.length > 0 && (
                <div className={cn("space-y-4", gridCols === 2 && "grid grid-cols-2 gap-4 space-y-0 mb-4")}>
                  {fields.map((field) => (
                    <FormField
                      key={field.name}
                      {...field}
                      value={formData[field.name] || ""}
                      onChange={(val) => handleChange(field.name, val)}
                    />
                  ))}
                </div>
              )}

              {/* Custom content (star ratings, sliders, competency sections etc.) */}
              {children && (
                <div className={cn(fields.length > 0 && "mt-4")}>
                  {children}
                </div>
              )}

              {/* Footer Actions */}
              <div className="pt-4 mt-6 border-t border-slate-100">
                <FormActions
                  onCancel={onClose}
                  submitText={submitText}
                  submitDisabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
