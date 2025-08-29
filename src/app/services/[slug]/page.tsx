
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getServiceBySlug, getServices, getFaqContent } from '@/services/firestore';
import type { Metadata, ResolvingMetadata } from 'next';
import { PublicLayout } from '../../public-layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://limidora.com';

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const services = await getServices();
  return services
    .filter(service => service && service.slug)
    .map((service) => ({
      slug: service.slug,
    }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }
  
  const previousImages = (await parent).openGraph?.images || [];
  const serviceImageUrl = service.imageUrl;

  return {
    title: `${service.title} | Limidora Digital`,
    description: service.description?.substring(0, 160) || `Learn more about our ${service.title} services.`,
    alternates: {
        canonical: `${BASE_URL}/services/${service.slug}`,
    },
    openGraph: {
        url: `${BASE_URL}/services/${service.slug}`,
        title: `${service.title} Service | Limidora Digital`,
        description: service.description?.substring(0, 160) || `Explore the details of our ${service.title} service.`,
        images: [
            {
              url: serviceImageUrl,
              width: 1200,
              height: 630,
              alt: service.title,
            },
            ...previousImages,
        ],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) {
    notFound();
  }
  
  const allFaqs = (await getFaqContent()).faqs;
  const relatedFaqs = service.faqIds 
    ? allFaqs.filter(faq => service.faqIds?.includes(faq.id))
    : [];

  return (
    <PublicLayout>
      <main>
        <div className="container mx-auto px-4 md:px-6 pt-8">
            <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground">{service.title}</span>
            </nav>
            <Separator className="mt-4 md:hidden" />
        </div>
        
         {/* Mobile-only Sticky Header */}
        <div className="md:hidden sticky top-20 z-30 flex items-center justify-between p-3 bg-background border-b">
            <h1 className="text-lg font-semibold truncate pr-2">{service.title}</h1>
            <Button asChild size="sm">
                <Link href="/contact">Get Service</Link>
            </Button>
        </div>


        {/* Mobile Hero */}
        <section className="md:hidden relative h-64 w-full">
            <Image src={service.imageUrl} alt={service.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6">
                 <h1 className="text-3xl font-semibold text-white font-body">{service.title}</h1>
            </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
              
              {/* Desktop Left Sidebar */}
              <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 self-start">
                <div className="aspect-video relative overflow-hidden">
                    <Image src={service.imageUrl} alt={service.title} fill className="object-cover"/>
                </div>
                <p className="text-muted-foreground text-base">{service.description}</p>
                <Button asChild size="lg" className="w-full">
                    <Link href="/contact">Get This Service</Link>
                </Button>
              </aside>

              {/* Main Content Area */}
              <article className="lg:col-span-2 space-y-10">
                <div className='hidden md:block'>
                  <h1 className="text-3xl md:text-4xl font-semibold text-foreground font-body">{service.title}</h1>
                </div>

                {/* Mobile Short Description */}
                <p className="text-lg text-muted-foreground leading-relaxed lg:hidden">
                    {service.description}
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.longDescription}
                </p>

                <Separator/>

                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground flex items-center gap-3">
                      What You Get
                  </h2>
                  <ul className="mt-6 space-y-3 text-muted-foreground list-none pl-2">
                    {(service.whatYouGet || []).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="h-2 w-2 bg-primary mt-2 mr-4 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {relatedFaqs.length > 0 && (
                    <>
                        <Separator/>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold text-foreground flex items-center gap-3">
                                <HelpCircle className="h-7 w-7 text-primary" />
                                Frequently Asked Questions
                            </h2>
                             <Accordion type="single" collapsible className="w-full mt-6">
                                {relatedFaqs.map((item, index) => (
                                    <AccordionItem key={item.id} value={`item-${index}`}>
                                        <AccordionTrigger className="text-lg font-medium text-left">{item.question}</AccordionTrigger>
                                        <AccordionContent className="text-base text-muted-foreground">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </>
                )}

              </article>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
