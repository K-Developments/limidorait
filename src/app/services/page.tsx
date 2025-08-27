
import { MotionWrapper } from "@/components/motion-wrapper";
import { HomepageCta } from "@/components/sections/homepage-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesList } from "@/components/sections/services-list";
import { getHeroContent, getServices } from "@/services/firestore";
import { PublicLayout } from "../public-layout";

export const dynamic = 'force-static';

export default async function ServicesPage() {
    const heroContent = await getHeroContent();
    const services = await getServices();
    return (
        <PublicLayout>
            <MotionWrapper>
                <PageHero title="Our Services" subtitle="Crafting Digital Excellence, One Solution at a Time." />
                <ServicesList services={services} />
                {heroContent && <HomepageCta ctaSection={heroContent.ctaSection} />}
            </MotionWrapper>
        </PublicLayout>
    );
}
