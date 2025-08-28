
"use client";

import type { AboutContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function About({ content }: { content: AboutContent | null }) {
  const isLoading = !content;

  return (
    <section id="about-vision" className="w-full bg-background relative py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <Skeleton className="h-10 w-3/4" />
            </div>
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid md:grid-cols-3 gap-8 md:gap-16 items-start"
          >
            <div className="md:col-span-1 md:text-right">
              <h2 className="text-3xl font-semibold text-foreground tracking-tight">
                {content?.aboutTitle}
              </h2>
            </div>
            <div className="md:col-span-2 relative pl-8 md:pl-12">
              <div 
                aria-hidden="true" 
                className="absolute top-0 left-0 h-full w-px bg-border"
              />
              <div 
                aria-hidden="true" 
                className="absolute top-0 left-0 w-8 h-px bg-border"
              />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {content?.aboutDescription}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

    