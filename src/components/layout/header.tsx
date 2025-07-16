
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerVariants = {
    top: {
      backgroundColor: "hsla(var(--card), 0)",
      backdropFilter: "blur(0px)",
      height: "8rem",
    },
    scrolled: {
      backgroundColor: "hsla(var(--card) / 0.9)",
      backdropFilter: "blur(8px)",
      height: "5rem",
      borderBottomWidth: "1px",
      borderBottomColor: "hsl(var(--border) / 0.5)",
    }
  };

  const logoVariants = {
    top: { 
        y: "2rem", 
        x: "-50%", 
        left: "50%",
        fontSize: "2.25rem",
        letterSpacing: "0.1em"
    },
    scrolled: { 
        y: 0,
        x: 0,
        left: "0",
        fontSize: "1.5rem",
        letterSpacing: "0em"
    }
  };
  
  const hamburgerVariants = {
    top: {
      top: "2.5rem",
      right: "1.25rem",
    },
    scrolled: {
      top: "1.5rem",
      right: "1rem",
    }
  };

  return (
    <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center"
        variants={headerVariants}
        animate={scrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative flex justify-between items-center h-full">
            <motion.div
                className="absolute top-1/2"
                variants={logoVariants}
                animate={scrolled ? "scrolled" : "top"}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  transform: 'translateY(-50%)',
                }}
            >
                <Link href="/">
                  <span 
                    className="font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 font-headline"
                    style={{
                      textShadow: '0 2px 10px hsla(var(--primary), 0.3)',
                    }}
                  >
                    Limidora
                  </span>
                </Link>
            </motion.div>
            
            <div className="ml-auto flex items-center gap-4">
              <AnimatePresence>
                {scrolled && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button asChild className="hidden md:flex">
                        <Link href="/contact">Get in Touch</Link>
                      </Button>
                    </motion.div>
                )}
              </AnimatePresence>
              
               <motion.button
                  onClick={onMenuClick}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    scrolled ? "hover:bg-primary/10" : "bg-card/90 backdrop-blur-md hover:bg-primary/10 shadow-lg"
                  )}
                  aria-label="Toggle menu"
                  variants={hamburgerVariants}
                  animate={scrolled ? "scrolled" : "top"}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <Menu className="h-6 w-6 text-foreground" />
                </motion.button>
            </div>
        </div>
      </motion.header>
  );
}
