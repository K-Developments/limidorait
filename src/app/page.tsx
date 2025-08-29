import { getHeroContent } from "@/services/firestore";
import type { Metadata } from 'next';
import HomePageClient from "./home-page-client";
import { PublicLayout } from "./public-layout";

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://limidora.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Limidora Digital',
    default: 'Limidora Digital | Creative IT Solutions & Web Development',
  },
  description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy to help your business thrive.',
  keywords: ['web development', 'ui/ux design', 'creative agency', 'it solutions', 'limidora', 'digital agency', 'mobile app development'],
  authors: [{ name: 'Limidora Digital', url: BASE_URL }],
  creator: 'Limidora Digital',
  publisher: 'Limidora Digital',
  robots: 'index, follow',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Limidora Digital | Creative IT Solutions & Web Development',
    description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy to help your business thrive.',
    url: BASE_URL,
    siteName: 'Limidora Digital',
    images: [
      {
        url: 'https://cdn.jsdelivr.net/gh/K-Developments/media@main/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Limidora Digital Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limidora Digital | Creative IT Solutions & Web Development',
    description: 'Limidora is a creative agency offering modern IT solutions including web development, UI/UX design, and brand strategy.',
    images: ['https://cdn.jsdelivr.net/gh/K-Developments/media@main/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${BASE_URL}/site.webmanifest`,
};


export default async function Page() {
  const content = await getHeroContent();
  
  return (
    <PublicLayout>
        <HomePageClient content={content} />
    </PublicLayout>
  );
}
