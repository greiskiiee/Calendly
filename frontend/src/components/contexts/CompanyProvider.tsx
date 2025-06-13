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

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}
