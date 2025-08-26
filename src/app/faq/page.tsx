
import { Faq } from "@/components/sections/faq";
import { MotionWrapper } from "@/components/motion-wrapper";
import { FaqHero } from "@/components/sections/faq-hero";
import type { Metadata, ResolvingMetadata } from 'next';
import { HomepageCta } from "@/components/sections/homepage-cta";
import { getHeroContent, getFaqContent } from "@/services/firestore";
import { PublicLayout } from "../public-layout";

export const dynamic = "force-static";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const faqContent = await getFaqContent();
 
  return {
    title: faqContent.heroTitle ? `${faqContent.heroTitle} | Limidora Digital` : 'FAQs | Limidora Digital',
    description: faqContent.heroSubtitle || 'Find answers to frequently asked questions about our services, development process, project costs, and more. Get the information you need from Limidora.',
  }
}

export default async function FaqPage() {
    const heroContent = await getHeroContent();
    const faqContent = await getFaqContent();
    return (
        <PublicLayout>
            <MotionWrapper>
                <FaqHero content={faqContent} />
                <Faq content={faqContent} />
                {heroContent && <HomepageCta ctaSection={heroContent.ctaSection} />}
            </MotionWrapper>
        </PublicLayout>
    );
}
