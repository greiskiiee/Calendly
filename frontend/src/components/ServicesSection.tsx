import React from 'react';
import ServiceCard from './ui/ServiceCard';

const ServicesSection = () => {
  const services = [
    { title: 'Нүүр будалт', description: 'Makeup', price: '50,000₮', duration: '60 мин' },
    { title: 'Хумс засварлах', description: 'Nail Care', price: '25,000₮', duration: '45 мин' },
    { title: 'Хөмсөг засварлах', description: 'Eyebrow Styling', price: '15,000₮', duration: '30 мин' },
    { title: 'Үс засварлах', description: 'Hair Styling', price: '35,000₮', duration: '90 мин' },
    { title: 'Арьс арчилгаа', description: 'Facial Treatment', price: '40,000₮', duration: '75 мин' },
  ];

  return (
    <section id="services" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Манай үйлчилгээ</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
