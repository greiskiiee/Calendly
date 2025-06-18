// components/contexts/CompanyProvider.tsx
'use client';

import { useState, useEffect } from 'react';
import { CompanyContext, Company } from './CompanyContext';
import axios from 'axios';

export function CompanyProvider({
  initialCompany,
  children,
}: {
  initialCompany: Company;
  children: React.ReactNode;
}) {
  const [company, setCompany] = useState<Company>(initialCompany);

  const fetchCompany = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/company/allCompanies`,
        {
          withCredentials: true,
        }
      );
      setCompany({ ...response.data, password: '' });
    } catch (error) {
      console.error('Failed to fetch company from token:', error);
    }
  };
  useEffect(() => {
    if (!initialCompany.email) {
      fetchCompany();
    }
  }, []);
  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}
