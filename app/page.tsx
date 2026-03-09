import { ComingSoonSection } from '@/components/sections/coming-soon-section';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <ComingSoonSection />
      <Footer />
    </div>
  );
}
