// app/layout.tsx (Server Component)

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { CompanyProvider } from "@/components/contexts/CompanyProvider";
import { Company } from "@/components/contexts/CompanyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  let initialCompany: Company = {
    companyName: "",
    logo: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    about: "",
    category: "",
    schedule: {},
    socialUrls: [],
  };

  const fetchCompany = async () => {
    const token = (await cookieStore).get("token")?.value;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as Company;
        initialCompany = decoded;
      } catch (err) {
        console.error("Invalid or expired token");
      }
    }
  };

  fetchCompany();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="antialiased mx-auto">
          <CompanyProvider initialCompany={initialCompany}>
            {children}
            <Footer />
          </CompanyProvider>
        </div>
      </body>
    </html>
  );
}
