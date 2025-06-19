"use client";
import { Calendar } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { CompanyContext } from "./contexts/CompanyContext";

export const AdminHeader = () => {
  const [newService, setNewService] = useState({
    name: "",
    price: 0,
    duration: 0,
    description: "",
  });

  // const { company } = useContext(CompanyContext);
  // console.log(company.id, "id");
  const handleAddService = async () => {
    if (!newService.name || !newService.price) {
      toast({
        title: "Алдаа",
        description: "Үйлчилгээний нэр болон үнийг заавал бөглөнө үү",
        variant: "destructive",
      });
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/service`, {
        companyId: "",
        serviceName: newService.name,
        servicePrice: newService.price,
        serviceInfo: newService.description,
        serviceTime: newService.duration,
      });

      toast({
        title: "Үйлчилгээ нэмэгдлээ",
        description: `${newService.name} үйлчилгээ амжилттай нэмэгдлээ`,
      });

      setNewService({ name: "", price: 0, duration: 0, description: "" });
      // setIsAddServiceOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="w-full flex items-center justify-between ">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">
              Манай байгууллага
            </span>
          </div>

          <Dialog>
            <DialogTrigger className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-3 rounded-md">
              + Үйлчилгээ нэмэх
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Шинэ үйлчилгээ нэмэх</DialogTitle>
                <DialogDescription>
                  Салонд шинэ үйлчилгээ нэмэхийн тулд дараах мэдээллийг бөглөнө
                  үү.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Нэр
                  </Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="col-span-3"
                    placeholder="Үйлчилгээний нэр"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Үнэ
                  </Label>
                  <Input
                    id="price"
                    value={newService.price}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                    className="col-span-3"
                    placeholder="Үнэ (₮)"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Хугацаа
                  </Label>
                  <Input
                    id="duration"
                    value={newService.duration}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        duration: Number(e.target.value),
                      }))
                    }
                    className="col-span-3"
                    placeholder="Хугацаа (минут)"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Тайлбар
                  </Label>
                  <Textarea
                    id="description"
                    value={newService.description}
                    onChange={(e) =>
                      setNewService((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="col-span-3"
                    placeholder="Үйлчилгээний тайлбар"
                  />
                </div>
              </div>
              <Button
                className="bg-rose-500 hover:bg-rose-600"
                onClick={handleAddService}
              >
                Үйлчилгээ нэмэх
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};
