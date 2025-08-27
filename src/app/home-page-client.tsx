"use client";

import { useEffect, useState, useRef } from "react";
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
import { ArrowRight } from "lucide-react";

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

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 p-8 md:p-12 md:basis-2/3 flex items-end w-[100%] h-[100%]"
      >
        {/* Enhanced Ambient Glow Effects */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Corner Ambient Glows */}
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-6xl"
            style={{ 
              background: 'radial-gradient(circle, #F0F0F0, rgba(240, 240, 240, 0.4), transparent)',
              filter: 'blur(100px)'
            }}
            animate={{ 
              x: [-60, 50, -50], 
              y: [-50, 100, -50],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.15, 0.35, 0.15] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-6xl"
            style={{ 
              background: 'radial-gradient(circle, #F0F0F0, rgba(240, 240, 240, 0.3), transparent)',
              filter: 'blur(100px)'
            }}
            animate={{ 
              x: [50, -50, 50], 
              y: [-30, 80, -30],
              scale: [0.9, 1.1, 0.9],
              opacity: [0.12, 0.28, 0.12] 
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
            style={{ 
              background: 'radial-gradient(circle, #F0F0F0, rgba(240, 240, 240, 0.35), transparent)',
              filter: 'blur(60px)'
            }}
            animate={{ 
              x: [-40, 60, -40], 
              y: [40, -60, 40],
              scale: [0.7, 1, 0.7],
              opacity: [0.18, 0.32, 0.18] 
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-0 right-0 w-88 h-88 rounded-full blur-3xl"
            style={{ 
              background: 'radial-gradient(circle, #F0F0F0, rgba(240, 240, 240, 0.25), transparent)',
              filter: 'blur(100px)'
            }}
            animate={{ 
              x: [30, -70, 30], 
              y: [50, -80, 50],
              scale: [1, 0.8, 1],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ duration: 7, repeat: Infinity, delay: 3, ease: "easeInOut" }}
          />

          {/* Floating Ambient Particles */}
          <motion.div
            className="absolute top-1/4 left-1/5 w-20 h-20 rounded-full blur-2xl"
            style={{ 
              background: 'radial-gradient(circle, #F0F0F0, rgba(240, 240, 240, 0.4), transparent)',
              filter: 'blur(20px)'
            }}
            animate={{ 
              x: [0, 150, -100, 0], 
              y: [0, -80, 120, 0],
              scale: [0.6, 1, 0.8, 0.6],
              opacity: [0.1, 0.4, 0.2, 0.1] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute top-2/3 right-1/4 w-16 h-16 rounded-full blur-2xl"
            style={{ 
              background: 'radial-gradient(circle, #F0F0F0, rgba(240, 240, 240, 0.35), transparent)',
              filter: 'blur(25px)'
            }}
            animate={{ 
              x: [0, -120, 80, 0], 
              y: [0, 100, -60, 0],
              scale: [0.5, 0.9, 1.1, 0.5],
              opacity: [0.15, 0.25, 0.35, 0.15] 
            }}
            transition={{ duration: 9, repeat: Infinity, delay: 4, ease: "easeInOut" }}
          />

          {/* Vertical Lines with Enhanced Glow */}
          <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-20"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(240, 240, 240, 0.6), rgba(240, 240, 240, 0.3), transparent)',
                filter: 'blur(2px)'
              }}
              animate={{ y: ["-100%", "100%"], opacity: [0, 0.7, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
          </div>

          <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-20"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(240, 240, 240, 0.6), rgba(240, 240, 240, 0.3), transparent)',
                filter: 'blur(2px)'
              }}
              animate={{ y: ["-100%", "100%"], opacity: [0, 0.7, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 1, ease: "easeInOut" }}
            />
          </div>

          <div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-20"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(240, 240, 240, 0.6), rgba(240, 240, 240, 0.3), transparent)',
                filter: 'blur(2px)'
              }}
              animate={{ y: ["-100%", "100%"], opacity: [0, 0.7, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 2, ease: "easeInOut" }}
            />
          </div>

          {/* Horizontal Lines with Enhanced Glow */}
          <div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-full"
              style={{ 
                background: 'linear-gradient(to left, rgba(240, 240, 240, 0.6), rgba(240, 240, 240, 0.3), transparent)',
                filter: 'blur(3px)'
              }}
              animate={{ x: ["100%", "-100%"], opacity: [0, 0.6, 0] }}
              transition={{ duration: 6, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
            />
          </div>

          <div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-full"
              style={{ 
                background: 'linear-gradient(to left, rgba(240, 240, 240, 0.6), rgba(240, 240, 240, 0.3), transparent)',
                filter: 'blur(3px)'
              }}
              animate={{ x: ["100%", "-100%"], opacity: [0, 0.6, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, delay: 2, ease: "easeInOut" }}
            />
          </div>

          {/* Central Content Glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full"
            style={{ 
              background: 'radial-gradient(circle, rgba(240, 240, 240, 0.08), rgba(240, 240, 240, 0.04), transparent)',
              filter: 'blur(60px)',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{ 
              scale: [0.8, 1.3, 0.8],
              opacity: [0.1, 0.25, 0.1] 
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Subtle Edge Highlights */}
          <motion.div
            className="absolute top-0 left-0 w-32 h-1"
            style={{ 
              background: 'linear-gradient(to right, rgba(240, 240, 240, 0.4), transparent)',
              filter: 'blur(1px)'
            }}
            animate={{ 
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0] 
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute top-0 left-0 w-1 h-32"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(240, 240, 240, 0.4), transparent)',
              filter: 'blur(1px)'
            }}
            animate={{ 
              scaleY: [0, 1, 0],
              opacity: [0, 0.6, 0] 
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          />
        </div>
        
        <div className="relative">
          <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase mb-4 font-headline" style={{lineHeight:1.2}}>
            {content.title}
          </h1>
          <Button asChild size="lg" className="animate-arrow-on-hover">
            <Link href={content.buttonLink || '#'}>
                {content.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};


export default function HomePageClient({ content }: { content: HeroContent | null }) {
  if (!content) {
      return (
          <div>
              <HeroSection content={null} />
          </div>
      )
  }

  return (
    <div>
      <HeroSection content={content} />
      {content && content.services && <HomepageServices services={content.services} />}
      {content && <HomepageWorks works={content.works} />}
      {content && <Testimonials testimonials={content.testimonials} />}
      {content && <HomepageAbout aboutSection={content.aboutSection} />}
      {content && <HomepageCta ctaSection={content.ctaSection} />}
    </div>
  );
}