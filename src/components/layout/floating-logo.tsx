
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingLogoProps {
    scrolled: boolean;
}

export function FloatingLogo({ scrolled }: FloatingLogoProps) {
    const logoVariants = {
        top: { 
            opacity: 1,
            scale: 1,
            y: 0,
        },
        scrolled: { 
            opacity: 0,
            scale: 0.8,
            y: -20,
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <motion.div
                className={cn(
                    "relative pointer-events-auto mt-8"
                )}
                variants={logoVariants}
                initial="top"
                animate={scrolled ? "scrolled" : "top"}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                <Link href="/">
                  <span 
                    className="font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 font-headline"
                    style={{
                      fontSize: "clamp(2rem, 10vw, 5rem)",
                    }}
                  >
                    Limidora
                  </span>
                </Link>
            </motion.div>
        </div>
    );
}
