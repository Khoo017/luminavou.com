import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "../contexts/AuthContext";

const NAV = [
  { to: "/solutions", label: "Solutions" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/our-impact", label: "Our Impact" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Stories" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, profile, signOut } = useAuth();

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

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close user dropdown on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate("/");
  };

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
              data-active={
                item.to === "/blog"
                  ? location.pathname.startsWith("/blog") ? "true" : undefined
                  : location.pathname === item.to ? "true" : undefined
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className={cn(
                  "flex h-9 items-center gap-2 rounded-full pl-2 pr-3 text-sm font-medium transition-colors border border-transparent",
                  overDarkHero
                    ? "bg-canvas/10 text-canvas hover:bg-canvas/20 border-canvas/20"
                    : "bg-earth/5 text-earth hover:bg-earth/10 border-earth/10"
                )}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sun text-earth font-bold text-xs">
                    {(profile?.full_name || user.email || "?").charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="max-w-[120px] truncate">
                  {profile?.full_name || user.email}
                </span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-earth/10 bg-canvas p-1.5 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="flex flex-col gap-0.5">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="px-3 py-2 text-sm font-medium text-earth hover:bg-earth/5 rounded-lg transition-colors text-left"
                      >
                        Profile
                      </Link>
                      {profile?.is_admin && (
                        <Link
                          to="/admin/blog"
                          onClick={() => setUserMenuOpen(false)}
                          className="px-3 py-2 text-sm font-medium text-earth hover:bg-earth/5 rounded-lg transition-colors text-left"
                        >
                          Blog Admin
                        </Link>
                      )}
                      <div className="my-1 h-px bg-earth/8" />
                      <button
                        onClick={handleSignOut}
                        className="px-3 py-2 text-sm font-medium text-earth hover:bg-earth/5 rounded-lg transition-colors text-left"
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              asChild
              variant={overDarkHero ? "ghostLight" : "ghost"}
              size="sm"
            >
              <Link to="/login">Login</Link>
            </Button>
          )}

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
                      isActive
                        ? "text-sun bg-sun/5"
                        : "text-earth hover:bg-earth/5"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="mt-4 flex flex-col gap-2 border-t border-earth/8 pt-4">
                {user ? (
                  <>
                    <div className="px-3 pb-2 flex items-center gap-3">
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt="Avatar"
                          className="h-9 w-9 rounded-full object-cover border border-earth/10"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sun text-earth font-bold text-sm">
                          {(profile?.full_name || user.email || "?").charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="font-medium text-earth truncate">
                        {profile?.full_name || user.email}
                      </span>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 font-display text-lg tracking-tight text-earth hover:bg-earth/5 transition-colors"
                    >
                      Profile
                    </Link>
                    {profile?.is_admin && (
                      <Link
                        to="/admin/blog"
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2.5 font-display text-lg tracking-tight text-earth hover:bg-earth/5 transition-colors"
                      >
                        Blog Admin
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="rounded-lg px-3 py-2.5 font-display text-lg tracking-tight text-earth hover:bg-earth/5 transition-colors text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Button asChild variant="outline" size="md">
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </Button>
                )}

                <Button asChild variant="primary" size="md" className="mt-2">
                  <Link to="/contact" onClick={() => setOpen(false)}>
                    Go Solar
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
