
import { MotionWrapper } from "@/components/motion-wrapper";
import { HomepageCta } from "@/components/sections/homepage-cta";
import { ServicesHero } from "@/components/sections/services-hero";
import { ServicesList } from "@/components/sections/services-list";
import { getHeroContent, getServices } from "@/services/firestore";
import { PublicLayout } from "../public-layout";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
    const heroContent = await getHeroContent();
    const services = await getServices();
    return (
        <PublicLayout>
            <MotionWrapper>
                <ServicesHero />
                <ServicesList services={services} />
                {heroContent && <HomepageCta ctaSection={heroContent.ctaSection} />}
            </MotionWrapper>
        </PublicLayout>
    );
}
