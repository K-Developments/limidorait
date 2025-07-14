import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { About } from '@/components/sections/about';
import { MotionWrapper } from '@/components/motion-wrapper';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <MotionWrapper>
          <About />
        </MotionWrapper>
      </main>
      <Footer />
    </div>
  );
}
