
import { Contact } from "@/components/sections/contact";
import { getContactContent } from "@/services/firestore";
import type { Metadata } from 'next';
import { PublicLayout } from "../public-layout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Contact Limidora | Lets Build Something Great',
  description: 'Get in touch with the Limidora team. Have a project in mind or just want to say hello? We are excited to hear from you and learn about your ideas.',
};

export default async function ContactPage() {
    const contactContent = await getContactContent();
    return (
        <PublicLayout>
            <div className="container mx-auto px-4 md:px-6 pt-8">
                <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="font-medium text-foreground">Contact</span>
                </nav>
                <Separator className="mt-4" />
            </div>
            <Contact content={contactContent} />
        </PublicLayout>
    );
}
