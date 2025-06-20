"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen overflow-hidden relative">
        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
            mobileSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } md:hidden`}
          onClick={() => setMobileSidebarOpen(false)}
        ></div>

        <aside
          className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-300 md:relative md:translate-x-0 ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <AppSidebar closeSidebar={() => setMobileSidebarOpen(false)} />
        </aside>

        {/* Toggle Button on small screens */}
        <button
          className="md:hidden absolute top-4 left-4 z-50 bg-white p-2 rounded shadow"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Menu />
        </button>

        <main className="flex-1 overflow-y-auto bg-gray-50 w-full">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
