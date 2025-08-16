
"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function ServicesHero() {

  return (
    <section 
      aria-labelledby="services-hero-title"
      className="relative flex md:flex-row flex-col items-center justify-center w-full min-h-[50vh] bg-neutral-900 text-white overflow-hidden hero-section w-[100%] h-[100%]"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12 flex items-center justify-center w-[100%] h-[50vh]"
      >
        {/* Decorative Lines */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
            <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
            <div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
            <div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
            <div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
        </div>
        
        <div className="relative text-center">
            <h1 id="services-hero-title" className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase mb-4 font-headline" style={{lineHeight:1.2}}>
                Our Services
            </h1>
            <p className="text-lg md:text-xl max-w-3xl text-primary-foreground/80">
                Crafting Digital Excellence, One Solution at a Time.
            </p>
        </div>
      </motion.div>
    </section>
  );
};
