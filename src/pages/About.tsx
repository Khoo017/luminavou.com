import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VALUES = [
  {
    title: "Local first. Always.",
    body: "Trained, certified Fijian installers. Money that stays in the community. Jobs that compound over years, not contracts that disappear after the install. We're not a multinational with a Fiji office. We're a Fijian company.",
  },
  {
    title: "Built for here, not for a brochure.",
    body: "Cyclone-rated wind loads. Salt-spray testing. Anti-dust kits standard. Specs tuned for Pacific weather and Pacific power infrastructure, because the rest of the world's specs assume a climate that isn't ours.",
  },
  {
    title: "Solar that doesn't look bolted on.",
    body: "Most installs we see look like an afterthought. We treat solar as architecture — fitted, intentional, and quiet. If it looks like we slapped panels on a roof, we haven't done our job.",
  },
  {
    title: "We pick up when you call.",
    body: "The biggest difference between us and the alternatives isn't the gear. It's the phone. Year one, year five, year fifteen — we're the same number, and someone who knows your install picks up.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A solar company that grew out of a cleared-out freezer."
        intro="Lumina Vou started in 2019 when a neighbour's solar array ripped off in TC Sarai and the company that sold it to her stopped picking up the phone. We rebuilt it ourselves. Then we built a company so it wouldn't keep happening to other people."
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
            <p className="eyebrow">Why we exist</p>
            <h2 className="mt-4 text-display-md font-semibold text-balance">
              Big electrical doesn't live here.
            </h2>
            <div className="mt-8 flex flex-col gap-5 text-base leading-relaxed text-earth/75 text-pretty">
              <p>
                We've all done the rounds. The quarterly outage notice. The bill that goes up without warning. The call to the utility that ends up nowhere. The cyclone that knocks power out for a week and a freezer full of food that gets thrown in the bin. The companies that cut the ribbon on a project, then disappear when it needs servicing in year three.
              </p>
              <p>
                We're not engineers in the brochure sense. We're locals who got tired of all of it. We learned the trade — properly, with certifications, with the right partners — because the alternative was watching it happen to our neighbours one more cyclone season.
              </p>
              <p>
                Lumina Vou is small on purpose. Small enough that the person who designs your system is also the person who answers when you call. Small enough that we know the road to your house. Small enough that we won't pretend Fiji is a market — it's where we live.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Founder Voice */}
        <div className="mt-24 grid gap-16 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">From our founder</p>
            <h2 className="mt-4 text-display-md font-semibold text-balance">
              "We didn't set out to start a solar company."
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <blockquote className="font-display text-2xl leading-snug text-earth-700 text-balance italic border-l-4 border-sun pl-6 py-2">
              "We didn't set out to start a solar company. We set out to fix one neighbour's roof. The work we did got the lights back on, and then her cousin asked if we could do hers, and then her cousin's neighbour, and somewhere in there it stopped being a favour and started being a job. The thing that's stayed the same is the reason we did it in the first place — nobody who lives here should be at the mercy of a company that doesn't."
            </blockquote>
            <p className="mt-6 text-sm font-semibold tracking-wide uppercase text-earth-700">
              — Alice Han, Founder
            </p>
            <div className="mt-10 flex flex-col gap-5 text-base leading-relaxed text-earth/75 text-pretty">
              <p>
                The team is small and growing. Alice leads the company. Kieren Hoolihan looks after marketing and the systems behind this website. There's a third founder based in New Zealand whose name we'll add here once he's said it's OK with him. Installations are done by a partner crew of local installers and project managers — certified, accountable, and committed enough to this that they're part of the family. Every sign-off is by a certified Fijian electrician.
              </p>
              <p>
                If you want the longer story — the rebuild after Sarai, what we got wrong on our first install, how we found our installation partners — those are on <Link to="/blog" className="text-sun hover:underline">Stories</Link>.
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
