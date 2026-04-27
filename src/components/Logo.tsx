import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /**
   * - "dark"     → orange mark + dark brown wordmark, for cream/light backgrounds (scrolled header, light pages)
   * - "light"    → orange mark + cream wordmark, for dark backgrounds (hero header before scroll)
   * - "allCream" → mark and wordmark both cream, for very dark surfaces (footer)
   */
  variant?: "dark" | "light" | "allCream";
}

const SOURCE: Record<NonNullable<LogoProps["variant"]>, string> = {
  dark: "/brand/lumina-vou-horizontal.png",
  light: "/brand/lumina-vou-horizontal-cream-text.png",
  allCream: "/brand/lumina-vou-horizontal-cream.png",
};

export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Lumina Vou — home"
      className={cn(
        "group inline-flex items-center transition-transform duration-300 ease-out hover:-translate-y-0.5",
        className
      )}
    >
      <img
        src={SOURCE[variant]}
        alt="Lumina Vou — Solar Company"
        className="h-9 w-auto md:h-10 select-none"
        draggable={false}
      />
    </Link>
  );
}
