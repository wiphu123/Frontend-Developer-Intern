import React from 'react';
import { Outlet } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import HeroSection from './HeroSection';

export default function App() {
  return (
    <LanguageProvider>
      {/* Container หลัก คุมระบบ Scroll Snap เฉพาะโหมดมือถือ (แนวตั้ง) */}
      <main className="w-full h-screen bg-[#F3F0FF] flex flex-col xl:flex-row overflow-y-auto xl:overflow-hidden snap-y xl:snap-none snap-mandatory">
        
        {/* บล็อกที่ 1: ฝั่งซ้าย (HeroSection) - ล็อกให้เต็ม 1 หน้าจอบนมือถือ */}
        <div className="w-full xl:w-1/2 h-screen shrink-0 snap-start flex flex-col">
          <HeroSection 
            heroTag="JSW KOL PLATFORM"
            heroSubtitle="A simpler way to manage campaigns, creators, approvals, and results."
            footerCopyright="© JSW All rights reserved"
          />
        </div>

        {/* บล็อกที่ 2: ฝั่งขวา (Outlet สำหรับหน้า Login/Register) - ล็อกให้เต็ม 1 หน้าจอบนมือถือเช่นกัน */}
        <div className="w-full xl:w-1/2 h-screen shrink-0 snap-start relative bg-[#F3F0FF] overflow-y-auto">
          <Outlet />
        </div>
        
      </main>
    </LanguageProvider>
  );
}