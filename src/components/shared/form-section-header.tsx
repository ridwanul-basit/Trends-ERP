import { cn } from "@/lib/utils/cn";

type FormSectionHeaderProps = {
  title: string;
  className?: string;
  colorClass?: string;
};

export function FormSectionHeader({
  title,
  className,
  colorClass = "bg-theme-section-highlight",
}: FormSectionHeaderProps) {
  return (
    <div className={cn("relative flex items-center pl-3", className)}>
      {/* Absolute left bar flush to the container edge */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", colorClass)} />
      <h3 className="text-sm font-semibold text-slate-600">{title}</h3>
    </div>
  );
}

