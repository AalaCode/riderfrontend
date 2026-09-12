import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Building2,History } from "lucide-react";

export interface NavItem {
  id:number;
  label: string;
  path: string;
  icon: LucideIcon;
  /** Permission required to see this nav item; omit for always-visible items. */
  permission?: string;
  desc: string
}

/**
 * Single source of truth for sidebar navigation. Add a new module here
 * (Products, Customers, Suppliers, ...) and it appears in the sidebar,
 * automatically hidden unless the user has the matching `view` permission.
 */
export const navMainItems: NavItem[] = [
  { id: 1,label: "Orders", path: "/orders", icon: LayoutDashboard, desc: "" },
  {id: 2, label: "Riders", path: "/riders", icon: Building2, permission: "riders:view" ,desc: ""}

];
