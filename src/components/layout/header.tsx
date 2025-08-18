
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'FAQs', href: '/faq' },
  ];

  const servicesLinks = [
      { name: 'Web Developments', href: '/services'},
      { name: 'Mobile App Developments', href: '/services'},
      { name: 'Software Developments', href: '/services'},
      { name: 'Web App Developments', href: '/services'},
  ]

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

          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-x-8">
            {navLinks.map((link) => (
                 <Link key={link.name} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                    {link.name}
                 </Link>
            ))}
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors px-0 hover:bg-transparent">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {servicesLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild>
                        <Link href={link.href}>{link.name}</Link>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:flex">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            
             <button
                onClick={onMenuClick}
                className="p-2 rounded-full transition-colors hover:bg-primary/10 md:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
          </div>
      </div>
    </header>
  );
}
