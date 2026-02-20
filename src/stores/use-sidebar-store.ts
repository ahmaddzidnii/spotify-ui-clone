import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  INTERNAL_SIDEBAR_LEFT_WIDTH,
  INTERNAL_SIDEBAR_LEFT_COLLAPSED_WIDTH,
  INTERNAL_SIDEBAR_RIGHT_WIDTH,
  INTERNAL_SIDEBAR_RIGHT_COLLAPSED_WIDTH,
} from "@/constants";

export type SidebarId = "left" | "right";

export type CollapseSource = "user" | "responsive" | null; // null = belum pernah collapse

interface SidebarConfig {
  width: number;
  defaultWidth: number; // width asli sebelum di-collapse
  collapsedWidth?: number;
  isCollapsed: boolean;
  collapseSource: CollapseSource;
}

type SidebarMap = Record<SidebarId, SidebarConfig>;

interface SidebarState {
  sidebars: SidebarMap;
  setWidth: (id: SidebarId, width: number) => void;
  collapse: (id: SidebarId, source: CollapseSource) => void;
  expand: (id: SidebarId) => void;
  toggle: (id: SidebarId, source: CollapseSource) => void;
}

const getWidth = (config: SidebarConfig, collapsed: boolean) => {
  if (!config.collapsedWidth) return config.defaultWidth;
  return collapsed ? config.collapsedWidth : config.defaultWidth;
};

const updateSidebar = (sidebars: SidebarMap, id: SidebarId, patch: Partial<SidebarConfig>): SidebarMap => ({
  ...sidebars,
  [id]: { ...sidebars[id], ...patch },
});

const INITIAL_SIDEBARS: SidebarMap = {
  left: {
    width: INTERNAL_SIDEBAR_LEFT_WIDTH,
    defaultWidth: INTERNAL_SIDEBAR_LEFT_WIDTH,
    collapsedWidth: INTERNAL_SIDEBAR_LEFT_COLLAPSED_WIDTH,
    isCollapsed: false,
    collapseSource: null,
  },
  right: {
    width: INTERNAL_SIDEBAR_RIGHT_WIDTH,
    defaultWidth: INTERNAL_SIDEBAR_RIGHT_WIDTH,
    collapsedWidth: INTERNAL_SIDEBAR_RIGHT_COLLAPSED_WIDTH,
    isCollapsed: false,
    collapseSource: null,
  },
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      sidebars: INITIAL_SIDEBARS,

      setWidth: (id, width) =>
        set(({ sidebars }) => ({
          sidebars: updateSidebar(sidebars, id, { width, defaultWidth: width }),
        })),

      collapse: (id, source) =>
        set(({ sidebars }) => {
          const config = sidebars[id];
          return {
            sidebars: updateSidebar(sidebars, id, {
              isCollapsed: true,
              collapseSource: source,
              width: getWidth(config, true),
            }),
          };
        }),

      expand: (id) =>
        set(({ sidebars }) => {
          const config = sidebars[id];
          return {
            sidebars: updateSidebar(sidebars, id, {
              isCollapsed: false,
              collapseSource: null,
              width: getWidth(config, false),
            }),
          };
        }),

      toggle: (id, source) =>
        set(({ sidebars }) => {
          const config = sidebars[id];
          const isCollapsed = !config.isCollapsed;
          return {
            sidebars: updateSidebar(sidebars, id, {
              isCollapsed,
              collapseSource: isCollapsed ? source : null,
              width: getWidth(config, isCollapsed),
            }),
          };
        }),
    }),
    {
      name: "sidebar-storage",
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          if (value === null) {
            const initial = { state: { sidebars: INITIAL_SIDEBARS }, version: 0 };
            localStorage.setItem(name, JSON.stringify(initial));
            return initial;
          }
          return JSON.parse(value);
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

export const getSidebars = (state: SidebarState) => state.sidebars;

export const useSidebar = (id: SidebarId) => useSidebarStore((state) => state.sidebars[id]);

export const useSidebarWidth = (id: SidebarId) => useSidebarStore((state) => state.sidebars[id].width);

export const useSidebarCollapsed = (id: SidebarId) => useSidebarStore((state) => state.sidebars[id].isCollapsed);

export const useSidebarCollapseSource = (id: SidebarId) => useSidebarStore((state) => state.sidebars[id].collapseSource);

export const useSidebarCollapsedByUser = (id: SidebarId) => useSidebarStore((state) => state.sidebars[id].collapseSource === "user");

export const useSidebarCollapsedByResponsive = (id: SidebarId) => useSidebarStore((state) => state.sidebars[id].collapseSource === "responsive");

export const useSidebarActions = () => {
  const setWidth = useSidebarStore((state) => state.setWidth);
  const collapse = useSidebarStore((state) => state.collapse);
  const expand = useSidebarStore((state) => state.expand);
  const toggle = useSidebarStore((state) => state.toggle);

  return { setWidth, collapse, expand, toggle };
};
