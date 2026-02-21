import { cn } from "@/utils/cn";
import type { IconProps } from "./types";

export const EncoreIconFullscreenExit = ({ size = 16, className, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("fill-current inline-block shrink-0", className)}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.12 1.25V3.67857C12.12 3.81664 12.2319 3.92857 12.37 3.92857H15.75V5.42857H12.37C11.4035 5.42857 10.62 4.64507 10.62 3.67857V1.25H12.12ZM3.87998 3.67895V1.279H5.37998V3.67895C5.37998 4.64545 4.59648 5.42895 3.62998 5.42895H0.26998V3.92895H3.62998C3.76805 3.92895 3.87998 3.81702 3.87998 3.67895ZM10.62 12.2785C10.62 11.3116 11.4039 10.529 12.37 10.529H15.75V12.029H12.37C12.2315 12.029 12.12 12.1409 12.12 12.2785V14.739H10.62V12.2785ZM3.63091 12.0603H0.25V10.5603H3.63091C4.5983 10.5603 5.38 11.3447 5.38 12.3103V14.7389H3.88V12.3103C3.88 12.1714 3.76809 12.0603 3.63091 12.0603Z"
      fill="currentColor"
    />
  </svg>
);
