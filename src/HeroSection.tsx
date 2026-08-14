import React from 'react';
import image from './assets/image.jpg';

interface HeroSectionProps {
  heroTag: string;
  heroSubtitle: string;
  footerCopyright: string;
}

export default function HeroSection({ heroTag, heroSubtitle, footerCopyright }: HeroSectionProps) {
  return (
    <div className="lg:w-1/2 w-full flex flex-col justify-between items-start p-8 lg:p-12 bg-white relative overflow-hidden min-h-[550px] lg:min-h-screen">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-[#e0e7ff]_1px,transparent_1px] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

      {/* ================= จุดที่ 1: หมอกฝั่งขวาบน ================= */}
      <div 
        aria-hidden="true" 
        className="hidden lg:block absolute -right-20 top-1/4 -translate-y-1/2 pointer-events-none z-0"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-purple-300/40 blur-[120px]"></div>
      </div>

      {/* ================= จุดที่ 2: หมอกซ้ายล่าง  ================= */}
      <div 
        aria-hidden="true" 
        className="absolute -bottom-24 -left-20 pointer-events-none z-0"
      >
        <div className="w-[450px] h-[450px] rounded-full bg-indigo-100/60 blur-[100px]"></div>
        <div className="w-[280px] h-[280px] -mt-[200px] ml-10 rounded-full bg-purple-300/35 blur-[80px]"></div>
      </div>

      {/* Content Box ( */}
      <div className="my-auto flex flex-col items-start text-left z-10 w-full mx-auto lg:mx-0 py-8">
        
        {/* Card Visual Hero Graphic */}
        <div className="relative w-[210px] sm:w-[230px] mx-auto lg:ml-[200px] lg:mr-auto">
          
          {/* ================= จุดที่ 3: หมอกรอบๆ รูปภาพ (Halo Glow) ================= */}
          <div 
            aria-hidden="true" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] bg-gradient-to-tr from-purple-300/45 via-indigo-200/40 to-fuchsia-200/30 blur-[80px] rounded-full pointer-events-none -z-10"
          ></div>
          

          {/* Main Image Frame */}
          <div className="relative w-full h-[270px] sm:h-[290px] bg-white rounded-[26px] p-2 shadow-xl shadow-indigo-100/50 border border-slate-100/80">
            <div className="w-full h-full rounded-[20px] overflow-hidden">
              <img 
                src={image} 
                alt="Live Creator" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Badge: Live creator */}
            <div className="absolute top-12 -right-6 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-[11px] font-bold text-indigo-900">Live creator</span>
            </div>

            {/* Badge: 4.8M TOTAL REACH */}
            <div className="absolute -bottom-3 -right-9 bg-white px-4 py-2 rounded-2xl shadow-lg border border-slate-100 text-left transform -rotate-3 hover:rotate-0 transition duration-300">
              <p className="text-base font-black text-slate-900 leading-none">4.8M</p>
              <p className="text-[8px] font-extrabold text-slate-400 tracking-wider uppercase mt-0.5">TOTAL REACH</p>
            </div>
          </div>

          {/* Floating Emojis */}
          <div className="absolute -top-3 right-1 w-11 h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-xl border border-slate-50 animate-float">✨</div>
          <div className="absolute top-16 -left-7 w-11 h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-xl border border-slate-50 animate-float delay-1">😍</div>
          <div className="absolute -bottom-2 -left-7 w-11 h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-xl border border-slate-50 animate-float delay-2">🔥</div>
          <div className="absolute bottom-14 -right-9 w-11 h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-xl border border-slate-50 animate-float delay-3">💜</div>
        </div>

        {/* บล็อกข้อความ */}
        <div className="mt-14 sm:mt-16 flex flex-col items-start w-full z-10 relative">
          <span className="text-[11px] font-extrabold tracking-[0.15em] text-indigo-600 uppercase mb-2">
            {heroTag}
          </span>
          
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 leading-[1.15] tracking-tight mb-3">
            Make creator <br />
            work <span className="text-indigo-600">work.</span>
          </h1>
          
          <p className="text-slate-400 text-xs lg:text-[13px] font-normal lg:whitespace-nowrap">
            {heroSubtitle}
          </p>
        </div>

      </div>

      {/*  Footer Copyright  */}
      <div className="text-[11px] text-slate-400 z-10 text-left w-full mt-4">
        {footerCopyright}
      </div>
    </div>
  );
}