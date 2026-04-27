import * as React from "react";
import { Slot } from "./slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 select-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-sun text-canvas hover:bg-sun-600 active:bg-sun-700 shadow-soft hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-earth text-canvas hover:bg-earth-700 active:bg-earth-800 shadow-soft hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-earth/25 bg-transparent text-earth hover:border-earth hover:bg-earth/5 hover:-translate-y-0.5 active:translate-y-0",
        outlineLight:
          "border border-canvas/40 bg-transparent text-canvas backdrop-blur-sm hover:bg-canvas/10 hover:border-canvas hover:-translate-y-0.5 active:translate-y-0",
        ghost: "text-earth hover:bg-earth/5",
        ghostLight: "text-canvas hover:bg-canvas/10",
        link: "text-sun underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
