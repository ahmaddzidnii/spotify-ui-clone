import { Outlet } from "react-router";
import { useSidebarResize } from "@/hooks/use-sidebar-resize";

export const MainView = () => {
  // Left sidebar resize hook
  const { handleMouseDown: handleLeftMouseDown } = useSidebarResize({
    side: "left",
    minWidth: 72,
    maxWidth: 420,
    collapseThreshold: 280,
  });

  // Right sidebar resize hook
  const { handleMouseDown: handleRightMouseDown } = useSidebarResize({
    side: "right",
    minWidth: 280,
    maxWidth: 420,
  });

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
