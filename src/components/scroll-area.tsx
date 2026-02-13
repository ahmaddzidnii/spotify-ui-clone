import { type ComponentPropsWithoutRef } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

interface ScrollAreaProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

export const ScrollArea = ({ children, className = "", ...props }: ScrollAreaProps) => {
  return (
    <OverlayScrollbarsComponent
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
      defer
      className={className}
      style={{ height: "100%", width: "100%" }}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};
