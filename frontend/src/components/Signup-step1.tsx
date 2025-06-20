'use client';
import React, { ChangeEvent, useContext, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { CompanyContext } from './contexts/CompanyContext';
import { uploadImage } from '@/app/utils/image-upload';

type Props = {
  onContinue: () => void;
};

const categories = [
  'Үсчин',
  'Гоо сайхан',
  'Спа',
  'Эмчилгээний спа',
  'Нүүр будалт',
];

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
        {
          message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
        }
      ),
    email: z.string().email({ message: 'Зөв имэйл оруулна уу' }),
    phoneNumber: z.string().min(8, { message: 'Зөв утасны дугаар оруулна уу' }),
    password: z.string().min(8, {
      message: 'Нууц үг 8-аас их тэмдэгттэй байх ёстой',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Нууц үг 8-аас их тэмдэгттэй байх ёстой',
    }),
    category: z.string().min(2, { message: 'Төрлөө сонгоно уу' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Нууц үг таарахгүй байна',
    path: ['confirmPassword'],
  });

export const Step1 = ({ onContinue }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { company, setCompany } = useContext(CompanyContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      logo: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      category: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('working');
    if (!file) {
      console.log('Файл оруулаагүй байна');
      return;
    }
    const imageURL = await uploadImage(file);
    console.log('imageURL:', imageURL);
    const newCompany = {
      id: '',
      companyName: values.companyName,
      logo: imageURL,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: '',
      password: values.password,
      category: values.category,
      about: '',
      socialUrls: [],
      schedule: {},
    };
    console.log(newCompany, 'nc');
    setCompany(newCompany);
    console.log('Submitted values:', company);
    onContinue();
  };

  //cloudinary
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  // console.log(file);
  // const handleOnClick = async (file?: File) => {
  //   if (!file) {
  //     console.log("file oruulaagu bn");
  //     return;
  //   }
  //   const imageURL = await uploadImage(file);
  //   console.log(imageURL);
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-5">
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
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Байгууллагын лого</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...fieldProps}
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files[0]);
                    handleFileChange(event);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-4">
          <div className="lg:w-1/2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Байгууллагын и-мэйл</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Энд мэйлээ оруулна уу"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:w-1/2">
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

        <div className="w-full flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-4">
          <div className="lg:w-1/2">
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
                        type={showPassword ? 'text' : 'password'}
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

          <div className="lg:w-1/2">
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
                        type={showPassword ? 'text' : 'password'}
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
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
        >
          Дараах
        </Button>
      </form>
    </Form>
  );
};
