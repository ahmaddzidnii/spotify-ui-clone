import { useRef, useState, useEffect, useCallback } from "react";
import { useSidebarActions } from "@/stores/use-sidebar-store";

type SidebarSide = "left" | "right";

interface UseSidebarResizeOptions {
  side: SidebarSide;
  minWidth: number;
  maxWidth: number;
  collapseThreshold?: number; // Only for left sidebar
}

export const useSidebarResize = ({ side, minWidth, maxWidth, collapseThreshold }: UseSidebarResizeOptions) => {
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Get actions from store (use ref to avoid re-renders)
  const actionsRef = useRef(useSidebarActions());

  // Update ref on each render but don't cause re-render
  actionsRef.current = useSidebarActions();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      startXRef.current = e.clientX;

      const sidebarClass = side === "left" ? ".left-sidebar" : ".right-sidebar";
      const cssVar = side === "left" ? "--left-sidebar-width" : "--right-sidebar-width";

      const sidebar = document.querySelector(sidebarClass) as HTMLElement;
      if (sidebar) {
        const computed = getComputedStyle(sidebar);
        const width = computed.getPropertyValue(cssVar);
        startWidthRef.current = parseInt(width) || maxWidth;
      }

      document.body.style.cursor = "grab";
      document.body.style.userSelect = "none";
    },
    [side, maxWidth],
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = side === "left" ? e.clientX - startXRef.current : startXRef.current - e.clientX;

      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + diff));

      // Handle left sidebar collapse
      if (side === "left" && collapseThreshold && newWidth < collapseThreshold) {
        actionsRef.current.collapse("left", "responsive");
      } else {
        // Update the appropriate sidebar width
        const effectiveMinWidth = side === "left" && collapseThreshold ? collapseThreshold : minWidth;
        actionsRef.current.setWidth(side, Math.max(effectiveMinWidth, newWidth));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, side, minWidth, maxWidth, collapseThreshold]);

  return { handleMouseDown, isDragging };
};
