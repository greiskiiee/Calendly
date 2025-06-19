"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Star } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type OrderType = {
  clientName: string;
  clientPhone: number;
  selectedDate: string;
  selectedTime: string | undefined;
  serviceOrder: { serviceName: string; serviceInfo: string };
};

export default function Home() {
  const param = useParams();
  const [orderData, setOrderData] = useState<OrderType>();

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/order/${param?.orderid}`
      );
      console.log(data, "test data");
      setOrderData(data.order);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(orderData, "ORDER");

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-red-100 flex-col">
      <div className="bg-white w-[446px] h-[500px] rounded-md items-center justify-center flex flex-col">
        <div className="flex justify-center items-center flex-col space-y-1.5 p-6">
          <div className="h-[64px] w-[64px] flex rounded-full bg-[#DCFCE7] items-center justify-center">
            <Star className=" w-8 h-8 text-green-600 flex" />
          </div>
          <h1 className="text-[#15803D] text-[24px] font-semibold text-2xl tracking-tight">
            Амжилттай!
          </h1>
          <p className="text-sm text-gray-600">Таны захиалгыг хүлээн авлаа</p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="flex justify-center p-4 items-start flex-col w-[398px] h-fit bg-gray-100 rounded-md  ">
            <p className="text-black text-[16px]">
              Нэр: {orderData?.clientName}
            </p>
            <p className="text-black">Утас: {orderData?.clientPhone}</p>
            <p className="text-black">
              Үйлчилгээ: {orderData?.serviceOrder.serviceInfo}
            </p>
            <p className="text-black">Огноо: {orderData?.selectedDate} </p>
            <p className="text-black">Цаг: {orderData?.selectedTime}</p>
          </div>
          <p className="text-sm text-gray-600 font-normal">
            Таны захиалгыг баталгаажуулсан мессеж удахгүй очих болно.
          </p>
          <Button className="bg-rose-500 w-full h-10 hover:bg-rose-600 ">
            Буцах
          </Button>
        </div>
      </div>
    </div>
  );
}
