import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

/**
 * The math:
 *  - System cost (FJD)
 *  - Annual production (kWh) — ≈ system size (kW) × 1,600 sun-hours in Fiji
 *  - Grid rate (FJD per kWh)
 *  - Annual savings = production × rate
 *  - Bills inflate at ~5%/year (Fiji historical avg)
 *  - We track cumulative net position year over year
 */

const FJ_SUN_HOURS = 1600;
const RATE_INFLATION = 0.05;
const SYSTEM_LIFE = 25;

function calculate({
  systemKw,
  systemCost,
  gridRate,
}: {
  systemKw: number;
  systemCost: number;
  gridRate: number;
}) {
  const annualProduction = systemKw * FJ_SUN_HOURS;
  let cumulativeSavings = 0;
  let paybackYear: number | null = null;
  const projection: { year: number; savings: number; net: number; cumulative: number }[] = [];

  for (let y = 1; y <= SYSTEM_LIFE; y++) {
    const rate = gridRate * Math.pow(1 + RATE_INFLATION, y - 1);
    const yearSavings = annualProduction * rate;
    cumulativeSavings += yearSavings;
    const net = cumulativeSavings - systemCost;
    if (paybackYear === null && net >= 0) paybackYear = y;
    projection.push({ year: y, savings: yearSavings, net, cumulative: cumulativeSavings });
  }

  const lifetimeNet = cumulativeSavings - systemCost;
  return { annualProduction, paybackYear, lifetimeNet, projection };
}

const fjd = (n: number) =>
  `FJ$${Math.round(n).toLocaleString("en-FJ")}`;

