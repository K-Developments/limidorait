
"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ClientLogo as ClientLogoType } from "@/services/firestore";
import Image from "next/image";

const ClientLogo = ({ logo }: { logo: ClientLogoType }) => (
    <div className={cn(
        "flex-shrink-0 w-36 h-20 mx-8 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
    )}>
        <Image src={logo.logoUrl} alt={logo.name} width={144} height={80} className="object-contain" />
    </div>
);


interface ClientsCarouselProps {
    title: string;
    subtitle: string;
    logos: ClientLogoType[];
}

export function ClientsCarousel({ title, subtitle, logos }: ClientsCarouselProps) {
    if (!logos || logos.length === 0) return null;

    // Duplicate logos for a seamless loop
    const allLogos = [...logos, ...logos];

  return (
    <section id="clients" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <Badge variant="outline" className="mb-4">Our Clients</Badge>
                <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-body uppercase">
                    {title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </motion.div>
            <div className="relative w-full overflow-hidden">
                <div 
                    className="flex animate-scroll-horizontal hover:[animation-play-state:paused]"
                >
                    {allLogos.map((logo, index) => (
                        <div key={index} className="flex-shrink-0">
                           <ClientLogo logo={logo} />
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
        </div>
    </section>
  );
}
