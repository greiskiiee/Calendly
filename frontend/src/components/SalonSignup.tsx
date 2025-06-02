"use client";

import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  socialUrls: SocialUrl[];
}

const socialUrlSchema = z.object({
  url: z.string().url(),
  urlName: z.string().min(1),
});

const formSchema = z
  .object({
    companyName: z.string().min(2, { message: "Нэрээ бүтэн бичнэ үү" }),
    logo: z
      .any()
      .refine((file) => file instanceof File || (file && file.length > 0), {
        message: "Лого зургаа оруулна уу",
      }),
    email: z.string().min(2, { message: "Зөв имэйл оруулна уу" }),
    phoneNumber: z.string().min(8, { message: "Зөв утасны дугаар оруулна уу" }),
    address: z.string().min(10, { message: "Хаягаа бүтэн оруулна уу" }),
    password: z
      .string()
      .min(8, { message: "Нууц үг 8-аас их тэмдэгттэй байх ёстой" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Нууц үг 8-аас их тэмдэгттэй байх ёстой" }),
    about: z.string(),
    category: z.string().min(2, { message: "Төрлөө сонгоно уу" }),
    socialUrls: z.array(socialUrlSchema),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Нууц үг буруу байна.",
  });

const SalonSignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    logo: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    about: "",
    category: "",
    socialUrls: [],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      logo: undefined,
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
      about: "",
      category: "",
      socialUrls: [],
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Үсчин",
    "Гоо сайхан",
    "Спа",
    "Эмчилгээний спа",
    "Нүүр будалт",
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
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
        handleInputChange("logo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data: FormData = {
        companyName: values.companyName,
        logo: values.logo,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
        password: values.password,
        about: values.about,
        category: values.category,
        socialUrls: values.socialUrls,
      };

      console.log("Submitted values:", data);
      await axios.post(`http://localhost:8000/company`, data);
      router.push("/login");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Бидэнтэй нэгдээрэй ТВ8
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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-5"
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын нэр</FormLabel>
                    <FormControl>
                      <Input placeholder="Энд нэрээ оруулна уу" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын лого</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              field.onChange(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Байгууллагын и-мэйл</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Энд мэйлээ оруулна уу"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Байгууллагын утасны дугаар</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Энд утасны дугаараа оруулна уу"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын төрөл</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Төрлөө сонгоно уу" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-between gap-4">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Нууц үг</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="w-full py-1 px-4 pr-10 rounded-md bg-white"
                              placeholder="Энд нууц үг оруулна уу"
                            />
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-1/2">
                  {" "}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Нууц үг давтах</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="w-full py-1 px-4 pr-10 rounded-md bg-white"
                              placeholder="Энд нууц үг оруулна уу"
                            />
                            <button
                              type="button"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын хаяг</FormLabel>
                    <FormControl>
                      <Input placeholder="Энд хаягаа оруулна уу" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын тухай</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        // value={formData.about}
                        // onChange={(e) =>
                        //   handleInputChange("about", e.target.value)
                        // }
                        placeholder="Танай байгууллагын онцлог зүйлсийг дурдана уу."
                        className="min-h-[100px] resize-none focus:border-purple-500 transition-all duration-200"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cошиал хаяг</FormLabel>
                    <FormControl>
                      <SocialUrlInput
                        {...field}
                        socialUrls={formData.socialUrls}
                        onChange={handleSocialUrlsChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
              >
                Бүртгүүлэх
              </Button>
            </form>
          </Form>
        </div>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Бүртгэлтэй бол
            <a
              onClick={() => router.push("login")}
              className="text-purple-600 hover:text-purple-700 font-medium ml-1"
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
