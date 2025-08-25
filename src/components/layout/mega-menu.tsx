
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Service } from '@/services/firestore';
import Link from 'next/link';
import Image from 'next/image';

interface MegaMenuProps {
  services: Service[];
}

export function MegaMenu({ services }: MegaMenuProps) {
  const [isHovered, setHovered] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto' },
  };

  const featuredServices = services.slice(0, 4);

  return (
    <div 
        className="relative" 
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}
    >
      <Button variant="ghost" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-0 hover:bg-transparent">
        Services <ChevronDown className="ml-1 h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full -left-1/2 mt-2 w-screen max-w-4xl"
            style={{
                transform: 'translateX(calc(-50% + 40px))'
            }}
          >
            <div className="bg-background shadow-lg border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12">
                
                {/* Left side: List of all services */}
                <div className="col-span-4 p-6 border-r">
                  <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">All Services</h3>
                  <ul className="space-y-2">
                    {services.map(service => (
                      <li key={service.id}>
                        <Link href={service.link} className="block p-2 rounded-md hover:bg-primary/10 text-sm font-medium text-foreground transition-colors">
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Right side: Featured services with images */}
                <div className="col-span-8 p-6">
                  <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Featured Services</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {featuredServices.map(service => (
                      <li key={service.id} className="list-none">
                        <Link href={service.link} className="group flex items-center gap-4 p-2 rounded-md hover:bg-primary/10 transition-colors">
                            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                <Image 
                                    src={service.imageUrl} 
                                    alt={service.title} 
                                    fill 
                                    className="object-cover group-hover:scale-110 transition-transform" 
                                    data-ai-hint={service.aiHint}
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground">{service.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                            </div>
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* Bottom "View All" link */}
              <div className="bg-muted/50 p-4 text-center">
                <Button asChild variant="link" className="text-sm font-medium">
                  <Link href="/services">View All Services &rarr;</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
