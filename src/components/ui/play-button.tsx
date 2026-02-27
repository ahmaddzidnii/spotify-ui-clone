import { cn } from "@/utils/cn";
import { forwardRef } from "react";

export interface PlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Ukuran play button
   * - xs: 32px (w-8 h-8) - untuk card kecil
   * - sm: 48px (w-12 h-12) - untuk card medium dan header
   * - md: 56px (size-14) - untuk action bar
   * - custom: menggunakan className untuk ukuran custom
   */
  size?: "xs" | "sm" | "md" | "custom";

  /**
   * Ukuran icon SVG play
   * - xs: w-4 h-4
   * - sm: w-6 h-6
   * - md: w-7 h-7
   */
  iconSize?: "xs" | "sm" | "md";

  /**
   * Variant tampilan
   * - default: selalu terlihat
   * - hover: hanya terlihat saat hover (untuk card)
   */
  variant?: "default" | "hover";

  /**
   * Positioning
   * - relative: position relative (default)
   * - absolute: position absolute (untuk card overlay)
   */
  positioning?: "relative" | "absolute";

  /**
   * State playing atau tidak
   */
  isPlaying?: boolean;

  /**
   * Custom icon element (jika ingin menggunakan icon lain selain play)
   */
  icon?: React.ReactNode;
}

export const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps>(
  ({ size = "sm", iconSize, variant = "default", positioning = "relative", isPlaying = false, icon, className, ...props }, ref) => {
    // Tentukan ukuran button berdasarkan prop size
    const sizeClasses = {
      xs: "w-8 h-8",
      sm: "w-12 h-12",
      md: "size-14",
      custom: "",
    };

    // Tentukan ukuran icon berdasarkan prop iconSize atau fallback ke size
    const iconSizeClasses = {
      xs: "w-4 h-4",
      sm: "w-6 h-6",
      md: "w-7 h-7",
    };

    const computedIconSize = iconSize || (size === "xs" ? "xs" : size === "md" ? "md" : "sm");

    // Tentukan visibility berdasarkan variant
    const variantClasses = variant === "hover" ? "opacity-0 group-hover:opacity-100" : "";

    // Tentukan positioning
    const positionClasses = positioning === "absolute" ? "absolute" : "relative";

    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center bg-[#1ed760] rounded-full transition-all",
          "hover:scale-105 hover:bg-green-400",
          sizeClasses[size],
          variantClasses,
          positionClasses,
          className,
        )}
        aria-label={isPlaying ? "Pause" : "Play"}
        {...props}
      >
        {icon ? (
          icon
        ) : isPlaying ? (
          // Pause icon
          <svg
            role="img"
            viewBox="0 0 16 16"
            className={cn("fill-background-base", iconSizeClasses[computedIconSize])}
          >
            <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
          </svg>
        ) : (
          // Play icon
          <svg
            role="img"
            viewBox="0 0 16 16"
            className={cn("fill-background-base", iconSizeClasses[computedIconSize])}
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
          </svg>
        )}
      </button>
    );
  },
);

PlayButton.displayName = "PlayButton";
