import { HeroSection } from '@/components/sections/hero-section';
import { MetricsSection } from '@/components/sections/metrics-section';
import { AudiencesSection } from '@/components/sections/audiences-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { CitiesSection } from '@/components/sections/cities-section';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MetricsSection />
      <AudiencesSection />
      <TestimonialsSection />
      <CitiesSection />
      <Footer />
    </div>
  );
}