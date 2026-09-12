import { AlertTriangle, RotateCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

/** Consistent error display for failed queries/mutations, with an optional retry action. */
export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-box border border-error/30 bg-error/5 px-6 py-16 text-center">
      <div className="rounded-full bg-error/10 p-3 text-error">
        <AlertTriangle size={28} />
      </div>
      <h3 className="text-base font-semibold text-base-content">{title}</h3>
      <p className="max-w-sm text-sm text-base-content/60">{message}</p>
      {onRetry && (
        <button className="btn btn-sm btn-outline gap-2" onClick={onRetry}>
          <RotateCw size={14} /> Try again
        </button>
      )}
    </div>
  );
}
