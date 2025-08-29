
import { PublicLayout } from "../public-layout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Metadata } from 'next';
import { getHeroContent, getPrivacyPolicyContent } from "@/services/firestore";

export const dynamic = 'force-static';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://limidora.com';

export const metadata: Metadata = {
    title: 'Privacy Policy | Limidora Digital',
    description: 'Read the privacy policy for Limidora Digital to understand how we collect, use, and protect your personal information.',
    alternates: {
        canonical: `${BASE_URL}/privacy-policy`,
    },
};

export default async function PrivacyPolicyPage() {
    const policyContent = await getPrivacyPolicyContent();
    
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 md:px-6 pt-8">
                <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="font-medium text-foreground">Privacy Policy</span>
                </nav>
                <Separator className="mt-4" />
            </div>

            <section className="py-16 md:py-24 bg-background">
                <div className="container mx-auto">
                    <div className="relative max-w-4xl mx-auto px-8 md:px-12 py-12 bg-card border-x">
                        
                        <header className="text-center mb-12">
                            <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
                                {policyContent.pageTitle}
                            </h1>
                            <p className="text-muted-foreground mt-2">Last updated: {lastUpdated}</p>
                        </header>

                        <article className="prose prose-neutral dark:prose-invert max-w-none mx-auto space-y-6">
                            {policyContent.sections.map((section) => (
                                <section key={section.id}>
                                    <h2 className="text-xl md:text-2xl font-semibold !mb-3">{section.title}</h2>
                                    <p className="text-base leading-relaxed">{section.content}</p>
                                </section>
                            ))}
                        </article>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
