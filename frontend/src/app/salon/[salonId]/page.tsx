// src/app/salon/page.tsx
'use client';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WorkingHours from '@/components/WorkingHours';
import ContactSection from '@/components/ContactSection';
import SalonHeader from '@/components/SalonHeader';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface SocialUrl {
  url: string;
  urlName: string;
}

interface Service {
  _id: string;
  companyId: string;
  serviceName: string;
  servicePrice: number;
  serviceInfo: string;
  serviceTime: number;
  __v?: number;
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
  services: Service[];
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

  const transformedServices = salon.services.map((s) => ({
    title: s.serviceName,
    description: '',
    details: s.serviceInfo,
    price: s.servicePrice.toLocaleString() + '₮',
    duration: s.serviceTime + ' мин',
  }));

  return (
    <div className="font-sans">
      <SalonHeader name={salon.companyName} />
      <HeroSection name={salon.companyName} about={salon.about} />
      <WorkingHours />
      {/* services массивыг дамжуулж байна */}
      <ServicesSection services={transformedServices} />
      <ContactSection
        phone={salon.phoneNumber}
        address={salon.address}
        socials={salon.socialUrls}
      />
    </div>
  );
}
