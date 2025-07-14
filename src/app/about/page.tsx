
import { About } from '@/components/sections/about';
import { MotionWrapper } from '@/components/motion-wrapper';

export default function AboutPage() {
  return (
      <main className="flex-1 pt-20">
        <MotionWrapper>
          <About />
        </MotionWrapper>
      </main>
  );
}
