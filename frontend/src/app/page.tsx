
import Image from "next/image";
import { ServiceCartComponent } from "../components/ServiceCard";

import { MainAreaComponent } from "../components/MainArea";
import { HeaderComponent } from "../components/Header";


export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeaderComponent />
      <MainAreaComponent />
      <div className="text-3xl font-bold text-center text-gray-800 mb-12">
        Танд тохирсон салоноо сонгоорой
      </div>
      <div className="flex flex-wrap max-w-6xl mx-auto gap-8">
        <ServiceCartComponent />
        <ServiceCartComponent />
        <ServiceCartComponent />
        <ServiceCartComponent />
      </div>
    </div>
  );
}
