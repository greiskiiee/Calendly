import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle, Eye, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";

const statusConfig = {
  pending: { label: "Хүлээгдэж буй", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Баталгаажсан", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Дууссан", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Цуцлагдсан", color: "bg-red-100 text-red-800" },
};

type SelectedBooking = {
  id: number;
  customerName: string;
  phone: string;
  service: string;
  price: string;
  date: string;
  time: string;
  status: string;
  notes: string;
};

type SelectedBookingCardProps = {
  selectedBooking: SelectedBooking;
  onUpdateStatus: (bookingId: number, newStatus: string) => void;
};

export const SelectedBookingCard = ({
  selectedBooking,
  onUpdateStatus,
}: SelectedBookingCardProps) => {
  return (
    <div className="h-[32px] px-3 py-1 flex justify-center items-center rounded-md border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
      <Dialog>
        <DialogTrigger>
          <Eye className="w-4 h-4" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md min-w-[600px]">
          <DialogHeader>
            <DialogTitle>Захиалгын дэлгэрэнгүй</DialogTitle>
            <DialogDescription>
              Захиалга #{selectedBooking.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Үйлчлүүлэгчийн мэдээлэл
                </h3>
                <p>
                  <strong>Нэр:</strong> {selectedBooking.customerName}
                </p>
                <p>
                  <strong>Утас:</strong> {selectedBooking.phone}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Үйлчилгээний мэдээлэл
                </h3>
                <p>
                  <strong>Үйлчилгээ:</strong> {selectedBooking.service}
                </p>
                <p>
                  <strong>Үнэ:</strong> {selectedBooking.price}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Огноо цаг</h3>
                <p>
                  <strong>Огноо:</strong> {selectedBooking.date}
                </p>
                <p>
                  <strong>Цаг:</strong> {selectedBooking.time}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Төлөв</h3>
                <Badge
                  className={
                    statusConfig[
                      selectedBooking.status as keyof typeof statusConfig
                    ].color
                  }
                >
                  {
                    statusConfig[
                      selectedBooking.status as keyof typeof statusConfig
                    ].label
                  }
                </Badge>
              </div>
            </div>

            {selectedBooking.notes && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Нэмэлт тэмдэглэл
                </h3>
                <p className="bg-gray-50 p-3 rounded-lg">
                  {selectedBooking.notes}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => onUpdateStatus(selectedBooking.id, "confirmed")}
                className="bg-blue-500 hover:bg-blue-600"
                disabled={
                  selectedBooking.status === "completed" ||
                  selectedBooking.status === "cancelled" ||
                  selectedBooking.status === "confirmed"
                }
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Баталгаажуулах
              </Button>
              <Button
                onClick={() => onUpdateStatus(selectedBooking.id, "completed")}
                className="bg-green-500 hover:bg-green-600"
                disabled={
                  selectedBooking.status === "completed" ||
                  selectedBooking.status === "cancelled"
                }
              >
                Дуусгах
              </Button>
              <Button
                onClick={() => onUpdateStatus(selectedBooking.id, "cancelled")}
                variant="destructive"
                disabled={
                  selectedBooking.status === "completed" ||
                  selectedBooking.status === "cancelled"
                }
              >
                <XCircle className="w-4 h-4 mr-2" />
                Цуцлах
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
