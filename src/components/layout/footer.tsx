
"use client";

import Link from 'next/link';
import { Separator } from '../ui/separator';
import { SocialIcon } from './SocialIcon';
import { useEffect, useState } from 'react';
import { getHeroContent, SocialLink, HeroContent } from '@/services/firestore';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';

export function Footer() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchContent = async () => {
          try {
              const heroContent = await getHeroContent();
              setContent(heroContent);
          } catch (error) {
              console.error("Failed to fetch social links:", error);
          } finally {
              setIsLoading(false);
          }
      };
      fetchContent();
  }, []);

  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' }
  ];

  const serviceLinks = [
    { name: 'Web Development', href: '/services' },
    { name: 'Mobile App Development', href: '/services' },
    { name: 'UI/UX Design', href: '/services' },
    { name: 'Software Development', href: '/services' }
  ];

  return (
    <footer className="bg-neutral-900 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="relative h-12 w-40 block">
              {isLoading ? (
                <Skeleton className="h-12 w-40 bg-white/10" />
              ) : content?.logoUrl ? (
                <Image src={content.logoUrl} alt={content.logoText || "Limidora Logo"} fill className="object-contain object-left" />
              ) : (
                <span className="text-2xl font-medium uppercase tracking-wider">{content?.logoText || "Limidora"}</span>
              )}
              <span className="sr-only">Limidora Home</span>
            </Link>
            <p className="mt-4 max-w-xs text-primary-foreground/70">
              Creative agency crafting modern IT solutions and web experiences.
            </p>
            {!isLoading && content?.socialLinks && content.socialLinks.length > 0 && (
                <div className="flex gap-4 mt-6">
                    {content.socialLinks.map((link) => (
                        <Link key={link.platform} href={link.url} aria-label={link.platform} target="_blank" rel="noopener noreferrer">
                            <SocialIcon platform={link.platform} className="h-5 w-5 text-primary-foreground/70 hover:text-primary-foreground transition-colors" />
                        </Link>
                    ))}
                </div>
            )}
          </div>
          
          {/* Column 2: Company Links */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Service Links */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        
        <Separator className="my-8 bg-white/10" />
        
        <div className="text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Limidora Digital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

    