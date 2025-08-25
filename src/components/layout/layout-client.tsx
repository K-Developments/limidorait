
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';
import { HeroContent, Service } from '@/services/firestore';
import { Header } from './header';
import { Footer } from './footer';

interface LayoutClientProps {
  children: React.ReactNode;
  navItems: { name: string; href?: string }[];
  heroContent: HeroContent | null;
  services: Service[];
}

export function LayoutClient({ children, navItems, heroContent, services }: LayoutClientProps) {
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

  return (
    <>
      {!isAdminPage && <Header onMenuClick={() => setSidebarOpen(true)} content={heroContent} services={services} />}
      {!isAdminPage && <Sidebar navItems={navItems} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
      <div id="main-content-wrapper" className={cn("flex min-h-screen flex-col", !isAdminPage && "pt-20")}>
        <main className="flex-1">{children}</main>
        {!isAdminPage && <Footer content={heroContent} />}
      </div>
    </>
  );
}
