
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

interface FloatingLogoProps {
    scrolled: boolean;
}

export function FloatingLogo({ scrolled }: FloatingLogoProps) {
    const logoVariants = {
        top: { 
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            fontSize: "clamp(2rem, 10vw, 5rem)",
            opacity: 1,
        },
        scrolled: { 
            top: "1.5rem",
            left: "2rem",
            x: 0,
            y: 0,
            fontSize: "1.5rem",
            opacity: 0
        }
    };

    return (
        <motion.div
            className="fixed z-50"
            variants={logoVariants}
            initial="top"
            animate={scrolled ? "scrolled" : "top"}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <Link href="/">
              <span 
                className="font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 font-headline"
                style={{
                  textShadow: '0 2px 10px hsla(var(--primary), 0.3)',
                  pointerEvents: 'none'
                }}
              >
                Limidora
              </span>
            </Link>
        </motion.div>
    );
}
