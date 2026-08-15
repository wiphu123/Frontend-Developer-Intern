import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import HeroSection from './HeroSection';
import { useLanguage } from './contexts/LanguageContext';

interface KolRegisterPage6Props {
  initialData?: {
    email: string;
    password?: string;
  };
  onBack: () => void;
  onSubmit: (credentials: { email: string; password: string }) => void;
  onNavigateToLogin: () => void;
}

export default function KolRegisterPage6({
  initialData,
  onBack,
  onSubmit,
  onNavigateToLogin,
}: KolRegisterPage6Props) {
  const { t } = useLanguage();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: initialData?.email || '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string, currentData = formData) => {
    let errorMsg = '';

    switch (name) {
      case 'email':
        if (!value.trim()) {
          errorMsg = t.step6.reqEmail;
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = t.step6.invalidEmail;
        }
        break;
      case 'password':
        if (!value) {
          errorMsg = t.step6.reqPassword;
        } else if (value.length < 8) {
          errorMsg = t.step6.shortPassword;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errorMsg = t.step6.reqPassword;
        } else if (value !== currentData.password) {
          errorMsg = t.step6.passwordMismatch;
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const errorMsg = validateField(name, value, updatedFormData);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMsg) {
        newErrors[name] = errorMsg;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });

    // ถ้าแก้รหัสผ่าน ให้ตรวจสอบ confirmPassword ซ้ำทันที
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', updatedFormData.confirmPassword, updatedFormData);
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (confirmError) {
          newErrors.confirmPassword = confirmError;
        } else {
          delete newErrors.confirmPassword;
        }
        return newErrors;
      });
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ['email', 'password', 'confirmPassword'];

    fieldsToValidate.forEach((field) => {
      const errorMsg = validateField(field, formData[field as keyof typeof formData], formData);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ email: formData.email, password: formData.password });
    }
  };

  const getInputClassName = (fieldName: string, hasRightIcon = false) => {
    const baseClass = hasRightIcon
      ? "w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
      : "w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300";
    
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-rose-500 focus:ring-rose-200`;
    }
    return `${baseClass} border-slate-200 focus:ring-indigo-200`;
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F3F0FF] text-slate-800 font-['Prompt'] relative">
      
      {/* ฝั่งซ้าย */}
      <HeroSection 
        heroTag={t.common.heroTag} 
        heroSubtitle={t.common.heroSubtitle} 
        footerCopyright={t.common.footerCopyright} 
      />

      {/* ฝั่งขวา: Form Content */}
      <div className="lg:w-1/2 w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[#F3F0FF] relative min-h-screen py-8">
        
        <div className="mb-4"></div>

        {/* Card Form */}
        <div className="my-auto max-w-lg w-full mx-auto">
          
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-1">{t.common.title}</h2>
            <p className="text-xs text-slate-400 font-medium">{t.step6.stepInfo}</p>
            
            {/* Stepper Bar (Active ทั้งหมด 6 ช่อง) */}
            <div className="flex items-center justify-center gap-1.5 mt-3 max-w-xs mx-auto">
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
            </div>

            <p className="text-[11px] text-slate-400 mt-2.5">
              {t.common.optionalNotice}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <form onSubmit={handleContinue} noValidate>
              
              <div className="space-y-4 mb-6">
                
                {/* อีเมล */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step6.emailLabel}</label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      placeholder={t.step6.emailPlaceholder}
                      value={formData.email}
                      onChange={handleChange}
                      className={getInputClassName('email')}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>

                {/* รหัสผ่าน */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step6.passwordLabel}</label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete="new-password"
                      placeholder={t.step6.passwordPlaceholder}
                      value={formData.password}
                      onChange={handleChange}
                      className={getInputClassName('password', true)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{t.step6.passwordHint}</p>
                  {errors.password && <p className="text-[11px] text-rose-500 mt-1">{errors.password}</p>}
                </div>

                {/* ยืนยันรหัสผ่าน */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step6.confirmPasswordLabel}</label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder={t.step6.confirmPasswordPlaceholder}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={getInputClassName('confirmPassword', true)}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-[11px] text-rose-500 mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Notice Banner */}
                <div className="bg-[#F8F9FA] border border-slate-100 rounded-2xl p-3 flex items-start gap-2.5 mt-2">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {t.step6.reviewNotice}
                  </p>
                </div>

              </div>

              {/* Action Buttons: ย้อนกลับ, ดำเนินการต่อ */}
              <div className="flex items-center justify-between gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
                >
                  {t.common.backBtn}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{t.common.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>

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

        {/* Footer Navigation */}
        <div className="flex justify-center items-center gap-6 text-xs text-slate-400 mt-6">
          <a href="#privacy" className="hover:text-slate-600">{t.common.privacy}</a>
          <a href="#terms" className="hover:text-slate-600">{t.common.terms}</a>
          <a href="#help" className="hover:text-slate-600">{t.common.help}</a>
        </div>

      </div>

    </div>
  );
}