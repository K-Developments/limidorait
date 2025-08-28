
"use client";

import { useEffect, useState, useRef } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Image from "next/image";
import { HeroContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { HomepageServices } from "@/components/sections/homepage-services";
import { HomepageWorks } from "@/components/sections/homepage-works";
import { Testimonials } from "@/components/sections/homepage-testimonials";
import { HomepageAbout } from "@/components/sections/homepage-about";
import { HomepageCta } from "@/components/sections/homepage-cta";

interface HomePageClientProps {
  content: HeroContent | null;
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
    size: rand() * 500 + 20,
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
      {/* 🔹 Large animated glowing gradient cells */}
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          className="absolute rounded-full"
          style={{
            left: `${cell.x}%`,
            top: `${cell.y}%`,
            width: `${cell.size}px`,
            height: `${cell.size}px`,
            background: `radial-gradient(circle, hsl(0 0% 94.1% / 0.25) 0%, hsl(0 0% 94.1% / 0.08) 60%, transparent 100%)`,
            filter: "blur(20px)",
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.15, 0.95, 1],
            opacity: [0.2, 0.6, 0.3, 0.5],
          }}
          transition={{
            duration: cell.duration,
            delay: cell.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🔹 Futuristic floating particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: "hsl(0 0% 94.1% / 0.5)",
            filter: "blur(2px)",
          }}
          animate={{
            y: [0, -120, 0],
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

const HeroSection = ({ content }: { content: HeroContent | null }) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSlideChange = (swiperInstance: SwiperClass) => {
    const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
    const video = activeSlide.querySelector('video');

    if (video) { 
      swiperInstance.autoplay.stop();
      video.currentTime = 0;
      video.play().catch(error => {
        console.error("Video autoplay prevented:", error);
      });
    } else {
      if (!swiperInstance.autoplay.running) {
         swiperInstance.autoplay.start();
      }
    }
  };

  const onVideoEnd = () => {
    swiper?.slideNext();
  };

  if (!content) {
    return (
      <section className="relative w-full h-[80vh] bg-muted">
        <Skeleton className="w-full h-full" />
      </section>
    );
  }

  return (
    <section 
      aria-labelledby="hero-title"
      className="relative flex md:flex-row flex-col items-end justify-start w-full h-[80vh] bg-neutral-900 text-white overflow-hidden hero-section"
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        className="absolute inset-0 w-full h-full"
      >
        {content.slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.type === 'video' ? (
              <video
                ref={videoRef}
                src={slide.url}
                autoPlay={index === 0}
                muted
                playsInline
                onEnded={onVideoEnd}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={slide.url}
                alt={slide.alt || `Hero image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
  {/* 🔹 Animated Cells Background */}
  <AnimatedCells />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
     

{/* 🔹 Overlay gradient shimmer */}
<div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 animate-pulse" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12 md:basis-2/3 flex items-end w-full h-full"
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
              animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
              transition={{ duration: 6, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
            />
          </div>

          <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
              animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
              transition={{ duration: 7, repeat: Infinity, repeatDelay: 9, delay: 1, ease: "easeInOut" }}
            />
          </div>

          <div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/40 via-white/20 to-transparent"
              animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
              transition={{ duration: 8, repeat: Infinity, repeatDelay: 10, delay: 1, ease: "easeInOut" }}
            />
          </div>

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
              transition={{ duration: 7, repeat: Infinity, repeatDelay: 10, delay: 1, ease: "easeInOut" }}
            />
          </div>

          <div className="absolute right-0 top-2/3 w-full h-[1px] overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/30 via-white/10 to-transparent"
              animate={{ x: ["100%", "-100%"], opacity: [0, 0.4, 0] }}
              transition={{ duration: 7, repeat: Infinity, repeatDelay: 10, delay: 1, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            className="absolute top-1/4 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-2xl"
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl"
            animate={{ scale: [1, 0.85, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 9, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          />
        </div>
        
        <div className="relative">
          <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 font-headline" style={{lineHeight:1.2}}>
            {content.title}
          </h1>
          <Button asChild size="lg">
            <Link href={content.buttonLink || '#'}>{content.buttonText}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};


export default function HomePageClient({ content }: HomePageClientProps) {
  if (!content) {
    return (
      <div>
        <HeroSection content={null} />
        <div className="container py-12 space-y-12">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection content={content} />
      {content.services && <HomepageServices services={content.services} />}
      {content && <HomepageWorks works={content.works} />}
      {content && <Testimonials testimonials={content.testimonials} />}
      {content && <HomepageAbout aboutSection={content.aboutSection} />}
      {content && <HomepageCta ctaSection={content.ctaSection} />}
    </div>
  );
}

    