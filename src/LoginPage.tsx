import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import HeroSection from './HeroSection';

interface LoginPageProps {
  onNavigateToStaffRegister: () => void;
  onNavigateToKolRegister: () => void;
}

const translations = {
  th: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'เข้าสู่ระบบ',
    subtitle: 'กรอกข้อมูลของคุณเพื่อเข้าใช้งานพื้นที่ทำงาน',
    emailLabel: 'อีเมล',
    emailPlaceholder: 'name@company.com',
    passwordLabel: 'รหัสผ่าน',
    passwordPlaceholder: 'กรอกรหัสผ่านของคุณ',
    forgotPassword: 'ลืมรหัสผ่าน?',
    submitBtn: 'เข้าสู่ระบบ',
    isStaff: 'เป็นพนักงาน?',
    staffRegister: 'ลงทะเบียนบัญชี',
    isKol: 'เป็น KOL / อินฟลูเอนเซอร์?',
    kolRegister: 'ลงทะเบียนเป็น KOL',
    privacy: 'ความเป็นส่วนตัว',
    terms: 'ข้อกำหนด',
    help: 'ศูนย์ช่วยเหลือ',
    reqEmail: 'กรุณากรอกอีเมล',
    invalidEmail: 'รูปแบบอีเมลไม่ถูกต้อง',
    reqPassword: 'กรุณากรอกรหัสผ่าน',
  },
  en: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'Log In',
    subtitle: 'Enter your credentials to access your workspace',
    emailLabel: 'Email',
    emailPlaceholder: 'namo@company.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot password?',
    submitBtn: 'Log In',
    isStaff: 'Are you staff?',
    staffRegister: 'Register Account',
    isKol: 'Are you a KOL / Influencer?',
    kolRegister: 'Register as KOL',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    help: 'Help Center',
    reqEmail: 'Email is required',
    invalidEmail: 'Invalid email format',
    reqPassword: 'Password is required',
  }
};

export default function LoginPage({ onNavigateToStaffRegister, onNavigateToKolRegister }: LoginPageProps) {
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = translations[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = t.reqEmail;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    if (!formData.password) newErrors.password = t.reqPassword;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(lang === 'th' ? 'เข้าสู่ระบบสำเร็จ!' : 'Login Successful!');
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

      {/* Login Form ฝั่งขวา */}
      <div className="lg:w-1/2 w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[#F3F0FF] relative min-h-screen py-8">
        <div className="flex justify-end mb-4 z-20">
          <div className="bg-white/80 backdrop-blur rounded-lg p-1 border border-slate-200/60 shadow-sm flex items-center text-xs font-semibold">
            <button type="button" onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-md transition ${lang === 'en' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>EN</button>
            <span className="text-slate-300">|</span>
            <button type="button" onClick={() => setLang('th')} className={`px-2.5 py-1 rounded-md transition ${lang === 'th' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-700'}`}>ไทย</button>
          </div>
        </div>

        <div className="my-auto max-w-md w-full mx-auto">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl border border-indigo-100 shadow-sm flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-indigo-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">{t.title}</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <p className="text-xs text-slate-400 mb-6 text-left">{t.subtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className={`w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/70 rounded-xl border ${errors.email ? 'border-rose-500' : 'border-slate-200 focus:ring-indigo-200'} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-400`}
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

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
                    className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50/70 rounded-xl border ${errors.password ? 'border-rose-500' : 'border-slate-200 focus:ring-indigo-200'} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-400`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
              </div>

              <div className="text-left">
                <a href="#forgot" className="text-xs text-indigo-600 font-semibold hover:underline">{t.forgotPassword}</a>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition duration-200 flex items-center justify-center gap-2 mt-4"
              >
                <span>{t.submitBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* ลิงก์สลับหน้า */}
            <div className="mt-8 pt-2 text-center text-xs space-y-1.5 text-slate-500">
              <p>
                {t.isStaff}{' '}
                <button
                  type="button"
                  onClick={onNavigateToStaffRegister}
                  className="text-indigo-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
                >
                  {t.staffRegister}
                </button>
              </p>
              <p>
                {t.isKol}{' '}
                <button
                  type="button"
                  onClick={onNavigateToKolRegister}
                  className="text-indigo-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
                >
                  {t.kolRegister}
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 text-xs text-slate-400 mt-6">
          <a href="#privacy" className="hover:text-slate-600">{t.privacy}</a>
          <a href="#terms" className="hover:text-slate-600">{t.terms}</a>
          <a href="#help" className="hover:text-slate-600">{t.help}</a>
        </div>
      </div>

    </div>
  );
}