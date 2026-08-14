import React, { useState } from 'react';
import { User, Phone, AtSign, ArrowRight } from 'lucide-react';
import HeroSection from './HeroSection';

interface KolRegisterPageProps {
  onNext: () => void;
  onNavigateToLogin: () => void;
}

const translations = {
  th: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'ลงทะเบียน KOL',
    stepInfo: 'ขั้นตอนที่ 1 จาก 6 · ข้อมูลส่วนตัว',
    firstNameLabel: 'ชื่อ',
    firstNamePlaceholder: 'ชื่อ',
    lastNameLabel: 'นามสกุล',
    lastNamePlaceholder: 'นามสกุล',
    phoneLabel: 'เบอร์โทรศัพท์',
    phonePlaceholder: '08x-xxx-xxxx',
    lineIdLabel: 'Line ID (ไม่บังคับ)',
    lineIdPlaceholder: 'LINE ID',
    submitBtn: 'ดำเนินการต่อ',
    hasAccount: 'มีบัญชีอยู่แล้ว?',
    loginLink: 'เข้าสู่ระบบ',
    privacy: 'ความเป็นส่วนตัว',
    terms: 'ข้อกำหนด',
    help: 'ศูนย์ช่วยเหลือ',
    reqFirstName: 'กรุณากรอกชื่อ',
    reqLastName: 'กรุณากรอกนามสกุล',
    reqPhone: 'กรุณากรอกเบอร์โทรศัพท์',
    invalidPhone: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง',
  },
  en: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'KOL Registration',
    stepInfo: 'Step 1 of 6 · Personal Information',
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'First Name',
    lastNameLabel: 'Last Name',
    lastNamePlaceholder: 'Last Name',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '08x-xxx-xxxx',
    lineIdLabel: 'Line ID (Optional)',
    lineIdPlaceholder: 'LINE ID',
    submitBtn: 'Continue',
    hasAccount: 'Already have an account?',
    loginLink: 'Log In',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    help: 'Help Center',
    reqFirstName: 'First name is required',
    reqLastName: 'Last name is required',
    reqPhone: 'Phone number is required',
    invalidPhone: 'Invalid phone number format',
  }
};

export default function KolRegisterPage({ onNext, onNavigateToLogin }: KolRegisterPageProps) {
  const [lang, setLang] = useState<'th' | 'en'>('th');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    lineId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = translations[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = t.reqFirstName;
    if (!formData.lastName.trim()) newErrors.lastName = t.reqLastName;
    if (!formData.phone.trim()) {
      newErrors.phone = t.reqPhone;
    } else if (!/^[0-9\-\+\s]{9,15}$/.test(formData.phone)) {
      newErrors.phone = t.invalidPhone;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(); //  ตรวจสอบข้อมูลผ่านแล้ว  (KolRegisterPage2)
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F3F0FF] text-slate-800 font-['Prompt'] relative">
      
      {/* ฝั่งซ้าย */}
      <HeroSection 
        heroTag={t.heroTag} 
        heroSubtitle={t.heroSubtitle} 
        footerCopyright={t.footerCopyright} 
      />

      {/* ฝั่งขวา: Form Content */}
      <div className="lg:w-1/2 w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[#F3F0FF] relative min-h-screen py-8">
        
        {/* Language Switcher */}
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

        {/* Card Form Wrapper */}
        <div className="my-auto max-w-lg w-full mx-auto">
          
          {/* Header Title & Stepper Bar */}
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-1">{t.title}</h2>
            <p className="text-xs text-slate-400 font-medium">{t.stepInfo}</p>
            
            {/* Stepper Bar 6 ขั้นตอน  */}
            <div className="flex items-center justify-center gap-1.5 mt-3 max-w-xs mx-auto">
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
            </div>
            
            {/* ใช้พื้นที่ว่างให้ Layout สวยงามเท่ากับหน้าอื่นๆ ที่มีข้อความ Optional */}
            <p className="text-[11px] text-transparent select-none mt-2.5">
              Spacing
            </p>
          </div>

          {/* White Card Form */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <form onSubmit={handleContinue}>
              
              <div className="space-y-4">
                
                {/* ชื่อ - นามสกุล */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.firstNameLabel}</label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        name="firstName"
                        placeholder={t.firstNamePlaceholder}
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.firstName ? 'border-rose-500' : 'border-slate-200 focus:ring-indigo-200'} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300`}
                      />
                    </div>
                    {errors.firstName && <p className="text-[11px] text-rose-500 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.lastNameLabel}</label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        name="lastName"
                        placeholder={t.lastNamePlaceholder}
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.lastName ? 'border-rose-500' : 'border-slate-200 focus:ring-indigo-200'} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300`}
                      />
                    </div>
                    {errors.lastName && <p className="text-[11px] text-rose-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* เบอร์โทรศัพท์ */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.phoneLabel}</label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t.phonePlaceholder}
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.phone ? 'border-rose-500' : 'border-slate-200 focus:ring-indigo-200'} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Line ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.lineIdLabel}</label>
                  <div className="relative flex items-center">
                    <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      name="lineId"
                      placeholder={t.lineIdPlaceholder}
                      value={formData.lineId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border border-slate-200 focus:ring-indigo-200 focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300"
                    />
                  </div>
                </div>

                {/* ปุ่มดำเนินการต่อ */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition duration-200 flex items-center justify-center gap-2 mt-5 cursor-pointer"
                >
                  <span>{t.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
              </div>
            </form>

            {/* กลับหน้าเข้าสู่ระบบ */}
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

        {/* Footer Navigation */}
        <div className="flex justify-center items-center gap-6 text-xs text-slate-400 mt-6">
          <a href="#privacy" className="hover:text-slate-600">{t.privacy}</a>
          <a href="#terms" className="hover:text-slate-600">{t.terms}</a>
          <a href="#help" className="hover:text-slate-600">{t.help}</a>
        </div>

      </div>

    </div>
  );
}