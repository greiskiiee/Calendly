"use client";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Salon = {
  _id: string;
  companyName: string;
  about: string;
  address: string;
  logo: string;
  schedule: string;
};

type Salons = {
  salon?: Salon;
};

export const SalonCartComponent = ({ salon }: Salons) => {
  const router = useRouter();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="w-[360px] md:w-[420px] h-fit lg:w-[560px] lg:h-fit  border border-gray-200 rounded-2xl hover:shadow-2xl">
      <div className="relative w-full h-[140px] md:h-[200px]  overflow-hidden group">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          alt="sevice image"
          src={
            salon?.logo ||
            "data:image/jpeg;base64,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"
          }
          className="w-auto h-auto object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h3 className="font-semibold tracking-tight text-xl text-gray-800">
              {salon?.companyName}
            </h3>
            <p className="text-sm truncate max-w-full" title={salon?.about}>
              {truncateText(salon?.about || "", 100)}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <p>{truncateText(salon?.address || "", 50)}</p>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-2 flex-shrink-0" />
              <p>203 захиалга</p>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 flex-shrink-0" />
              <p>09:00 - 19:00</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div className="h-fit hidden md:block">
              <p className="mb-2 text-gray-800">Үйлчилгээ:</p>
              <div className="flex gap-2 mb-4">
                <span className="text-[10px] bg-purple-100 text-purple-700 px-3 py-1 rounded-full md:text-sm">
                  Үс засварлах
                </span>
                <span className="text-[10px] bg-purple-100 text-purple-700 px-3 py-1 rounded-full md:text-sm">
                  Өнгө оруулах
                </span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/salon/${salon?._id}`)}
              className="w-full md:w-fit bg-purple-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-pink-600"
            >
              Дэлгэрэнгүй
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
