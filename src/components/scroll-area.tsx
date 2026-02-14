import { forwardRef, type ComponentPropsWithoutRef, useImperativeHandle, useRef } from "react";
import { OverlayScrollbarsComponent, type OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import type { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

interface ScrollAreaProps extends Omit<ComponentPropsWithoutRef<"div">, "onScroll"> {
  children: React.ReactNode;
  onScrollChange?: (scrollTop: number) => void;
}

export interface ScrollAreaRef {
  getScrollElement: () => HTMLElement | null;
  getOsInstance: () => OverlayScrollbars | null;
}

export const ScrollArea = forwardRef<ScrollAreaRef, ScrollAreaProps>(({ children, className = "", onScrollChange, ...props }, ref) => {
  const osRef = useRef<OverlayScrollbarsComponentRef>(null);

  useImperativeHandle(ref, () => ({
    getScrollElement: () => {
      const instance = osRef.current?.osInstance();
      return instance?.elements().viewport || null;
    },
    getOsInstance: () => {
      return osRef.current?.osInstance() || null;
    },
  }));

  return (
    <OverlayScrollbarsComponent
      ref={osRef}
      options={{
        scrollbars: {
          autoHide: "move",
          autoHideDelay: 500,
          theme: "os-theme-spotify",
        },
        overflow: {
          x: "hidden",
          y: "scroll",
        },
      }}
      events={{
        scroll: (instance) => {
          const viewport = instance.elements().viewport;
          if (onScrollChange && viewport) {
            onScrollChange(viewport.scrollTop);
          }
        },
      }}
      className={className}
      style={{ height: "100%", width: "100%" }}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
});

ScrollArea.displayName = "ScrollArea";
