
"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section 
      aria-labelledby="about-hero-title"
      className="relative flex md:flex-row flex-col items-center justify-start w-full min-h-[50vh] bg-neutral-900 text-white overflow-hidden hero-section pt-20"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12 h-full flex items-center"
      >
        {/* Decorative Lines */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Top Lines */}
            <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
            <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
            {/* Right Lines */}
            <div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
            <div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
        </div>
        
        <div className="relative">
            <h1 id="about-hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-4 font-headline" style={{lineHeight:1.2}}>
                About Limidora
            </h1>
            <p className="text-lg md:text-xl max-w-3xl text-primary-foreground/80">
                We are a team of passionate creators, thinkers, and innovators dedicated to building exceptional digital experiences that drive success and inspire change.
            </p>
        </div>
      </motion.div>
    </section>
  );
};
