"use client";

import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import SocialUrlInput from "./SocialUrlInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { Step1 } from "./Signup-step1";
import { Step2 } from "./Signup-step2";

interface SocialUrl {
  url: string;
  urlName: string;
}

interface FormData {
  companyName: string;
  logo: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  about: string;
  category: string;
  schedule: object;
  socialUrls: SocialUrl[];
}

const SalonSignUp = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 md:visible invisible">
          <h1 className="text-[26px] md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Бидэнтэй нэгдээрэй
          </h1>
          <p className="text-gray-600 text-lg ">
            Хэрэглэгчидтэй илүү хурдан холбогдох боломж
          </p>
        </div>

        <div className="shadow-xl border-0 backdrop-blur-sm bg-white/90 py-5 rounded-xl mt-[-140px] md:mt-0">
          <div>
            <div className="text-center pb-6">
              <div className="text-2xl text-gray-800 font-[600] ">
                Байгууллагын бүртгэл
              </div>
              <div className="text-gray-600">
                Бүртгүүлэхийн тулд доорхийг бөглөнө үү
              </div>
            </div>
          </div>

          {step == 1 && (
            <Step1
              onContinue={() => {
                setStep((step) => (step += 1));
              }}
            />
          )}

          {step == 2 && (
            <Step2 onContinue={() => setStep((step) => (step -= 1))} />
          )}
        </div>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Бүртгэлтэй бол
            <a
              href="/login"
              className="text-purple-600 hover:text-purple-700 font-medium ml-1 underline"
            >
              Нэвтрэх
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalonSignUp;
