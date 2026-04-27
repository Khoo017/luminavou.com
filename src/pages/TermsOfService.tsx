import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export default function TermsOfService() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />

      <section className="container py-16 lg:py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl flex flex-col gap-6 text-base leading-relaxed text-earth/80">
            <p className="text-sm text-earth/55">Last updated: January 2026</p>

            <p>
              These terms govern your use of luminavou.com (the "site") and any services we provide
              through it. By using the site you accept these terms. If you don't, please don't use
              the site.
            </p>

            <Section title="Use of the site">
              <p>The site is provided for informational purposes — to learn about our services, request a consultation, and access our customer portal if you're a customer. You agree not to misuse it: no scraping, no attempting to break in, no using it to send spam.</p>
            </Section>

            <Section title="Accuracy of information">
              <p>We try hard to keep specifications, prices, and case studies accurate. But solar economics change with weather, equipment availability, and grid rates. Anything you read here should be confirmed in a written quote before you make a purchasing decision.</p>
            </Section>

            <Section title="Intellectual property">
              <p>The Lumina Vou name, logo, and all original content on this site are ours. You're welcome to share links and quote us — but please don't reproduce the site or pass off our materials as your own.</p>
            </Section>

            <Section title="Liability">
              <p>The site is provided "as is". We're not liable for losses arising from your reliance on its content alone. Any contractual obligations between you and Lumina Vou — for example, an installation contract — are governed by the contract you sign, not by these terms.</p>
            </Section>

            <Section title="Governing law">
              <p>These terms are governed by the laws of Fiji. Any disputes will be resolved in the courts of Fiji.</p>
            </Section>

            <Section title="Questions">
              <p>Email <a href="mailto:bula@luminavou.com" className="text-sun hover:underline">bula@luminavou.com</a> with anything you'd like clarified.</p>
            </Section>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-xl font-semibold text-earth-700">{title}</h2>
      {children}
    </div>
  );
}
