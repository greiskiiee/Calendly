import { MainAreaComponent } from "../components/MainArea";
import { HeaderComponent } from "../components/Header";
import { SalonCartComponent } from "@/components/SalonCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { HomeComponent } from "@/components/Home";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      <HomeComponent />
    </div>
  );
}
