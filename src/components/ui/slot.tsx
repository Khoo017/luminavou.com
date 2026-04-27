import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal Slot implementation.
 * Clones the only child and merges className + other props.
 * Sufficient for our `asChild` usage on Button + Link.
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, className, ...props }, ref) => {
    if (!React.isValidElement(children)) {
      return null;
    }
    const childProps = (children.props ?? {}) as Record<string, unknown>;
    return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ...props,
      ...childProps,
      className: cn(className, (childProps.className as string) ?? ""),
      ref,
    } as Record<string, unknown>);
  }
);
Slot.displayName = "Slot";
