"use client";

import { ArrowLeft, Clock } from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type Name = {
  name: string;
};

const SalonHeader = ({ name }: Name) => {
  const router = useRouter();
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="w-full flex items-center justify-between">
          <Button
            onClick={() => router.back()}
            className="bg-white shadow-0 text-black hover:bg-blue-50 w-[100px]"
          >
            <ArrowLeft />
            Буцах
          </Button>
          <div className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div> */}
            <span className="text-md font-bold text-gray-800">{name}</span>
          </div>
        </div>

        {/* <div className="flex gap-2">
          <button
            onClick={() => router.push("/order")}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white"
          >
            Цаг захиалах
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default SalonHeader;
