import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-screen overflow-hidden">
      <aside className="w-64 h-screen overflow-y-auto bg-white shadow-md">
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </aside>
      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
}
