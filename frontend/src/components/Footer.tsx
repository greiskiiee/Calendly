import React from "react";

export const Footer = () => {
  return (
    <div className="w-screen bg-gray-800 py-12 px-4 text-white">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock w-4 h-4 text-white"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <span className="text-lg font-bold">TimeBook</span>
        </div>
        <p className="text-gray-400 mb-4">
          Гоо сайхныхаа төлөө цаг захиалга хялбар болгоё!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="font-semibold mb-2">Холбоо барих</h3>
          <p className="text-gray-400 text-sm">support@timebook.mn</p>
          <p className="text-gray-400 text-sm">+976 7777-8888</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Үйлчилгээ</h3>
          <p className="text-gray-400 text-sm">Онлайн захиалга</p>
          <p className="text-gray-400 text-sm">Салон бүртгэл</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Дагах</h3>
          <p className="text-gray-400 text-sm">Facebook</p>
          <p className="text-gray-400 text-sm">Instagram</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center">
        <p className="text-sm text-gray-500">
          © 2024 TimeBook. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>
    </div>
  );
};
