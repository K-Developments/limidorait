"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

/* ------------------------------
    Seeded Random Generator
--------------------------------*/
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------
    Generate deterministic cells
--------------------------------*/
function generateCells(count: number, seed = 42) {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 1000 + 40,
    delay: rand() * 2,
    duration: 3 + rand() * 2,
  }));
}

// Animated Cells Background Component
function AnimatedCells() {
  const [cells] = React.useState(() => generateCells(12, 2025));
  const [particles] = React.useState(() => generateCells(20, 99));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 🔹 Large animated gradient cells */}
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          className="absolute rounded-full"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            width: `${cell.size}px`,
            height: `${cell.size}px`,
            background: `radial-gradient(circle, hsl(180 18% 54% / 0.15) 0%, hsl(180 18% 54% / 0.05) 50%, transparent 100%)`,
            filter: "blur(1px)",
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.6, 0.2, 0.4],
          }}
          transition={{
            duration: cell.duration,
            delay: cell.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🔹 Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: "hsl(180 18% 54% / 0.3)",
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + p.delay,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------
   PageHero Component
--------------------------------*/
export function PageHero({ title, subtitle }: PageHeroProps) {
  const isLoading = !title && !subtitle;

  return (
    <section
      aria-labelledby="page-hero-title"
      className="relative flex md:flex-row flex-col items-center justify-center w-full min-h-[50vh] text-gray-800 overflow-hidden hero-section"
      style={{
        background: `linear-gradient(135deg, 
          hsl(0 0% 98%) 0%, 
          hsl(0 0% 94.1%) 30%, 
          hsl(180 18% 54% / 0.1) 70%, 
          hsl(0 0% 96%) 100%)`,
      }}
    >
      {/* 🔹 Animated Cells Background */}
      <AnimatedCells />

      {/* 🔹 Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12 flex items-center justify-center w-full h-[50vh]"
      >
        {/* 🔹 Decorative grid lines */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        <div className="relative text-center">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4 mx-auto bg-gray-300/30" />
              <Skeleton className="h-8 w-full max-w-lg mx-auto bg-gray-300/30" />
            </div>
          ) : (
            <>
              <motion.h1
                id="page-hero-title"
                className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase mb-4 font-headline bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent"
                style={{ lineHeight: 1.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {title}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl max-w-3xl text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {subtitle}
              </motion.p>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
