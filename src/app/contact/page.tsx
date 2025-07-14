
import { Contact } from '@/components/sections/contact';
import { MotionWrapper } from '@/components/motion-wrapper';

export default function ContactPage() {
  return (
      <main className="flex-1 pt-20">
        <MotionWrapper>
          <Contact />
        </MotionWrapper>
      </main>
  );
}
