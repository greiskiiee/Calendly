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
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Зөв имэйл хаяг оруулна уу" }),
  password: z
    .string()
    .min(8, { message: "Нууц үг 8-аас их тэмдэгттэй байх ёстой" }),
});

const SalonLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
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
        values,
        {
          withCredentials: true,
        }
      );

      // localStorage.setItem('token', response.data.token);
      console.log("boljiin goy bn");

      router.push("/admin");
    } catch (error) {
      console.error("Login error:", error);
      form.setError("root", {
        message: "Нэвтрэхэд алдаа гарлаа. Имэйл эсвэл нууц үгээ шалгана уу.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 ">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Буцаад тавтай морил
          </h1>
          <p className="text-gray-600 text-lg"></p>
        </div>

        <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/90">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">Нэвтрэх</CardTitle>
            <CardDescription className="text-gray-600">
              Бүртгэлтэй хаягаараа нэвтэрнэ үү.
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
              className="text-purple-600 hover:text-purple-700 font-medium ml-1 underline"
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
