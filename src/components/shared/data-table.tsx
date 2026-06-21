"use client";

import { ReactNode } from "react";
import { LucideIcon, Inbox } from "lucide-react";

type DataTableProps = {
  /** Array of header labels or ReactNodes for <th> cells */
  headers: (ReactNode | { label: ReactNode; className?: string })[];
  /** Table row children – render <tr> elements */
  children: ReactNode;
  /** Number of columns (used for colSpan in empty / loading states) */
  colSpan: number;
  /** When true, show the empty state instead of children */
  isEmpty?: boolean;
  /** Empty state label */
  emptyMessage?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Icon displayed in the empty state */
  emptyIcon?: LucideIcon;
  /** When true, render animated skeleton rows */
  isLoading?: boolean;
  /** Number of skeleton rows to show while loading */
  skeletonRows?: number;
  /** Enable row checkboxes */
  selectable?: boolean;
  /** Set of currently selected row ids */
  selectedIds?: Set<string>;
  /** IDs of rows visible on the current page (for select-all logic) */
  pageIds?: string[];
  /** Callback when selection changes */
  onSelectionChange?: (ids: Set<string>) => void;
};

export function DataTable({
  headers,
  children,
  colSpan,
  isEmpty = false,
  emptyMessage = "No data found",
  emptyDescription = "Items will appear here once added.",
  emptyIcon: EmptyIcon = Inbox,
  isLoading = false,
  skeletonRows = 5,
  selectable = false,
  selectedIds,
  pageIds = [],
  onSelectionChange,
}: DataTableProps) {
  const totalColSpan = selectable ? colSpan + 1 : colSpan;

  /* ─ Select-all logic for the current page ─ */
  const allPageSelected =
    selectable && pageIds.length > 0 && pageIds.every((id) => selectedIds?.has(id));
  const somePageSelected =
    selectable && !allPageSelected && pageIds.some((id) => selectedIds?.has(id));

  const handleSelectAll = () => {
    if (!onSelectionChange || !selectedIds) return;
    const next = new Set(selectedIds);
    if (allPageSelected) {
      // deselect all on this page
      pageIds.forEach((id) => next.delete(id));
    } else {
      // select all on this page
      pageIds.forEach((id) => next.add(id));
    }
    onSelectionChange(next);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs [&_tbody_tr]:border-b [&_tbody_tr]:border-slate-50 [&_tbody_tr]:transition [&_tbody_tr:hover]:bg-slate-50/60 [&_tbody_tr:last-child]:border-0">
          {/* ─── Head ────────────────────────────────────────── */}
          <thead className="sticky top-0 z-20 bg-table-header">
            <tr className="text-left text-slate-500 font-semibold">
              {selectable && (
                <th className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = !!somePageSelected;
                    }}
                    onChange={handleSelectAll}
                    className="h-3.5 w-3.5 cursor-pointer rounded border-slate-300 text-primary accent-primary"
                  />
                </th>
              )}
              {headers.map((header, i) => {
                const isObj = header && typeof header === "object" && "label" in header;
                const content = isObj ? (header as any).label : header;
                const className = isObj ? (header as any).className : "";
                return (
                  <th key={i} className={`whitespace-nowrap px-5 py-3 ${className}`}>
                    {content}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* ─── Body ────────────────────────────────────────── */}
          <tbody>
            {isLoading
              ? Array.from({ length: skeletonRows }).map((_, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="animate-pulse border-b border-slate-50 last:border-0"
                  >
                    {selectable && (
                      <td className="px-3 py-4">
                        <div className="h-3.5 w-3.5 rounded bg-slate-100" />
                      </td>
                    )}
                    {Array.from({ length: colSpan }).map((_, colIdx) => (
                      <td key={colIdx} className="px-5 py-4">
                        <div className="h-3.5 w-full rounded-md bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))
              : isEmpty
              ? (
                  <tr>
                    <td colSpan={totalColSpan} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <EmptyIcon className="h-10 w-10 text-slate-200" />
                        <span className="text-sm font-medium">{emptyMessage}</span>
                        <span className="text-[10px]">{emptyDescription}</span>
                      </div>
                    </td>
                  </tr>
                )
              : children}
          </tbody>
        </table>
      </div>
    </div>
  );
}
