"use client";

import {
  ArrowLeft,
  FileDown,
  Filter,
  Plus,
  Printer,
  RefreshCw,
  Search,
} from "lucide-react";

type PageToolbarProps = {
  /** Page heading */
  title: string;
  /** Short description under the title */
  description?: string;
  /** Search input value (controlled) */
  searchValue?: string;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Callback when search input changes */
  onSearchChange?: (value: string) => void;
  /** Label for the primary action button (e.g. "New Participant") */
  actionLabel?: string;
  /** Callback for primary action click */
  onAction?: () => void;
  /** Callback for the reload/refresh button */
  onReload?: () => void;
  /** Hide the full controls strip (useful on detail pages) */
  hideControls?: boolean;
  /** Callback for filter button */
  onFilter?: () => void;
  /** Callback for export button */
  onExport?: () => void;
  /** Callback for print button */
  onPrint?: () => void;
  /** Per-page value */
  perPage?: number;
  /** Callback when per-page changes */
  onPerPageChange?: (value: number) => void;
  /** Show the search bar (default: true) */
  showSearch?: boolean;
  /** Show utility icon buttons (default: true) */
  showUtilities?: boolean;
  /** Disable the action button */
  actionDisabled?: boolean;
};

export function PageToolbar({
  title,
  description,
  searchValue = "",
  searchPlaceholder = "Search...",
  onSearchChange,
  actionLabel,
  onAction,
  onReload,
  hideControls = false,
  onFilter,

  onExport,
  onPrint,
  perPage,
  onPerPageChange,
  showSearch = true,
  showUtilities = true,
  actionDisabled = false,
}: PageToolbarProps) {
  const ActionIcon = actionLabel?.toLowerCase() === "back" ? ArrowLeft : Plus;

  const utilities = [
    { Icon: Filter, label: "Filter", action: onFilter },
    { Icon: FileDown, label: "Export", action: onExport },
    { Icon: RefreshCw, label: "Reload", action: onReload },
    { Icon: Printer, label: "Print", action: onPrint },
  ];

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Left – heading */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            {title}
          </h1>
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
        </div>

        {/* Right – controls */}
        {!hideControls && (
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="h-8 w-full rounded-lg border border-slate-200 bg-surface pl-8 pr-3 text-xs outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 sm:w-56"
                />
              </div>
            )}

            {/* Utility icon buttons */}
            {showUtilities &&
              utilities.map(({ Icon, label, action }) => (
                <div key={label} className="group relative">
                  <button
                    type="button"
                    onClick={() => action?.()}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-surface text-slate-500 transition hover:bg-primary hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                  <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {label}
                  </span>
                </div>
              ))}

            {/* Per-page selector */}
            {perPage !== undefined && onPerPageChange && (
              <select
                value={perPage}
                onChange={(e) => onPerPageChange(Number(e.target.value))}
                className="h-8 cursor-pointer rounded-lg border border-slate-200 bg-surface px-2 text-xs outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
              >
                {[10, 20, 30, 50, 100, 200].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            )}

            {/* Primary action */}
            {actionLabel && (
              <button
                type="button"
                onClick={onAction}
                disabled={actionDisabled}
                className="flex h-8 cursor-pointer items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-white transition hover:bg-brand-green/90 disabled:opacity-50"
              >
                <ActionIcon className="h-3.5 w-3.5" />
                {actionLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
