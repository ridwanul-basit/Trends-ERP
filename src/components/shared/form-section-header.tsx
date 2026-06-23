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
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("h-5 w-1", colorClass)} />
      <h3 className="text-sm font-semibold text-slate-600">{title}</h3>
    </div>
  );
}
