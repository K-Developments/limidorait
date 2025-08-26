
'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/admin-sidebar';
import '../globals.css';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/auth-provider';

// This new inner component will be rendered as a child of AuthProvider,
// guaranteeing that the context is available to it and all its children (like Sidebar).
function AdminDashboard({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      <div
        className={cn(
          'flex flex-col sm:gap-4 sm:py-4 w-full transition-all duration-300 ease-in-out',
          isSidebarExpanded ? 'sm:pl-52' : 'sm:pl-14'
        )}
      >
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminDashboard>{children}</AdminDashboard>
    </AuthProvider>
  );
}
