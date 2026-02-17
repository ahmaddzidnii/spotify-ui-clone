import { useSidebarActions, useSidebarStore } from "@/stores/use-sidebar-store";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const isSmallScreen = useMediaQuery("(max-width: 1280px)");

  const { collapse, expand } = useSidebarActions();
  useEffect(() => {
    const left = useSidebarStore.getState().sidebars.left;
    const right = useSidebarStore.getState().sidebars.right;

    if (!isSmallScreen) return;

    if (!left.isCollapsed) {
      if (right.isCollapsed) {
        return;
      } else {
        collapse("left", "responsive");
      }
    }
  }, [isSmallScreen, collapse, expand]);

  useEffect(() => {
    if (isSmallScreen) return;

    const { left, right } = useSidebarStore.getState().sidebars;

    if (left.collapseSource === "responsive") expand("left");
    if (right.collapseSource === "responsive") expand("right");
  }, [isSmallScreen, expand]);

  return <>{children}</>;
};
