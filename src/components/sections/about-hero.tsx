
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative w-full h-[40vh] flex items-end justify-start text-left text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://placehold.co/1600x640.png"
          alt="Our team working together"
          fill
          className="object-cover"
          data-ai-hint="office team collaboration"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-8 md:p-12"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
          About Limidora
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          We are a team of passionate creators, thinkers, and innovators dedicated to building exceptional digital experiences.
        </p>
      </motion.div>
    </section>
  );
}
