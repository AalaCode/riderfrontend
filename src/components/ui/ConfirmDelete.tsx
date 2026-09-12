"use client";

import { AlertTriangle } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface ConfirmDeleteProps {
  title: string;
  description: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Full-page (not modal) delete confirmation, per project requirements —
 * rendered by a dedicated route/section rather than an overlay dialog.
 * Used e.g. from /branches when the user clicks Delete on a row.
 */
export function ConfirmDelete({
  title,
  description,
  isDeleting,
  onConfirm,
  onCancel,
}: ConfirmDeleteProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-box border border-error/30 bg-base-100 p-8 text-center shadow-sm">
      <div className="rounded-full bg-error/10 p-3 text-error">
        <AlertTriangle size={28} />
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-base-content/60">{description}</p>

      {isDeleting ? (
        <LoadingSpinner size="sm" label="Deleting..." />
      ) : (
        <div className="flex w-full gap-3">
          <button className="btn btn-outline flex-1" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-error flex-1" onClick={onConfirm}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
