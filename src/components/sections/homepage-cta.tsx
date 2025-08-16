
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HomepageCtaSection } from "@/services/firestore";

interface HomepageCtaProps {
    ctaSection: HomepageCtaSection;
}

export function HomepageCta({ ctaSection }: HomepageCtaProps) {
  if (!ctaSection) return null;

  return (
    <section id="cta" className="relative bg-background py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-medium font-body uppercase">
            {ctaSection.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {ctaSection.description}
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href={ctaSection.buttonLink}>{ctaSection.buttonText}</Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Top Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 w-[1px] bg-gradient-to-t from-transparent to-border" />
        {/* Bottom Line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1/2 w-[1px] bg-gradient-to-b from-transparent to-border" />
        {/* Left Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-[1px] bg-gradient-to-l from-transparent to-border" />
        {/* Right Line */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent to-border" />
      </div>
    </section>
  );
}
