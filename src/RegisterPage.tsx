import React, { useState } from 'react';
import { User, Mail, Briefcase, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import HeroSection from './HeroSection';

interface RegisterPageProps {
  onNavigateToLogin: () => void;
}

const translations = {
  th: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'ลงทะเบียนเจ้าหน้าที่',
    subtitle: 'ลงทะเบียนบัญชีเพื่อขอสิทธิ์เข้าถึงพื้นที่ทำงาน',
    firstNameLabel: 'ชื่อ',
    firstNamePlaceholder: 'ชื่อ',
    lastNameLabel: 'นามสกุล',
    lastNamePlaceholder: 'นามสกุล',
    emailLabel: 'ที่อยู่อีเมล',
    emailPlaceholder: 'namo@company.com',
    positionLabel: 'ตำแหน่ง',
    positionPlaceholder: 'เลือกตำแหน่ง',
    posMarketing: 'การตลาด',
    posMarketingManager: 'ผู้จัดการการตลาด',
    posDirector: 'ผู้อำนวยการ',
    posAccounting: 'บัญชี',
    passwordLabel: 'รหัสผ่าน',
    passwordPlaceholder: 'สร้างรหัสผ่าน',
    passwordHint: 'อย่างน้อย 8 ตัวอักษร',
    confirmPasswordLabel: 'ยืนยันรหัสผ่าน',
    confirmPasswordPlaceholder: 'กรอกรหัสผ่านอีกครั้ง',
    approvalNotice: 'บัญชีเจ้าหน้าที่ใหม่ต้องได้รับการอนุมัติจากผู้ดูแลระบบก่อนจึงจะเข้าใช้งานได้',
    submitBtn: 'ส่งการลงทะเบียน',
    hasAccount: 'มีบัญชีอยู่แล้ว?',
    loginLink: 'เข้าสู่ระบบ',
    privacy: 'ความเป็นส่วนตัว',
    terms: 'ข้อกำหนด',
    help: 'ศูนย์ช่วยเหลือ',
    reqFirstName: 'กรุณากรอกชื่อ',
    reqLastName: 'กรุณากรอกนามสกุล',
    reqEmail: 'กรุณากรอกอีเมล',
    invalidEmail: 'รูปแบบอีเมลไม่ถูกต้อง',
    reqPosition: 'กรุณาเลือกตำแหน่ง',
    reqPassword: 'กรุณากรอกรหัสผ่าน',
    minPassword: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
    matchPassword: 'รหัสผ่านไม่ตรงกัน',
  },
  en: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'Staff Registration',
    subtitle: 'Register an account to request workspace access',
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'First Name',
    lastNameLabel: 'Last Name',
    lastNamePlaceholder: 'Last Name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'namo@company.com',
    positionLabel: 'Position',
    positionPlaceholder: 'Select position',
    posMarketing: 'Marketing',
    posMarketingManager: 'Marketing Manager',
    posDirector: 'Director',
    posAccounting: 'Accounting',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Create password',
    passwordHint: 'At least 8 characters',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Re-enter password',
    approvalNotice: 'New staff accounts require admin approval before being able to log in.',
    submitBtn: 'Submit Registration',
    hasAccount: 'Already have an account?',
    loginLink: 'Log In',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    help: 'Help Center',
    reqFirstName: 'First name is required',
    reqLastName: 'Last name is required',
    reqEmail: 'Email is required',
    invalidEmail: 'Invalid email format',
    reqPosition: 'Position is required',
    reqPassword: 'Password is required',
    minPassword: 'Password must be at least 8 characters',
    matchPassword: 'Passwords do not match',
  }
};

