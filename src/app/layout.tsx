
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getHeroContent, getServices } from '@/services/firestore';
import { LayoutClient } from '@/components/layout/layout-client';

const fontBody = Inter({
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

async function HeaderFooterDataProvider({ children }: { children: (data: any) => React.ReactNode }) {
    const [heroContent, services] = await Promise.all([
        getHeroContent(),
        getServices()
    ]);
    return <>{children({ heroContent, services })}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
      <body className={`${fontBody.variable} font-body antialiased`}>
        <HeaderFooterDataProvider>
            {({ heroContent, services }) => (
                <LayoutClient navItems={navItems} services={services} heroContent={heroContent}>
                    {children}
                </LayoutClient>
            )}
        </HeaderFooterDataProvider>
        <Toaster />
      </body>
    </html>
  );
}
