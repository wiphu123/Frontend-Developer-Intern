import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import HeroSection from './HeroSection';

interface KolRegisterPage2Props {
  onBack: () => void;
  onSkip: () => void;
  onNext: (selectedSkills: string[]) => void;
  onNavigateToLogin: () => void;
}

const translations = {
  th: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'ลงทะเบียน KOL',
    stepInfo: 'ขั้นตอนที่ 2 จาก 6 · ความต้องการในการทำงาน',
    optionalNotice: 'ไม่บังคับ — คุณสามารถเพิ่มข้อมูลนี้ในโปรไฟล์ได้ภายหลัง',
    skillLabel: 'ความเชี่ยวชาญ',
    skillHint: 'เลือกได้มากกว่าหนึ่งรายการ',
    skills: {
      video: 'วิดีโอ',
      photo: 'ภาพนิ่ง',
      live: 'ไลฟ์สด',
    },
    backBtn: 'ย้อนกลับ',
    skipBtn: 'ข้าม',
    submitBtn: 'ดำเนินการต่อ',
    hasAccount: 'มีบัญชีอยู่แล้ว?',
    loginLink: 'เข้าสู่ระบบ',
    privacy: 'ความเป็นส่วนตัว',
    terms: 'ข้อกำหนด',
    help: 'ศูนย์ช่วยเหลือ',
  },
  en: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'KOL Registration',
    stepInfo: 'Step 2 of 6 · Work Preferences',
    optionalNotice: 'Optional — You can add this info to your profile later',
    skillLabel: 'Expertise / Skills',
    skillHint: 'You can select more than one',
    skills: {
      video: 'Video',
      photo: 'Photo',
      live: 'Live Stream',
    },
    backBtn: 'Back',
    skipBtn: 'Skip',
    submitBtn: 'Continue',
    hasAccount: 'Already have an account?',
    loginLink: 'Log In',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    help: 'Help Center',
  }
};

export default function KolRegisterPage2({
  onBack,
  onSkip,
  onNext,
  onNavigateToLogin,
}: KolRegisterPage2Props) {
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['photo']); 

  const t = translations[lang];

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
      
      {/* ฝั่งซ้าย: */}
      <HeroSection 
        heroTag={t.heroTag} 
        heroSubtitle={t.heroSubtitle} 
        footerCopyright={t.footerCopyright} 
      />

      {/* ฝั่งขวา: Step 2 Form */}
      <div className="lg:w-1/2 w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[#F3F0FF] relative min-h-screen py-8">
        
        {/* Switch ภาษา */}
        <div className="flex justify-end mb-4 z-20">
          <div className="bg-white/80 backdrop-blur rounded-lg p-1 border border-slate-200/60 shadow-sm flex items-center text-xs font-semibold">
            <button 
              type="button" 
              onClick={() => setLang('en')} 
              className={`px-2.5 py-1 rounded-md transition ${lang === 'en' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-700'}`}
            >
              EN
            </button>
            <span className="text-slate-300">|</span>
            <button 
              type="button" 
              onClick={() => setLang('th')} 
              className={`px-2.5 py-1 rounded-md transition ${lang === 'th' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-700'}`}
            >
              ไทย
            </button>
          </div>
        </div>

        {/* Card Form */}
        <div className="my-auto max-w-lg w-full mx-auto">
          
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-1">{t.title}</h2>
            <p className="text-xs text-slate-400 font-medium">{t.stepInfo}</p>
            
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
              {t.optionalNotice}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <form onSubmit={handleContinue}>
              
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-700 mb-3 text-left">
                  {t.skillLabel}
                </label>
                
                {/* ปุ่มเลือกความเชี่ยวชาญ */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    { key: 'video', label: t.skills.video },
                    { key: 'photo', label: t.skills.photo },
                    { key: 'live', label: t.skills.live },
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
                  {t.skillHint}
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
                    {t.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={onSkip}
                    className="px-3.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 bg-transparent rounded-xl transition cursor-pointer"
                  >
                    {t.skipBtn}
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{t.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

            {/* Back to Login */}
            <div className="mt-8 pt-2 text-center text-xs text-slate-500 border-t border-slate-50">
              <span>{t.hasAccount} </span>
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-indigo-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                {t.loginLink}
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-6 text-xs text-slate-400 mt-6">
          <a href="#privacy" className="hover:text-slate-600">{t.privacy}</a>
          <a href="#terms" className="hover:text-slate-600">{t.terms}</a>
          <a href="#help" className="hover:text-slate-600">{t.help}</a>
        </div>

      </div>

    </div>
  );
}