export default function RegisterPage({ onNavigateToLogin }: RegisterPageProps) {
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = translations[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = t.reqFirstName;
    if (!formData.lastName) newErrors.lastName = t.reqLastName;
    if (!formData.email) {
      newErrors.email = t.reqEmail;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }
    if (!formData.position) newErrors.position = t.reqPosition;
    if (!formData.password) {
      newErrors.password = t.reqPassword;
    } else if (formData.password.length < 8) {
      newErrors.password = t.minPassword;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.matchPassword;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(lang === 'th' ? 'ส่งการลงทะเบียนเรียบร้อยแล้ว!' : 'Registration submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F3F0FF] text-slate-800 font-['Prompt'] relative">
      
      {/*  ฝั่งซ้าย: */}
      <HeroSection 
        heroTag={t.heroTag} 
        heroSubtitle={t.heroSubtitle} 
        footerCopyright={t.footerCopyright} 
      />

      {/* ================= ฝั่งขวา: Register Form ================= */}
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
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-1">{t.title}</h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <p className="text-xs text-slate-400 mb-5 text-left">{t.subtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* แถว 1: ชื่อ - นามสกุล */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.firstNameLabel}</label>
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
                  {errors.firstName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t.lastNameLabel}</label>
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
                  {errors.lastName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.lastName}</p>}
                </div>
              </div>

              {/* ที่อยู่อีเมล */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.emailLabel}</label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    placeholder={t.emailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.email ? 'border-rose-500' : 'border-slate-200 focus:ring-indigo-200'} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-500 mt-0.5">{errors.email}</p>}
              </div>

              {/* ตำแหน่ง (Dropdown) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.positionLabel}</label>
                <div className="relative flex items-center">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.position ? 'border-rose-500' : 'border-slate-200 focus:ring-indigo-200'} focus:outline-none focus:ring-2 transition ${formData.position ? 'text-slate-800' : 'text-slate-300'} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled hidden>{t.positionPlaceholder}</option>
                    <option value="marketing" className="text-slate-800">{t.posMarketing}</option>
                    <option value="marketing_manager" className="text-slate-800">{t.posMarketingManager}</option>
                    <option value="director" className="text-slate-800">{t.posDirector}</option>
                    <option value="accounting" className="text-slate-800">{t.posAccounting}</option>
                  </select>
                  <div className="absolute right-3.5 top-2.5 pointer-events-none text-slate-400 text-[10px]">▼</div>
                </div>
                {errors.position && <p className="text-[11px] text-rose-500 mt-0.5">{errors.position}</p>}
              </div>

              {/* รหัสผ่าน */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.passwordLabel}</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={t.passwordPlaceholder}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.password ? 'border-rose-500' : 'border-slate-200 focus:ring-indigo-200'} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 flex items-center justify-center"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{t.passwordHint}</p>
                {errors.password && <p className="text-[11px] text-rose-500 mt-0.5">{errors.password}</p>}
              </div>

              {/* ยืนยันรหัสผ่าน */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t.confirmPasswordLabel}</label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder={t.confirmPasswordPlaceholder}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border ${errors.confirmPassword ? 'border-rose-500' : 'border-slate-200 focus:ring-indigo-200'} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 flex items-center justify-center"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-[11px] text-rose-500 mt-0.5">{errors.confirmPassword}</p>}
              </div>

              {/* Notice Banner */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2.5 flex items-start gap-2.5 mt-2">
                <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-snug">{t.approvalNotice}</p>
              </div>

              {/* ปุ่มบันทึกข้อมูล */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition duration-200 flex items-center justify-center gap-2 mt-4"
              >
                <span>{t.submitBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* ปุ่มกลับหน้าเข้าสู่ระบบ */}
            <div className="mt-5 text-center text-xs text-slate-500">
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

        {/* Footer ด้านล่าง */}
        <div className="flex justify-center items-center gap-6 text-xs text-slate-400 mt-6">
          <a href="#privacy" className="hover:text-slate-600">{t.privacy}</a>
          <a href="#terms" className="hover:text-slate-600">{t.terms}</a>
          <a href="#help" className="hover:text-slate-600">{t.help}</a>
        </div>
      </div>

    </div>
  );
}