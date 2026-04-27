import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Mail } from "lucide-react";

// Brand icons — inline SVGs because lucide-react no longer ships brand glyphs
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-earth-700 text-canvas/80 grain">
      {/* Top sun-glow accent */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[1200px] -translate-x-1/2 bg-sun/10 blur-3xl" />

      <div className="container relative pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Logo variant="allCream" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-canvas/70">
              Premium solar engineering for the Pacific. We design intelligent power systems for homes,
              resorts, and businesses ready to retire the grid.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-canvas/15 text-canvas/80 hover:border-sun hover:text-sun transition-colors"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-canvas/15 text-canvas/80 hover:border-sun hover:text-sun transition-colors"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="mailto:bula@luminavou.com"
                aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-canvas/15 text-canvas/80 hover:border-sun hover:text-sun transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="eyebrow text-canvas/55">Explore</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li><Link to="/solutions" className="hover:text-sun transition-colors">Solutions</Link></li>
                <li><Link to="/sustainability" className="hover:text-sun transition-colors">Sustainability</Link></li>
                <li><Link to="/our-impact" className="hover:text-sun transition-colors">Our Impact</Link></li>
                <li><Link to="/about" className="hover:text-sun transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow text-canvas/55">Resources</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li><Link to="/learn-the-math" className="hover:text-sun transition-colors">Learn the Math</Link></li>
                <li>
                  <a
                    href="/datasheets/lumina-one-datasheet.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sun transition-colors"
                  >
                    Lumina ONE datasheet
                  </a>
                </li>
                <li><Link to="/impact-report" className="hover:text-sun transition-colors">Impact Report</Link></li>
                <li><Link to="/contact" className="hover:text-sun transition-colors">Get a Quote</Link></li>
                <li><Link to="/login" className="hover:text-sun transition-colors">Customer Login</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow text-canvas/55">Office</p>
              <address className="mt-4 not-italic text-sm leading-relaxed text-canvas/70">
                Suva, Fiji<br />
                bula@luminavou.com<br />
                +679 241 3038
              </address>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-canvas/10 pt-6 text-xs text-canvas/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <Link to="/" className="text-sun hover:underline underline-offset-4">Lumina Vou</Link>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <Link to="/privacy-policy" className="hover:text-canvas transition-colors">Privacy Policy</Link>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <Link to="/terms-of-service" className="hover:text-canvas transition-colors">Terms of Service</Link>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <Link to="/impact-report" className="hover:text-canvas transition-colors">Impact Report</Link>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <Link to="/contact" className="hover:text-canvas transition-colors">Contact</Link>
          </p>
          <p>© {year} Lumina Vou. Leading Fiji's clean-energy transition.</p>
        </div>
      </div>
    </footer>
  );
}
