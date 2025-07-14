
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/lib/portfolio-data";
import { ArrowRight, Lightbulb, Palette, PenTool } from "lucide-react";
import { PortfolioCard } from "@/components/PortfolioCard";

import "swiper/css";
import "swiper/css/effect-fade";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !heroImageRef.current || !heroContentRef.current) return;

    const tl = gsap.timeline({delay: 0.5});
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        gsap.set(heroImageRef.current, { width: "100%", height: "0", y: "100%"});
        tl.to(heroImageRef.current, {
            height: "60%",
            y: "40%",
            duration: 1.2,
            ease: "power3.inOut",
        });
    } else {
        gsap.set(heroImageRef.current, { width: "0%", right: 0 });
        tl.to(heroImageRef.current, {
            width: "50%",
            duration: 1.2,
            ease: "power3.inOut",
        });
    }
    
    tl.from(heroContentRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
    }, "-=0.5");


    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section relative min-h-screen flex items-center bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div ref={heroContentRef} className="max-w-3xl hero-content-container">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-headline text-foreground">
                    We Create Digital Experiences That Matter
                </h1>
                <p className="text-xl md:text-2xl mb-10 max-w-2xl text-muted-foreground">
                    Award-winning creative agency focused on branding, web design and development
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg">
                        <Link href="/solutions">View Our Work</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </div>
        </div>

        <div className="hero-background absolute inset-0 z-0">
            <div className="shape-1"></div>
            <div className="shape-2"></div>
        </div>

        <div ref={heroImageRef} className="hero-image absolute right-0 bottom-0 h-full">
            <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                className="h-full w-full"
            >
                <SwiperSlide>
                    <Image src="https://placehold.co/800x1200.png" alt="Creative work 1" layout="fill" objectFit="cover" data-ai-hint="creative work" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="https://placehold.co/800x1200.png" alt="Creative work 2" layout="fill" objectFit="cover" data-ai-hint="digital agency" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image src="https://placehold.co/800x1200.png" alt="Creative work 3" layout="fill" objectFit="cover" data-ai-hint="design studio" />
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
  );
};


export default function Home() {
  const services = [
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "Brand Identity",
      description:
        "Crafting unique visual identities that tell your story and resonate with your audience.",
    },
    {
      icon: <PenTool className="h-10 w-10 text-primary" />,
      title: "Web Design",
      description:
        "Designing beautiful, intuitive, and responsive websites that provide a seamless user experience.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Creative Strategy",
      description:
        "Developing innovative strategies to elevate your brand and engage your target market.",
    },
  ];

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        
        <section id="services" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                What We Do
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                Our services are designed to help your business stand out.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card
                  key={service.title}
                  className="text-center p-6 border-2 border-transparent hover:border-primary transition-colors duration-300 shadow-lg"
                >
                  <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="font-headline text-2xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-20 md:py-28 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground mt-2">
                A glimpse into our creative world.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/solutions">
                  View All Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
