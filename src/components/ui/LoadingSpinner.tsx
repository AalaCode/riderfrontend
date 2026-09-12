interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeClass: Record<NonNullable<LoadingSpinnerProps["size"]>, string> = {
  sm: "loading-sm",
  md: "loading-md",
  lg: "loading-lg",
};

/** Simple daisyui-powered spinner, reused everywhere loading state is shown. */
export function LoadingSpinner({ size = "md", label }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8">
      <span className={`loading loading-spinner text-primary ${sizeClass[size]}`} />
      {label && <p className="text-sm text-base-content/60">{label}</p>}
    </div>
  );
}
