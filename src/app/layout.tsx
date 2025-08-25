
'use client';

import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';
import { HeroContent, Service } from '@/services/firestore';

const fontBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

interface RootLayoutProps {
  children: React.ReactNode;
  headerFooterData: {
    heroContent: HeroContent | null,
    services: Service[]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Blog & News', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={cn("font-body antialiased", fontBody.variable)}>
        {!isAdminPage && <Header onMenuClick={() => setSidebarOpen(true)} />}
        {!isAdminPage && <Sidebar navItems={navItems} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
        <div id="main-content-wrapper" className="flex min-h-screen flex-col pt-20">
          <main className="flex-1">{children}</main>
          {!isAdminPage && <Footer />}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
