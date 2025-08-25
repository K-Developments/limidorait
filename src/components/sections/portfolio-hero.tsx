
"use client";

import { motion } from "framer-motion";
import type { PortfolioContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioHero({ content }: { content: PortfolioContent | null }) {
  const isLoading = !content;

  return (
    <section 
      aria-labelledby="portfolio-hero-title"
      className="relative flex md:flex-row flex-col items-center justify-center w-full min-h-[50vh] bg-neutral-900 text-white overflow-hidden hero-section w-[100%] h-[100%]"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12 flex items-center justify-center w-[100%] h-[50vh]"
      >
         
            {/* Gentle Decorative Lines */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
     {/* Vertical Lines */}
<div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
  {/* Gentle moving highlight */}
  <motion.div
    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
    animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
  />
</div>

<div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
  <motion.div
    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
    animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0, ease: "easeInOut" }}
  />
</div>

<div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
  <motion.div
    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
    animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0, ease: "easeInOut" }}
  />
</div>

{/* Horizontal Lines */}
<div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden">
  <motion.div
    className="absolute top-0 right-0 w-32 h-full bg-gradient-to-r from-white/40 via-white/20 to-transparent"
    animate={{ x: ["100%", "-100%"], opacity: [0, 0.4, 0] }}
    transition={{ duration: 6, repeat: Infinity, repeatDelay: 9, ease: "easeInOut" }}
  />
</div>

<div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden">
  <motion.div
    className="absolute top-0 right-0 w-32 h-full bg-gradient-to-r from-white/40 via-white/20 to-transparent"
    animate={{ x: ["100%", "-100%"], opacity: [0, 0.4, 0] }}
    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0, ease: "easeInOut" }}
  />
</div>


          <div className="absolute right-0 top-2/3 w-full h-[1px] overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/30 via-white/10 to-transparent"
              animate={{ x: ["100%", "-100%"], opacity: [0, 0.4, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, delay: 0, ease: "easeInOut" }}
            />
          </div>

          {/* Ambient Glow */}
          <motion.div
            className="absolute top-1/4 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-2xl"
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl"
            animate={{ scale: [1, 0.85, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          />
        </div>
        
        <div className="relative text-center">
            {isLoading ? (
                <div className="space-y-4 flex flex-col items-center">
                    <Skeleton className="h-16 w-3/4 bg-white/10" />
                    <Skeleton className="h-8 w-full max-w-3xl bg-white/10" />
                </div>
            ) : (
                <>
                    <h1 id="portfolio-hero-title" className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase mb-4 font-headline" style={{lineHeight:1.2}}>
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
};
