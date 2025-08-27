import { getHeroContent } from "@/services/firestore";
import type { Metadata } from 'next';
import HomePageClient from "./home-page-client";
import { PublicLayout } from "./public-layout";

export const dynamic = 'force-static';

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

export default async function Page() {
  console.log('🏠 Home page rendering...');
  console.log('🔧 Build Environment Check:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: !!process.env.VERCEL,
    PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    API_KEY_EXISTS: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    API_KEY_PREFIX: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 10)
  });
  
  const content = await getHeroContent();
  
  // Debug what we actually got
  console.log('🎯 Final content check:', {
    title: content.title,
    isDefaultTitle: content.title === "Creative Agency",
    logoText: content.logoText,
    slidesCount: content.slides?.length,
    socialLinksCount: content.socialLinks?.length
  });

  return (
    <PublicLayout>
        <HomePageClient content={content} />
    </PublicLayout>
  );
}