
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://limidora.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Limidora Digital',
    default: 'Limidora Digital | Creative IT Solutions',
  },
  description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy.',
  keywords: ['web development', 'ui/ux design', 'creative agency', 'it solutions', 'limidora'],
  openGraph: {
    title: 'Limidora Digital | Creative IT Solutions',
    description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy.',
    url: BASE_URL,
    siteName: 'Limidora Digital',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limidora Digital | Creative IT Solutions',
    description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy.',
  },
  manifest: `${BASE_URL}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
