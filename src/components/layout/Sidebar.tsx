"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, Boxes } from "lucide-react";
import { useUiStore } from "@/store/ui-store";
import { usePermission } from "@/hooks/usePermission";
import { navMainItems } from "@/config/navigation";

/** Collapsible left sidebar. Collapsed state lives in Zustand (ui-store) and persists across reloads. */
export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUiStore();
  const { hasPermission } = usePermission();

  const visibleItems = navMainItems.filter(
    (item) => !item.permission || hasPermission(item.permission)
  );

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-base-300 bg-base-100 transition-all duration-200 md:flex ${
        sidebarCollapsed ? "w-[var(--app-sidebar-width-collapsed)]" : "w-[var(--app-sidebar-width)]"
      }`}
    >
      <div className="flex h-16 items-center gap-2 border-b border-base-300 px-4">
        <Boxes className="shrink-0 text-primary" size={24} />
        {!sidebarCollapsed && <span className="truncate font-semibold">ERP Suite</span>}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin p-2">
        <ul className="menu w-full gap-1 p-0">
          {visibleItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={isActive ? "active" : ""}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon size={18} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        className="flex items-center justify-center gap-2 border-t border-base-300 p-3 text-sm text-base-content/60 hover:bg-base-200"
        onClick={toggleSidebar}
      >
        {sidebarCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        {!sidebarCollapsed && "Collapse"}
      </button>
    </aside>
  );
}
