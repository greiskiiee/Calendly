"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const HeaderComponent = () => {
  const router = useRouter();
  return (
    <header className="bg-white/80 w-screen backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                color="white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="text-xl font-bold text-gray-800">TimeBook</div>
          </div>
          <Button
            onClick={() => router.push("/login")}
            className="border border-t-pink-600 border-b-purple-600 border-r-pink-700 border-l-purple-500 bg-white text-black hover:text-white  hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700 font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100"
          >
            Нэвтрэх
          </Button>
        </div>
      </div>
    </header>
  );
};
