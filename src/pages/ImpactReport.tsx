import { Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

const HIGHLIGHTS = [
  { label: "Installs completed", value: "184", note: "across 7 islands" },
  { label: "Lifetime CO₂ avoided", value: "8,420 t", note: "vs. diesel-grid baseline" },
  { label: "Reef restored", value: "1,160 m²", note: "via Coral Reef Alliance" },
  { label: "Local wages paid", value: "FJ$1.4M", note: "to Fijian crews & engineers" },
];

export default function ImpactReport() {
  return (
    <>
      <PageHeader
        eyebrow="2026 Impact Report"
        title="Every kilowatt-hour, on the record."
        intro="Real solar companies show their math. Here are the numbers behind every install we've completed since founding — without selective rounding."
      />

      <section className="container py-20 lg:py-28">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={h.label}
                className="rounded-2xl bg-canvas-deep/60 p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <p className="eyebrow">{h.label}</p>
                <p className="mt-3 font-display text-4xl font-semibold text-sun">{h.value}</p>
                <p className="mt-2 text-xs text-earth/60">{h.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="text-display-md font-semibold text-balance">
                What you'll find inside the report.
              </h2>
              <ul className="mt-8 flex flex-col gap-5 text-base text-earth/75 leading-relaxed">
                <ListItem>Per-customer production data, anonymized but precise to the kWh.</ListItem>
                <ListItem>Full breakdown of supply-chain carbon — from mine to roof.</ListItem>
                <ListItem>End-of-life accounting: every panel and battery we've recovered.</ListItem>
                <ListItem>Reef restoration field reports from Coral Reef Alliance.</ListItem>
                <ListItem>Financials, including the percentage of revenue paid to Fijian staff.</ListItem>
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="primary" size="lg">
                  <a href="/Lumina_Vou_Impact_Report.pdf" download="Lumina_Vou_Impact_Report.pdf" target="_blank" rel="noopener noreferrer">
                    <Download size={16} />
                    Download the 2026 report
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/sustainability">Read our commitments</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-earth-700 p-10 text-canvas grain overflow-hidden">
                <div className="absolute inset-0 -z-0">
                  <div className="absolute -top-20 -right-20 h-60 w-60 bg-sun/15 blur-3xl" />
                </div>
                <div className="relative">
                  <FileText size={32} className="text-electric" strokeWidth={1.25} />
                  <p className="eyebrow mt-4 text-canvas/55">Document</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-canvas">
                    Lumina Vou — 2026 Annual Impact
                  </h3>
                  <p className="mt-3 text-sm text-canvas/70">
                    36 pages · PDF · Released April 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />
      <span>{children}</span>
    </li>
  );
}
