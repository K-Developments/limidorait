import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Portfolio } from '@/components/sections/portfolio';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { MotionWrapper } from '@/components/motion-wrapper';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <MotionWrapper>
          <Services />
        </MotionWrapper>
        <MotionWrapper>
          <Portfolio />
        </MotionWrapper>
        <MotionWrapper>
          <About />
        </MotionWrapper>
        <MotionWrapper>
          <Contact />
        </MotionWrapper>
      </main>
      <Footer />
    </div>
  );
}
