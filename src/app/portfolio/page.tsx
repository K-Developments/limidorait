
import { Badge } from "@/components/ui/badge";
import { PortfolioCard } from "@/components/PortfolioCard";
import { PageHero } from "@/components/sections/page-hero";
import { ClientsCarousel } from "@/components/sections/clients-carousel";
import { getProjects, Project, getPortfolioContent, PortfolioContent } from "@/services/firestore";
import type { Metadata } from 'next';
import { PublicLayout } from "../public-layout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Portfolio | Limidora Digital',
  description: 'Explore our portfolio of web development, UI/UX design, and mobile app projects. See how we help businesses achieve their goals with creative solutions.',
};

export default async function PortfolioPage() {
    const [projects, portfolioContent] = await Promise.all([
      getProjects(),
      getPortfolioContent()
    ]);

    return (
      <PublicLayout>
        <div className="container mx-auto px-4 md:px-6 pt-8">
            <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground">Portfolio</span>
            </nav>
            <Separator className="mt-4" />
        </div>
        <PageHero title={portfolioContent.heroTitle} subtitle={portfolioContent.heroSubtitle} />
        <section id="portfolio" className="py-20 md:py-28 bg-background">
          <div className="container">
            <div 
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">Our Work</Badge>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 font-body">
                Our Portfolio
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A glimpse into our creative world and the impact we deliver.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                  <PortfolioCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {portfolioContent && (
            <ClientsCarousel 
                title={portfolioContent.clientsSection.title}
                subtitle={portfolioContent.clientsSection.subtitle}
                logos={portfolioContent.clientsSection.logos}
            />
        )}
      </PublicLayout>
    );
}
