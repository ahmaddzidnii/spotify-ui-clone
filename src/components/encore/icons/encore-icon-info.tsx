import { cn } from "@/utils/cn";
import type { IconProps } from "./types";

export const EncoreIconInfo = ({ size = 16, className, ...props }: IconProps) => (
  <svg
    role="img"
    aria-hidden="true"
    viewBox="0 0 24 24"
    width={size}
    className={cn("fill-current inline-block shrink-0", className)}
    {...props}
  >
    <path d="M11 18v-2h2v2zm0-4V6h2v8z"></path>
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12"></path>
  </svg>
);
