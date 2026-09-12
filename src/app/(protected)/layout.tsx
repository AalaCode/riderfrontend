"use client";

 import { useState, type ReactNode } from "react";
 import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { Navbar } from "@/components/layout/Navbar";
// import { MobileSidebar } from "@/components/layout/MobileSidebar";

/**
 * Shared shell for every authenticated page: sidebar + navbar + the actual
 * page content. Wrapped in <ProtectedRoute> so an unauthenticated visitor
 * (or one whose refresh token has expired) is redirected to /login before
 * any of this renders — all client-side, no middleware.ts.
 */
// export default function ProtectedLayout({ children }: { children: ReactNode }) {
//   // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//    return (
//      <ProtectedRoute>
//   //     <div className="flex h-screen overflow-hidden bg-base-200">
//   //       <Sidebar />
//   //       <MobileSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

//   //       <div className="flex min-w-0 flex-1 flex-col">
//   //         <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
//   //         <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
//   //       </div>
//   //     </div>
//      </ProtectedRoute>
//    );
// }

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   return (
     <ProtectedRoute>  {children}
          </ProtectedRoute>
   );
}