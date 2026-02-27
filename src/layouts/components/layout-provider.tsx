import { useSidebarFullStore } from "@/stores/use-sidebar-full-store";
import { useSidebarActions, useSidebarStore } from "@/stores/use-sidebar-store";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { useMediaQuery } from "usehooks-ts";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width: 1280px)");
  const isFirstRender = useRef(true);
  const prevLocationRef = useRef(location.pathname);

  const closeAnyFullScreen = useSidebarFullStore((state) => state.closeAnyFull);

  const { collapse, expand } = useSidebarActions();
  useEffect(() => {
    const left = useSidebarStore.getState().sidebars.left;
    const right = useSidebarStore.getState().sidebars.right;
    const { setWidth } = useSidebarStore.getState();

    if (!isSmallScreen) return;

    if (!left.isCollapsed && !right.isCollapsed) {
      setWidth("left", 280);
      setWidth("right", 280);
    }

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

  useEffect(() => {
    // Skip pada initial render (hard reload)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevLocationRef.current = location.pathname;
      return;
    }

    // Hanya close full screen jika pathname benar-benar berubah (navigasi)
    if (prevLocationRef.current !== location.pathname) {
      console.log("Navigasi dari", prevLocationRef.current, "ke", location.pathname);

      // Cek apakah ada full screen yang aktif saat navigasi
      const currentActiveFull = useSidebarFullStore.getState().activeFull;
      if (currentActiveFull) {
        closeAnyFullScreen();
      }

      prevLocationRef.current = location.pathname;
    }
  }, [location.pathname, closeAnyFullScreen]);

  return <>{children}</>;
};
