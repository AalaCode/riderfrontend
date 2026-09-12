"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

/**
 * Central authorization hook. Reads permissions straight out of the
 * NextAuth session (which mirrors what the backend sent on login/refresh),
 * so there is a single source of truth — no separate permissions store.
 */
export function usePermission() {
  const { data: session } = useSession();
   const role = session?.user?.role;
  const isAdmin = role === "admin";

  const permissions = useMemo(
    () => new Set(session?.user?.permissions ?? []),
    [session?.user?.permissions]
  );

  /** True if the current user has the given permission string, e.g. "branches:create". */
  function hasPermission(permission: string): boolean {
      if (isAdmin) return true;
      return permissions.has(permission);
  }

  /** True if the current user has ANY of the given permissions. */
  function hasAnyPermission(...perms: string[]): boolean {
      if (isAdmin) return true;
    return perms.some((p) => permissions.has(p));
  }

  /** True if the current user has ALL of the given permissions. */
  function hasAllPermissions(...perms: string[]): boolean {
      if (isAdmin) return true;
    return perms.every((p) => permissions.has(p));
  }

  return {
    permissions,
    role: session?.user?.role,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
}
