import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />

      <section className="container py-16 lg:py-20">
        <Reveal>
          <div className="prose-content mx-auto max-w-2xl flex flex-col gap-6 text-base leading-relaxed text-earth/80">
            <p className="text-sm text-earth/55">Last updated: January 2026</p>

            <p>
              Lumina Vou Ltd ("we", "us", "our") respects your privacy. This policy explains what data
              we collect, why we collect it, and the rights you have over it. We've tried to write it
              like humans, not lawyers.
            </p>

            <Section title="What we collect">
              <p>When you contact us through this site, we collect the information you give us — name, email, phone, and the details of your property. We also collect basic technical data (browser, IP, the pages you visited) to keep the site working and protect it from abuse.</p>
            </Section>

            <Section title="What we do with it">
              <p>We use your contact information solely to respond to your enquiry, schedule consultations, and — if you become a customer — service your system. We don't sell your data. We don't share it with marketers.</p>
            </Section>

            <Section title="Cookies">
              <p>We use a small number of cookies for things like remembering your dark/light preference and measuring how the site is used. We don't use third-party advertising trackers.</p>
            </Section>

            <Section title="Your rights">
              <p>You can ask us at any time to show you the data we hold on you, correct it, or delete it. Email <a href="mailto:bula@luminavou.com" className="text-sun hover:underline">bula@luminavou.com</a> and we'll handle it within seven days.</p>
            </Section>

            <Section title="Changes">
              <p>If we change this policy materially, we'll update the "Last updated" date at the top and, for existing customers, send a notification.</p>
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
