"use client";

import type { ReactNode } from "react";
import { usePermission } from "@/hooks/usePermission";

interface CanProps {
  /** Single permission, e.g. "branches:create" */
  permission?: string;
  /** User needs at least one of these */
  anyOf?: string[];
  /** User needs all of these */
  allOf?: string[];
  children: ReactNode;
  /** Optional content to show instead when the permission check fails */
  fallback?: ReactNode;
}

/**
 * Declarative permission gate for UI elements.
 *
 *   <Can permission="branches:create">
 *     <Button>Add Branch</Button>
 *   </Can>
 *
 * Renders nothing (or `fallback`) when the user lacks the permission —
 * this is presentation-only; real enforcement always happens on the backend.
 */
export function Can({ permission, anyOf, allOf, children, fallback = null }: CanProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();

  let allowed = true;

  if (permission) allowed = allowed && hasPermission(permission);
  if (anyOf?.length) allowed = allowed && hasAnyPermission(...anyOf);
  if (allOf?.length) allowed = allowed && hasAllPermissions(...allOf);

  return allowed ? <>{children}</> : <>{fallback}</>;
}
