
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { getHeroContent, HeroContent } from "@/services/firestore";
import { Skeleton } from "@/components/ui/skeleton";

import "swiper/css";
import "swiper/css/effect-fade";

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
            "https://placehold.co/800x1200.png",
            "https://placehold.co/800x1200.png",
            "https://placehold.co/800x1200.png"
          ],
          serviceSlides: [
              { text: "Web", image: "https://placehold.co/400x400.png", hint: "modern website" },
              { text: "Mobile App", image: "https://placehold.co/400x400.png", hint: "app interface" },
              { text: "Web Application", image: "https://placehold.co/400x400.png", hint: "saas dashboard" },
              { text: "Software", image: "https://placehold.co/400x400.png", hint: "custom software" },
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

    const tl = gsap.timeline({delay: 0.5});
    
    let ctx = gsap.context(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile) {
            gsap.set(heroImageRef.current, { height: "auto"});
            tl.to(heroImageRef.current, {
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
        
        gsap.set(heroContentRef.current, { opacity: 0, x: -50 });
        tl.to(heroContentRef.current, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
        }, "-=0.8");

    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <section ref={heroRef} className="hero-section relative min-h-screen flex items-center bg-gray-50 overflow-hidden">
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
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-headline text-foreground">
                        {content?.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-2xl text-muted-foreground">
                        {content?.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <Button asChild size="lg">
                            <Link href="/solutions">View Our Work</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/contact">Get in Touch</Link>
                        </Button>
                    </div>
                  </>
                )}
            </div>
        </div>

        <div className="hero-background absolute inset-0 z-0">
            <div className="shape-1"></div>
            <div className="shape-2"></div>
        </div>

        <div ref={heroImageRef} className="hero-image absolute right-0 bottom-0 h-full flex flex-col justify-end" style={{ width: '50vw' }}>
          {isLoading ? (
            <Skeleton className="w-full h-full"/>
          ) : (
            <div className="relative h-full w-full">
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
                {(content?.imageUrls || []).map((url, index) => (
                    <SwiperSlide key={index} className="relative">
                        <Image src={url} alt={`Creative work ${index + 1}`} fill objectFit="cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
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
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        className="w-full"
                    >
                        {(content?.serviceSlides || []).map((slide, index) => (
                            <SwiperSlide key={index} className="border-r border-white/10 last:border-r-0">
                                <div className="aspect-square relative group">
                                    <Image src={slide.image} alt={slide.text} fill objectFit="cover" data-ai-hint={slide.hint} />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-white text-lg font-bold">{slide.text}</h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
          )}
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
    <>
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
                  className="text-center p-6 border-2 border-transparent hover:border-primary transition-colors duration-300"
                >
                  <CardHeader className="items-center">
                    <div className="p-4 bg-primary/10">
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
    </>
  );
}
