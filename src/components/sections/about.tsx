import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  { name: 'Jane Doe', role: 'CEO & Founder', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'woman portrait' },
  { name: 'John Smith', role: 'Lead Developer', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'man portrait' },
  { name: 'Emily White', role: 'Lead Designer', imageUrl: 'https://placehold.co/100x100.png', aiHint: 'woman smiling' },
];

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <div className="inline-block bg-background px-3 py-1 text-sm text-secondary-foreground">About Us</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Driven by Passion, Defined by Quality
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Limidora was founded with a simple mission: to build amazing digital products that people love to use. We believe in the power of technology and design to solve complex problems and create meaningful connections. Our team is a collective of creative thinkers, problem solvers, and tech enthusiasts dedicated to excellence.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Meet the Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center p-4 bg-background transition-shadow hover:shadow-lg">
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                  <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.aiHint} />
                  <AvatarFallback>{member.name.substring(0,2)}</AvatarFallback>
                </Avatar>
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
