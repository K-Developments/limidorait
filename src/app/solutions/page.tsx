import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Services } from '@/components/sections/services';
import { Portfolio } from '@/components/sections/portfolio';
import { MotionWrapper } from '@/components/motion-wrapper';

export default function SolutionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <MotionWrapper>
          <Services />
        </MotionWrapper>
        <MotionWrapper>
          <Portfolio />
        </MotionWrapper>
      </main>
      <Footer />
    </div>
  );
}
