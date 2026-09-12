import type { ReactNode } from "react";

/**
 * Layout for public/auth routes (currently just /login). Intentionally
 * bare — no sidebar/navbar — since these routes render before a session
 * exists.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
