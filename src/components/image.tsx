import { type ImgHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lazy?: boolean;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(({ src, alt, className, lazy = true, crossOrigin = "anonymous", ...props }, ref) => {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={cn(className)}
      loading={lazy ? "lazy" : "eager"}
      crossOrigin={crossOrigin}
      {...props}
    />
  );
});

Image.displayName = "Image";
