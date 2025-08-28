
import { About } from "@/components/sections/about";
import { PageHero } from "@/components/sections/page-hero";
import { WhyUs } from "@/components/sections/why-us";
import { WorkProcess } from "@/components/sections/work-process";
import { Testimonials } from "@/components/sections/homepage-testimonials";
import { HomepageCta } from "@/components/sections/homepage-cta";
import { getHeroContent, getAboutContent, AboutContent } from "@/services/firestore";
import type { Metadata, ResolvingMetadata } from 'next';
import { PublicLayout } from "../public-layout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-static';

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const aboutContent = await getAboutContent();
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: aboutContent.heroTitle ? `${aboutContent.heroTitle} | Limidora` : 'About Limidora | Our Vision & Process',
    description: aboutContent.heroSubtitle || 'Learn about the vision, team, and creative process at Limidora. We are a digital agency dedicated to building exceptional IT solutions and web experiences.',
    openGraph: {
      images: [...previousImages],
    },
  }
}

export default async function AboutPage() {
    const heroContent = await getHeroContent();
    const aboutContent = await getAboutContent();
    const ctaContent = aboutContent.ctaSection || heroContent.ctaSection;

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 md:px-6 pt-8">
                <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="font-medium text-foreground">About</span>
                </nav>
                <Separator className="mt-4" />
            </div>
            <PageHero title={aboutContent.heroTitle} subtitle={aboutContent.heroSubtitle} />
            <About content={aboutContent} />
            <WhyUs content={aboutContent.whyUsSection} />
            <WorkProcess />
            {heroContent && <Testimonials testimonials={heroContent.testimonials} />}
            {ctaContent && <HomepageCta ctaSection={ctaContent} />}
        </PublicLayout>
    );
}
