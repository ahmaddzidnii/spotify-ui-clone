import { cn } from "@/utils/cn";
import type { IconProps } from "./types";

export const EncoreIconNext = ({ size = 16, className, ...props }: IconProps) => (
  <svg
    role="img"
    viewBox="0 0 16 16"
    width={size}
    className={cn("fill-current inline-block shrink-0", className)}
    {...props}
  >
    <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
  </svg>
);
