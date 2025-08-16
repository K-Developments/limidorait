
"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Using inline SVGs for generic logos to avoid external dependencies and alignment issues.
const ClientLogo = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn(
        "flex-shrink-0 w-36 h-20 mx-8 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300", 
        className
    )}>
        {children}
    </div>
);

// A few generic, recognizable-style logos
const logos = [
    <ClientLogo key="1"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10"><path d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24Z" fill="currentColor"></path></svg></ClientLogo>,
    <ClientLogo key="2"><svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24"><path d="M 4 4 L 4 28 L 28 28 L 28 4 Z M 8 8 L 14 8 L 14 14 L 8 14 Z M 18 8 L 24 8 L 24 14 L 18 14 Z M 8 18 L 14 18 L 14 24 L 8 24 Z M 18 18 L 24 18 L 24 24 L 18 24 Z" /></svg></ClientLogo>,
    <ClientLogo key="3"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16"><path d="M12,17.27L18.18,21L17,14.64L22,9.24L15.81,8.62L12,3L8.19,8.62L2,9.24L7,14.64L5.82,21L12,17.27Z" /></svg></ClientLogo>,
    <ClientLogo key="4"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg></ClientLogo>,
    <ClientLogo key="5"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></ClientLogo>,
    <ClientLogo key="6"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor"><path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 14-7-5.5V6l7 5.5V18zm0-11L5 6h14l-7 5.5z"/></svg></ClientLogo>,
    <ClientLogo key="7"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24"><path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" /></svg></ClientLogo>,
];

// Duplicate logos for a seamless loop
const allLogos = [...logos, ...logos];

export function ClientsCarousel() {
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
                    Trusted by Industry Leaders
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    We partner with ambitious brands and people. We'd love to build something great with you.
                </p>
            </motion.div>
            <div className="relative w-full overflow-hidden">
                <div 
                    className="flex animate-scroll-horizontal hover:[animation-play-state:paused]"
                >
                    {allLogos.map((logo, index) => (
                        <div key={index} className="flex-shrink-0">
                           {logo}
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
