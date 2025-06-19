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
import { useRouter } from 'next/navigation';
import DropDownMenu from './DropDownMenu';

const services = [
  {
    _id: '123',
    value: 'makeup',
    label: 'Нүүр будалт',
  },
  {
    _id: '1234',
    value: 'manicure',
    label: 'hums',
  },
];

const time = [
  {
    value: '13:00',
    label: '13:00',
  },
];

const formSchema = z.object({
  username: z.string({ required_error: 'Username' }).min(2, {
    message: 'Please enter at least 2 letters',
  }),
  phonenumber: z
    .string({ required_error: 'утасны дугаараа оруулна уу' })
    .max(8, {
      message: '8 оронтой дугаар оруулна уу ',
    }),
  service: z.string({ required_error: 'үйлчилгээ сонгоно уу' }),
  date: z.string({ required_error: 'өдрөө сонгоно уу' }),
  time: z.string({ required_error: 'цагаа сонгоно уу' }),
  nemelt: z.string({ required_error: 'Мэдээлэл оруулна уу?' }),
});

export function ProfileForm() {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phonenumber: '',
      service: '',
      date: '',
      time: '',
      nemelt: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URI}/order` as string,
      //   {
      //     clientName: values.username,
      //     clientPhone: values.phonenumber,
      //     selectedDate: values.date,
      //     selectedTime: values.time,
      //     serviceOrder: values.service,
      //   }
      // );
      // console.log(response);

      push(`/complete/1`);
    } catch (error) {
      console.log(error);
    }
  };
  const buttonClass =
    'inline-flex items-center justify-center gap-2 w-full h-10 px-4 py-2 text-sm font-medium text-white bg-[#f6339a] hover:bg-rose-600 rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';
  return (
    <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-[#f6339a] hover:bg-rose-600 text-white">
      <Dialog>
        {/* <DialogTrigger>Захиалах</DialogTrigger> */}
        <DialogTrigger asChild>
          <Button
            className={buttonClass}
            type="button" // DialogTrigger дээр заавал submit биш
          >
            Захиалах
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md min-w-[600px]">
          <DialogHeader>
            <DialogTitle>Цаг захиалах</DialogTitle>
            <DialogDescription>
              Мэдээллээ бөглөж таны хүссэн цагт үйлчилгээ аваарай
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className=" w-full flex gap-2 justify-center  items-center">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Нэр*</FormLabel>
                      <FormControl>
                        <Input placeholder="таны нэр" {...field} />
                      </FormControl>
                      <FormMessage className="h-fit" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phonenumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Утасны дугаар </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="99112233"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Үйлчилгээ сонгох</FormLabel>
                    <FormControl>
                      <DropDownMenu
                        data={services}
                        value={field.value}
                        onChange={field.onChange}
                        getValue={(item) => item._id!} // use _id as value
                        placeholder="Үйлчилгээгээ сонгоно уу?"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" w-full flex gap-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Огноо*</FormLabel>
                      <FormControl>
                        <Input type="date" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Цаг* </FormLabel>
                      <FormControl>
                        <DropDownMenu
                          data={time}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Цаг сонгоно уу"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="nemelt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нэмэлт тэмдэглэл </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Та шаардлагатай бол нэмэлт мэдээлэл оруулна уу " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="flex w-full bg-pink-400 hover:bg-pink-600"
                type="submit"
              >
                Захиалах
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
