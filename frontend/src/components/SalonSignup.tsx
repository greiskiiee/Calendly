'use client';

import React, { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import SocialUrlInput from './SocialUrlInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Toggle } from './ui/toggle';
import { Step1 } from './Signup-step1';
import { Step2 } from './Signup-step2';

interface SocialUrl {
  url: string;
  urlName: string;
}

export interface FormData {
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

const socialUrlSchema = z.object({
  url: z.string().url(),
  urlName: z.string().min(1),
});

const formSchema = z
  .object({
    companyName: z.string().min(2, { message: 'Нэрээ бүтэн бичнэ үү' }),
    logo: z
      .any()
      .refine(
        (file) =>
          ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
            file?.type
          ),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      ),
    email: z.string().min(2, { message: 'Зөв имэйл оруулна уу' }),
    phoneNumber: z.string().min(8, { message: 'Зөв утасны дугаар оруулна уу' }),
    address: z.string().min(10, { message: 'Хаягаа бүтэн оруулна уу' }),
    password: z
      .string()
      .min(8, { message: 'Нууц үг 8-аас их тэмдэгттэй байх ёстой' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Нууц үг 8-аас их тэмдэгттэй байх ёстой' }),
    about: z.string(),
    category: z.string().min(2, { message: 'Төрлөө сонгоно уу' }),
    socialUrls: z.array(socialUrlSchema),
    workdays: z.array(z.string()).min(1, 'Ядаж нэг ажлын өдөр сонгоно уу'),
    open: z.string(),
    close: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Нууц үг буруу байна.',
  });

const SalonSignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    logo: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    about: '',
    category: '',
    socialUrls: [],
    schedule: {},
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      logo: '',
      email: '',
      phoneNumber: '',
      address: '',
      password: '',
      confirmPassword: '',
      about: '',
      category: '',
      socialUrls: [],
      workdays: [],
      open: '',
      close: '',
    },
  });

  const [workdays, setWorkdays] = useState<String[]>([]);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSocialUrlsChange = (socialUrls: SocialUrl[]) => {
    setFormData((prev) => ({ ...prev, socialUrls }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('logo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkdays = (day: string) => {
    setWorkdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="min-h-[800px] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Бидэнтэй нэгдээрэй
          </h1>
          <p className="text-gray-600 text-lg">
            Бүртгүүлээд хэрэглэгчидтэй илүү хурдан холбогдоорой.
          </p>
        </div>

        <div className="shadow-xl border-0 backdrop-blur-sm bg-white/90 py-5 rounded-xl">
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
