"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu, User } from "lucide-react";

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

/** Top navbar: mobile menu trigger, current date, and the user profile/logout dropdown. */
export function Navbar({ onOpenMobileMenu }: NavbarProps) {
  const { data: session } = useSession();

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-base-300 bg-base-100 px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button className="btn btn-ghost btn-square md:hidden" onClick={onOpenMobileMenu} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <span className="hidden text-sm text-base-content/60 sm:block">{today}</span>
      </div>

      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="flex items-center gap-3 rounded-box px-2 py-1.5 hover:bg-base-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-content">
            <User size={18} />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-tight">{session?.user?.userName}</p>
            <p className="text-xs capitalize leading-tight text-base-content/50">
              {session?.user?.role}
            </p>
          </div>
        </button>
        <ul tabIndex={0} className="menu dropdown-content menu-sm z-40 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg border border-base-300">
          <li className="px-2 py-1.5 text-xs text-base-content/50 sm:hidden">
            {session?.user?.userName} · {session?.user?.role}
          </li>
          <li>
            <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-error">
              <LogOut size={16} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
