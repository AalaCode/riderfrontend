import { forwardRef, type InputHTMLAttributes } from "react";

interface FormSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

/** Toggle switch for boolean fields like IsActive — used on the branch edit form. */
export const FormSwitch = forwardRef<HTMLInputElement, FormSwitchProps>(
  ({ label, description, id, ...props }, ref) => {
    const switchId = id ?? props.name;
    return (
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-3" htmlFor={switchId}>
          <input id={switchId} ref={ref} type="checkbox" className="toggle toggle-primary" {...props} />
          <div>
            <span className="label-text font-medium">{label}</span>
            {description && (
              <p className="text-xs text-base-content/50">{description}</p>
            )}
          </div>
        </label>
      </div>
    );
  }
);
FormSwitch.displayName = "FormSwitch";
