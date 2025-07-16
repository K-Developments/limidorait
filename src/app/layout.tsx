
'use client';

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';

const metadata: Metadata = {
  title: 'Limidora Digital | Creative IT Solutions',
  description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Blog & News', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <html lang="en">
      <body className="font-body antialiased">
        <div className="flex min-h-screen flex-col">
          {!isAdminPage && <Header onMenuClick={() => setSidebarOpen(true)} />}
          {!isAdminPage && <Sidebar navItems={navItems} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
          <main className="flex-1">{children}</main>
          {!isAdminPage && <Footer />}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
