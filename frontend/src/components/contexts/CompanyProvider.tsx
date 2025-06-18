// components/contexts/CompanyProvider.tsx
"use client";

import { useState, useEffect } from "react";
import { CompanyContext, Company } from "./CompanyContext";

export function CompanyProvider({
  initialCompany,
  children,
}: {
  initialCompany: Company;
  children: React.ReactNode;
}) {
  const [company, setCompany] = useState<Company>(initialCompany);

  useEffect(() => {
    if (!initialCompany.email) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/company/`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCompany({ ...data.company, password: "" });
          }
        })
        .catch((err) => {
          console.error("Failed to fetch company from token:", err);
        });
    }
  }, []);
  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}
