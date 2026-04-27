import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/solutions", label: "Solutions" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/our-impact", label: "Our Impact" },
  { to: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Only the home page has a dark hero behind the (transparent) header
  const isHome = location.pathname === "/";
  // We treat the header as "over the dark hero" only when on home AND not yet scrolled
  const overDarkHero = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-canvas/85 backdrop-blur-md border-b border-earth/8"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-[72px]">
        <Logo variant={overDarkHero ? "light" : "dark"} />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9 text-sm">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn("nav-link", overDarkHero && "nav-link--light")}
              data-active={location.pathname === item.to ? "true" : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button
            asChild
            variant={overDarkHero ? "ghostLight" : "ghost"}
            size="sm"
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link to="/contact">Go Solar</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            overDarkHero
              ? "text-canvas hover:bg-canvas/10"
              : "text-earth hover:bg-earth/5"
          )}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-earth/8 bg-canvas/95 backdrop-blur-md"
          >
            <div className="container flex flex-col gap-1 py-6">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-3 font-display text-lg tracking-tight transition-colors",
                      isActive ? "text-sun bg-sun/5" : "text-earth hover:bg-earth/5"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild variant="outline" size="md">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="primary" size="md">
                  <Link to="/contact">Go Solar</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
