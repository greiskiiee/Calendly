import React from "react";

const WorkingHours = () => {
  return (
    <section className="py-6 md:py-12 px-4 bg-white/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="md:text-2xl text-xl font-bold text-gray-800 mb-6">
          Ажиллах цаг
        </h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-700">Даваа - Баасан</p>
            <p className="text-rose-500">09:00 - 18:00</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-700">Бямба - Ням</p>
            <p className="text-rose-500">10:00 - 16:00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingHours;
