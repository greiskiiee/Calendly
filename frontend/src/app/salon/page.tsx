// src/app/salon/page.tsx

import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WorkingHours from "@/components/WorkingHours";
import ContactSection from "@/components/ContactSection";
import SalonHeader from "@/components/SalonHeader";

export default function SalonPage() {
  return (
    <div className="font-sans">
      <SalonHeader />
      <HeroSection />
      <WorkingHours />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
