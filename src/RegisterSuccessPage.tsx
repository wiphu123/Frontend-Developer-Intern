import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import HeroSection from './HeroSection';
import { useLanguage } from './contexts/LanguageContext';

export default function RegisterSuccessPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F3F0FF] text-slate-800 font-['Prompt'] relative">
      
      {/* ฝั่งซ้าย: Hero Section */}
      <HeroSection 
        heroTag={t.common.heroTag} 
        heroSubtitle={t.common.heroSubtitle} 
        footerCopyright={t.common.footerCopyright} 
      />

      {/* ฝั่งขวา */}
      <div className="lg:w-1/2 w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[#F3F0FF] relative min-h-screen py-8">
        <div className="mb-4"></div>

        <div className="w-full max-w-md mx-auto text-center mt-2 mb-auto">
          
          <h3 className="text-sm font-bold text-slate-700 mb-5">
            {t.registerSuccess.title}
          </h3>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80 text-left">
            
            <h2 className="text-xl sm:text-2xl font-black text-indigo-950 mb-4">
              {t.registerSuccess.header}
            </h2>

            <div className="bg-[#EBF7EE] border border-[#CDEBD4] rounded-2xl p-4 flex items-start gap-3 mb-6">
              <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
              <p className="text-xs text-[#1E4620] leading-relaxed font-medium">
                {t.registerSuccess.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-indigo-200 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.registerSuccess.loginBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 text-xs text-slate-400 mt-6">
          <a href="#privacy" className="hover:text-slate-600">{t.common.privacy}</a>
          <a href="#terms" className="hover:text-slate-600">{t.common.terms}</a>
          <a href="#help" className="hover:text-slate-600">{t.common.help}</a>
        </div>
      </div>
    </div>
  );
}