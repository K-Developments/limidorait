
'use client';

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import { Cinzel, Jost } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';
import { FloatingLogo } from '@/components/layout/floating-logo';

const metadata: Metadata = {
  title: 'Limidora Digital | Creative IT Solutions',
  description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy.',
};

const fontHeadline = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-headline',
});

const fontBody = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [isSidebarOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Solutions' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Blog & News', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <html lang="en">
      <body className={cn("font-body antialiased", fontHeadline.variable, fontBody.variable)}>
        {!isAdminPage && <Header scrolled={scrolled} onMenuClick={() => setSidebarOpen(true)} />}
        {!isAdminPage && <FloatingLogo scrolled={scrolled} />}
        {!isAdminPage && <Sidebar navItems={navItems} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
        <div id="main-content-wrapper" className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          {!isAdminPage && <Footer />}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
