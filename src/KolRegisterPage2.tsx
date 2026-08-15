import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import HeroSection from './HeroSection';
import { useLanguage } from './contexts/LanguageContext';

interface KolRegisterPage2Props {
  initialData?: string[];
  onBack: () => void;
  onSkip: () => void;
  onNext: (selectedSkills: string[]) => void;
  onNavigateToLogin: () => void;
}

export default function KolRegisterPage2({
  initialData,
  onBack,
  onSkip,
  onNext,
  onNavigateToLogin,
}: KolRegisterPage2Props) {
  const { t } = useLanguage();
  
  // ใช้ initialData ถ้ามี ถ้าไม่มีให้เริ่มต้นด้วยอาเรย์ว่าง
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialData || []); 

  const toggleSkill = (skillKey: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillKey)
        ? prev.filter((item) => item !== skillKey)
        : [...prev, skillKey]
    );
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(selectedSkills);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F3F0FF] text-slate-800 font-['Prompt'] relative">
      
      {/* ฝั่งซ้าย */}
      <HeroSection 
        heroTag={t.common.heroTag} 
        heroSubtitle={t.common.heroSubtitle} 
        footerCopyright={t.common.footerCopyright} 
      />

      {/* ฝั่งขวา: Step 2 Form */}
      <div className="lg:w-1/2 w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[#F3F0FF] relative min-h-screen py-8">
        
        {/* เว้นพื้นที่ด้านบนให้บาลานซ์ */}
        <div className="mb-4"></div>

        {/* Card Form */}
        <div className="my-auto max-w-lg w-full mx-auto">
          
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-1">{t.common.title}</h2>
            <p className="text-xs text-slate-400 font-medium">{t.step2.stepInfo}</p>
            
            {/* Stepper Bar 6 ขีด (Active 2 ช่องแรก) */}
            <div className="flex items-center justify-center gap-1.5 mt-3 max-w-xs mx-auto">
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
            </div>

            <p className="text-[11px] text-slate-400 mt-2.5">
              {t.common.optionalNotice}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <form onSubmit={handleContinue}>
              
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-700 mb-3 text-left">
                  {t.step2.skillLabel}
                </label>
                
                {/* ปุ่มเลือกความเชี่ยวชาญ */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    { key: 'video', label: t.step2.skills.video },
                    { key: 'photo', label: t.step2.skills.photo },
                    { key: 'live', label: t.step2.skills.live },
                  ].map((skill) => {
                    const isSelected = selectedSkills.includes(skill.key);
                    return (
                      <button
                        type="button"
                        key={skill.key}
                        onClick={() => toggleSkill(skill.key)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {skill.label}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-slate-400 mt-2 text-left">
                  {t.step2.skillHint}
                </p>
              </div>

              {/* ปุ่ม Action: ย้อนกลับ, ข้าม, ดำเนินการต่อ */}
              <div className="flex items-center justify-between gap-2.5 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
                  >
                    {t.common.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={onSkip}
                    className="px-3.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 bg-transparent rounded-xl transition cursor-pointer"
                  >
                    {t.common.skipBtn}
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{t.common.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

            {/* Back to Login */}
            <div className="mt-8 pt-2 text-center text-xs text-slate-500 border-t border-slate-50">
              <span>{t.common.hasAccount} </span>
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-indigo-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                {t.common.loginLink}
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-6 text-xs text-slate-400 mt-6">
          <a href="#privacy" className="hover:text-slate-600">{t.common.privacy}</a>
          <a href="#terms" className="hover:text-slate-600">{t.common.terms}</a>
          <a href="#help" className="hover:text-slate-600">{t.common.help}</a>
        </div>

      </div>

    </div>
  );
}