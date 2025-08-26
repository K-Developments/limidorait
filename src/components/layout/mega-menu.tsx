
"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Service } from '@/services/firestore';
import Link from 'next/link';
import Image from 'next/image';

interface MegaMenuProps {
  services: Service[];
}

export function MegaMenu({ services }: MegaMenuProps) {

  const menuVariants = {
    hidden: { 
        opacity: 0, 
        y: -10,
        transition: { duration: 0.2, ease: 'easeOut' }
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.3, 
            ease: 'easeInOut',
            staggerChildren: 0.07,
            delayChildren: 0.1
        }
    },
    exit: { 
        opacity: 0, 
        y: -10,
        transition: { duration: 0.2, ease: 'easeOut' }
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const featuredServices = services.slice(0, 4);

  return (
    <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={menuVariants}
        className="absolute top-full left-0 w-full bg-card shadow-lg border-t"
    >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12">
            
            {/* Left side: List of all services */}
            <motion.div variants={itemVariants} className="col-span-4 p-6 border-r">
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">All Services</h3>
                <ul className="space-y-2">
                {services.map(service => (
                    <li key={service.id}>
                    <Link href={service.link} className="block p-2 rounded-md hover:bg-accent hover:text-accent-foreground text-sm font-medium text-foreground transition-colors">
                        {service.title}
                    </Link>
                    </li>
                ))}
                </ul>
            </motion.div>
            
            {/* Right side: Featured services with images */}
            <motion.div variants={itemVariants} className="col-span-8 p-6">
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Featured Services</h3>
                <div className="grid grid-cols-2 gap-4">
                {featuredServices.map(service => (
                    <li key={service.id} className="list-none">
                    <Link href={service.link} className="group flex items-center gap-4 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
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
                            <p className="font-semibold text-sm group-hover:text-accent-foreground text-foreground">{service.title}</p>
                            <p className="text-xs group-hover:text-accent-foreground/80 text-muted-foreground line-clamp-2">{service.description}</p>
                        </div>
                    </Link>
                    </li>
                ))}
                </div>
            </motion.div>

            </div>
            
            {/* Bottom "View All" link */}
            <motion.div variants={itemVariants} className="bg-muted/50 p-4 text-center">
            <Button asChild variant="link" className="text-sm font-medium">
                <Link href="/services">View All Services &rarr;</Link>
            </Button>
            </motion.div>
        </div>
    </motion.div>
  );
}
