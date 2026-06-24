"use client";

import { Edit, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { confirmAction } from "@/lib/toast-utils";

type TableActionsProps = {
  /** Record id for URL construction */
  id?: string;
  /** Record name for accessibility labels */
  name?: string;
  /** Base URL prefix (e.g. "/participants") */
  baseUrl?: string;
  /** Override: custom view URL */
  viewUrl?: string;
  /** Override: custom edit URL */
  editUrl?: string;
  /** Custom handler for View */
  onView?: () => void;
  /** Custom handler for Edit */
  onEdit?: () => void;
  /** Custom handler for Play */
  onPlay?: () => void;
  /** Custom handler for Delete (shows confirm toast) */
  onDelete?: () => void;
  /** Custom confirm message for Delete */
  confirmMessage?: string;
  /** Show the View button */
  showView?: boolean;
  /** Show the Play button */
  showPlay?: boolean;
  /** Show the Edit button */
  showEdit?: boolean;
  /** Show the Delete button */
  showDelete?: boolean;
};

export function TableActions({
  id,
  name,
  baseUrl,
  viewUrl,
  editUrl,
  onView,
  onPlay,
  onEdit,
  onDelete,
  confirmMessage,
  showView = false,
  showPlay = false,
  showEdit = true,
  showDelete = true,
}: TableActionsProps) {
  const router = useRouter();

  const handleView = () => {
    if (onView) return onView();
    if (viewUrl) return router.push(viewUrl);
    if (baseUrl && id) return router.push(`${baseUrl}/${id}`);
  };

  const handleEdit = () => {
    if (onEdit) return onEdit();
    if (editUrl) return router.push(editUrl);
    if (baseUrl && id) return router.push(`${baseUrl}/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    const msg = confirmMessage || `Are you sure you want to delete "${name || "this item"}"?`;
    const confirmed = await confirmAction(msg);
    if (confirmed) {
      onDelete();
    }
  };

  const buttons = [
    { show: showView, handler: handleView, Icon: Eye, label: "View", baseClass: "bg-slate-100 text-slate-600 hover:bg-slate-200" },
    { show: showEdit, handler: handleEdit, Icon: Edit, label: "Edit", baseClass: "bg-theme-action-primary text-white opacity-90 hover:opacity-100" },
    { show: showDelete, handler: handleDelete, Icon: Trash2, label: "Delete", baseClass: "bg-theme-action-danger text-white opacity-90 hover:opacity-100" },
  ];

  return (
    <td className="px-5 py-2">
      <div className="flex items-center  gap-1.5">
        {buttons
          .filter((b) => b.show)
          .map(({ handler, Icon, label, baseClass }) => (
            <div key={label} className="group relative">
              <button
                type="button"
                onClick={handler}
                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition ${baseClass}`}
                aria-label={name ? `${label} ${name}` : label}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
              <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </div>
          ))}
      </div>
    </td>
  );
}
