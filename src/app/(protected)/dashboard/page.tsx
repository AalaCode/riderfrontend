"use client";
import Link from 'next/link'; 
import { usePermission } from "@/hooks/usePermission";
import { navMainItems } from "@/config/navigation";
import NavList, { NavItem } from "@/components/layout/Flatbar"
import { House } from 'lucide-react';
import LogoutButton from "@/components/auth/Logout";
export default function MobileDashboard() {
   const { hasPermission } = usePermission();

   const visibleItems = navMainItems.filter(
       (item) => !item.permission || hasPermission(item.permission)
     );
   
  // Sample data aapki list ke liye
  // const items = [
  //   { id: 1, title: "Orders", desc: "Current Date Orders", path: "/orders" },
  //   { id: 2, title: "Riders", desc: "Insert riders", path: "/riders" },
  //   { id: 3, title: "Order History", desc: "View order history", path: "/orderhistory" },
  //   { id: 4, title: "Reports", desc: "Reports", path: "/reports" },
  // ];

  return (
    // <ProtectedRoute>
    <div className="flex flex-col h-screen max-w-md mx-auto bg-base-200 text-base-content overflow-hidden shadow-xl border-x border-base-300">
      
          {/* <header className="navbar bg-primary text-primary-content bg-amber-50 text-slate-900 shadow-md z-10"> */}
  {/* <div className="flex-1">
    <span className="text-2xl text-red-500 px-2 tracking-wide">Mirchili</span>
  </div> */}
 <header className="sticky top-0 z-20 flex items-center justify-between border-b border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur">
  <h1 className="text-[24px] font-semibold text-[#27AE60]">
    <Link href="/dashboard" className="inline-flex items-center gap-2">
      <House color="#27AE60" size={24} />
      <span>Mirchili</span>
    </Link>
  </h1>
  <span>  <LogoutButton /></span>
</header>
  {/* <div className="flex-none"> */}
 
  {/* </div> */}

{/* </header> */}
 <NavList items={visibleItems} />
      {/* 2. SCROLLABLE FLAT LIST */}
      
      {/* 3. MOBILE BOTTOM FOOTER (NAV BAR) */}
      {/* <footer className="btm-nav btm-nav-md border-t border-base-300 max-w-md mx-auto">
        <button className="active text-primary">
          <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="btm-nav-label text-xs">Home</span>
        </button>
        <button>
          <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="btm-nav-label text-xs">Explore</span>
        </button>
        <button>
          <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
          <span className="btm-nav-label text-xs">Settings</span>
        </button>
      </footer> */}

    </div>
    // </ProtectedRoute>
  )
}
