import { Outlet } from "react-router";

export const MainView = () => {
  return (
    <main className="main-view @container/main-view">
      <div
        className="layout-resizer layout-resizer-left"
        data-testid="LayoutResizer__resize-bar-left"
      >
        <label className="sr-only">
          Resize main navigation
          <input
            className="layout-resizer-input"
            type="range"
            min="72"
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
      >
        <label className="sr-only">
          Resize main navigation
          <input
            className="layout-resizer-input"
            type="range"
            min="72"
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
