"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColorClass?: string;
  iconBgClass?: string;
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  iconColorClass = "text-amber-500",
  iconBgClass = "bg-amber-500/10",
}: StatsCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", iconBgClass)}>
          <Icon className={cn("h-6 w-6", iconColorClass)} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500">{title}</span>
          <span className="text-lg font-bold text-slate-800">{value}</span>
        </div>
      </div>
    </div>
  );
}
