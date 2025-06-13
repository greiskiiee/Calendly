"use client";
import { MainAreaComponent } from "../components/MainArea";
import { HeaderComponent } from "../components/Header";
import { SalonCartComponent } from "@/components/SalonCard";
import { useEffect, useState } from "react";
import axios from "axios";

export const HomeComponent = () => {
  const [salons, setSalons] = useState([]);

  const fetchSalons = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/company/allCompanies`
      );
      setSalons(res.data.companies);

      console.log(res.data.companies);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchSalons();
  }, []);
  return (
    <div>
      <HeaderComponent />
      <MainAreaComponent />
      <div className="text-3xl font-bold text-center text-gray-800 mb-12">
        Танд тохирсон салоноо сонгоорой
      </div>

      <div className="flex flex-wrap max-w-6xl mx-auto gap-8">
        {salons.map((salon, id) => {
          return <SalonCartComponent key={id} salon={salon} />;
        })}
      </div>
    </div>
  );
};
