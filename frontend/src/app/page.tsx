"use client";
import { Footer } from "@/components/Footer";
import { HomeComponent } from "@/components/Home";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 ">
      <HomeComponent />
      <Footer />
    </div>
  );
}
