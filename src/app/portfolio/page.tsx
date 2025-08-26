
import { Badge } from "@/components/ui/badge";
import { PortfolioCard } from "@/components/PortfolioCard";
import { PortfolioHero } from "@/components/sections/portfolio-hero";
import { ClientsCarousel } from "@/components/sections/clients-carousel";
import { getProjects, Project, getPortfolioContent, PortfolioContent } from "@/services/firestore";
import type { Metadata } from 'next';

export const dynamic = "force-static";

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
      <>
        <PortfolioHero content={portfolioContent} />
        <section id="portfolio" className="py-20 md:py-28 bg-background">
          <div className="container">
            <div 
              className="text-center mb-16"
            >
              <Badge variant="outline" className="mb-4">Our Work</Badge>
              <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-4 font-body uppercase">
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
      </>
    );
}
