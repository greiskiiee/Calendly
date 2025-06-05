import React from 'react';

interface ButtonProps {
  text: string;
  icon?: string;
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, icon, primary }) => {
  return (
    <button className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none ${primary ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'border border-input bg-background hover:bg-accent'} h-9 rounded-md px-3 text-gray-600 hover:text-gray-800`}>
      {icon && (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-${icon} w-4 h-4 mr-1`}>
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
      )}
      {text}
    </button>
  );
};

export default Button;
