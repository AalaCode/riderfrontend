"use client";

import Link from "next/link";
import { Plus } from "lucide-react";


import { PermissionGuard } from "@/components/auth/PermissionGuard";
import { Can } from "@/components/auth/Can";
import { useRiders } from "@/features/riders/hooks"; // Updated to riders hook
import { House } from "lucide-react";


export default function RidersListPage() {
  // Riders ka data fetch karne ke liye simple hook call
  const { data, isLoading, isError } = useRiders({
    page: 1,
    pageSize: 100,
  });

  return (
    <PermissionGuard permission="riders:view">
               <div className="flex flex-col h-screen max-w-md mx-auto bg-base-200 text-base-content overflow-hidden shadow-xl border-x border-base-300">
      
   
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur">
     <h1 className="text-[24px] font-semibold text-[#27AE60]">
    <Link href="/dashboard" className="inline-flex items-center gap-2">
      <House color="#27AE60" size={24} />
      <span>Riders</span>
    </Link>
  </h1>
      <span>  <Can permission="riders:create">
            <Link href="/riders/new" className="btn btn-primary btn-sm gap-2">
              <Plus size={16} /> Add Rider
            </Link>
          </Can></span>
      </header>

      {/* Simple Paragraphs mein Riders ka data display */}
      <div className="mt-6 space-y-4">
        {isLoading && <p>Loading riders...</p>}
        {isError && <p className="text-error">Failed to load riders.</p>}
        
        {!isLoading && !isError && data?.data?.length === 0 && (
          <p>No riders found.</p>
        )}

        {!isLoading && !isError && data?.data?.map((rider: any) => (
          <p key={rider.riderId} className="p-3 border rounded-lg bg-base-100 flex justify-between items-center">
            <span>
              <strong>{rider.riderName }</strong> - {rider.shortName}    {rider.isActive ? "🟢" : "🔴"}
            </span>
            
            {/* Simple edit link for riders */}
            <Can permission="riders:update">
              <Link href={`/riders/${rider.riderId}/edit`} className="text-primary text-sm underline">
                Edit
              </Link>
            </Can>
          </p>
        ))}
        </div>
      </div>
    </PermissionGuard>
  );
}
