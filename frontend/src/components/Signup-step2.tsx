"use client";
import React, { useContext, useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import SocialUrlInput from "./SocialUrlInput";
import { Toggle } from "./ui/toggle";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CompanyContext } from "./contexts/CompanyContext";

type Props = {
  onContinue: () => void;
};

interface SocialUrl {
  url: string;
  urlName: string;
}

interface FormData {
  address: string;
  about: string;
  category: string;
  schedule: object;
  socialUrls: SocialUrl[];
}
const week = ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"];

const socialUrlSchema = z.object({
  url: z.string().url(),
  urlName: z.string().min(1),
});

const formSchema = z.object({
  address: z.string().min(10, { message: "Хаягаа бүтэн оруулна уу" }),
  about: z.string(),
  socialUrls: z.array(socialUrlSchema),
  workdays: z.array(z.string()).min(1, "Ядаж нэг ажлын өдөр сонгоно уу"),
  open: z.string(),
  close: z.string(),
});

export const Step2 = ({ onContinue }: Props) => {
  const router = useRouter();
  const { company, setCompany } = useContext(CompanyContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      about: "",
      socialUrls: [],
      workdays: [],
      open: "",
      close: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatedCompany = {
        ...company,
        address: values.address,
        about: values.about,
        socialUrls: values.socialUrls,
        schedule: [
          {
            day: values.workdays,
            openingTime: values.open,
            closingTime: values.close,
          },
        ],
      };
      setCompany(updatedCompany);
      console.log("Submitted values:", updatedCompany);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/signupCompany`,
        updatedCompany,
        { withCredentials: true }
      );
      router.push("/login");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-5">
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
          name="workdays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цагийн хуваарь</FormLabel>
              <FormControl>
                <div
                  className="flex flex-wrap gap-3 md:flex-row md:gap-4"
                  {...field}
                >
                  {week.map((day) => {
                    return (
                      <Toggle
                        key={day}
                        onPressedChange={() =>
                          form.setValue(
                            "workdays",
                            form.watch("workdays").includes(day)
                              ? form.watch("workdays").filter((d) => d !== day)
                              : [...form.watch("workdays"), day]
                          )
                        }
                        className="border-1"
                      >
                        {day}
                      </Toggle>
                    );
                  })}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex  gap-4">
          <div className="">
            <FormField
              control={form.control}
              name="open"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нээх цаг</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="">
            <FormField
              control={form.control}
              name="close"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Хаах цаг</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="socialUrls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cошиал хаяг</FormLabel>
              <FormControl>
                <SocialUrlInput
                  socialUrls={field.value}
                  onChange={(urls) => form.setValue("socialUrls", urls)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button
            onClick={onContinue}
            className="w-1/2 border border-t-pink-600 border-b-purple-600 border-r-pink-700 border-l-purple-500 bg-white text-black hover:text-white  hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700 font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
          >
            Буцах
          </Button>
          <Button
            type="submit"
            className="w-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
          >
            Бүртгүүлэх
          </Button>
        </div>
      </form>
    </Form>
  );
};
