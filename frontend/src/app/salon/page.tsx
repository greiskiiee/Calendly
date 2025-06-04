// src/app/salon/page.tsx

import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WorkingHours from "@/components/WorkingHours";
import ContactSection from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function SalonPage() {
  return (
    <main className="font-sans">
      <HeroSection />
      <ServicesSection />
      <WorkingHours />
      <ContactSection />
    </main>
  );
}
