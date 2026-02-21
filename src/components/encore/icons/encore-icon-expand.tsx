import { cn } from "@/utils/cn";
import type { IconProps } from "./types";

export const EncoreIconExpand = ({ size = 16, className, ...props }: IconProps) => (
  <svg
    role="img"
    viewBox="0 0 16 16"
    width={size}
    className={cn("fill-current inline-block shrink-0", className)}
    {...props}
  >
    <path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path>
  </svg>
);
