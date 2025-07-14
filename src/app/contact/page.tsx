
import { Contact } from '@/components/sections/contact';
import { MotionWrapper } from '@/components/motion-wrapper';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <MotionWrapper>
          <Contact />
        </MotionWrapper>
      </main>
      <Footer />
    </div>
  );
}
