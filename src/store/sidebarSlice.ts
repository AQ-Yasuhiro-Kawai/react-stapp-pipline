import type { StoreSlice } from "./store";

export interface SidebarState {
  isSidebarCollapsed: boolean;
}

export interface SidebarActions {
  toggleSidebar: () => void;
}

export type SidebarSlice = SidebarState & SidebarActions;

export const createSidebarSlice: StoreSlice<SidebarSlice> = (set) => ({
  isSidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
});

export const sidebarSelector = (state: SidebarSlice) => ({
  isSidebarCollapsed: state.isSidebarCollapsed,
  toggleSidebar: state.toggleSidebar,
});
