
import { Facebook, Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { SocialPlatform } from '@/services/firestore';

const WhatsAppIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const iconMap: Record<SocialPlatform, (props: LucideProps) => JSX.Element> = {
  Facebook: (props) => <Facebook {...props} />,
  Instagram: (props) => <Instagram {...props} />,
  WhatsApp: (props) => <WhatsAppIcon {...props} />,
  Twitter: (props) => <Twitter {...props} />,
  LinkedIn: (props) => <Linkedin {...props} />,
  Github: (props) => <Github {...props} />,
};

interface SocialIconProps extends LucideProps {
  platform: SocialPlatform;
}

export function SocialIcon({ platform, ...props }: SocialIconProps) {
  const IconComponent = iconMap[platform];
  
  if (!IconComponent) {
    return null; 
  }

  return <IconComponent {...props} />;
}

    