import React from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <main className="min-h-screen w-full bg-[#F3F0FF]">
      <Outlet />
    </main>
  );
}