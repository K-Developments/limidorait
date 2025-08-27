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
import { HomepageServices } from "@/components/sections/homepage-services";
import { HomepageWorks } from "@/components/sections/homepage-works";
import { Testimonials } from "@/components/sections/homepage-testimonials";
import { HomepageAbout } from "@/components/sections/homepage-about";
import { HomepageCta } from "@/components/sections/homepage-cta";
import ParticlesWrapper from "@/components/ParticlesWrapper";

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
      <ParticlesWrapper />
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
        className="relative z-10 p-8 md:p-12 md:basis-2/3 flex items-end w-full h-full"
      >
        {/* Decorative Background Effects in Content Area */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Vertical Lines */}
          {[1 / 4, 2 / 4, 3 / 4].map((left, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#F0F0F0]/10 to-transparent overflow-hidden"
              style={{ left: `${left * 100}%` }}
            >
              <motion.div
                className="absolute top-0 w-full h-20 bg-gradient-to-b from-[#F0F0F0]/40 via-[#F0F0F0]/20 to-transparent"
                animate={{ y: ["-100%", "100%"], opacity: [0, 0.5, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, repeatDelay: 8 + i, delay: i, ease: "easeInOut" }}
              />
            </div>
          ))}

          {/* Horizontal Lines */}
          {[1 / 3, 2 / 3].map((top, i) => (
            <div
              key={i}
              className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#F0F0F0]/10 to-transparent overflow-hidden"
              style={{ top: `${top * 100}%` }}
            >
              <motion.div
                className="absolute w-32 h-full bg-gradient-to-r from-[#F0F0F0]/40 via-[#F0F0F0]/20 to-transparent"
                animate={{ x: ["100%", "-100%"], opacity: [0, 0.4, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, repeatDelay: 9 + i, delay: i, ease: "easeInOut" }}
              />
            </div>
          ))}

          {/* Ambient Glows */}
          <motion.div
            className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#F0F0F0]/5 rounded-full blur-2xl"
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-[#F0F0F0]/5 rounded-full blur-2xl"
            animate={{ scale: [1, 0.85, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 9, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          />
        </div>

        {/* Foreground Text Content */}
        <div className="relative z-10">
          <h1
            id="hero-title"
            className="text-4xl md:text-5xl lg:text-6xl font-medium uppercase mb-4 font-headline text-[#F0F0F0]"
            style={{ lineHeight: 1.2 }}
          >
            {content.title}
          </h1>
          <Button asChild size="lg">
            <Link href={content.buttonLink || "#"}>{content.buttonText}</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default function HomePage() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div>
      <HeroSection content={content} />
      {content?.services && <HomepageServices services={content.services} />}
      {content && <HomepageWorks works={content.works} />}
      {content && <Testimonials testimonials={content.testimonials} />}
      {content && <HomepageAbout aboutSection={content.aboutSection} />}
      {content && <HomepageCta ctaSection={content.ctaSection} />}
    </div>
  );
}
