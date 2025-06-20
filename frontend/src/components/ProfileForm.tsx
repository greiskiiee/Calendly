'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import DropDownMenu from './DropDownMenu';
import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Хамгийн багадаа 2 тэмдэгт оруулна уу' }),
  phonenumber: z
    .string()
    .min(8, { message: '8 оронтой дугаар оруулна уу' })
    .max(8),
  service: z.string({ required_error: 'Үйлчилгээ сонгоно уу' }),
  date: z.string({ required_error: 'Өдрөө сонгоно уу' }),
  time: z.string({ required_error: 'Цагаа сонгоно уу' }),
  notes: z.string().optional(),
});

interface ServiceItem {
  _id: string;
  value: string;
  label: string;
  serviceInfo?: string;
}

interface ProfileFormProps {
  services: ServiceItem[];
}

type OrderSuccessData = {
  orderId: string;
  clientName: string;
  clientPhone: string;
  serviceName: string;
  serviceInfo: string;
  selectedDate: string;
  selectedTime: string;
  notes?: string;
};

export function ProfileForm({ services }: ProfileFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderData, setOrderData] = useState<OrderSuccessData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phonenumber: '',
      service: '',
      date: '',
      time: '',
      notes: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/order`,
        {
          clientName: values.username,
          clientPhone: values.phonenumber,
          selectedDate: values.date,
          selectedTime: values.time,
          serviceOrder: values.service,
          notes: values.notes,
        }
      );

      if (response.data.success) {
        const selectedService = services.find((s) => s._id === values.service);

        setOrderData({
          orderId: response.data.order._id,
          clientName: values.username,
          clientPhone: values.phonenumber,
          serviceName: selectedService?.label || 'Unknown',
          serviceInfo: selectedService?.serviceInfo || 'Unknown',
          selectedDate: values.date,
          selectedTime: values.time,
          notes: values.notes,
        });

        setIsSuccess(true);
        toast.success('Амжилттай захиалга хийгдлээ');
      } else {
        toast.error('Захиалга хийхэд алдаа гарлаа');
      }
    } catch (error: any) {
      console.error('Захиалгын алдаа:', error);
      toast.error(
        error.response?.data?.message || 'Захиалга хийхэд алдаа гарлаа'
      );
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false);
    form.reset();
  };

  const formattedDate = orderData?.selectedDate
    ? new Date(orderData.selectedDate).toLocaleDateString('mn-MN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      })
    : '';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#f6339a] hover:bg-rose-600 text-white">
          Захиалах
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] max-w-[600px] sm:w-full rounded-lg">
        {isSuccess && orderData ? (
          <div className="space-y-4 p-4 sm:p-6">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
                Амжилттай захиалга хийгдлээ!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Таны захиалгын дугаар: #
                {orderData.orderId.slice(-6).toUpperCase()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <p className="text-sm text-gray-500">Нэр:</p>
                  <p className="font-medium">{orderData.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Утас:</p>
                  <p className="font-medium">{orderData.clientPhone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <p className="text-sm text-gray-500">Үйлчилгээ:</p>
                  <p className="font-medium">{orderData.serviceName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Огноо:</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Цаг:</p>
                <p className="font-medium">{orderData.selectedTime}</p>
              </div>

              {orderData.notes && (
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Нэмэлт тэмдэглэл:</p>
                  <p className="text-gray-800">{orderData.notes}</p>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center">
              Таны захиалгын баталгаажуулалт {orderData.clientPhone} дугаарт
              илгээгдэнэ.
            </p>

            <Button
              onClick={handleClose}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Дуусгах
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
              <DialogTitle className="text-lg sm:text-xl">
                Цаг захиалах
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Мэдээллээ бөглөж таны хүссэн цагт үйлчилгээ аваарай
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-4 sm:space-y-6 sm:p-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Нэр*
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Таны нэр"
                            className="text-sm sm:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Утасны дугаар*
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="99112233"
                            maxLength={8}
                            className="text-sm sm:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Үйлчилгээ*
                      </FormLabel>
                      <FormControl>
                        <DropDownMenu
                          data={services}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Үйлчилгээ сонгох"
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Огноо*
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="text-sm sm:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Цаг*
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="text-sm sm:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Нэмэлт тэмдэглэл
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Нэмэлт мэдээлэл"
                          className="text-sm sm:text-base min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-sm sm:text-base"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? 'Боловсруулж байна...'
                    : 'Захиалах'}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
