import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-full border border-input bg-canvas px-5 py-2 text-sm text-earth shadow-soft placeholder:text-earth/45",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:border-sun focus-visible:shadow-glow",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
