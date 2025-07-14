import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Code, PenTool, Megaphone } from "lucide-react";

const services = [
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Web Development",
    description: "We build fast, responsive, and scalable web applications tailored to your business needs.",
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: "UI/UX Design",
    description: "Our design team creates intuitive and engaging user interfaces for a seamless user experience.",
  },
  {
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    title: "Brand Strategy",
    description: "We help you define your brand identity and create a strong, consistent message across all platforms.",
  },
];

export function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-secondary-foreground">Our Services</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What We Offer</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We provide a comprehensive suite of digital services to help your business thrive in the modern landscape.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
          {services.map((service) => (
            <Card key={service.title} className="bg-background shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center p-6 rounded-lg">
              <CardHeader className="flex flex-col items-center gap-4">
                {service.icon}
                <div className="grid gap-1">
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription>
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
