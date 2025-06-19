"use client";
import { createContext } from "react";

interface SocialUrl {
  url: string;
  urlName: string;
}

export interface Company {
  companyName: string;
  logo: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  about: string;
  category: string;
  schedule: object;
  socialUrls: SocialUrl[];
}

interface CompanyContextType {
  company: Company;
  setCompany: React.Dispatch<React.SetStateAction<Company>>;
}

export const CompanyContext = createContext<CompanyContextType>({
  company: {
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
  },
  setCompany: () => {},
});
