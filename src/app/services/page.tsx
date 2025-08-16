
import { MotionWrapper } from "@/components/motion-wrapper";
import { ServicesHero } from "@/components/sections/services-hero";

export default function ServicesPage() {
    return (
        <MotionWrapper>
            <ServicesHero />
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-medium uppercase">Our Services</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Detailed information about our services is coming soon.
                </p>
            </div>
        </MotionWrapper>
    );
}
