import { Link } from "react-router-dom";
import { Leaf, Recycle, Users, Trees } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

const PILLARS = [
  {
    icon: Leaf,
    title: "Tier-1 panels only",
    body: "We specify only manufacturers with verified low-carbon production. No grey-market modules, no shortcuts.",
  },
  {
    icon: Recycle,
    title: "Closed-loop end-of-life",
    body: "Every panel and battery we install has a documented recycling pathway. We take them back at end-of-life — for free.",
  },
  {
    icon: Users,
    title: "Local hands, local skills",
    body: "We employ and train Fijian engineers and electricians. Solar is a transition we'd rather build at home.",
  },
  {
    icon: Trees,
    title: "Reef-positive",
    body: "A percentage of every install funds Pacific reef restoration through our partnership with Coral Reef Alliance.",
  },
];

export default function Sustainability() {
  return (
    <>
      <PageHeader
        eyebrow="Sustainability"
        title="A solar company has to mean it."
        intro="Energy that's clean at the meter but dirty in the supply chain isn't progress. Here's how we close the loop — from manufacturing to recycling to the reef."
      />

      <section className="container py-20 lg:py-28">
        <div className="grid gap-6 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-earth/10 bg-canvas-deep/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:border-sun/30">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zap/15 text-zap-dark">
                  <p.icon size={20} />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-earth/75">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats strip */}
        <Reveal>
          <div className="mt-20 rounded-2xl bg-earth-700 grain text-canvas p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 -z-0">
              <div className="absolute top-0 right-0 h-40 w-80 bg-electric/10 blur-3xl" />
            </div>
            <p className="eyebrow text-canvas/60 relative">Year to date</p>
            <div className="relative mt-8 grid gap-10 md:grid-cols-3">
              <Stat number="2.4 GWh" label="Clean energy delivered to Lumina Vou customers" />
              <Stat number="1,720 t" label="CO₂ avoided versus diesel-grid baseline" />
              <Stat number="340 m²" label="Reef restored through customer-funded partnership" />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="max-w-xl text-sm text-earth/70">
              Want the full numbers? Our annual Impact Report breaks down every install, every
              kilowatt-hour, every kilogram of carbon.
            </p>
            <Button asChild variant="primary" size="md">
              <Link to="/impact-report">Read the Impact Report</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl md:text-5xl font-semibold text-electric">{number}</p>
      <p className="mt-2 text-sm text-canvas/75 max-w-[18ch]">{label}</p>
    </div>
  );
}
