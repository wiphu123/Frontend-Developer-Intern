import React from 'react';
import { ChevronDown } from 'lucide-react';
import image from './assets/image.jpg';

interface HeroSectionProps {
  heroTag: string;
  heroSubtitle: string;
  footerCopyright: string;
}

export default function HeroSection({ heroTag, heroSubtitle, footerCopyright }: HeroSectionProps) {
  
  const scrollToNext = () => {
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    } else {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full h-screen xl:h-full flex flex-col justify-between items-stretch p-6 sm:p-8 xl:pt-48 xl:p-16 bg-white relative overflow-y-auto xl:overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-[#e0e7ff]_1px,transparent_1px] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

      {/* หมอกฝั่งขวาบน */}
      <div aria-hidden="true" className="hidden xl:block absolute -right-20 top-1/4 -translate-y-1/2 pointer-events-none z-0">
        <div className="w-[500px] h-[500px] rounded-full bg-purple-300/40 blur-[120px]"></div>
      </div>

      {/* หมอกซ้ายล่าง */}
      <div aria-hidden="true" className="absolute -bottom-24 -left-20 pointer-events-none z-0">
        <div className="w-[450px] h-[450px] rounded-full bg-indigo-100/60 blur-[100px]"></div>
        <div className="w-[280px] h-[280px] -mt-[200px] ml-10 rounded-full bg-purple-300/35 blur-[80px]"></div>
      </div>

      {/* Content Box หลัก */}
      <div className="my-auto flex flex-col z-10 w-full py-2 gap-6">
        
        {/* 1. ส่วนรูปภาพ: จัดให้อยู่กึ่งกลางพอดีในพื้นที่สีฟ้า */}
        <div className="w-full flex justify-center">
          <div className="relative w-[200px] sm:w-[240px] xl:w-[300px]">
            
            <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] xl:w-[450px] xl:h-[450px] bg-gradient-to-tr from-purple-300/45 via-indigo-200/40 to-fuchsia-200/30 blur-[80px] rounded-full pointer-events-none -z-10"></div>
            
            <div className="relative w-full h-[220px] sm:h-[260px] xl:h-[360px] bg-white rounded-[32px] p-1.5 shadow-2xl shadow-indigo-100/50 border border-slate-100/80 mx-auto">
              <div className="w-full h-full rounded-[20px] overflow-hidden">
                <img 
                  src={image} 
                  alt="Live Creator" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="absolute top-8 sm:top-10 -right-6 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-slate-100">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="text-[10px] xl:text-[11px] font-bold text-indigo-900">Live creator</span>
              </div>

              <div className="absolute -bottom-3 -right-9 bg-white px-3 py-1.5 xl:px-4 xl:py-2 rounded-2xl shadow-lg border border-slate-100 text-left transform -rotate-3 hover:rotate-0 transition duration-300">
                <p className="text-sm xl:text-base font-black text-slate-900 leading-none">4.8M</p>
                <p className="text-[7px] xl:text-[8px] font-extrabold text-slate-400 tracking-wider uppercase mt-0.5">TOTAL REACH</p>
              </div>
            </div>

            <div className="absolute -top-6 -right-4 w-8 h-8 xl:w-11 xl:h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-sm xl:text-xl border border-slate-50 animate-float">✨</div>
            <div className="absolute top-14 -left-8 w-8 h-8 xl:w-11 xl:h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-sm xl:text-xl border border-slate-50 animate-float delay-1">😍</div>
            <div className="absolute -bottom-2 -left-6 w-8 h-8 xl:w-11 xl:h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-sm xl:text-xl border border-slate-50 animate-float delay-2">🔥</div>
            <div className="absolute bottom-12 -right-8 w-8 h-8 xl:w-11 xl:h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-sm xl:text-xl border border-slate-50 animate-float delay-3">💜</div>
          </div>
        </div>

        {/* 2. ส่วนข้อความแบ่งเป็น 3 เงื่อนไขขนาดหน้าจอ */}
        <div className="flex flex-col items-center xl:items-start text-center xl:text-left w-full z-10 relative">
          <span className="text-[10px] xl:text-[11px] font-extrabold tracking-[0.15em] text-indigo-600 uppercase mb-1">
            {heroTag}
          </span>
          
          <h1 className="text-xl sm:text-2xl xl:text-[42px] font-black text-slate-900 leading-[1.15] tracking-tight mb-1.5 sm:mb-2">
            
            {/* 1. น้อยกว่า 1024px (มือถือ) - ให้อยู่บรรทัดเดียวกัน */}
            <span className="block lg:hidden whitespace-nowrap">
              Make creator work <span className="text-indigo-600">work.</span>
            </span>

            {/* 2. เท่ากับ 1024px ถึง 1279px (iPad / แท็บเล็ต) - ให้อยู่บรรทัดเดียวกัน */}
            <span className="hidden lg:block xl:hidden whitespace-nowrap">
              Make creator work <span className="text-indigo-600">work.</span>
            </span>

            {/* 3. มากกว่าหรือเท่ากับ 1280px (คอมพิวเตอร์ / Desktop) - แยกสองบรรทัด */}
            <span className="hidden xl:block">
              Make creator work <br />
              <span className="text-indigo-600">work.</span>
            </span>

          </h1>
          
          <p className="text-slate-400 text-[11px] xl:text-[13px] font-normal whitespace-nowrap max-w-none">
            {heroSubtitle}
          </p>
        </div>

      </div>

      {/* Bottom Section: Copyright & Scroll Down Indicator */}
      <div className="w-full z-10 flex flex-col items-center xl:items-start mt-auto pt-2">
        <div className="hidden xl:block text-[11px] text-slate-400 text-center xl:text-left w-full mb-1">
          {footerCopyright}
        </div>

        {/* Scroll Down Indicator */}
        <div 
          onClick={scrollToNext}
          className="xl:hidden flex flex-col items-center text-center w-full cursor-pointer group pb-2"
        >
          <div className="flex flex-col items-center animate-bounce animate-float delay-4">
            <span className="text-[9px] xl:text-[10px] font-extrabold text-slate-400 tracking-[0.2em] uppercase group-hover:text-slate-600 transition">Scroll down</span>
            <span className="text-[11px] xl:text-xs font-black text-slate-900 mt-0.5 group-hover:text-slate-900 transition">Join</span>
            <ChevronDown className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-slate-400 mt-0.5" />
          </div>
        </div>
      </div>

    </div>
  );
}