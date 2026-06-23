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
    <div className={cn("relative flex items-center border-b border-theme-border py-3.5 pl-5 pr-4", className)}>
      {/* Bar is absolute left-0 of THIS element — always flush to its left edge */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-sm", colorClass)} />
      <h3 className="text-sm font-semibold text-slate-600">{title}</h3>
    </div>
  );
}

