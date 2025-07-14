import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MotionWrapper } from "../motion-wrapper";

export function Hero() {
  return (
    <section
      id="hero"
      className="flex h-screen min-h-[700px] w-full items-center justify-center"
    >
      <div className="container mx-auto flex flex-col items-center justify-center px-4 text-center">
        <MotionWrapper>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Creative Solutions for the <span className="text-primary">Digital Age</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          We are Limidora, a digital agency passionate about crafting beautiful and functional experiences online.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="#portfolio">Our Work</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#services">Our Services</Link>
          </Button>
        </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
