"use client";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

interface FormData {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().min(2, { message: "Зөв имэйл оруулна уу" }),
  password: z
    .string()
    .min(8, { message: "Нууц үг 8-аас их тэмдэгттэй байх ёстой" }),
});

const SalonLogin = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="min-h-[800px] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Join Our Beauty Network
          </h1>
          <p className="text-gray-600 text-lg">
            Register your salon and connect with customers in Mongolia
          </p>
        </div>

        <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">Нэвтрэх</CardTitle>
            <CardDescription className="text-gray-600">
              Fill in your salon details to get started
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 px-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Байгууллагын и-мэйл</FormLabel>
                    <FormControl>
                      <Input placeholder="Энд мэйлээ оруулна уу" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нууц үг</FormLabel>
                    <FormControl>
                      <Input placeholder="Энд нууц үг оруулна уу" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
                type="submit"
              >
                Нэвтрэх
              </Button>
            </form>
          </Form>
        </Card>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Бүртгэлгүй бол
            <a
              href="#"
              className="text-purple-600 hover:text-purple-700 font-medium ml-1"
            >
              Бүртгүүлэх
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalonLogin;
