
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function HomepageAbout() {
  return (
    <section id="homepage-about" className="bg-background">
      <div className="container mx-auto px-0 md:px-[5rem] py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-900 text-primary-foreground p-8 md:p-16 h-full flex flex-col justify-center order-2 md:order-1"
          >
            <Badge variant="secondary" className="mb-4 self-start">
              Who We Are
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-body uppercase">
              About Limidora
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/80">
              We are a creative agency that blends design, technology, and strategy to build exceptional digital experiences. Our passion is to help businesses thrive in the digital world.
            </p>
            <Button asChild size="lg" className="self-start">
              <Link href="/about">
                More About Limidora
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
              src="https://placehold.co/800x600.png"
              alt="Limidora team working"
              fill
              className="object-cover"
              data-ai-hint="office team collaboration"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
