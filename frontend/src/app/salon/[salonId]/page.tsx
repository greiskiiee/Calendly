// src/app/salon/page.tsx
"use client";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WorkingHours from "@/components/WorkingHours";
import ContactSection from "@/components/ContactSection";
import SalonHeader from "@/components/SalonHeader";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { log } from "console";

type Salon = {
  companyName: string;
  about: string;
};

export default function SalonPage() {
  const param = useParams();
  console.log(param);
  const { salonId } = param;

  const [salon, setSalon] = useState<Salon | null>(null);

  const fetchSalon = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/company/${salonId}`
      );
      setSalon(res.data.companyInformationById[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (salonId) {
      fetchSalon();
    }
  }, [salonId]);

  if (!salon) return <div>Loading...</div>;

  console.log(salon);

  return (
    <div className="font-sans">
      <SalonHeader name={salon.companyName} />
      <HeroSection name={salon.companyName} about={salon.about} />
      <WorkingHours />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
