import { create } from "zustand";
import { INTERNAL_SIDEBAR_LEFT_WIDTH, INTERNAL_SIDEBAR_LEFT_COLLAPSED_WIDTH, INTERNAL_SIDEBAR_RIGHT_WIDTH } from "@/constants";

interface SidebarState {
  // Left sidebar state
  leftSidebarWidth: number;
  isLeftCollapsed: boolean;

  // Right sidebar state
  rightSidebarWidth: number;

  // Actions
  setLeftSidebarWidth: (width: number) => void;
  setRightSidebarWidth: (width: number) => void;
  collapseLeft: () => void;
  expandLeft: () => void;
  toggleLeftCollapse: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  // Initial state
  leftSidebarWidth: INTERNAL_SIDEBAR_LEFT_WIDTH,
  isLeftCollapsed: false,
  rightSidebarWidth: INTERNAL_SIDEBAR_RIGHT_WIDTH,

  // Actions
  setLeftSidebarWidth: (width: number) => set({ leftSidebarWidth: width }),

  setRightSidebarWidth: (width: number) => set({ rightSidebarWidth: width }),

  collapseLeft: () =>
    set({
      isLeftCollapsed: true,
      leftSidebarWidth: INTERNAL_SIDEBAR_LEFT_COLLAPSED_WIDTH,
    }),

  expandLeft: () =>
    set({
      isLeftCollapsed: false,
      leftSidebarWidth: INTERNAL_SIDEBAR_LEFT_WIDTH,
    }),

  toggleLeftCollapse: () =>
    set((state) => ({
      isLeftCollapsed: !state.isLeftCollapsed,
      leftSidebarWidth: !state.isLeftCollapsed ? INTERNAL_SIDEBAR_LEFT_COLLAPSED_WIDTH : INTERNAL_SIDEBAR_LEFT_WIDTH,
    })),
}));
