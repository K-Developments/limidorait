
"use client";

import { motion } from "framer-motion";
import type { FaqContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function FaqHero({ content }: { content: FaqContent | null }) {
  const isLoading = !content;

  return (
    <section 
      aria-labelledby="faq-hero-title"
      className="relative flex md:flex-row flex-col items-center justify-center w-full min-h-[50vh] bg-neutral-900 text-white overflow-hidden hero-section"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12 flex items-center justify-center w-full h-[50vh]"
      >
        {/* Gentle Decorative Lines */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        
        <div className="relative text-center">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4 mx-auto bg-white/10" />
              <Skeleton className="h-8 w-full max-w-lg mx-auto bg-white/10" />
            </div>
          ) : (
            <>
              <h1 id="faq-hero-title" className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase mb-4 font-headline" style={{lineHeight:1.2}}>
                {content?.heroTitle}
              </h1>
              <p className="text-lg md:text-xl max-w-3xl text-primary-foreground/80">
                {content?.heroSubtitle}
              </p>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
