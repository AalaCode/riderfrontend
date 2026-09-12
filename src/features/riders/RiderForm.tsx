"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { FormInput } from "@/components/form/FormInput";
import { FormSwitch } from "@/components/form/FormSwitch";
import { riderSchema, type riderFormValues } from "@/features/riders/schema";
import type { riderGet } from "@/features/riders/types";

interface riderFormProps {
  mode: "create" | "edit";
  defaultValues?: riderGet;
  isSubmitting: boolean;
  onSubmit: (values: riderFormValues) => void;
  /** Rendered next to Save — e.g. a Delete button, only present in edit mode. */
  extraActions?: React.ReactNode;
}

/**
 * Single reusable form for both Create and Edit branch pages — avoids
 * duplicating field markup/validation between /branches/new and
 * /branches/[id]/edit.
 *
 * Per requirements: IsActive defaults to true (checked) when creating;
 * when editing it reflects (and lets the user change) the current value.
 */
export function RiderForm({
  mode,
  defaultValues,
  isSubmitting,
  onSubmit,
  extraActions,
}: riderFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<riderFormValues>({
    resolver: zodResolver(riderSchema),
    defaultValues: {
      riderName: defaultValues?.data.riderName ?? "",
      shortName: defaultValues?.data.shortName ?? "",
      isActive: defaultValues?.data.isActive ?? true,
    },
  });

  // Re-hydrate the form once the branch detail query resolves (edit mode).
  useEffect(() => {
    if (defaultValues) {
      reset({ riderName: defaultValues.data.riderName,
        shortName: defaultValues.data.shortName,
        isActive: defaultValues.data.isActive });
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-lg flex-col gap-5 rounded-box border border-base-300 bg-base-100 p-6"
      noValidate
    >
      <FormInput
        label="Rider Name"
        placeholder="e.g. rider name"
        error={errors.riderName}
        {...register("riderName")}
      />
      
      <FormInput
        label="Short Name"
        placeholder="e.g. AA or AB"
        error={errors.shortName}
        {...register("shortName")}
      />

      <FormSwitch
        label="Active"
        description="Inactive rider are hidden from selection lists across the app."
        {...register("isActive")}
      />

      <div className="flex items-center gap-3 border-t border-base-300 pt-4">
        <button type="submit" className="btn btn-primary gap-2" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {mode === "create" ? "Save" : "Update"}
        </button>
        {extraActions}
      </div>
    </form>
  );
}
