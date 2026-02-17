import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils/cn";

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "center" | "start" | "end";
  className?: string;
  delay?: number;
};

export function Tooltip({ children, content, side = "top", align = "center", className, delay = 250 }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={6}
            className={cn(
              "z-50 px-2 py-1 text-sm rounded-md font-medium",
              "bg-background-elevated-base text-white",
              "shadow-lg border border-white/10 transition-all duration-200",

              className,
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-neutral-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
