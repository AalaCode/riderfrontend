"use client";

import { useRouter } from "next/navigation";

import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { RiderForm } from "@/features/riders/RiderForm";
import { useCreateRider } from "@/features/riders/hooks";
import type { riderFormValues } from "@/features/riders/schema";
import Link from "next/link";
import { House } from 'lucide-react';

/** /branches/new — dedicated create page (no modal), per project requirements. */
export default function NewRiderPage() {
  const router = useRouter();
  const { mutate, isPending, error } = useCreateRider();

  function handleSubmit(values: riderFormValues) {
    mutate(values, {
      onSuccess: () => router.push("/riders"),
    });
  }

  return (
    <PermissionGuard permission="riders:create">
           <div className="flex flex-col h-screen max-w-md mx-auto bg-base-200 text-base-content overflow-hidden shadow-xl border-x border-base-300">
      

    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur">
  <h1 className="text-[24px] font-semibold text-[#27AE60]">
    <Link href="/dashboard" className="inline-flex items-center gap-2">
      <House color="#27AE60" size={24} />
      <span>Mirchili</span>
    </Link>
  </h1>
</header>
 

      {error && (
        <div role="alert" className="alert alert-error mb-4 max-w-lg py-2 text-sm">
          <span>{error.message}</span>
        </div>
      )}

      <RiderForm mode="create" isSubmitting={isPending} onSubmit={handleSubmit} />
 </div>
    </PermissionGuard>
  );
}
