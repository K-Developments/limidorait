
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center h-20 border-b bg-background/90 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative flex justify-between items-center h-full">
          <Link href="/">
            <span 
              className="font-medium uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 text-2xl"
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
    </header>
  );
}
