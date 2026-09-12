import { redirect } from "next/navigation";

/**
 * Root route just forwards to /dashboard. ProtectedRoute (inside the
 * (protected) layout) takes care of bouncing unauthenticated users to
 * /login — no middleware.ts involved.
 */
export default function RootPage() {
  redirect("/dashboard");
}
