
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, GanttChartSquare, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // Decode the slug for display (e.g., "e-commerce-platform" -> "e commerce platform")
  const projectName = params.slug.replace(/-/g, ' ');

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
                    <Target className="h-7 w-7 text-primary" />
                    Challenges
                    </h2>
                    <p className="text-muted-foreground text-base leading-relaxed">
                    The primary challenge was integrating multiple third-party services, including payment gateways, shipping providers, and a complex tax calculation API, while maintaining fast page load times. Ensuring the platform was scalable to handle high traffic during peak shopping seasons was also a critical requirement.
                    </p>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-medium text-foreground flex items-center gap-3">
                    <Zap className="h-7 w-7 text-primary" />
                    Our Solution
                    </h2>
                    <p className="text-muted-foreground text-base leading-relaxed">
                    We built the platform on a modern tech stack using Next.js for the front-end to ensure optimal performance and SEO. For the back-end, we designed a microservices architecture to handle different functionalities independently. This approach provided the necessary scalability and made future integrations straightforward. A custom-designed UI/UX focused on intuitive navigation and a streamlined checkout process significantly improved user engagement.
                    </p>
                </div>
                </article>
            </div>
            </div>
        </div>
      </section>
    </main>
  );
}
