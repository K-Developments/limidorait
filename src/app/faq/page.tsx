
import { Faq } from "@/components/sections/faq";
import { MotionWrapper } from "@/components/motion-wrapper";
import { FaqHero } from "@/components/sections/faq-hero";
import type { Metadata } from 'next';
import { HomepageCta } from "@/components/sections/homepage-cta";
import { getHeroContent } from "@/services/firestore";

export const metadata: Metadata = {
  title: 'FAQs | Limidora Digital',
  description: 'Find answers to frequently asked questions about our services, development process, project costs, and more. Get the information you need from Limidora.',
};

export default async function FaqPage() {
    const heroContent = await getHeroContent();
    return (
        <MotionWrapper>
            <FaqHero />
            <Faq />
            {heroContent && <HomepageCta ctaSection={heroContent.ctaSection} />}
        </MotionWrapper>
    );
}
