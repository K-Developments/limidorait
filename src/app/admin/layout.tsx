
import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/admin-sidebar';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin | Limidora Digital',
  description: 'Content Management System for Limidora Digital.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
        </main>
      </div>
    </div>
  );
}
