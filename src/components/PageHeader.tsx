import { Reveal } from "./Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}

export function PageHeader({ eyebrow, title, intro, align = "left" }: PageHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <section className="relative overflow-hidden bg-canvas-deep grain pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 right-1/4 h-80 w-[600px] bg-sun/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-60 w-[400px] bg-zap/8 blur-3xl" />
      </div>
      <div className="container relative">
        <Reveal>
          <div className={`max-w-3xl ${alignment}`}>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 text-display-lg font-semibold text-balance">{title}</h1>
            {intro && (
              <p className="mt-6 text-base leading-relaxed text-earth/75 text-pretty max-w-2xl">
                {intro}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
