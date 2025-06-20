// app/layout.tsx (Server Component)

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompanyProvider } from "@/components/contexts/CompanyProvider";
import { Company } from "@/components/contexts/CompanyContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="antialiased mx-auto flex flex-col min-h-screen">
          <CompanyProvider initialCompany={initialCompany}>
            <main className="flex-grow">{children}</main>
            {/* <Footer /> */}
          </CompanyProvider>
        </div>
      </body>
    </html>
  );
}
