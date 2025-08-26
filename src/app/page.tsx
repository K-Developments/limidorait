
import { getHeroContent } from "@/services/firestore";
import type { Metadata } from 'next';
import HomePageClient from "./home-page-client";
import { PublicLayout } from "./public-layout";

export const revalidate = false;

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
  const content = await getHeroContent();

  return (
    <PublicLayout>
        <HomePageClient content={content} />
    </PublicLayout>
  );
}
