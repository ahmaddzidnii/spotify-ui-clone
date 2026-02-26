import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";

const chipVariants = cva(
  "font-medium inline-flex px-4 py-2 items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        active: "bg-[#fff] text-background-base hover:bg-[#f0f0f0]",
        inactive: "bg-background-tinted-base text-text-base transition-all hover:bg-background-tinted-highlight",
      },
    },
    defaultVariants: {
      variant: "active",
    },
  },
);

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof chipVariants> {
  asChild?: boolean;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(chipVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  );
});

Chip.displayName = "Chip";
