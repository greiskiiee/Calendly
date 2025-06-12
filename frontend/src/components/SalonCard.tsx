"use client";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Salon = {
  _id: string;
  name: string;
  about: string;
  address: string;
  logo: string;
  schedule: string;
};

type Salons = {
  salon: Salon;
};

export const SalonCartComponent = ({ salon }: Salons) => {
  const router = useRouter();

  return (
    <div className=" h-fit lg:w-[560px] lg:h-fit  border border-gray-200 rounded-2xl hover:shadow-2xl">
      <div className="relative w-full h-[140px] md:h-[200px]  overflow-hidden group">
        <Image
          fill
          alt="sevice image"
          src={
            salon.logo == ""
              ? salon.logo
              : "https://res.cloudinary.com/dx4imbbcs/image/upload/v1745893839/82cf2d72ae8de008994526b031c3fb1879ecf751_lrtzek.png"
          }
          className="object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h3 className="font-semibold tracking-tight text-xl text-gray-800">
              {salon.name}
            </h3>
            <p className="text-sm">{salon.about}</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <p>{salon.address}г</p>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-2" />
              <p>203 үнэлгээ</p>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <p>09:00 - 19:00</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <p className="mb-2 text-gray-800">Үйлчилгээ:</p>
              <div className="flex gap-2 mb-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  Үс засварлах
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  Өнгө оруулах
                </span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/salon/${salon._id}`)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-pink-600"
            >
              Дэлгэрэнгүй
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
