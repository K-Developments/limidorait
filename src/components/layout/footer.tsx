
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { SocialIcon } from './SocialIcon';
import { HeroContent } from '@/services/firestore';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

interface FooterProps {
    content: HeroContent | null;
}

export function Footer({ content }: FooterProps) {

  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'FAQs', href: '/faq' },
  ];
  
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ];

  const footerLogo = content?.footerLogoUrl || content?.logoUrl;
  const logoText = content?.logoText || 'Limidora';

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Company Info */}
          <div className="col-span-1">
            <Link href="/" className="relative h-12 w-40 block mb-4">
              {footerLogo ? (
                <Image src={footerLogo} alt={logoText} fill className="object-contain object-left" />
              ) : (
                <span className="text-2xl font-medium uppercase tracking-wider">{logoText}</span>
              )}
              <span className="sr-only">Limidora Home</span>
            </Link>
            <p className="max-w-xs text-neutral-400 text-sm">
              Creative agency crafting modern IT solutions and web experiences.
            </p>
            {content?.socialLinks && content.socialLinks.length > 0 && (
                <div className="flex gap-4 mt-6">
                    {content.socialLinks.map((link) => (
                        <Link key={link.platform} href={link.url} aria-label={link.platform} target="_blank" rel="noopener noreferrer">
                            <SocialIcon platform={link.platform} className="h-5 w-5 text-neutral-400 hover:text-white transition-colors" />
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
                  <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact Us */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3">
              {content?.contactEmail && (
                <li>
                  <a href={`mailto:${content.contactEmail}`} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
                    <Mail className="h-4 w-4" />
                    <span>{content.contactEmail}</span>
                  </a>
                </li>
              )}
              {content?.contactPhone && (
                 <li>
                  <a href={`tel:${content.contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm">
                    <Phone className="h-4 w-4" />
                     <span>{content.contactPhone}</span>
                  </a>
                </li>
              )}
               <li>
                  <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm font-semibold">
                    Get a Quote &rarr;
                  </Link>
                </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
           <div>
            <h4 className="font-semibold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        
        <Separator className="my-8 bg-white/10" />
        
        <div className="text-center text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Limidora Digital. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
