import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MotionWrapper } from '@/components/motion-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const blogPosts = [
  {
    title: "The Future of Web Development",
    description: "Exploring the latest trends and technologies shaping the future of the web, from AI to WebAssembly.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "futuristic technology",
    date: "October 26, 2023",
    tags: ["Web Dev", "Trends", "AI"],
    slug: "/blog/future-of-web-dev",
  },
  {
    title: "Why Great UI/UX is a Game-Changer",
    description: "A deep dive into how intuitive design and seamless user experience can make or break a digital product.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "user interface design",
    date: "October 15, 2023",
    tags: ["UI/UX", "Design"],
    slug: "/blog/why-ui-ux-matters",
  },
  {
    title: "Building a Brand that Resonates",
    description: "Step-by-step guide on creating a memorable brand identity that connects with your target audience.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "branding strategy",
    date: "September 28, 2023",
    tags: ["Branding", "Strategy"],
    slug: "/blog/building-a-brand",
  },
];


export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Blog</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Insights, tutorials, and stories from the Limidora team.
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-12">
              {blogPosts.map((post) => (
                <MotionWrapper key={post.title}>
                  <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                    <CardHeader className="p-0">
                      <Link href={post.slug} className="block">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={post.aiHint}
                        />
                      </Link>
                    </CardHeader>
                    <CardContent className="p-6 bg-card flex flex-col flex-grow">
                      <div className="flex-grow">
                        <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                        <Link href={post.slug}>
                          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h3>
                        </Link>
                        <p className="text-muted-foreground mb-4">{post.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto pt-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
