// app/layout.tsx (Server Component)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompanyProvider } from "@/components/contexts/CompanyProvider";
import { Company } from "@/components/contexts/CompanyContext";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  let initialCompany: Company = {
    id: "",
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

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as Company;
      initialCompany = decoded;
    } catch (err) {
      console.error("Invalid or expired token:", err);
    }
  }

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
