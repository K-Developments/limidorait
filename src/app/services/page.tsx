
import { MotionWrapper } from "@/components/motion-wrapper";
import { HomepageCta } from "@/components/sections/homepage-cta";
import { ServicesHero } from "@/components/sections/services-hero";
import { ServicesList } from "@/components/sections/services-list";
import { getHeroContent } from "@/services/firestore";

export default async function ServicesPage() {
    const heroContent = await getHeroContent();
    return (
        <MotionWrapper>
            <ServicesHero />
            <ServicesList />
            {heroContent && <HomepageCta ctaSection={heroContent.ctaSection} />}
        </MotionWrapper>
    );
}
