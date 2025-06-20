'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle, Eye, XCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { DialogTrigger } from '@radix-ui/react-dialog';

const statusConfig = {
  pending: { label: 'Хүлээгдэж буй', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Баталгаажсан', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Дууссан', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Цуцлагдсан', color: 'bg-red-100 text-red-800' },
};

type SelectedBooking = {
  _id: string;
  clientName: string;
  clientPhone: number;
  selectedDate: string;
  selectedTime: string;
  status: string;
  serviceOrder?: {
    serviceName: string;
    servicePrice: number;
    serviceInfo?: string;
  };
};

type SelectedBookingCardProps = {
  selectedBooking: SelectedBooking;
  onUpdateStatus: (bookingId: string, newStatus: string) => void;
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
              Захиалга #{selectedBooking._id.slice(-4)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Үйлчлүүлэгчийн мэдээлэл
                </h3>
                <p>
                  <strong>Нэр:</strong> {selectedBooking.clientName}
                </p>
                <p>
                  <strong>Утас:</strong> {selectedBooking.clientPhone}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Үйлчилгээний мэдээлэл
                </h3>
                <p>
                  <strong>Үйлчилгээ:</strong>{' '}
                  {selectedBooking.serviceOrder?.serviceName ||
                    'Үйлчилгээ олдсонгүй'}
                </p>
                <p>
                  <strong>Үнэ:</strong>{' '}
                  {selectedBooking.serviceOrder?.servicePrice.toLocaleString() ||
                    '0'}
                  ₮
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Огноо цаг</h3>
                <p>
                  <strong>Огноо:</strong>{' '}
                  {new Date(selectedBooking.selectedDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Цаг:</strong> {selectedBooking.selectedTime}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Төлөв</h3>
                <Badge
                  className={
                    statusConfig[
                      selectedBooking.status.toLowerCase() as keyof typeof statusConfig
                    ]?.color || 'bg-gray-100 text-gray-800'
                  }
                >
                  {statusConfig[
                    selectedBooking.status.toLowerCase() as keyof typeof statusConfig
                  ]?.label || selectedBooking.status}
                </Badge>
              </div>
            </div>

            {selectedBooking.serviceOrder?.serviceInfo && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Нэмэлт тэмдэглэл
                </h3>
                <p className="bg-gray-50 p-3 rounded-lg">
                  {selectedBooking.serviceOrder.serviceInfo}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => onUpdateStatus(selectedBooking._id, 'Approved')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Баталгаажуулах
              </Button>
              <Button
                onClick={() => onUpdateStatus(selectedBooking._id, 'Completed')}
                className="bg-green-500 hover:bg-green-600"
              >
                Дуусгах
              </Button>
              <Button
                onClick={() => onUpdateStatus(selectedBooking._id, 'Canceled')}
                variant="destructive"
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
