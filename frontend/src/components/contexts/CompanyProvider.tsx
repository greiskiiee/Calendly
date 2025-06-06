'use client';
import { useState } from 'react';
import { Company, CompanyContext } from '@/components/contexts/CompanyContext';

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompany] = useState<Company>({
    companyName: '',
    logo: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    about: '',
    category: '',
    socialUrls: [],
    schedule: {},
  });

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}