export default function LearnTheMath() {
  const [systemKw, setSystemKw] = useState(8);
  const [systemCost, setSystemCost] = useState(28000);
  const [gridRate, setGridRate] = useState(0.41);

  const { annualProduction, paybackYear, lifetimeNet, projection } = useMemo(
    () => calculate({ systemKw, systemCost, gridRate }),
    [systemKw, systemCost, gridRate]
  );

  const maxAbsValue = Math.max(...projection.map((p) => Math.abs(p.net)));

  return (
    <>
      <PageHeader
        eyebrow="Learn the math"
        title="The numbers under the marketing."
        intro="A solar system is, financially, a savings account that runs in reverse. Move the sliders below to see how the math works for a system roughly your size."
      />

      <section className="container py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Controls */}
          <Reveal className="lg:col-span-5">
            <div className="rounded-2xl bg-canvas-deep/60 p-8">
              <p className="eyebrow">Your inputs</p>
              <div className="mt-6 flex flex-col gap-8">
                <Slider
                  label="System size"
                  value={systemKw}
                  unit="kW"
                  min={3}
                  max={25}
                  step={0.5}
                  onChange={setSystemKw}
                />
                <Slider
                  label="System cost"
                  value={systemCost}
                  unit="FJ$"
                  display={fjd(systemCost)}
                  min={10000}
                  max={120000}
                  step={500}
                  onChange={setSystemCost}
                />
                <Slider
                  label="Your grid rate"
                  value={gridRate}
                  unit="FJ$/kWh"
                  display={`FJ$${gridRate.toFixed(2)} / kWh`}
                  min={0.25}
                  max={0.6}
                  step={0.01}
                  onChange={setGridRate}
                />
              </div>
              <div className="mt-8 rounded-xl border border-earth/10 bg-canvas p-5 text-sm text-earth/70 leading-relaxed">
                <p className="font-medium text-earth-700">Assumptions</p>
                <p className="mt-2">
                  Fiji averages ~{FJ_SUN_HOURS.toLocaleString()} usable sun-hours per kW per year. Grid rates have
                  risen at roughly {Math.round(RATE_INFLATION * 100)}% annually. Calculations cover a {SYSTEM_LIFE}-year
                  panel life. Real numbers vary with shading, orientation, and your usage profile —
                  let us model yours specifically.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Results */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-3">
                <Stat
                  icon={<Zap size={18} />}
                  label="Annual production"
                  value={`${annualProduction.toLocaleString()} kWh`}
                />
                <Stat
                  icon={<Sparkles size={18} />}
                  label="Payback in"
                  value={paybackYear ? `${paybackYear} yr${paybackYear === 1 ? "" : "s"}` : "Beyond 25 yrs"}
                  highlight
                />
                <Stat
                  icon={<TrendingUp size={18} />}
                  label="25-year net gain"
                  value={fjd(lifetimeNet)}
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 rounded-2xl bg-earth-700 grain p-6 md:p-8 text-canvas relative overflow-hidden">
                <div className="absolute inset-0 -z-0">
                  <div className="absolute top-0 right-0 h-40 w-80 bg-electric/8 blur-3xl" />
                </div>
                <div className="relative">
                  <p className="eyebrow text-canvas/55">Cumulative net position</p>
                  <h3 className="mt-2 font-display text-xl text-canvas">Net cash flow over 25 years</h3>
                  <p className="mt-1 text-xs text-canvas/55">
                    Below zero = you haven't recovered the install yet. Above zero = pure profit.
                  </p>

                  <div className="relative mt-8 h-56 w-full">
                    {/* Zero line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-dashed border-canvas/25" />
                    <div className="absolute left-0 -top-1 text-[10px] uppercase tracking-wider text-canvas/40">+</div>
                    <div className="absolute left-0 -bottom-1 text-[10px] uppercase tracking-wider text-canvas/40">−</div>

                    {/* Bars */}
                    <div className="relative h-full flex items-center gap-[2px]">
                      {projection.map((p) => {
                        const heightPct = (Math.abs(p.net) / (maxAbsValue || 1)) * 50;
                        const positive = p.net >= 0;
                        return (
                          <div key={p.year} className="group relative flex-1 h-full">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${heightPct}%` }}
                              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                              className={`absolute left-0 right-0 mx-px rounded-sm ${
                                positive ? "bg-electric top-1/2" : "bg-sun bottom-1/2"
                              }`}
                              style={positive ? { top: "50%" } : { bottom: "50%" }}
                            />
                            {/* Tooltip on hover */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-canvas px-2 py-1 text-[10px] text-earth shadow-lift z-10">
                              Yr {p.year}: {fjd(p.net)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Year labels */}
                    <div className="mt-2 flex justify-between text-[10px] text-canvas/45">
                      <span>Yr 1</span>
                      <span>Yr 5</span>
                      <span>Yr 10</span>
                      <span>Yr 15</span>
                      <span>Yr 20</span>
                      <span>Yr 25</span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-6 text-xs text-canvas/70">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-3 rounded-sm bg-sun" /> Investment unrecovered
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-3 rounded-sm bg-electric" /> Net profit
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-earth/10 p-6">
                <p className="text-sm text-earth/75 max-w-md">
                  These numbers are a starting point. We model your specific roof, usage, and
                  shading for free.
                </p>
                <Button asChild variant="primary" size="md">
                  <Link to="/contact">
                    Run my real numbers <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Slider({
  label,
  value,
  display,
  unit,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display?: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-earth/60">{label}</span>
        <span className="font-display text-xl font-semibold text-earth-700">
          {display ?? `${value} ${unit}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lumina-slider"
      />
      <style>{`
        .lumina-slider {
          appearance: none;
          height: 4px;
          width: 100%;
          background: linear-gradient(to right, #b35535 0%, #b35535 ${
            ((value - min) / (max - min)) * 100
          }%, rgba(69,53,38,0.15) ${((value - min) / (max - min)) * 100}%, rgba(69,53,38,0.15) 100%);
          border-radius: 999px;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .lumina-slider::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 999px;
          background: #b35535;
          border: 3px solid #faf1e8;
          box-shadow: 0 2px 6px rgba(69,53,38,0.25);
          cursor: grab;
          transition: transform 0.15s ease;
        }
        .lumina-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .lumina-slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 999px;
          background: #b35535;
          border: 3px solid #faf1e8;
          box-shadow: 0 2px 6px rgba(69,53,38,0.25);
          cursor: grab;
        }
      `}</style>
    </label>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 transition-all hover:-translate-y-0.5 ${
        highlight ? "bg-sun text-canvas shadow-glow" : "bg-canvas-deep/60 text-earth"
      }`}
    >
      <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.18em] ${highlight ? "text-canvas/80" : "text-earth/60"}`}>
        {icon}
        <span>{label}</span>
      </div>
      <p className={`mt-3 font-display text-2xl font-semibold ${highlight ? "text-canvas" : "text-earth-700"}`}>
        {value}
      </p>
    </div>
  );
}
