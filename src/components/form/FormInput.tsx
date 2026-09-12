import { forwardRef, type InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  hint?: string;
}

/**
 * Reusable input tailored for mobile-first DaisyUI applications.
 * Touch-friendly (min 44px height via input-md/lg), compact spacing, and clear validation feedback.
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="form-control w-full mb-3">
        <label className="label pb-1 pt-0 cursor-pointer" htmlFor={inputId}>
          <span className="label-text text-xs font-semibold uppercase tracking-wider text-base-content/70">
            {label}
          </span>
        </label>
        
        <input
          id={inputId}
          ref={ref}
          className={`input input-bordered input-md w-full rounded-xl text-base focus:outline-none focus:border-primary transition-all duration-150 ${
            error ? "input-error bg-error/5" : ""
          } ${className ?? ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

        {hint && !error && (
          <span className="label-text-alt mt-1 text-xs text-base-content/60 px-1">
            {hint}
          </span>
        )}

        {error && (
          <span id={`${inputId}-error`} className="text-xs text-error font-medium mt-1 px-1 flex items-center gap-1">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";