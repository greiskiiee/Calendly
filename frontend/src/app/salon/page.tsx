// src/app/salon/page.tsx

import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WorkingHours from '@/components/WorkingHours';
import ContactSection from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header1';

export default function SalonPage() {
  return (
    <div className="font-sans">
      <Header />
      <HeroSection />
      <WorkingHours />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
