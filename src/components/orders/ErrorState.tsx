interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong while loading orders.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-14 w-14 text-error/60"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m0 3.75h.008v.008H12v-.008ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <h2 className="mt-4 text-base font-semibold text-base-content">Couldn&apos;t load this</h2>
      <p className="mt-1 text-sm text-base-content/60">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn btn-sm btn-primary mt-4">
          Try again
        </button>
      )}
    </div>
  );
}
