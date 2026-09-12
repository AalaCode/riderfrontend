import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "corporate" | "business";

interface UiState {
  sidebarCollapsed: boolean;
  theme: Theme;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: Theme) => void;
}

/**
 * Zustand store for lightweight, client-only UI state.
 * Deliberately NOT used for server data (branches, users, etc.) — that all
 * lives in TanStack Query's cache. Keeping this store small and UI-only is
 * what makes it easy to extend later (e.g. add `recentlyViewed`, `density`,
 * per-module table preferences) without it turning into a second server cache.
 *
 * `persist` keeps sidebar/theme choices across reloads via localStorage.
 */
export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: "corporate",
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: "erp-ui-store" }
  )
);
