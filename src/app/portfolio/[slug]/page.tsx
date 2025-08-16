
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, GanttChartSquare, CheckSquare, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // Decode the slug for display (e.g., "e-commerce-platform" -> "e commerce platform")
  const projectName = params.slug.replace(/-/g, ' ');

  const features = [
    "Seamless integration with multiple third-party payment gateways.",
    "High-performance architecture to handle peak traffic seasons.",
    "Scalable back-end for easy inventory and order management.",
    "Intuitive user interface for a smooth shopping experience.",
  ];

  const highlights = [
    "Built with a modern Next.js front-end for optimal SEO and performance.",
    "Microservices architecture for enhanced scalability and maintainability.",
    "Custom UI/UX design focused on conversion and user engagement.",
    "Streamlined checkout process to reduce cart abandonment.",
  ];

  return (
    <main>
      {/* Hero Section */}
      <section 
        aria-labelledby="project-hero-title"
        className="relative flex items-center justify-center w-full min-h-[50vh] bg-neutral-900 text-white overflow-hidden"
      >
        <div className="relative z-10 text-center p-8">
          {/* Decorative Lines */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
              <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
              <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
              <div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
              <div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
              <div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
          </div>
          
          <h1 id="project-hero-title" className="text-4xl md:text-6xl font-medium uppercase font-body tracking-tight">
            {projectName}
          </h1>
        </div>
      </section>

      {/* Content Section with Image Background */}
      <section className="relative py-24 bg-background">
         <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1600x1200.png"
            alt={`Showcase image for ${projectName}`}
            fill
            className="object-cover"
            data-ai-hint="abstract project background"
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>

        {/* Overlapping Content Card */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 -mt-40 md:-mt-48">
            <div className="bg-background shadow-xl max-w-4xl mx-auto p-6 md:p-12">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground capitalize">{projectName}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Left Column - Meta Info */}
                <aside className="md:col-span-1 space-y-6">
                <div>
                    <h3 className="font-semibold text-foreground uppercase tracking-wider">Client</h3>
                    <p className="text-muted-foreground">Innovate Co.</p>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground uppercase tracking-wider">Services</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">Web Development</Badge>
                        <Badge variant="secondary">UI/UX Design</Badge>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground uppercase tracking-wider">Date</h3>
                    <p className="text-muted-foreground">August 2023</p>
                </div>
                </aside>

                {/* Right Column - Project Details */}
                <article className="md:col-span-2 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-medium text-foreground flex items-center gap-3">
                    <GanttChartSquare className="h-7 w-7 text-primary" />
                    About the Project
                    </h2>
                    <p className="text-muted-foreground text-base leading-relaxed">
                    This project involved creating a comprehensive e-commerce platform from the ground up for a leading retail client. The goal was to deliver a seamless, high-performance shopping experience across all devices, with a modern UI and a robust back-end system for inventory and order management.
                    </p>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-medium text-foreground flex items-center gap-3">
                    <CheckSquare className="h-7 w-7 text-primary" />
                    Features
                    </h2>
                    <ul className="space-y-2 text-muted-foreground list-none pl-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="h-2.5 w-2.5 bg-primary mt-1.5 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-medium text-foreground flex items-center gap-3">
                    <Star className="h-7 w-7 text-primary" />
                    Highlights
                    </h2>
                    <ul className="space-y-2 text-muted-foreground list-none pl-2">
                      {highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="h-2.5 w-2.5 bg-primary mt-1.5 mr-3 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                </div>
                </article>
            </div>
            </div>
        </div>
      </section>
    </main>
  );
}
