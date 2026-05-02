import { Link } from "react-router-dom";
import { ArrowRight, Grid3x3, Battery, LineChart, Sun, ShieldCheck, Wrench, Download } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

const SOLUTIONS = [
  {
    id: "tiles",
    icon: Grid3x3,
    title: "Solar that reads as roof from the road.",
    body: "Photovoltaic tiles that generate electricity but look like traditional Pacific roofing from street level. Engineered for the wind loads, salt corrosion, and humidity that Fiji actually delivers — not the lab-test versions of those things.",
    points: [
      "BIPV tiles indistinguishable at street level",
      "Cat-5 wind certified, IP68 rated against water and dust",
      "25-year output warranty",
      "No more \"is that a solar panel?\" from your neighbours",
    ],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "storage",
    icon: Battery,
    title: "The grid drops. You don't notice.",
    body: "Our flagship: a 6.2 kWh hybrid inverter married to modular LiFePO₄ batteries, with automatic activation and a 120 A MPPT controller built in. Engineered for Fijian conditions — anti-dust kit standard. The kind of system where the first time you'll know the grid went out is when someone tells you.",
    points: [
      "5.12 kWh and 10.24 kWh modular battery options",
      "Automatic outage activation, runs without battery if needed",
      "WiFi & GPRS monitoring (iOS / Android)",
      "Quiet enough you'll forget it's there",
    ],
    image: "/lifestyle/house-sunset-solar.png",
  },
  {
    id: "insights",
    icon: LineChart,
    title: "Watch your meter run backwards, on your phone.",
    body: "Production, consumption, savings — visible to the minute on your phone. We build the dashboard. You watch the numbers do what they're supposed to do. Most of our customers check it religiously for two weeks, then forget — which is the point. The system is supposed to be boring.",
    points: [
      "Per-circuit monitoring",
      "Anomaly alerts for failing appliances",
      "Carbon and FJD savings tracker",
      "Quietly tells you if a panel underperforms before you'd notice",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  },
];

const PROCESS = [
  { icon: Sun, title: "Site visit", body: "Free. We come to your roof, measure properly, and ask to see your last twelve months of power bills. Real numbers in, real proposal out." },
  { icon: Wrench, title: "Plan & design", body: "Your house, your usage, your budget. Every install is different. The system that fits your sister-in-law's place isn't the system that fits yours." },
  { icon: ShieldCheck, title: "Install & sign-off", body: "4–7 days on site, depending on size. Certified Fijian electricians sign off every job. Twenty-five-year performance promise that we'll actually honour, because we still live here." },
];

export default function Solutions() {
  return (
    <>
      <PageHeader
        eyebrow="What we install"
        title="Solar, sized for your roof — not someone else's catalogue."
        intro="Three product lines, one philosophy: power that's quiet, properly fitted, and built to outlive the next cyclone. Anchored by our flagship Lumina ONE — solar, battery, and inverter, designed to live together."
      />

      {/* Solution detail blocks */}
      <section className="container py-20 lg:py-28">
        <div className="flex flex-col gap-24 lg:gap-32">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.id}>
              <div
                id={s.id}
                className={`scroll-mt-24 grid gap-10 lg:grid-cols-12 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-6">
                  <div className="overflow-hidden rounded-2xl shadow-lift">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="aspect-[5/4] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sun/10 text-sun">
                    <s.icon size={20} />
                  </span>
                  <h2 className="mt-6 text-display-md font-semibold text-balance">{s.title}</h2>
                  <p className="mt-5 text-base leading-relaxed text-earth/75 text-pretty">{s.body}</p>
                  <ul className="mt-8 flex flex-col gap-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-earth/80">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" size="md" className="mt-8">
                    <Link to="/contact">
                      Talk to our team <ArrowRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LUMINA ONE — Featured product callout */}
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
              Our flagship system. An all-in-one energy generation and storage system — a powerful hybrid inverter, modular LiFePO₄ battery storage, and high-output solar panels, all engineered to talk to each other. Two configurations, everything included, transparent pricing.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Product photo */}
            <Reveal className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl bg-canvas shadow-lift p-8 md:p-12 flex items-center justify-center">
                <img
                  src="/products/lumina-one-unit.jpg"
                  alt="The Lumina ONE — hybrid inverter with stacked LiFePO4 battery modules"
                  className="w-full max-w-xs object-contain transition-transform duration-700 ease-out hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Key features list under the photo */}
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-earth/80">
                {[
                  "WiFi & GPRS monitoring (iOS / Android)",
                  "Built-in 120 A MPPT solar charger",
                  "Automatic battery activation",
                  "High PV input range (60–500 V DC)",
                  "Anti-dust kit for harsh environments",
                  "Smart battery charge optimisation",
                  "Inverter runs without battery",
                  "5-year warranty, Suva-based support",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Spec comparison table */}
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="rounded-2xl bg-earth-700 grain text-canvas overflow-hidden shadow-lift">
                <div className="grid grid-cols-3 border-b border-canvas/10">
                  <div className="p-5 md:p-6">
                    <p className="eyebrow text-canvas/55">Specs</p>
                  </div>
                  <div className="p-5 md:p-6 bg-sun/95 text-center">
                    <p className="font-display text-lg md:text-xl font-semibold text-canvas">Lumina ONE</p>
                    <p className="text-canvas/85 text-sm">Explore</p>
                  </div>
                  <div className="p-5 md:p-6 bg-sun text-center">
                    <p className="font-display text-lg md:text-xl font-semibold text-canvas">Lumina ONE</p>
                    <p className="text-canvas/85 text-sm">Freedom</p>
                  </div>
                </div>

                {[
                  { label: "Inverter", explore: "6.2 kWh, 98% efficient", freedom: "6.2 kWh, 98% efficient" },
                  { label: "Battery", explore: "51.2 V · 100 Ah · 5.12 kWh", freedom: "51.2 V · 100 Ah · 10.24 kWh" },
                  { label: "Solar", explore: "4 × 475 W · 10.85 A @ 21.9%", freedom: "4 × 475 W · 10.85 A @ 21.9%" },
                  { label: "Delivery", explore: "Included*", freedom: "Included*" },
                  { label: "Installation", explore: "Full install or DIY", freedom: "Full install or DIY" },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-3 text-sm md:text-base ${
                      i % 2 === 0 ? "bg-earth-700" : "bg-earth-800/40"
                    }`}
                  >
                    <div className="p-4 md:p-5 border-r border-canvas/10">
                      <p className="text-canvas/55 text-xs font-medium uppercase tracking-wider">{row.label}</p>
                    </div>
                    <div className="p-4 md:p-5 border-r border-canvas/10 text-canvas">{row.explore}</div>
                    <div className="p-4 md:p-5 text-canvas">{row.freedom}</div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs text-earth/55">
                *Free delivery on Viti Levu. Standard rates apply for outer islands.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="primary" size="lg">
                  <Link to="/contact">
                    Get a Lumina ONE quote <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="/datasheets/lumina-one-datasheet.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={16} />
                    Download datasheet (PDF)
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process strip */}
      <section className="bg-earth-700 text-canvas grain relative overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[1000px] bg-sun/12 blur-3xl" />
        </div>
        <div className="container relative py-24 lg:py-28">
          <Reveal>
            <p className="eyebrow text-canvas/60">How we work</p>
            <h2 className="mt-4 max-w-2xl text-display-lg font-semibold text-balance text-canvas">
              Three steps. No surprises.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PROCESS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="border-t border-canvas/15 pt-6">
                  <span className="font-display text-3xl text-electric">0{i + 1}</span>
                  <p.icon className="mt-6 text-sun" size={20} />
                  <h3 className="mt-3 font-display text-xl font-semibold text-canvas">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-canvas/75">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="mt-14 flex justify-center">
              <Button asChild variant="primary" size="lg">
                <Link to="/contact">
                  Book a site visit <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
