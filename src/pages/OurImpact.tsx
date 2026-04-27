import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    name: "Denarau Coastal Villa",
    type: "Residential",
    capacity: "18 kW",
    storage: "27 kWh",
    saving: "98% bill reduction",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    blurb: "A four-bedroom oceanfront home running entirely on stored sun. The owner reports two FJD 14 power bills since switchover.",
  },
  {
    name: "Viti EcoResort — North Wing",
    type: "Hospitality",
    capacity: "120 kW",
    storage: "200 kWh",
    saving: "FJD 240k / year",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80",
    blurb: "Forty guest rooms, three pools, and an ocean-view spa — fully solar-driven. Diesel generator now reserved for cyclone events only.",
  },
  {
    name: "Suva Tech Headquarters",
    type: "Commercial",
    capacity: "85 kW",
    storage: "60 kWh",
    saving: "78% grid offset",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    blurb: "A working office full of servers, AC, and engineers. We rewrote their load profile and put solar where it actually pays.",
  },
];

export default function OurImpact() {
  return (
    <>
      <PageHeader
        eyebrow="Our impact"
        title="Watch the meter run backwards."
        intro="Every Lumina Vou system is a real building, with real bills, in real Pacific weather. Here are three of the homes and businesses we've helped become their own utility."
      />

      <section className="container py-20 lg:py-28">
        <div className="flex flex-col gap-20 lg:gap-28">
          {PROJECTS.map((proj, i) => (
            <Reveal key={proj.name}>
              <article
                className={`grid gap-10 lg:grid-cols-12 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-7">
                  <div className="overflow-hidden rounded-2xl shadow-lift">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <p className="eyebrow text-sun">{proj.type}</p>
                  <h2 className="mt-4 font-display text-display-md font-semibold text-balance">
                    {proj.name}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-earth/75 text-pretty">
                    {proj.blurb}
                  </p>
                  <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-earth/10 pt-6 text-sm">
                    <div>
                      <dt className="text-earth/55 text-xs uppercase tracking-wider">Capacity</dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-earth-700">{proj.capacity}</dd>
                    </div>
                    <div>
                      <dt className="text-earth/55 text-xs uppercase tracking-wider">Storage</dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-earth-700">{proj.storage}</dd>
                    </div>
                    <div>
                      <dt className="text-earth/55 text-xs uppercase tracking-wider">Saving</dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-sun">{proj.saving}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 flex flex-col items-center gap-5 text-center">
            <h3 className="font-display text-2xl text-earth-700">Ready to be the next one?</h3>
            <Button asChild variant="primary" size="lg">
              <Link to="/contact">
                Start your project <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
