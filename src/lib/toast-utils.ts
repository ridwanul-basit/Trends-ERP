import { toast } from "sonner";

/**
 * An async confirmation using sonner toast.
 * Replaces native `window.confirm`.
 */
export const confirmAction = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const toastId = toast(message, {
      duration: 10000,
      position: "top-center",
      action: {
        label: "Confirm",
        onClick: () => {
          toast.dismiss(toastId);
          resolve(true);
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {
          toast.dismiss(toastId);
          resolve(false);
        },
      },
      onDismiss: () => resolve(false),
      onAutoClose: () => resolve(false),
    });
  });
};
