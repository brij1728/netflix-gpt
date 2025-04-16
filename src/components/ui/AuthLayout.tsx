import React from 'react';
import { useLocation } from 'react-router-dom';

interface AuthLayoutProps {
  title?: string | null;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
  const location = useLocation();
  const isGPTSearchPage = location.pathname === '/gptsearch';
  return (
    <div
      className={`flex min-h-screen justify-center ${
        isGPTSearchPage
          ? 'bg-black pt-16'
          : 'items-center bg-cover bg-center bg-no-repeat'
      }`}
      style={{ backgroundImage: "url('/netflix_login_page_background.jpg')" }}
    >
      {
        <div
          className={`w-full ${
            isGPTSearchPage
              ? 'max-w-5xl p-4'
              : 'max-w-md rounded-md bg-netflix-black bg-opacity-70 px-[68px] py-12 text-white-100'
          }`}
        >
          <h2 className="mb-7 text-3xl font-bold">{title}</h2>
          {children}
        </div>
      }
    </div>
  );
};
