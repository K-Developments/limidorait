
'use client';

import { usePathname } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

const fontBody = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Limidora Digital',
    default: 'Limidora Digital | Creative IT Solutions',
  },
  description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy.',
  keywords: ['web development', 'ui/ux design', 'creative agency', 'it solutions', 'limidora'],
  openGraph: {
    title: 'Limidora Digital | Creative IT Solutions',
    description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy.',
    url: 'https://limidora.com',
    siteName: 'Limidora Digital',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limidora Digital | Creative IT Solutions',
    description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy.',
  }
};


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
