
import { Faq } from "@/components/sections/faq";
import { MotionWrapper } from "@/components/motion-wrapper";
import { PageHero } from "@/components/sections/page-hero";
import type { Metadata, ResolvingMetadata } from 'next';
import { HomepageCta } from "@/components/sections/homepage-cta";
import { getHeroContent, getFaqContent } from "@/services/firestore";
import { PublicLayout } from "../public-layout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-static';

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
    const ctaContent = faqContent.ctaSection || heroContent.ctaSection;

    return (
        <PublicLayout>
            <MotionWrapper>
                <div className="container mx-auto px-4 md:px-6 pt-8">
                    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span className="font-medium text-foreground">FAQs</span>
                    </nav>
                    <Separator className="mt-4" />
                </div>
                <PageHero title={faqContent.heroTitle} subtitle={faqContent.heroSubtitle} />
                <Faq content={faqContent} />
                {ctaContent && <HomepageCta ctaSection={ctaContent} />}
            </MotionWrapper>
        </PublicLayout>
    );
}
