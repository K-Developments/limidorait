
import { Contact } from '@/components/sections/contact';
import { MotionWrapper } from '@/components/motion-wrapper';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 pt-20">
        <MotionWrapper>
          <Contact />
        </MotionWrapper>
      </main>
    </div>
  );
}
