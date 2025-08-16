
import { About } from "@/components/sections/about";
import { AboutHero } from "@/components/sections/about-hero";
import { WhyUs } from "@/components/sections/why-us";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Limidora | Our Vision & Process',
  description: 'Learn about the vision, team, and creative process at Limidora. We are a digital agency dedicated to building exceptional IT solutions and web experiences.',
};

export default function AboutPage() {
    return (
        <div>
            <AboutHero />
            <About />
            <WhyUs />
        </div>
    );
}
