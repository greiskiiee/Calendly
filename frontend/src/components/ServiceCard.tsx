import { Clock } from "lucide-react";

interface ServiceCartProps {
  title: string;
  description: string;
  details: string;
  price: string;
  duration: string;
}

export const ServiceCartComponent = ({
  title,
  description,
  details,
  price,
  duration,
}: ServiceCartProps) => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white">
      <div className="p-6">
        <div className="flex flex-col space-y-4">
          
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold tracking-tight text-lg text-gray-800">
              {title}
            </h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>

          
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-rose-500">{price}</span>
            <span className="text-sm text-gray-500 flex items-center">
              <Clock size={16} className="w-4 h-4 mr-1" />
              {duration}
            </span>
          </div>

          
          <p className="text-gray-600 text-sm">{details}</p>

          
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-rose-500 hover:bg-rose-600 text-white">
            Захиалах
          </button>
        </div>
      </div>
    </div>
  );
};
