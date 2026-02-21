import { cn } from "@/utils/cn";
import type { IconProps } from "./types";

export const EncoreIconBrowseFilled = ({ size = 24, className, ...props }: IconProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    className={cn("fill-current inline-block shrink-0", className)}
    {...props}
  >
    <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333s-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5s1.567 2.333 3.5 2.333z"></path>
  </svg>
);
