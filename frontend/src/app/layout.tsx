import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { CompanyProvider } from "@/components/contexts/CompanyProvider";
import { useContext, useState } from "react";
import { CompanyContext } from "@/components/contexts/CompanyContext";
import { cookies } from "next/headers";
import { jwt } from "zod/v4";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [company, setCompany] = useState({
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
  });
  const cookieStore = cookies();

  const fetchUser = async () => {
    const token = (await cookieStore).get("token")?.value;

    jwt.verify(token, process.env.SECRET_KEY);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="antialiased mx-auto">
          <CompanyContext.Provider value={{ company, setCompany }}>
            {children}
            <Footer />
          </CompanyContext.Provider>
        </div>
      </body>
    </html>
  );
}
