import { cn } from "@/utils/cn";
import type { IconProps } from "./types";

export const EncoreIconClock = ({ size = 16, className, ...props }: IconProps) => (
  <svg
    role="img"
    viewBox="0 0 16 16"
    width={size}
    className={cn("fill-current inline-block shrink-0", className)}
    {...props}
  >
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
    <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25"></path>
  </svg>
);
