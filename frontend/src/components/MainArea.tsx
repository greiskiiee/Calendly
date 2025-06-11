import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";

export const MainAreaComponent = () => {
  return (
    <div className="px-4 py-16">
      <div className="flex flex-col max-w-4xl mx-auto text-center gap-5 mt-[-60px] md:mt-0">
        <h1 className="text-2xl md:text-3xl lg:text-7xl font-bold">
          Таны <span className=" text-purple-600">гоо сайхны</span>{" "}
          <span className="text-pink-500">хэрэгцээнд</span> зориулсан
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Улаанбаатарын шилдэг гоо сайхны салон, спа төвүүдээс онлайнаар
          хялбархан цаг захиалаарай
        </p>
        <div className="w-full mx-auto mb-8 ">
          <div className="w-full flex items-center border border-gray-400 rounded-full px-2">
            <Search />
            <Input
              type="text"
              placeholder="Салон үйлчилгээ хайх..."
              className="border-none shadow-none outline-none focus-visible:ring-0 "
            />
          </div>
        </div>
        <div className="flex justify-evenly">
          <div>
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600">Бүртгэлтэй салон</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-500">1000+</div>
            <div className="text-gray-600">Амжилттай захиалга</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-500">4.8★</div>
            <div className="text-gray-600">Дундаж үнэлгээ</div>
          </div>
        </div>
      </div>
    </div>
  );
};
