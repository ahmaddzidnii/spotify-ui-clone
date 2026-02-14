import { Outlet } from "react-router";
import { useRef, useState, useEffect } from "react";

interface MainViewProps {
  onLeftResize?: (width: number) => void;
  onRightResize?: (width: number) => void;
  onLeftCollapse?: () => void;
}

export const MainView = ({ onLeftResize, onRightResize, onLeftCollapse }: MainViewProps) => {
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleLeftMouseDown = (e: React.MouseEvent) => {
    setIsDraggingLeft(true);
    startXRef.current = e.clientX;
    const leftSidebar = document.querySelector(".left-sidebar") as HTMLElement;
    if (leftSidebar) {
      const computed = getComputedStyle(leftSidebar);
      const width = computed.getPropertyValue("--left-sidebar-width");
      startWidthRef.current = parseInt(width) || 420;
    }
    document.body.style.cursor = "grab";
    document.body.style.userSelect = "none";
  };

  const handleRightMouseDown = (e: React.MouseEvent) => {
    setIsDraggingRight(true);
    startXRef.current = e.clientX;
    const rightSidebar = document.querySelector(".right-sidebar") as HTMLElement;
    if (rightSidebar) {
      const computed = getComputedStyle(rightSidebar);
      const width = computed.getPropertyValue("--right-sidebar-width");
      startWidthRef.current = parseInt(width) || 420;
    }
    document.body.style.cursor = "grab";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingLeft) {
        const diff = e.clientX - startXRef.current;
        const newWidth = Math.max(72, Math.min(420, startWidthRef.current + diff));

        // If user tries to go below 280px, trigger collapse
        if (newWidth < 280 && onLeftCollapse) {
          onLeftCollapse();
        } else if (onLeftResize) {
          onLeftResize(Math.max(280, newWidth));
        }
      } else if (isDraggingRight) {
        const diff = startXRef.current - e.clientX;
        // Right sidebar min width 280px (no auto-collapse)
        const newWidth = Math.max(280, Math.min(420, startWidthRef.current + diff));
        if (onRightResize) {
          onRightResize(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isDraggingLeft || isDraggingRight) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDraggingLeft, isDraggingRight, onLeftResize, onRightResize, onLeftCollapse]);

  return (
    <main className="main-view @container/main-view">
      <div
        className="layout-resizer layout-resizer-left"
        data-testid="LayoutResizer__resize-bar-left"
        onMouseDown={handleLeftMouseDown}
      >
        <label className="sr-only">
          Resize main navigation
          <input
            className="layout-resizer-input"
            type="range"
            min="280"
            max="420"
            step="10"
            defaultValue="420"
            aria-label="Resize main navigation"
          />
        </label>
      </div>
      <Outlet />
      <div
        className="layout-resizer layout-resizer-right"
        data-testid="LayoutResizer__resize-bar-right"
        onMouseDown={handleRightMouseDown}
      >
        <label className="sr-only">
          Resize main navigation
          <input
            className="layout-resizer-input"
            type="range"
            min="280"
            max="420"
            step="10"
            defaultValue="420"
            aria-label="Resize main navigation"
          />
        </label>
      </div>
    </main>
  );
};
