
'use client';

import Link from 'next/link';
import { HeroContent, Service } from '@/services/firestore';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { MegaMenu } from './mega-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import { useSidebar } from './sidebar-provider';
import { Button } from '../ui/button';


interface HeaderProps {
    content: HeroContent | null;
    services: Service[];
}

function MobileMenuToggle() {
    const { setOpen } = useSidebar();
    return (
        <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-full transition-colors hover:bg-primary/10 md:hidden"
            aria-label="Toggle menu"
            >
            <Menu className="h-6 w-6 text-foreground" />
        </button>
    );
}

export function Header({ content, services }: HeaderProps) {
  const [isServicesHovered, setServicesHovered] = useState(false);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'FAQs', href: '/faq' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center h-20 border-b bg-background/90 backdrop-blur-sm"
      onMouseLeave={() => setServicesHovered(false)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative flex justify-between items-center h-full">
          <Link href="/" className="relative h-12 w-40">
            {!content ? (
              <Skeleton className="h-full w-full" />
            ) : content?.logoUrl ? (
              <Image src={content.logoUrl} alt={content.logoText || "Limidora Logo"} fill className="object-contain" />
            ) : (
              <span 
                className="font-semibold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-2xl"
                style={{
                  textShadow: '0 2px 10px hsla(var(--primary), 0.3)',
                }}
              >
                {content?.logoText || "Limidora"}
              </span>
            )}
            <span className="sr-only">Limidora Home</span>
          </Link>

          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-x-8">
            {navLinks.map((link) => (
                 <Link key={link.name} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                    {link.name}
                 </Link>
            ))}
            <div onMouseEnter={() => setServicesHovered(true)}>
              <button className="flex items-center text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-0 hover:bg-transparent">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="hidden md:inline-flex">
                <Link href="/contact">Get in Touch</Link>
            </Button>
            
            <MobileMenuToggle />
          </div>
          
          <AnimatePresence>
            {isServicesHovered && <MegaMenu services={services} />}
          </AnimatePresence>
      </div>
    </header>
  );
}

    