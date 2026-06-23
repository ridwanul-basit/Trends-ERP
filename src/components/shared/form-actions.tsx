import { cn } from "@/lib/utils/cn";

export type FormActionsProps = {
  onCancel?: () => void;
  onSubmit?: () => void;
  cancelText?: string;
  submitText?: string;
  className?: string;
  submitDisabled?: boolean;
};

export function FormActions({
  onCancel,
  onSubmit,
  cancelText = "Cancel",
  submitText = "Create",
  className,
  submitDisabled = false,
}: FormActionsProps) {
  return (
    <div className={cn("flex items-center justify-end gap-3", className)}>
      <button
        type="button"
        onClick={onCancel}
        className="rounded-md bg-theme-section-highlight px-6 py-2 text-xs font-bold cursor-pointer text-white transition hover:opacity-90 active:scale-95"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={submitDisabled}
        className="rounded-md bg-theme-action-primary px-6 py-2 text-xs font-bold cursor-pointer text-white transition hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitText}
      </button>
    </div>
  );
}
