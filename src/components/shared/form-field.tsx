import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

export type FormFieldProps = {
  label: string;
  type?: "text" | "password" | "email" | "date" | "time" | "select" | "radio" | "file" | "textarea";
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
  name?: string;
  helperText?: ReactNode;
  rows?: number;
};

export function FormField({
  label,
  type = "text",
  placeholder,
  options = [],
  required = false,
  value,
  onChange,
  className,
  name,
  helperText,
  rows = 3,
}: FormFieldProps) {
  const commonInputClasses =
    "w-full rounded-md border border-theme-border bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none transition focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/10";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {type !== "radio" && (
        <label className="text-xs font-bold text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* TEXT, EMAIL, PASSWORD, DATE, TIME */}
      {(type === "text" || type === "password" || type === "email" || type === "date" || type === "time") && (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          className={commonInputClasses}
        />
      )}

      {/* TEXTAREA */}
      {type === "textarea" && (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          rows={rows}
          className={cn(commonInputClasses, "resize-y min-h-[80px]")}
        />
      )}

      {/* SELECT */}
      {type === "select" && (
        <select
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          className={commonInputClasses}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* RADIO (Horizontal Layout) */}
      {type === "radio" && (
        <div className="flex items-center gap-6 h-9">
          <label className="text-xs font-bold text-slate-700">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          <div className="flex items-center gap-4">
            {options.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={name || label}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="h-3.5 w-3.5 cursor-pointer rounded border-theme-border text-primary accent-primary"
                  required={required}
                />
                <span className="text-xs font-bold text-slate-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* FILE */}
      {type === "file" && (
        <div className="flex items-center gap-0 w-full">
          <label className="flex h-9 items-center justify-center rounded-l-md border border-theme-border bg-slate-50 px-4 text-xs font-medium text-slate-600 cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
            <span>Choose File</span>
            <input
              type="file"
              name={name}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange?.(file.name);
                } else {
                  onChange?.("");
                }
              }}
              required={required}
            />
          </label>
          <div className="flex flex-1 h-9 items-center rounded-r-md border border-l-0 border-theme-border bg-white px-3 text-xs text-slate-400 truncate">
            {value || placeholder || "No file chosen"}
          </div>
        </div>
      )}

      {helperText && (
        <span className="text-[10px] text-red-500">{helperText}</span>
      )}
    </div>
  );
}
