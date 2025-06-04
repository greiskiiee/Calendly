import React from 'react';
import Button from './ui/Button1';

const HeroSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Нараа Beauty Salon-д <br />
          <span className="text-rose-500">тавтай морилно уу!</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Гоо сайхныхаа төлөө хамгийн шилдэг үйлчилгээг авахын тулд онлайнаар хялбархан цаг захиалаарай
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button text="Цаг захиалах" icon="calendar" primary />
          <Button text="Үйлчилгээ үзэх" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
