
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';
import { User } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = ''; 
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navItems = [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
  ];

  const topBlockVariants = {
    initial: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  const navBarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <>
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="fixed top-0 left-0 right-0 flex justify-center z-50"
            variants={topBlockVariants}
            initial="initial"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="bg-card text-card-foreground shadow-lg px-8 py-4 rounded-bl-lg rounded-br-lg">
              <span className="text-xl font-bold uppercase" style={{ textShadow: '1px 1px 2px hsla(var(--primary), 0.5), -1px -1px 2px hsl(var(--card))' }}>Limidora</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrolled && (
          <motion.header
            className={cn(
              'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-card/80 backdrop-blur-sm'
            )}
            variants={navBarVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link href="/" className="text-2xl font-bold text-foreground transition-colors hover:text-primary">
                Limidora
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="hidden md:flex items-center gap-4">
                <Button asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Link href="/admin" aria-label="Admin Page">
                    <User className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </div>
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="z-50 p-2 relative"
                  aria-label="Toggle menu"
                >
                  <motion.div
                    animate={menuOpen ? "open" : "closed"}
                    initial={false}
                    className="w-6 h-5 flex flex-col justify-between"
                  >
                    <motion.span
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: 45, y: 9 },
                      }}
                      className="block h-0.5 w-full bg-foreground"
                    ></motion.span>
                    <motion.span
                       variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                      }}
                      className="block h-0.5 w-full bg-foreground"
                    ></motion.span>
                    <motion.span
                       variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: -45, y: -9 },
                      }}
                      className="block h-0.5 w-full bg-foreground"
                    ></motion.span>
                  </motion.div>
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <MobileNav navItems={navItems} isOpen={menuOpen && scrolled} onClose={toggleMenu} />
    </>
  );
}
