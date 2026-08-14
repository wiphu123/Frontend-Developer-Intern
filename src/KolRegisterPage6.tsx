import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import HeroSection from './HeroSection';

interface KolRegisterPage6Props {
  onBack: () => void;
  onSubmit: (finalData: any) => void;
  onNavigateToLogin: () => void;
}

const translations = {
  th: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'ลงทะเบียน KOL',
    stepInfo: 'ขั้นตอนที่ 6 จาก 6 · ข้อมูลเข้าสู่ระบบ',
    
    emailLabel: 'อีเมล',
    emailPlaceholder: 'name@example.com',
    passwordLabel: 'รหัสผ่าน',
    passwordPlaceholder: 'สร้างรหัสผ่าน',
    passwordHint: 'อย่างน้อย 8 ตัวอักษร',
    confirmPasswordLabel: 'ยืนยันรหัสผ่าน',
    confirmPasswordPlaceholder: 'กรอกรหัสผ่านอีกครั้ง',
    
    reviewNotice: 'การลงทะเบียนของคุณจะได้รับการตรวจสอบโดยทีมงานก่อนเปิดใช้งานโปรไฟล์ของคุณ',
    
    backBtn: 'ย้อนกลับ',
    submitBtn: 'ส่งการลงทะเบียน',
    hasAccount: 'มีบัญชีอยู่แล้ว?',
    loginLink: 'เข้าสู่ระบบ',
    privacy: 'ความเป็นส่วนตัว',
    terms: 'ข้อกำหนด',
    help: 'ศูนย์ช่วยเหลือ',
    
    // Validation
    reqEmail: 'กรุณากรอกอีเมล',
    invalidEmail: 'รูปแบบอีเมลไม่ถูกต้อง',
    reqPassword: 'กรุณากรอกรหัสผ่าน',
    shortPassword: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
    passwordMismatch: 'รหัสผ่านไม่ตรงกัน',
  },
  en: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'KOL Registration',
    stepInfo: 'Step 6 of 6 · Login Information',
    
    emailLabel: 'Email',
    emailPlaceholder: 'name@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Create a password',
    passwordHint: 'At least 8 characters',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Enter password again',
    
    reviewNotice: 'Your registration will be reviewed by our team before your profile is activated.',
    
    backBtn: 'Back',
    submitBtn: 'Submit Registration',
    hasAccount: 'Already have an account?',
    loginLink: 'Log In',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    help: 'Help Center',
    
    // Validation
    reqEmail: 'Email is required',
    invalidEmail: 'Invalid email format',
    reqPassword: 'Password is required',
    shortPassword: 'Password must be at least 8 characters',
    passwordMismatch: 'Passwords do not match',
  }
};

export default function KolRegisterPage6({
  onBack,
  onSubmit,
  onNavigateToLogin,
}: KolRegisterPage6Props) {
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = translations[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = t.reqEmail;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    
    if (!formData.password) {
      newErrors.password = t.reqPassword;
    } else if (formData.password.length < 8) {
      newErrors.password = t.shortPassword;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData); // ส่งข้อมูลทั้งหมดไปให้ App.tsx จบกระบวนการ
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F3F0FF] text-slate-800 font-['Prompt'] relative">
      
      {/* ฝั่งซ้าย: Hero Section */}
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

        {/* Card Form */}
        <div className="my-auto max-w-lg w-full mx-auto">
          
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-1">{t.title}</h2>
            <p className="text-xs text-slate-400 font-medium">{t.stepInfo}</p>
            
            {/* Stepper Bar (Active ทั้ง 6 ช่อง) */}
            <div className="flex items-center justify-center gap-1.5 mt-3 max-w-xs mx-auto">
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
            </div>
            
            {/* เว้นระยะให้เท่ากับหน้าที่มี Optional Notice */}
            <p className="text-[11px] text-transparent select-none mt-2.5">
              Spacing
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <form onSubmit={handleSubmit}>
              
              <div className="space-y-4 mb-6">
                
                {/* อีเมล */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.emailLabel}</label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      placeholder={t.emailPlaceholder}
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'} outline-none transition text-slate-800 placeholder-slate-300`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>

                {/* รหัสผ่าน */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.passwordLabel}</label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder={t.passwordPlaceholder}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.password ? 'border-rose-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'} outline-none transition text-slate-800 placeholder-slate-300`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password ? (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.password}</p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-1 ml-1">{t.passwordHint}</p>
                  )}
                </div>

                {/* ยืนยันรหัสผ่าน */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.confirmPasswordLabel}</label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder={t.confirmPasswordPlaceholder}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.confirmPassword ? 'border-rose-500' : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'} outline-none transition text-slate-800 placeholder-slate-300`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 transition"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-[11px] text-rose-500 mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* กล่องข้อความเตือนการตรวจสอบ */}
                <div className="mt-4 p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-indigo-700 leading-snug">
                    {t.reviewNotice}
                  </p>
                </div>

              </div>

              {/* Action Buttons: ย้อนกลับ & ส่งการลงทะเบียน */}
              <div className="flex items-center justify-between gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
                >
                  {t.backBtn}
                </button>

                <button
                  type="submit"
                  className="flex-1 max-w-[200px] py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

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