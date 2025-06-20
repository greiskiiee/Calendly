'use client';
import { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Phone,
  User,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Eye,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SelectedBookingCard } from './SelectedBookingCard';
import { AdminHeader } from './AdminHeader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

interface ServiceOrder {
  _id: string;
  companyId: string;
  serviceName: string;
  servicePrice: number;
  serviceInfo: string;
  serviceTime: number;
  __v: number;
}

interface Booking {
  _id: string;
  clientName: string;
  clientPhone: number;
  selectedDate: string;
  selectedTime: string;
  status: string;
  orderCreatedAt: string;
  __v: number;
  serviceOrder?: ServiceOrder;
}

const statusConfig = {
  pending: { label: 'Хүлээгдэж буй', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Баталгаажсан', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Дууссан', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Цуцлагдсан', color: 'bg-red-100 text-red-800' },
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/order/`
        );
        const data = await response.json();
        if (data.success) {
          setBookings(data.orders);
        } else {
          toast({
            title: 'Алдаа',
            description: 'Захиалгуудыг ачааллахад алдаа гарлаа',
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Алдаа',
          description: 'Сервертэй холбогдоход алдаа гарлаа',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.clientPhone.toString().includes(searchTerm) ||
      (booking.serviceOrder?.serviceName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ??
        false);
    const matchesStatus = statusFilter === 'all' || statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/order/${bookingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        toast({
          title: 'Захиалгын төлөв шинэчлэгдлээ',
          description: `Захиалга #${bookingId.slice(-4)} ${
            statusConfig[newStatus as keyof typeof statusConfig].label
          } болгогдлоо`,
        });
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      toast({
        title: 'Алдаа',
        description: 'Төлөв шинэчлэхэд алдаа гарлаа',
        variant: 'destructive',
      });
    }
  };

  // Calculate today's bookings
  const today = new Date().toISOString().split('T')[0];
  const todayBookings = bookings.filter(
    (b) => new Date(b.selectedDate).toISOString().split('T')[0] === today
  ).length;

  // Calculate weekly revenue (only completed bookings)
  const weeklyRevenue = bookings
    .filter((b) => b.status.toLowerCase() === 'completed')
    .reduce((sum, b) => sum + (b.serviceOrder?.servicePrice || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 ">
      <AdminHeader />

      {/* Stats Cards */}
      <section className="w-full py-8 px-4">
        <div className="mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Өнөөдрийн захиалга
                    </p>
                    <p className="text-2xl font-bold text-rose-600">
                      {todayBookings}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-rose-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Долоо хоногийн орлого
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {weeklyRevenue.toLocaleString()}₮
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Хүлээгдэж буй
                    </p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {
                        bookings.filter(
                          (b) => b.status.toLowerCase() === 'pending'
                        ).length
                      }
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Баталгаажсан
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {
                        bookings.filter(
                          (b) => b.status.toLowerCase() === 'confirmed'
                        ).length
                      }
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card> */}
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Нэр, утас, үйлчилгээгээр хайх..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Төлөвөөр шүүх" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">Бүгд</SelectItem>
                      <SelectItem value="Pending">Хүлээгдэж буй</SelectItem>
                      <SelectItem value="Approved">Баталгаажсан</SelectItem>
                      <SelectItem value="Completed">Дууссан</SelectItem>
                      <SelectItem value="Canceled">Цуцлагдсан</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Захиалгууд ({filteredBookings.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Үйлчлүүлэгч</TableHead>
                    <TableHead>Үйлчилгээ</TableHead>
                    <TableHead>Огноо/Цаг</TableHead>
                    <TableHead>Төлөв</TableHead>
                    <TableHead>Үнэ</TableHead>
                    <TableHead>Үйлдэл</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => {
                    const date = new Date(
                      booking.selectedDate
                    ).toLocaleDateString();
                    return (
                      <TableRow key={booking._id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {booking.clientName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {booking.clientPhone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {booking.serviceOrder?.serviceName ||
                            'Үйлчилгээ олдсонгүй'}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{date}</div>
                            <div className="text-sm text-gray-500">
                              {booking.selectedTime}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              statusConfig[
                                booking.status.toLowerCase() as keyof typeof statusConfig
                              ]?.color || 'bg-gray-100 text-gray-800'
                            }
                          >
                            {statusConfig[
                              booking.status.toLowerCase() as keyof typeof statusConfig
                            ]?.label || booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {booking.serviceOrder?.servicePrice.toLocaleString() ||
                            '0'}
                          ₮
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <SelectedBookingCard
                              selectedBooking={booking}
                              onUpdateStatus={updateBookingStatus}
                            />

                            {booking.status.toLowerCase() === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateBookingStatus(booking._id, 'confirmed')
                                }
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AdminBookings;
