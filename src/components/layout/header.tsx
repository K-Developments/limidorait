
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
    scrolled: boolean;
}

export function Header({ onMenuClick, scrolled }: HeaderProps) {
  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -100 
    },
    visible: {
      opacity: 1,
      y: 0,
      backgroundColor: "hsla(var(--card) / 0.9)",
      backdropFilter: "blur(8px)",
      height: "5rem",
      borderBottomWidth: "1px",
      borderBottomColor: "hsl(var(--border) / 0.5)",
    }
  };

  const hamburgerVariants = {
    hidden: {
      opacity: 0,
      x: 100
    },
    visible: {
      opacity: 1,
      x: 0,
    }
  }

  return (
    <>
    <AnimatePresence>
      {!scrolled && (
        <motion.div
          className="fixed top-6 right-6 z-50"
          variants={hamburgerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full transition-colors bg-background/80 hover:bg-primary/10"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
    <AnimatePresence>
      {scrolled && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-40 flex items-center"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative flex justify-between items-center h-full">
              <Link href="/">
                <span 
                  className="font-headline font-bold uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-2xl"
                  style={{
                    textShadow: '0 2px 10px hsla(var(--primary), 0.3)',
                  }}
                >
                  Limidora
                </span>
                <span className="sr-only">Limidora Home</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <Button asChild className="hidden md:flex">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                
                 <button
                    onClick={onMenuClick}
                    className="p-2 rounded-full transition-colors hover:bg-primary/10"
                    aria-label="Toggle menu"
                  >
                    <Menu className="h-6 w-6 text-foreground" />
                  </button>
              </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
    </>
  );
}
