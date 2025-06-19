'use client';
import { ProfileForm } from '@/components/ProfileForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen flex px-4 items-center flex-col justify-center bg-red-50 gap-5">
      <div className="flex flex-col gap-5 mt-[-80px] lg:mt-0">
        <Button
          onClick={() => router.back()}
          className="bg-white rounded-md text-black hover:bg-blue-50 w-[100px]"
        >
          <ArrowLeft />
          Буцах
        </Button>
        {/* tsatsa commentlov */}
        {/* <ProfileForm /> */}
      </div>
    </div>
  );
}
