
import { MotionWrapper } from "@/components/motion-wrapper";
import { ServicesHero } from "@/components/sections/services-hero";
import { ServicesList } from "@/components/sections/services-list";

export default function ServicesPage() {
    return (
        <MotionWrapper>
            <ServicesHero />
            <ServicesList />
        </MotionWrapper>
    );
}
