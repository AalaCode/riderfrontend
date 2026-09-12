"use client";

import type { ReactNode } from "react";
import { usePermission } from "@/hooks/usePermission";
import { EmptyState } from "@/components/ui/EmptyState";

interface PermissionGuardProps {
  permission: string;
  children: ReactNode;
}

/**
 * Page-level authorization guard — wrap an entire route's content so that
 * users without the required permission see a clear "not allowed" state
 * instead of a broken page. Use <Can> for smaller, inline UI elements;
 * use this for whole pages/sections.
 */
export function PermissionGuard({ permission, children }: PermissionGuardProps) {
  const { hasPermission } = usePermission();

  if (!hasPermission(permission)) {
    return (
      <EmptyState
        title="You don't have access to this page"
        description="Contact your administrator if you believe this is a mistake."
      />
    );
  }

  return <>{children}</>;
}
