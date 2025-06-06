// 'use client';
// // import React, { useState } from "react";
// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import React, { useRef, useState } from 'react';
// import axios from 'axios';

// interface FormData {
//   email: string;
//   password: string;
// }

// const formSchema = z.object({
//   email: z.string().min(2, { message: 'Зөв имэйл оруулна уу' }),
//   password: z
//     .string()
//     .min(8, { message: 'Нууц үг 8-аас их тэмдэгттэй байх ёстой' }),
// });

// const SalonLogin = () => {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const handleOnClick = async () => {
//     console.log('duudadgjiin');

//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_BACKEND_URI}/login`,
//       {
//         email: emailRef.current?.value,
//         password: passwordRef.current?.value,
//       }
//     );
//     localStorage.setItem('token', response.data.token);
//     console.log(response, 'response');
//   };

//   const [formData, setFormData] = useState<FormData>({
//     email: '',
//     password: '',
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     console.log(values);
//   };

//   return (
//     <div className="min-h-[800px] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4">
//       <div className="max-w-xl mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
//             Join Our Beauty Network
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Register your salon and connect with customers in Mongolia
//           </p>
//         </div>

//         <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
//           <CardHeader className="text-center pb-6">
//             <CardTitle className="text-2xl text-gray-800">Нэвтрэх</CardTitle>
//             <CardDescription className="text-gray-600">
//               Fill in your salon details to get started
//             </CardDescription>
//           </CardHeader>

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-8 px-5"
//             >
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Байгууллагын и-мэйл</FormLabel>
//                     <FormControl>
//                       <Input ref={emailRef} placeholder="Энд мэйлээ оруулна уу" {...field} />
//                     </FormControl>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Нууц үг</FormLabel>
//                     <FormControl>
//                       <Input ref={passwordRef} placeholder="Энд нууц үг оруулна уу" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
//                 type="submit"
//                 onClick={handleOnClick}
//               >
//                 Нэвтрэх
//               </Button>
//             </form>
//           </Form>
//         </Card>

//         <div className="text-center mt-6 text-gray-600">
//           <p>
//             Бүртгэлгүй бол
//             <a
//               href="#"
//               className="text-purple-600 hover:text-purple-700 font-medium ml-1"
//             >
//               Бүртгүүлэх
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SalonLogin;

"use client";
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
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Зөв имэйл хаяг оруулна уу" }),
  password: z
    .string()
    .min(8, { message: "Нууц үг 8-аас их тэмдэгттэй байх ёстой" }),
});

const SalonLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/loginCompany`,
        values
      );

      localStorage.setItem("token", response.data.token);
      console.log("boljiin goy bn");

      // router.push('/dashboard'); // Redirect after login÷
    } catch (error) {
      console.log("huts");

      console.error("Login error:", error);
      form.setError("root", {
        message: "Нэвтрэхэд алдаа гарлаа. Имэйл эсвэл нууц үгээ шалгана уу.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[800px] bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Буцаад тавтай морил
          </h1>
          <p className="text-gray-600 text-lg"></p>
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
              {form.formState.errors.root && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.root.message}
                </p>
              )}

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
                        type="email"
                      />
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
                      <Input
                        placeholder="Энд нууц үг оруулна уу"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
              </Button>
            </form>
          </Form>
        </Card>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Бүртгэлгүй бол
            <a
              href="/signup"
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
