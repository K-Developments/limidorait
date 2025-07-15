
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function About() {
  return (
    <section id="about" className="w-full pt-12 bg-card relative">
        <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
                <nav className="flex items-center text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground">About</span>
                </nav>
            </div>
            <div className="flex flex-col items-center text-center py-12">
                <div className="inline-block bg-secondary px-3 py-1 text-sm text-secondary-foreground mb-4">Our Vision</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                    About Limidora
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    At Limidora, we are always trying to innovate new things with next-level ideas. In this time, everyone needs to touch the technology, and we are making solutions with technology to improve the lives and businesses of our clients.
                </p>
            </div>
      </div>
    </section>
  );
}
