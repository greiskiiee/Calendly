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

interface SocialUrl {
  url: string;
  urlName: string;
}

type Salon = {
  companyName: string;
  logo: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  about: string;
  category: string;
  schedule: object;
  socialUrls: SocialUrl[];
};

export default function SalonPage() {
  const param = useParams();
  const { salonId } = param as { salonId: string };

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
      <ContactSection
        phone={salon.phoneNumber}
        address={salon.address}
        socials={salon.socialUrls}
      />
    </div>
  );
}
