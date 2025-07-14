
"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { getHeroContent, HeroContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import ParticlesWrapper from "@/components/ParticlesWrapper";
import { Globe, Smartphone, Code, LayoutGrid } from 'lucide-react';


import "swiper/css";
import "swiper/css/effect-fade";

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "Web": Globe,
  "Mobile App": Smartphone,
  "Web Application": LayoutGrid,
  "Software": Code,
};


const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const heroContent = await getHeroContent();
        setContent(heroContent);
      } catch (error) {
        console.error("Failed to fetch hero content:", error);
        setContent({
          title: "We Create Digital Experiences That Matter",
          subtitle: "Award-winning creative agency focused on branding, web design and development",
          imageUrls: [
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop"
          ],
          serviceSlides: [
            { text: "Web", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop", hint: "modern website" },
            { text: "Mobile App", image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2670&auto=format&fit=crop", hint: "app interface" },
            { text: "Web Application", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2669&auto=format&fit=crop", hint: "saas dashboard" },
            { text: "Software", image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=2671&auto=format&fit=crop", hint: "custom software" },
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    if (isLoading || !heroRef.current || !heroImageRef.current || !heroContentRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });
    
    let ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      if (isMobile) {
        gsap.set(heroImageRef.current, { height: "auto" });
        tl.to(heroImageRef.current, {
          height: "auto",
          duration: 1.2,
          ease: "power3.inOut",
        });
      } else {
        gsap.set(heroImageRef.current, { width: "0%" });
        tl.to(heroImageRef.current, {
          width: "50vw",
          duration: 1.2,
          ease: "power3.inOut",
        });
      }
      
      gsap.set(heroContentRef.current, { opacity: 0, y: 30 });
      tl.to(heroContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");

    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <section ref={heroRef} className="hero-section relative min-h-screen flex items-center overflow-hidden">
      <ParticlesWrapper />
      <div className="container mx-auto px-6 relative z-10">
        <div ref={heroContentRef} className="max-w-3xl hero-content-container">
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-full mb-6" />
              <Skeleton className="h-10 w-3/4 mb-10" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </>
          ) : (
            <>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-foreground"
              >
                {content?.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl mb-10 max-w-2xl text-muted-foreground"
              >
                {content?.subtitle}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button asChild size="lg">
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
      
      <div ref={heroImageRef} className="hero-image absolute right-0 bottom-0 h-full flex flex-col justify-end">
        {isLoading ? (
          <Skeleton className="w-full h-full"/>
        ) : (
          <div className="relative h-full w-full">
            <Swiper
              modules={[EffectFade, Autoplay]}
              effect="fade"
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="h-full w-full"
            >
              {(content?.imageUrls || []).map((url, index) => (
                <SwiperSlide key={index} className="relative">
                  <Image 
                    src={url} 
                    alt={`Creative work ${index + 1}`} 
                    fill 
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent"></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute bottom-0 left-0 w-full z-10">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={2}
                breakpoints={{
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 0
                  },
                }}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  reverseDirection: true,
                }}
                className="w-full"
              >
                {(content?.serviceSlides || []).map((slide, index) => {
                  const Icon = iconMap[slide.text];
                  return (
                    <SwiperSlide key={index} className="border-r border-white/20 last:border-r-0">
                      <div className="aspect-square relative group overflow-hidden">
                        <Image 
                          src={slide.image} 
                          alt={slide.text} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center p-4">
                          {Icon && (
                            <Icon className="w-12 h-12 text-white/80 transition-opacity duration-300 group-hover:opacity-0" />
                          )}
                          <h3 className="text-white text-lg font-bold absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            {slide.text}
                          </h3>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        )}
      </div>
      <div className="hero-background">
          <div className="shape-1"></div>
          <div className="shape-2"></div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}
