import { forwardRef, type SelectHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface FormSelectOption {
  label: string;
  value: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: FormSelectOption[];
  error?: FieldError;
  placeholder?: string;
}

/** Reusable <select> for React Hook Form, with the same error/label pattern as FormInput. */
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, placeholder, id, className, ...props }, ref) => {
    const selectId = id ?? props.name;

    return (
      <div className="form-control w-full">
        <label className="label" htmlFor={selectId}>
          <span className="label-text font-medium">{label}</span>
        </label>
        <select
          id={selectId}
          ref={ref}
          className={`select select-bordered w-full ${error ? "select-error" : ""} ${className ?? ""}`}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="mt-1 text-sm text-error">{error.message}</span>}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";
