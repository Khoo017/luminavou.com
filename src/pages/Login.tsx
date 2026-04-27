import { Reveal } from "@/components/Reveal";
import { Logo } from "@/components/Logo";
import { AuthForm } from "@/components/AuthForm";

export default function Login() {

  return (
    <section className="relative min-h-screen overflow-hidden bg-canvas-deep grain pt-32 pb-16">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[1000px] bg-sun/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-60 w-[400px] bg-zap/10 blur-3xl" />
      </div>

      <div className="container relative">
        <Reveal>
          <div className="mx-auto max-w-md rounded-2xl bg-canvas p-8 md:p-10 shadow-lift">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h1 className="mt-6 text-center font-display text-2xl font-semibold text-earth-700">
              Welcome back
            </h1>
            <p className="mt-2 text-center text-sm text-earth/65">
              Sign in to monitor your system, view bills, and track savings.
            </p>

            <div className="mt-8">
              <AuthForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
