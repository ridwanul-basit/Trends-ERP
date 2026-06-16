import toast from "react-hot-toast";

/**
 * An async confirmation.
 */
export const confirmAction = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="text-sm">{message}</span>
          <div className="flex gap-2">
            <button
              className="bg-brand-green text-white px-3 py-1 rounded text-xs"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
            >
              Confirm
            </button>
            <button
              className="bg-slate-200 text-slate-800 px-3 py-1 rounded text-xs"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 10000, position: "top-center" }
    );
  });
};
