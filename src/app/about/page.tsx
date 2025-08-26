
import { About } from "@/components/sections/about";
import { AboutHero } from "@/components/sections/about-hero";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/homepage-testimonials";
import { HomepageCta } from "@/components/sections/homepage-cta";
import { getHeroContent, getAboutContent, AboutContent } from "@/services/firestore";
import type { Metadata, ResolvingMetadata } from 'next';
import { InteractivePanels } from "@/components/sections/interactive-panels";

export const dynamic = "force-static";

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
      images: [aboutContent.heroImageUrl, ...previousImages],
    },
  }
}

export default async function AboutPage() {
    const heroContent = await getHeroContent();
    const aboutContent = await getAboutContent();
    return (
        <div>
            <AboutHero content={aboutContent} />
            <About content={aboutContent} />
            <WhyUs />
            <InteractivePanels content={aboutContent} />
            {heroContent && <Testimonials testimonials={heroContent.testimonials} />}
            {heroContent && <HomepageCta ctaSection={heroContent.ctaSection} />}
        </div>
    );
}
