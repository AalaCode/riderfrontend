
"use client";

import { useRouter, useParams } from "next/navigation";
import { Trash2, House } from "lucide-react";
import Link from "next/link";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { Can } from "@/components/auth/Can";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorState } from "@/components/ui/ErrorState";
import { RiderForm } from "@/features/riders/RiderForm";
import { useRider, useUpdateRider, useDeleteRider } from "@/features/riders/hooks";
import type { riderFormValues } from "@/features/riders/schema";

/** /riders/[id]/edit — dedicated edit page (no modal). */
export default function EditRiderPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const riderId = Number(params.id);

  const { data: rider, isLoading, isError, refetch } = useRider(riderId);
  const { mutate: updateRider, isPending: isUpdating, error: updateError } = useUpdateRider(riderId);
  
  // Delete hook initialized
  const { mutate: deleteRider, isPending: isDeleting } = useDeleteRider();

  function handleSubmit(values: riderFormValues) {
    updateRider(values, {
      onSuccess: () => router.push("/riders"),
    });
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this rider?")) {
      deleteRider(riderId, {
        onSuccess: () => router.push("/riders"),
      });
    }
  }

  return (
    <PermissionGuard permission="riders:update">
       <header className="sticky top-0 z-20 flex items-center justify-between border-b border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur">
  <h1 className="text-[24px] font-semibold text-[#27AE60]">
    <Link href="/dashboard" className="inline-flex items-center gap-2">
      <House color="#27AE60" size={24} />
      <span>Mirchili</span>
    </Link>
  </h1>
</header>


      {(isLoading || isDeleting) && (
        <LoadingSpinner size="lg" label={isDeleting ? "Deleting rider..." : "Loading rider..."} />
      )}
      
      {isError && <ErrorState onRetry={() => refetch()} />}

      {rider && !isDeleting && (
        <>
          {updateError && (
            <div role="alert" className="alert alert-error mb-4 max-w-lg py-2 text-sm">
              <span>{updateError.message}</span>
            </div>
          )}

          <RiderForm
            mode="edit"
            defaultValues={rider}
            isSubmitting={isUpdating}
            onSubmit={handleSubmit}
            extraActions={
              <Can permission="riders:delete">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isUpdating || isDeleting}
                  className="btn btn-outline btn-error gap-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </Can>
            }
          />
        </>
      )}
    </PermissionGuard>
  );
}
