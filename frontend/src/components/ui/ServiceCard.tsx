import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, price, duration }) => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold tracking-tight text-lg text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-rose-500">{price}</span>
            <span className="text-sm text-gray-500 flex items-center">
              {/* SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-4 h-4 mr-1">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {duration}
            </span>
          </div>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none h-10 px-4 py-2 w-full bg-rose-500 hover:bg-rose-600 text-white">
            Захиалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
