import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher'; // นำเข้าคอมโพเนนต์เปลี่ยนภาษา
import { useLanguage } from './contexts/LanguageContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validations, setValidations] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const [loginError, setLoginError] = useState('');

  const validateField = (name: string, value: string) => {
    let isValid = false;
    let errorMsg = '';

    switch (name) {
      case 'email':
        if (!value.trim()) {
          errorMsg = t.login.reqEmail;
          isValid = false;
        } else {
          isValid = /\S+@\S+\.\S+/.test(value);
          if (!isValid) errorMsg = t.login.invalidEmail;
        }
        break;
      case 'password':
        if (!value) {
          errorMsg = t.login.reqPassword;
          isValid = false;
        } else {
          isValid = value.length > 0;
          if (!isValid) errorMsg = t.login.reqPassword;
        }
        break;
      default:
        break;
    }

    setValidations((prev) => ({ ...prev, [name]: isValid }));
    
    if (touched[name]) {
      if (!isValid) {
        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);

    if (loginError) setLoginError('');
  };

  const validateAll = () => {
    setTouched({ email: true, password: true });

    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = t.login.reqEmail;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.login.invalidEmail;
    }
    if (!formData.password) {
      newErrors.password = t.login.reqPassword;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const foundUser = existingUsers.find(
        (user: any) => user.email === formData.email && user.password === formData.password
      );

      if (foundUser) {
        setLoginError('');
        alert(t.login.successMsg);
        navigate('/');
      } else {
        setLoginError(t.login.invalidCredentials);
      }
    }
  };

  const getBorderClass = (fieldName: string) => {
    if (!touched[fieldName]) {
      return 'border-slate-200 focus:ring-indigo-200';
    }
    return validations[fieldName] 
      ? 'border-slate-200 focus:ring-indigo-200' 
      : 'border-rose-500 focus:ring-rose-200';
  };

  return (
    <div id="login-form-section" className="w-full min-h-screen lg:h-full snap-start lg:snap-none flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-[#F3F0FF] text-slate-800 font-['Prompt'] relative">
      
      {/* เพิ่มปุ่มเปลี่ยนภาษาไว้ที่มุมขวาบนของฟอร์ม */}
      <div className="flex justify-end mb-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="my-auto max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-white rounded-2xl border border-indigo-100 shadow-sm flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-1">{t.login.title}</h2>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
          <p className="text-xs text-slate-400 mb-6 text-left">{t.login.subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* ช่องอีเมล */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.login.emailLabel}</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={t.login.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/70 rounded-xl border ${getBorderClass('email')} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-400`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>

            {/* ช่องรหัสผ่าน */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.login.passwordLabel}</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  placeholder={t.login.passwordPlaceholder}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50/70 rounded-xl border ${getBorderClass('password')} focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-400 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
            </div>

            <div className="text-left">
              <a href="#forgot" className="text-xs text-indigo-600 font-semibold hover:underline">{t.login.forgotPassword}</a>
            </div>

            {/* กล่องแจ้งเตือน Error สีแดงเมื่อรหัสหรืออีเมลผิด */}
            {loginError && (
              <div className="bg-[#FDF2F2] border border-[#FAD2D2] rounded-xl p-3 flex items-center gap-2.5 text-[#DC2626]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p className="text-xs font-medium leading-relaxed">
                  {loginError}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition duration-200 flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <span>{t.login.submitBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* ลิงก์สลับหน้า */}
          <div className="mt-8 pt-2 text-center text-xs space-y-1.5 text-slate-500">
            <p>
              {t.login.isStaff}{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-indigo-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                {t.login.staffRegister}
              </button>
            </p>
            <p>
              {t.login.isKol}{' '}
              <button
                type="button"
                onClick={() => navigate('/register-kol')}
                className="text-indigo-600 font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                {t.login.kolRegister}
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 text-xs text-slate-400 mt-6 pb-2">
        <a href="#privacy" className="hover:text-slate-600">{t.common.privacy}</a>
        <a href="#terms" className="hover:text-slate-600">{t.common.terms}</a>
        <a href="#help" className="hover:text-slate-600">{t.common.help}</a>
      </div>
    </div>
  );
}