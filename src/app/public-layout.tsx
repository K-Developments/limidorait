
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SidebarProvider } from '@/components/layout/sidebar-provider';
import { getHeroContent, getServices } from '@/services/firestore';

export async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [heroContent, services] = await Promise.all([
      getHeroContent(),
      getServices()
  ]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Blog & News', href: '/blog' },
  ];

  return (
    <SidebarProvider navItems={navItems}>
        <div className="flex min-h-screen flex-col pt-20">
            <Header content={heroContent} services={services} />
            <main className="flex-1">{children}</main>
            <Footer content={heroContent} />
        </div>
    </SidebarProvider>
  );
}
