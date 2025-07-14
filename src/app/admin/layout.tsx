
import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/admin-sidebar';
import { Toaster } from "@/components/ui/toaster";
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
    <div className="flex min-h-screen bg-muted/40 w-full">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
        </main>
        {/* Toaster can be here if you want separate toasts for admin */}
    </div>
  );
}
