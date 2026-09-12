import { forwardRef, type TextareaHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
}

/** Reusable <textarea> for React Hook Form, same label/error pattern as FormInput. */
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <div className="form-control w-full">
        <label className="label" htmlFor={textareaId}>
          <span className="label-text font-medium">{label}</span>
        </label>
        <textarea
          id={textareaId}
          ref={ref}
          className={`textarea textarea-bordered w-full ${error ? "textarea-error" : ""} ${className ?? ""}`}
          aria-invalid={!!error}
          {...props}
        />
        {error && <span className="mt-1 text-sm text-error">{error.message}</span>}
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";
