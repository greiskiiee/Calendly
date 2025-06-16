"use client";

import { Calendar, Home, Inbox, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

// Menu items except logout
const items = [
  { title: "Нүүр", url: "/admin", icon: Home },
  { title: "Ирсэн", url: "#", icon: Inbox },
  { title: "Календар", url: "#", icon: Calendar },
  { title: "Профайл засах", url: "#", icon: Settings },
];

export function AppSidebar() {
  const router = useRouter();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Цэс</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Regular Menu Items */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => router.push(item.url)}
                      className="flex items-center gap-2 w-full text-left"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <AlertDialog
                  open={logoutDialogOpen}
                  onOpenChange={setLogoutDialogOpen}
                >
                  <AlertDialogTrigger asChild>
                    <SidebarMenuButton asChild>
                      <button
                        className="flex items-center gap-2 w-full text-left"
                        onClick={() => setLogoutDialogOpen(true)}
                      >
                        <LogOut />
                        <span>Гарах</span>
                      </button>
                    </SidebarMenuButton>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Та гарахдаа итгэлтэй байна уу?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Та дахин нэвтрэх хэрэгтэй болно.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Үгүй</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Тийм
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
