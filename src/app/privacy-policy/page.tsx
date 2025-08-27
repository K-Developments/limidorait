
import { PublicLayout } from "../public-layout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
    title: 'Privacy Policy | Limidora Digital',
    description: 'Read the privacy policy for Limidora Digital to understand how we collect, use, and protect your personal information.',
};

const policyContent = {
    lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    sections: [
        {
            title: "Introduction",
            content: "Welcome to Limidora Digital. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site."
        },
        {
            title: "Collection of Your Information",
            content: "We may collect information about you in a variety of ways. The information we may collect on the Site includes personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards."
        },
        {
            title: "Use of Your Information",
            content: "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to: create and manage your account, email you regarding your account or order, fulfill and manage purchases, orders, payments, and other transactions related to the Site, and increase the efficiency and operation of the Site."
        },
        {
            title: "Security of Your Information",
            content: "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse."
        },
        {
            title: "Contact Us",
            content: "If you have questions or comments about this Privacy Policy, please contact us through the contact form on our website or by emailing us at our designated contact address."
        }
    ]
};

export default async function PrivacyPolicyPage() {
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

            <main className="py-16 md:py-24 bg-background">
                <div className="container mx-auto">
                    <div className="relative max-w-4xl mx-auto px-8 md:px-12 py-12 bg-card border-x">
                        
                        <header className="text-center mb-12">
                            <h1 className="text-3xl md:text-5xl font-medium text-foreground uppercase tracking-tight">
                                Privacy Policy
                            </h1>
                            <p className="text-muted-foreground mt-2">Last updated: {policyContent.lastUpdated}</p>
                        </header>

                        <article className="prose prose-neutral dark:prose-invert max-w-none mx-auto space-y-6">
                            {policyContent.sections.map((section) => (
                                <section key={section.title}>
                                    <h2 className="text-xl md:text-2xl font-semibold !mb-3">{section.title}</h2>
                                    <p className="text-base leading-relaxed">{section.content}</p>
                                </section>
                            ))}
                        </article>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}

