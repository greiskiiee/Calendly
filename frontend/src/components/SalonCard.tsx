"use client";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SalonCartComponent = () => {
  const router = useRouter();
  return (
    <div className="w-[560px] h-[570px] border border-gray-200 rounded-2xl hover:shadow-2xl">
      <div className="relative w-full h-[200px] overflow-hidden group">
        <Image
          fill
          alt="sevice image"
          src="/uschin.jpeg"
          className="object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h3 className="font-semibold tracking-tight text-xl text-gray-800">
              Модерн үсчин
            </h3>
            <p className="text-sm">Орчин үеийн үс засварлах төв</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <p>Баянзүрх дүүрэг</p>
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

            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-700">
                30,000₮ - 60,000₮
              </p>
              <button
                onClick={() => router.push("/salon")}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:bg-pink-600"
              >
                Цаг захиалах
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
