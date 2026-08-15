import React from 'react';
import { Outlet } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext'; 

export default function App() {
  return (
    <LanguageProvider>
      <main className="min-h-screen w-full bg-[#F3F0FF]">
        
        <Outlet />
      </main>
    </LanguageProvider>
  );
}