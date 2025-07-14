import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A modern, scalable e-commerce site with a focus on user experience.",
    tags: ["Web Dev", "UI/UX"],
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "website mockup",
  },
  {
    title: "Corporate Rebranding",
    description: "Complete brand overhaul for a tech startup, including logo and style guide.",
    tags: ["Branding"],
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "brand guidelines",
  },
  {
    title: "Mobile Banking App",
    description: "An intuitive mobile app for easy and secure banking on the go.",
    tags: ["UI/UX", "Mobile App"],
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "app interface",
  },
  {
    title: "SaaS Dashboard",
    description: "A data-rich dashboard for a SaaS product, focusing on clarity and usability.",
    tags: ["Web Dev", "UI/UX"],
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "dashboard analytics",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Our Work</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Take a look at some of the projects we're proud of.
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12 mt-12">
          {projects.map((project) => (
            <Card key={project.title} className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={project.aiHint}
                />
              </CardHeader>
              <CardContent className="p-6 bg-card">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
