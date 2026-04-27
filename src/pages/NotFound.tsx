import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-canvas-deep grain pt-32 pb-20 flex items-center">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[800px] bg-sun/10 blur-3xl" />
      </div>
      <div className="container relative">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="font-display text-[clamp(6rem,15vw,12rem)] font-semibold leading-none text-sun">
              404
            </p>
            <h1 className="mt-2 font-display text-display-md font-semibold text-earth-700">
              That panel isn't catching the sun.
            </h1>
            <p className="mt-4 text-earth/70">
              The page you're after has either moved or never existed. Let's get you back to
              somewhere useful.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="primary" size="md">
                <Link to="/">Back to home</Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <Link to="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
