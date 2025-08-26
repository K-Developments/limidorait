
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${fontBody.variable} font-body antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
