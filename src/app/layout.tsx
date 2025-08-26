
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getHeroContent, getServices } from '@/services/firestore';
import { SidebarProvider } from '@/components/layout/sidebar-provider';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [heroContent, services] = await Promise.all([
      getHeroContent(),
      getServices()
  ]);

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
        <SidebarProvider navItems={navItems}>
            <div className="flex min-h-screen flex-col pt-20">
                <Header content={heroContent} services={services} />
                <main className="flex-1">{children}</main>
                <Footer content={heroContent} />
            </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
