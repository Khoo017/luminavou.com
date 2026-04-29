import { Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { ContactForm } from "@/components/ContactForm";

export default function Contact() {


  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your roof."
        intro="Tell us a little about your property and one of our engineers will reply within one business day. Site assessments are free, no-obligation, and on the calendar fast."
      />

      <section className="container pt-12 pb-24 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Contact info column */}
          <Reveal className="lg:col-span-4">
            <div className="rounded-2xl bg-canvas-deep/60 p-8">
              <h3 className="font-display text-xl font-semibold text-earth-700">Reach us directly</h3>
              <p className="mt-2 text-sm text-earth/70">
                If forms aren't your thing, here's where to find us.
              </p>

              <ul className="mt-8 flex flex-col gap-6 text-sm">
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun/10 text-sun">
                    <Mail size={16} />
                  </span>
                  <div>
                    <p className="font-medium text-earth-700">Email</p>
                    <a href="mailto:bula@luminavou.com" className="text-earth/70 hover:text-sun transition-colors">
                      bula@luminavou.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun/10 text-sun">
                    <Phone size={16} />
                  </span>
                  <div>
                    <p className="font-medium text-earth-700">Phone</p>
                    <a href="tel:+6792413038" className="text-earth/70 hover:text-sun transition-colors">
                      +679 241 3038
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className={cn("relative rounded-2xl bg-canvas-deep/40 p-8 md:p-10 transition-all")}>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

