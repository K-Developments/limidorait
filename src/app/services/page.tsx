
import { MotionWrapper } from "@/components/motion-wrapper";
import { HomepageCta } from "@/components/sections/homepage-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesList } from "@/components/sections/services-list";
import { getHeroContent, getServices } from "@/services/firestore";
import { PublicLayout } from "../public-layout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-static';

export default async function ServicesPage() {
    const heroContent = await getHeroContent();
    const services = await getServices();
    return (
        <PublicLayout>
            <MotionWrapper>
                 <div className="container mx-auto px-4 md:px-6 pt-8">
                    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-medium text-foreground">Services</span>
                    </nav>
                    <Separator className="mt-4" />
                </div>
                <PageHero title="Our Services" subtitle="Crafting Digital Excellence, One Solution at a Time." />
                <ServicesList services={services} />
                {heroContent && <HomepageCta ctaSection={heroContent.ctaSection} />}
            </MotionWrapper>
        </PublicLayout>
    );
}
