
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PublicLayout } from './public-layout';
import { PageHero } from '@/components/sections/page-hero';

export default function NotFound() {
  return (
    <PublicLayout>
      <PageHero 
        title="404" 
        subtitle="Oops! The page you requested was not found." 
      />
      <section className="container mx-auto px-4 md:px-6 py-20 text-center">
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-medium text-foreground mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-8">
                You can return to our homepage to browse our site, or contact us if you need further assistance.
            </p>
            <div className="flex justify-center gap-4">
                <Button asChild>
                    <Link href="/">Go to Homepage</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/contact">Contact Us</Link>
                </Button>
            </div>
        </div>
      </section>
    </PublicLayout>
  );
}
