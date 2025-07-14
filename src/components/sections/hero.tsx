"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  { src: "https://placehold.co/800x1200.png", aiHint: "creative work", alt: "Creative work" },
  { src: "https://placehold.co/800x1200.png", aiHint: "modern office", alt: "Modern Office" },
  { src: "https://placehold.co/800x1200.png", aiHint: "design process", alt: "Design Process" },
];

export function Hero() {
  const controls = useAnimation();
  const contentControls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await new Promise(res => setTimeout(res, 500));
      await contentControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    };
    sequence();
  }, [controls, contentControls]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0">
        <div className="shape-1 absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="shape-2 absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-float-delay"></div>
      </div>
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentControls}
          className="text-left"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            We Create Digital Experiences That <span className="text-primary">Matter</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Award-winning creative agency focused on branding, web design and development.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/solutions">View Our Work</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <Carousel
            className="w-full max-w-md mx-auto"
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                       <Image
                        src={image.src}
                        alt={image.alt}
                        width={800}
                        height={1200}
                        className="w-full h-full object-cover"
                        data-ai-hint={image.aiHint}
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
