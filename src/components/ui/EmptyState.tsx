import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

/** Shown when a list/table has no data, or when access is denied. */
export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-box border border-dashed border-base-300 bg-base-100 px-6 py-16 text-center">
      <div className="rounded-full bg-base-200 p-3 text-base-content/40">
        {icon ?? <Inbox size={28} />}
      </div>
      <h3 className="text-base font-semibold text-base-content">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-base-content/60">{description}</p>
      )}
      {action}
    </div>
  );
}
