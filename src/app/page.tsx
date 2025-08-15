
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
import { getHeroContent, HeroContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const heroContent = await getHeroContent();
        setContent(heroContent);
      } catch (error) {
        console.error("Failed to fetch hero content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

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
      swiperInstance.autoplay.start();
    }
  };

  const onVideoEnd = () => {
    swiper?.slideNext();
  };


  if (isLoading) {
    return (
      <section className="relative w-full h-[80vh] bg-muted">
        <Skeleton className="w-full h-full" />
      </section>
    );
  }

  return (
    <section 
      aria-labelledby="hero-title"
      className="hero-section relative flex items-end justify-start w-full h-[80vh] bg-neutral-900 text-white overflow-hidden"
    >
      <div className="hero-slider-container absolute inset-0 w-full h-full">
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
            className="w-full h-full"
        >
            {content?.slides.map((slide, index) => (
            <SwiperSlide key={index}>
                {slide.type === 'video' ? (
                <video
                    ref={index === 0 ? videoRef : null}
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
      </div>

      <div className="hero-content-container relative z-10 w-full md:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-none" />
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative z-10 p-8 md:p-12"
        >
            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase mb-4 font-headline">
            {content?.title}
            </h1>
            <Button asChild size="lg">
            <Link href={content?.buttonLink || '#'}>{content?.buttonText}</Link>
            </Button>
        </motion.div>
      </div>
    </section>
  );
};


export default function HomePage() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}

    
