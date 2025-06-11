import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { CompanyProvider } from "@/components/contexts/CompanyProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function SalonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="antialiased mx-auto">
          <CompanyProvider>{children}</CompanyProvider>
        </div>
      </body>
    </html>
  );
}
