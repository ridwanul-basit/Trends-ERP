"use client";

import { ReactNode } from "react";
import { Plus } from "lucide-react";

type SectionHeaderProps = {
  /** The title of the section */
  title: string;
  /** The color class for the left highlight bar. Defaults to bg-theme-section-highlight */
  colorClass?: string;
  /** Optional action element to replace the default Plus button */
  actionElement?: ReactNode;
  /** Callback for when the default Plus button is clicked */
  onAdd?: () => void;
  /** Whether to show the Add button. Defaults to true. */
  showAdd?: boolean;
};

export function SectionHeader({
  title,
  colorClass = "bg-theme-section-highlight",
  actionElement,
  onAdd,
  showAdd = true,
}: SectionHeaderProps) {
  return (
    <div className="relative flex items-center justify-between px-5 py-4 border-b border-theme-border bg-white">
      {/* Left colored bar flush with the edge */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colorClass}`} />

      <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>

      <div className="flex items-center gap-2">
        {actionElement}
        {showAdd && !actionElement && (
          <button
            onClick={onAdd}
            className="flex h-7 w-7 items-center cursor-pointer justify-center rounded bg-theme-primary text-white transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
