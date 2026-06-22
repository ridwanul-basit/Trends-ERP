"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type PaginationProps = {
  currentPage?: number;
  lastPage?: number;
  onPageChange?: (page: number) => void;
};

export function Pagination({
  currentPage = 1,
  lastPage = 1,
  onPageChange,
}: PaginationProps) {
  const [goToValue, setGoToValue] = useState("");

  if (lastPage <= 1) return null;

  const getPageNumbers = () => {
    const pages: Array<number | "..."> = [];
    const maxVisible = 7;

    if (lastPage <= maxVisible) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(lastPage - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < lastPage - 2) pages.push("...");
      pages.push(lastPage);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handleGoTo = () => {
    const val = parseInt(goToValue, 10);
    if (!isNaN(val) && val >= 1 && val <= lastPage) {
      onPageChange?.(val);
      setGoToValue("");
    }
  };

  return (
    <div className="flex w-full items-center justify-center rounded-2xl border border-slate-100 bg-white px-5 py-2.5 shadow-sm">
      <nav className="flex items-center gap-1" aria-label="Pagination">
        {/* Previous */}
        <button
          onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center cursor-pointer gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:text-theme-pagination-active-bg disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        {/* Pages */}
        <div className="mx-2 flex items-center gap-1">
          {pages.map((page, idx) => (
            <div key={`${page}-${idx}`}>
              {page === "..." ? (
                <span className="px-1 text-slate-400 text-xs">...</span>
              ) : (
                <button
                  onClick={() => onPageChange?.(page as number)}
                  className={cn(
                    "flex cursor-pointer h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-all",
                    page === currentPage
                      ? "bg-theme-pagination-active-bg text-theme-pagination-active-text shadow-sm"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  )}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() =>
            currentPage < lastPage && onPageChange?.(currentPage + 1)
          }
          disabled={currentPage >= lastPage}
          className="flex cursor-pointer items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:text-theme-pagination-active-bg disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>

      {/* Divider */}
      <div className="mx-4 h-5 w-px bg-slate-200" />

      {/* Go To */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-medium text-slate-500">Go To</span>
        <input
          type="number"
          min={1}
          max={lastPage}
          value={goToValue}
          placeholder={String(currentPage)}
          onChange={(e) => setGoToValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGoTo()}
          className="h-7 w-14 rounded-lg border border-slate-200 bg-white px-2 text-center text-xs font-medium text-slate-700 outline-none transition focus:border-theme-pagination-active-bg focus:ring-2 focus:ring-theme-pagination-active-bg/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-xs text-slate-400">of {lastPage}</span>
        <button
          onClick={handleGoTo}
          className="flex cursor-pointer h-7 items-center rounded-lg bg-theme-pagination-active-bg px-3 text-xs font-semibold text-theme-pagination-active-text transition hover:opacity-90 active:scale-95"
        >
          Go
        </button>
      </div>
    </div>
  );
}
