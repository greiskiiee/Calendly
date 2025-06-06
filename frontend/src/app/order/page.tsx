"use client";
import { ProfileForm } from "@/components";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    
    <div className="h-screen w-screen flex  items-center flex-col justify-center bg-red-50 gap-5">
      <div className="flex flex-col  gap-5">
        <Button 
        onClick={() => router.push("/salon")}
        className="bg-white rounded-md text-black hover:bg-blue-50 w-[100px]">
          <ArrowLeft />
          Буцах
        </Button>

        <ProfileForm />
      </div>
    </div>
  );
}
