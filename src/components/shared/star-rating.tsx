"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type StarRatingProps = {
  value: number;
  onChange?: (rating: number) => void;
  max?: number;
  size?: "sm" | "md";
  readOnly?: boolean;
};

export function StarRating({ value, onChange, max = 5, size = "md", readOnly = false }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = (hover || value) > i;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(i + 1)}
            onMouseEnter={() => !readOnly && setHover(i + 1)}
            onMouseLeave={() => !readOnly && setHover(0)}
            className={cn("transition-colors focus:outline-none", !readOnly && "cursor-pointer")}
          >
            <Star
              className={cn(starSize, "transition-colors", filled ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200")}
            />
          </button>
        );
      })}
    </div>
  );
}

type CompetencyGroup = {
  groupTitle: string;
  items: string[];
};

type CompetencyRatingsProps = {
  groups: CompetencyGroup[];
  ratings: Record<string, number>;
  onChange: (key: string, val: number) => void;
  columns?: 1 | 2;
  columnLabels?: string[];
  secondaryRatings?: Record<string, number>;
  onSecondaryChange?: (key: string, val: number) => void;
};

/**
 * Reusable competency rating table used in Indicator and Appraisal modals.
 * Supports optional dual-column mode (Indicator + Appraisal side by side).
 */
export function CompetencyRatings({
  groups,
  ratings,
  onChange,
  columns = 1,
  columnLabels = ["Rating"],
  secondaryRatings = {},
  onSecondaryChange,
}: CompetencyRatingsProps) {
  return (
    <div className="space-y-4">
      {/* Column headers for dual mode */}
      {columns === 2 && (
        <div className="grid grid-cols-3 text-xs font-bold text-slate-500 px-0">
          <span></span>
          {columnLabels.map((l) => (
            <span key={l} className="text-center">{l}</span>
          ))}
        </div>
      )}

      {groups.map((group) => (
        <div key={group.groupTitle}>
          <p className="text-xs font-bold text-slate-700 mb-2">{group.groupTitle}</p>
          <div className="space-y-2">
            {group.items.map((item) => (
              <div key={item} className={cn("flex items-center", columns === 2 ? "grid grid-cols-3" : "justify-between gap-4")}>
                <span className="text-xs text-theme-primary font-medium">{item}</span>
                <StarRating
                  value={ratings[item] || 0}
                  onChange={(v) => onChange(item, v)}
                  size="sm"
                />
                {columns === 2 && onSecondaryChange && (
                  <StarRating
                    value={secondaryRatings[item] || 0}
                    onChange={(v) => onSecondaryChange(item, v)}
                    size="sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
