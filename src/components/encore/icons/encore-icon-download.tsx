import { cn } from "@/utils/cn";
import type { IconProps } from "./types";

export const EncoreIconDownload = ({ size = 16, className, ...props }: IconProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    className={cn("fill-current inline-block shrink-0", className)}
    {...props}
  >
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12"></path>
    <path d="M12 6.05a1 1 0 0 1 1 1v7.486l1.793-1.793a1 1 0 1 1 1.414 1.414L12 18.364l-4.207-4.207a1 1 0 1 1 1.414-1.414L11 14.536V7.05a1 1 0 0 1 1-1"></path>
  </svg>
);
