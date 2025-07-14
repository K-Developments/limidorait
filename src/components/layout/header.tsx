
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';
import { User } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Disable scrolling when mobile menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = ''; // Ensure scroll is re-enabled on component unmount
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navItems = [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-card/80 backdrop-blur-sm' : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
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
      <MobileNav navItems={navItems} isOpen={menuOpen} onClose={toggleMenu} />
    </>
  );
}
