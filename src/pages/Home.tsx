import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Grid3x3, Battery, LineChart, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

const PARTNERS = [
  "Viti EcoResorts",
  "Suva Tech",
  "Pacific Green",
  "Island Builders",
  "Coral Capital",
  "Vanua Hospitality",
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // In production this would post to an Odoo CRM endpoint or webhook
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Backdrop image — palms / tropical villa, served from Unsplash CDN */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=2400&q=80"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          {/* Layered tonal overlays — keeps text legible and ties to brand */}
          <div className="absolute inset-0 bg-gradient-to-b from-earth-800/55 via-earth-700/35 to-earth-900/65" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(179,85,53,0.18),transparent_60%)]" />
        </div>

        <div className="container grain relative flex min-h-[88vh] flex-col items-center justify-center pt-32 pb-20 text-center text-canvas">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow text-canvas/70"
          >
            Solar, properly done. Built for here.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-4xl text-display-xl font-semibold text-balance text-canvas"
          >
            When the grid goes down, your freezer doesn't.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-canvas/85 text-pretty"
          >
            Lumina Vou is a Fijian solar company started by people who got tired of throwing out a week of food every cyclone season. We design, install, and stand behind power systems that keep your lights on after big electrical's already given up for the night.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Button asChild size="lg" variant="primary">
              <Link to="/contact">
                Book a site visit <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <Link to="/solutions">See how it works</Link>
            </Button>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-canvas/50 text-[0.65rem] tracking-[0.3em] uppercase"
          >
            <span className="block animate-bounce">scroll</span>
          </motion.div>
        </div>
      </section>

      {/* TRUSTED BY — marquee */}
      <section className="border-y border-earth/10 bg-canvas py-10">
        <p className="eyebrow text-center">Trusted by neighbours across Viti Levu</p>
        <div className="mt-6 mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-16 px-8 whitespace-nowrap">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="font-display text-xl text-earth/60 tracking-tight"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* INTELLIGENT INFRASTRUCTURE */}
      <section className="container py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">What we do</p>
            <h2 className="mt-4 text-display-lg font-semibold text-balance">
              Solar that's quiet, properly fitted, and still on at 3am.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="text-base leading-relaxed text-earth/75 text-pretty">
              We don't sell panels. We sell mornings where you don't notice the grid went out. We design the whole system — panels, batteries, inverter, monitoring — around your roof, your bills, and the kind of weather Fiji actually has. Then we install it ourselves, sign it off with a certified Fijian electrician, and pick up the phone when something needs attention.
            </p>
            <p className="mt-6 text-base leading-relaxed text-earth/75 text-pretty">
              Big electrical sells you electricity by the kilowatt-hour. We sell you the morning you stop checking the meter.
            </p>
            <Link
              to="/solutions"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sun hover:gap-3 transition-all"
            >
              See the full system <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        {/* Asymmetric feature grid */}
        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {/* Integrated Solar Tiles — large image card */}
          <Reveal className="lg:col-span-7 lg:row-span-1">
            <FeatureCard
              variant="image"
              icon={<Grid3x3 size={18} />}
              title="Power that doesn't change how your roof looks."
              body="Tiles that generate electricity but read as roofing from the street. Cyclone-rated, salt-tested, dust-kit standard. Because you live in Fiji, and we do too."
              image="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80"
              to="/solutions#tiles"
            />
          </Reveal>

          {/* Smart Storage — gradient card */}
          <Reveal delay={0.1} className="lg:col-span-5 lg:row-span-1">
            <FeatureCard
              variant="gradient"
              icon={<Battery size={18} />}
              title="The grid drops. Your house doesn't notice."
              body="Modular LiFePO₄ batteries that take over the second the line dies. No flicker, no reboot, no scrambling for candles. You'll find out the grid went down when your neighbour calls to complain about it."
              to="/solutions#storage"
            />
          </Reveal>

          {/* Real-time Insights — soft card */}
          <Reveal className="lg:col-span-4 lg:row-span-1">
            <FeatureCard
              variant="soft"
              icon={<LineChart size={18} />}
              title="Watch every kilowatt, on your phone."
              body="Production, consumption, what each appliance is drawing — all visible to the minute. Most of our customers check it every morning for the first two weeks. Then they forget about it, which is the point."
              to="/solutions#insights"
            />
          </Reveal>

          {/* Grid Independence — dark wide hero card */}
          <Reveal delay={0.1} className="lg:col-span-8 lg:row-span-1">
            <FeatureCard
              variant="dark"
              title="Your meter, running backwards."
              body="When you're producing more than you use, you bank it. Some months, your bill is a credit. Most months, it's a number you set, not a number you hope for."
              cta="Learn the Math"
              to="/learn-the-math"
            />
          </Reveal>
        </div>
      </section>

      {/* LUMINA ONE — Featured product callout (Teaser) */}
      <section className="relative overflow-hidden bg-canvas-deep grain">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -top-32 right-0 h-80 w-[600px] bg-sun/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-60 w-[500px] bg-zap/10 blur-3xl" />
        </div>

        <div className="container relative py-20 lg:py-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-sun px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-canvas">
                New
              </span>
              <p className="eyebrow">New — the Lumina ONE</p>
            </div>
            <h2 className="mt-5 max-w-3xl text-display-lg font-semibold text-balance">
              Solar, battery, and inverter — built to live together.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-earth/75 text-pretty">
              Our flagship system. Hybrid inverter, modular battery storage, and high-output panels, all engineered to talk to each other. Two configurations, transparent pricing, free delivery on Viti Levu, full install or DIY-with-our-sign-off. The whole thing was specified by someone who's spent enough cyclones in the dark to know what matters.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl bg-canvas shadow-lift p-8 md:p-12 flex items-center justify-center">
                <img
                  src="/products/lumina-one-unit.jpg"
                  alt="The Lumina ONE — hybrid inverter with stacked LiFePO4 battery modules"
                  className="w-full max-w-xs object-contain transition-transform duration-700 ease-out hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-y-4 text-sm md:text-base text-earth/80">
                {[
                  "WiFi & GPRS monitoring (iOS / Android)",
                  "Automatic battery activation — runs without battery if needed",
                  "Anti-dust kit, standard. Because you live near a cane field.",
                  "Built-in 120 A MPPT solar charger",
                  "Smart battery charge optimisation",
                  "5-year warranty, Suva-based support — we're ten minutes from your roof",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="primary" size="lg">
                  <Link to="/contact">
                    Get a Lumina ONE quote <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/datasheets/lumina-one-datasheet.pdf" target="_blank" rel="noopener noreferrer">
                    Download datasheet (PDF)
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="container py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6 order-2 lg:order-1">
            <Quote className="text-sun" size={40} strokeWidth={1.25} />
            <blockquote className="mt-6 font-display text-2xl md:text-[1.65rem] leading-snug text-earth-700 text-balance">
              "Lumina Vou didn't just install solar panels; they transformed our home's relationship
              with energy. The aesthetic integration is flawless, and watching our meter run backwards
              is a daily joy."
            </blockquote>
            <div className="mt-8">
              <p className="text-sm font-semibold tracking-wide uppercase text-earth-700">Alisi V.</p>
              <p className="mt-1 text-sm text-earth/65">Denarau Island Homeowner</p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-lift">
              <img
                src="/lifestyle/woman-with-unit.jpg"
                alt="Alisi V. checks her Lumina ONE system at home in Denarau"
                className="aspect-[3/4] w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/20 to-transparent pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden bg-earth grain text-canvas">
        <div className="absolute inset-0 -z-0">
          <div className="absolute -top-40 left-1/2 h-[500px] w-[1200px] -translate-x-1/2 bg-sun/15 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-[300px] w-[600px] bg-zap/10 blur-3xl" />
        </div>

        <div className="container relative py-20 lg:py-24 text-center">
          <Reveal>
            <p className="eyebrow text-canvas/60 mb-4">Ready when you are</p>
            <h2 className="text-display-lg font-semibold text-balance">The sun's been free this whole time.</h2>
            <p className="mx-auto mt-5 max-w-xl text-canvas/75 text-pretty">
              Most homes pay for power they could be making themselves. The first conversation is free, takes about an hour, and ends with you knowing what your roof is worth.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-canvas/95 border-transparent placeholder:text-earth/45"
              />
              <Button type="submit" size="lg" variant="primary">
                {submitted ? "Sent — we'll be in touch" : "Request a site visit"}
              </Button>
            </form>
            <p className="mt-4 text-xs tracking-wide text-canvas/55">
              No commitment. Local team. Real numbers.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */
/*  FEATURE CARD — four variants for the asymmetric grid                        */
/* ──────────────────────────────────────────────────────────────────────────── */

interface FeatureCardProps {
  variant: "image" | "gradient" | "soft" | "dark";
  icon?: React.ReactNode;
  title: string;
  body: string;
  cta?: string;
  to?: string;
  image?: string;
}

function FeatureCard({ variant, icon, title, body, cta, to, image }: FeatureCardProps) {
  const baseClasses =
    "group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift";

  if (variant === "image") {
    return (
      <Link to={to ?? "#"} className={`${baseClasses} min-h-[280px] md:min-h-[360px] text-canvas`}>
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/85 via-earth-900/40 to-earth-900/10" />
        <div className="relative">
          {icon && (
            <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-canvas text-sun shadow-soft">
              {icon}
            </span>
          )}
          <h3 className="font-display text-2xl font-semibold text-canvas">{title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-canvas/85">{body}</p>
        </div>
      </Link>
    );
  }

  if (variant === "gradient") {
    return (
      <Link
        to={to ?? "#"}
        className={`${baseClasses} min-h-[280px] md:min-h-[360px] text-canvas bg-gradient-to-br from-zap to-earth-600`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="relative">
          {icon && (
            <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-canvas text-sun shadow-soft">
              {icon}
            </span>
          )}
          <h3 className="font-display text-2xl font-semibold text-canvas">{title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-canvas/90">{body}</p>
        </div>
      </Link>
    );
  }

  if (variant === "soft") {
    return (
      <Link
        to={to ?? "#"}
        className={`${baseClasses} min-h-[260px] md:min-h-[300px] bg-canvas-deep`}
      >
        <div className="relative">
          {icon && (
            <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-canvas text-sun shadow-soft">
              {icon}
            </span>
          )}
          <h3 className="font-display text-2xl font-semibold text-earth-700">{title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-earth/75">{body}</p>
        </div>
      </Link>
    );
  }

  // dark
  return (
    <Link
      to={to ?? "#"}
      className={`${baseClasses} min-h-[260px] md:min-h-[300px] text-canvas bg-earth-700`}
    >
      {/* Light streak background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(237,212,94,0.15),transparent_60%)]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 600 300"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-60"
      >
        <defs>
          <linearGradient id="streak" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#edd45e" stopOpacity="0" />
            <stop offset="50%" stopColor="#edd45e" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#edd45e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 240 Q 300 100 600 200 L 600 220 Q 300 130 0 260 Z" fill="url(#streak)" />
        <path d="M0 280 Q 300 160 600 240 L 600 260 Q 300 190 0 300 Z" fill="url(#streak)" opacity="0.5" />
      </svg>

      <div className="relative max-w-md">
        <h3 className="font-display text-2xl font-semibold text-canvas">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-canvas/80">{body}</p>
        {cta && (
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-electric group-hover:gap-3 transition-all">
            {cta} <ArrowRight size={14} />
          </span>
        )}
      </div>
    </Link>
  );
}
