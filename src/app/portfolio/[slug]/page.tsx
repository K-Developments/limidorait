
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, GanttChartSquare, CheckSquare, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getProjectBySlug, getProjects } from '@/services/firestore';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string }
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found'
    }
  }

  return {
    title: `${project.title} | Limidora Digital`,
    description: project.about.substring(0, 160),
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section 
        aria-labelledby="project-hero-title"
        className="relative flex items-center justify-center w-full min-h-[50vh] bg-neutral-900 text-white overflow-hidden"
      >
        <div className="relative z-10 text-center p-8 w-[100%] h-[50vh] flex items-center justify-center">
          {/* Decorative Lines */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
              <div className="absolute top-0 left-1/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
              <div className="absolute top-0 left-2/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
              <div className="absolute right-0 top-1/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
              <div className="absolute right-0 top-2/3 w-full h-[1px] bg-gradient-to-r from-transparent to-white/10" />
              <div className="absolute top-0 left-3/4 h-full w-[1px] bg-gradient-to-t from-transparent to-white/10" />
          </div>
          
          <h1 id="project-hero-title" className="text-4xl md:text-6xl font-medium uppercase font-body tracking-tight capitalize">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Content Section with Image Background */}
      <section className="relative py-24 bg-background">
         <div className="absolute inset-0 z-0">
          <Image
            src={project.heroImageUrl}
            alt={`Showcase image for ${project.title}`}
            fill
            className="object-cover"
            data-ai-hint="abstract project background"
            priority
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
                <span className="font-medium text-foreground capitalize">{project.title}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Left Column - Meta Info */}
                <aside className="md:col-span-1 space-y-6">
                <div>
                    <h3 className="font-semibold text-foreground uppercase tracking-wider">Services</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.services.map(service => (
                           <Badge key={service} variant="secondary">{service}</Badge>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground uppercase tracking-wider">Date</h3>
                    <p className="text-muted-foreground">{project.date}</p>
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
                        {project.about}
                    </p>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-medium text-foreground flex items-center gap-3">
                    <CheckSquare className="h-7 w-7 text-primary" />
                    Features
                    </h2>
                    <ul className="space-y-2 text-muted-foreground list-none pl-2">
                      {project.features.map((feature, index) => (
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
                      {project.highlights.map((highlight, index) => (
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
