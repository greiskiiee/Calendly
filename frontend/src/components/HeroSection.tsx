'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  name: string;
  about: string;
};

const HeroSection = ({ name, about }: Props) => {
  const router = useRouter();

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 md:py-20 px-4 bg-gradient-to-br from-purple-200 via-white to-purple-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          {name}-д <br />
          <span className="text-[#f6339a]">тавтай морилно уу!</span>
        </h1>
        <p className="text-md md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {about}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <button
            onClick={() => router.push("/order")}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-pink-500 hover:bg-rose-600 text-white"
          >
            <Calendar className="h-5 w-5" />
            Цаг захиалах
          </button> */}
          <button
            onClick={scrollToServices}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-200 px-6 py-3 text-gray-800 text-sm font-medium transition hover:bg-gray-300"
          >
            Үйлчилгээ үзэх
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
