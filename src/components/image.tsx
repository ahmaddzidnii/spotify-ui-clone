import { useState, type ImgHTMLAttributes, type SyntheticEvent, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "onError"> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  onLoad?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  showPlaceholder?: boolean;
  placeholderClassName?: string;
}

/**
 * Reusable Image component with optimization features:
 * - Auto lazy loading (default enabled)
 * - Error handling with fallback image
 * - Loading state with placeholder
 * - CORS support (crossOrigin="anonymous")
 * - TypeScript support with all img attributes
 * - Forwarded ref support
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      className,
      fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23333' width='400' height='400'/%3E%3C/svg%3E",
      lazy = true,
      onLoad,
      onError,
      showPlaceholder = true,
      placeholderClassName,
      crossOrigin = "anonymous",
      ...props
    },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoading(false);
      onLoad?.(event);
    };

    const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoading(false);

      // Try fallback if not already using it
      if (currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      }

      onError?.(event);
    };

    return (
      <>
        {showPlaceholder && isLoading && (
          <div
            className={cn("absolute inset-0 bg-background-elevated-press animate-pulse", placeholderClassName)}
            aria-hidden="true"
          />
        )}
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          className={cn(className, isLoading && "opacity-0", !isLoading && "opacity-100 transition-opacity duration-300")}
          loading={lazy ? "lazy" : "eager"}
          crossOrigin={crossOrigin}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </>
    );
  },
);

Image.displayName = "Image";
