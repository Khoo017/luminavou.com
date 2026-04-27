import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VALUES = [
  {
    title: "Engineers, not salespeople.",
    body: "Every consultation runs through someone who has actually wired the systems we sell. No commissions, no oversizing.",
  },
  {
    title: "Built for here.",
    body: "Our specs are tuned for cyclone-rated wind loads, salt corrosion, and the realities of Pacific power infrastructure.",
  },
  {
    title: "Aesthetics matter.",
    body: "We treat solar as architecture. If it looks bolted-on, we haven't done our job.",
  },
  {
    title: "Local crews. Always.",
    body: "Trained, certified Fijian installers. Faster service, money that stays home, jobs that compound.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A solar company that grew up in a cyclone."
        intro="Lumina Vou started in 2019 after one of our founders watched a neighbour's poorly-installed solar array tear off in TC Sarai. We rebuilt it properly — and a company came out of it."
      />

      <section className="container py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl shadow-lift">
              <img
                src="https://images.unsplash.com/photo-1559302995-ed1d2bc6cba1?auto=format&fit=crop&w=1200&q=80"
                alt="Lumina Vou engineers on a Suva rooftop"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Origin</p>
            <h2 className="mt-4 text-display-md font-semibold text-balance">
              We're a small team of engineers, electricians, and one architect — all Pacific-born and a
              little obsessed with energy.
            </h2>
            <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-earth/75 text-pretty">
              <p>
                We design, install, and service premium solar systems across Fiji and the wider South
                Pacific. We're picky about manufacturers, finicky about install quality, and unusually
                interested in the little numbers on your power bill.
              </p>
              <p>
                Most of our work comes from word of mouth: a homeowner shows their neighbour the app
                that tracks their backwards meter, and we get a call the following week. That's the
                way we like it.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Values */}
        <Reveal>
          <h3 className="mt-24 mb-10 font-display text-2xl text-earth-700">What we hold to.</h3>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-earth/10 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="h-full bg-canvas p-8 transition-colors duration-300 hover:bg-canvas-deep">
                <h4 className="font-display text-xl font-semibold text-earth-700">{v.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-earth/75">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 flex flex-col items-center gap-5 text-center">
            <p className="max-w-xl text-earth/75">
              If any of that sounds like the kind of company you'd want to install something on your
              roof, we'd love to talk.
            </p>
            <Button asChild size="lg" variant="primary">
              <Link to="/contact">Start a conversation</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
