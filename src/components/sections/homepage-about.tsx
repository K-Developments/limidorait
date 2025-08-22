
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { HomepageAboutSection } from "@/services/firestore";

interface HomepageAboutProps {
    aboutSection: HomepageAboutSection;
}

export function HomepageAbout({ aboutSection }: HomepageAboutProps) {
  return (
    <section id="homepage-about" className="bg-background">
      <div className="container mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900 text-primary-foreground p-8 md:p-16 h-full flex flex-col justify-center order-2 md:order-1"
          >
            <Badge variant="secondary" className="mb-4 self-start">
              {aboutSection.badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-medium mb-4 font-body uppercase">
              {aboutSection.title}
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/80">
              {aboutSection.description}
            </p>
            <Button asChild size="lg" className="self-start">
              <Link href={aboutSection.buttonLink}>
                {aboutSection.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-[300px] md:h-full order-1 md:order-2"
          >
            <Image
              src={aboutSection.imageUrl}
              alt={aboutSection.title}
              fill
              className="object-cover"
              data-ai-hint={aboutSection.aiHint}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
