
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section 
      aria-labelledby="hero-title"
      className="relative flex items-end w-full h-[80vh] bg-neutral-900 text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12"
      >
        <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-4">
          Creative Agency
        </h1>
        <Button asChild size="lg">
          <Link href="/portfolio">View Our Work</Link>
        </Button>
      </motion.div>
    </section>
  );
};


export default function HomePage() {
  return (
    <div>
      <HeroSection />
      {/* Other new sections will be added here */}
    </div>
  );
}
