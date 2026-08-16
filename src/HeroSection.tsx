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
    <div className="w-full h-screen xl:h-full flex flex-col justify-between items-center xl:items-start p-6 sm:p-8 xl:p-16 bg-white relative overflow-y-auto xl:overflow-hidden">
      
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

      {/* Content Box */}
      <div className="my-auto flex flex-col items-center xl:items-start text-center xl:text-left z-10 w-full max-w-md mx-auto xl:mx-0 py-2">
        
        {/* Card Visual Hero Graphic */}
        <div className="relative w-[240px] sm:w-[300px] mx-auto xl:ml-[100px] mb-6 sm:mb-10">
          
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] bg-gradient-to-tr from-purple-300/45 via-indigo-200/40 to-fuchsia-200/30 blur-[80px] rounded-full pointer-events-none -z-10"></div>
          
          <div className="relative w-full h-[300px] sm:h-[360px] bg-white rounded-[32px] p-1.5 shadow-2xl shadow-indigo-100/50 border border-slate-100/80 mx-auto">
            <div className="w-full h-full rounded-[20px] overflow-hidden">
              <img 
                src={image} 
                alt="Live Creator" 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="absolute top-10 sm:top-12 -right-6 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-[11px] font-bold text-indigo-900">Live creator</span>
            </div>

            <div className="absolute -bottom-3 -right-9 bg-white px-4 py-2 rounded-2xl shadow-lg border border-slate-100 text-left transform -rotate-3 hover:rotate-0 transition duration-300">
              <p className="text-base font-black text-slate-900 leading-none">4.8M</p>
              <p className="text-[8px] font-extrabold text-slate-400 tracking-wider uppercase mt-0.5">TOTAL REACH</p>
            </div>
          </div>

          <div className="absolute -top-6 -right-4 w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-lg sm:text-xl border border-slate-50 animate-float">✨</div>
          <div className="absolute top-16 -left-8 w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-lg sm:text-xl border border-slate-50 animate-float delay-1">😍</div>
          <div className="absolute -bottom-2 -left-6 w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-lg sm:text-xl border border-slate-50 animate-float delay-2">🔥</div>
          <div className="absolute bottom-14 -right-8 w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-lg sm:text-xl border border-slate-50 animate-float delay-3">💜</div>
        </div>

        {/* บล็อกข้อความ */}
        <div className="flex flex-col items-center xl:items-start text-center xl:text-left w-full z-10 relative">
          <span className="text-[11px] font-extrabold tracking-[0.15em] text-indigo-600 uppercase mb-1.5 sm:mb-2">
            {heroTag}
          </span>
          
          <h1 className="text-2xl sm:text-4xl xl:text-[42px] font-black text-slate-900 leading-[1.15] tracking-tight mb-2 sm:mb-3">
            Make creator <br />
            work <span className="text-indigo-600">work.</span>
          </h1>
          
          <p className="text-slate-400 text-xs xl:text-[13px] font-normal max-w-sm">
            {heroSubtitle}
          </p>
        </div>

      </div>

      {/* Bottom Section: Copyright (ซ่อนบนมือถือ แสดงเฉพาะบน Desktop) & Scroll Down Indicator */}
      <div className="w-full z-10 flex flex-col items-center xl:items-start mt-2">
        <div className="hidden xl:block text-[11px] text-slate-400 text-center xl:text-left w-full mb-1">
          {footerCopyright}
        </div>

        {/* Scroll Down Indicator */}
        <div 
          onClick={scrollToNext}
          className="xl:hidden flex flex-col items-center text-center w-full cursor-pointer group pb-1"
        >
          <div className="flex flex-col items-center animate-bounce animate-float delay-4">
            <span className="text-[10px] font-extrabold text-slate-400 tracking-[0.2em] uppercase group-hover:text-slate-600 transition">Scroll down</span>
            <span className="text-xs font-black text-slate-900 mt-0.5 group-hover:text-slate-900 transition">Join</span>
            <ChevronDown className="w-4 h-4 text-slate-400 mt-0.5" />
          </div>
        </div>
      </div>

    </div>
  );
}