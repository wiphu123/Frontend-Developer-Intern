import React, { useState } from 'react';
import { User, Mail, Briefcase, Lock, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validations, setValidations] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string, currentFormData = formData) => {
    let isValid = false;
    let errorMsg = '';

    switch (name) {
      case 'firstName':
        isValid = value.trim().length > 0;
        if (!isValid) errorMsg = t.register.reqFirstName;
        break;
      case 'lastName':
        isValid = value.trim().length > 0;
        if (!isValid) errorMsg = t.register.reqLastName;
        break;
      case 'email':
        if (!value.trim()) {
          errorMsg = t.register.reqEmail;
          isValid = false;
        } else {
          isValid = /\S+@\S+\.\S+/.test(value);
          if (!isValid) errorMsg = t.register.invalidEmail;
        }
        break;
      case 'position':
        isValid = value.length > 0;
        if (!isValid) errorMsg = t.register.reqPosition; 
        break;
      case 'password':
        if (!value) {
          errorMsg = t.register.reqPassword;
          isValid = false;
        } else {
          isValid = value.length >= 8;
          if (!isValid) errorMsg = t.register.shortPassword;
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errorMsg = t.register.passwordMismatch;
          isValid = false;
        } else {
          isValid = value === currentFormData.password;
          if (!isValid) errorMsg = t.register.passwordMismatch;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setTouched((prev) => ({ ...prev, [name]: true }));

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    
    validateField(name, value, updatedFormData);

    if (name === 'password') {
      setTouched((prev) => ({ ...prev, confirmPassword: true }));
      validateField('confirmPassword', updatedFormData.confirmPassword, updatedFormData);
    }
  };

  const validateAll = () => {
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      position: true,
      password: true,
      confirmPassword: true,
    });

    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = t.register.reqFirstName;
    if (!formData.lastName.trim()) newErrors.lastName = t.register.reqLastName;
    if (!formData.email.trim()) {
      newErrors.email = t.register.reqEmail;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.register.invalidEmail;
    }
    if (!formData.position) newErrors.position = t.register.reqPosition;
    if (!formData.password) {
      newErrors.password = t.register.reqPassword;
    } else if (formData.password.length < 8) {
      newErrors.password = t.register.shortPassword;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t.register.reqPassword;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.register.passwordMismatch;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const newUser = {
        email: formData.email,
        password: formData.password,
      };
      existingUsers.push(newUser);
      localStorage.setItem('allUsers', JSON.stringify(existingUsers));
      navigate('/register-success');
    }
  };

  const getBorderClass = (fieldName: string) => {
    if (!touched[fieldName]) {
      return 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100';
    }
    return validations[fieldName] 
      ? 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-100' 
      : 'border-rose-500 focus:border-rose-500 focus:ring-rose-200';
  };

  return (
    /* ปรับคลาสหลักให้ใช้ w-full h-screen lg:h-full พร้อม snap-start และ overflow-y-auto เพื่อให้อยู่ตรงกลางฝั่งขวาและสลับหน้าได้สมบูรณ์แบบ */
    <div className="w-full h-screen lg:h-full snap-start lg:snap-none flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 font-['Prompt'] relative bg-[#F4F2FF] overflow-y-auto">
      
      <div className="w-full max-w-[460px] my-auto py-8">
        
        <h2 className="text-[28px] sm:text-[32px] font-bold text-[#1E1B4B] mb-6 text-center">
          {t.register.title}
        </h2>

        <div className="bg-white rounded-[20px] shadow-sm p-6 sm:p-8 w-full border border-gray-100">
          
          <p className="text-[13px] text-gray-500 mb-6 text-left">
            {t.register.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* ชื่อ - นามสกุล */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{t.register.firstNameLabel}</label>
                <div className="relative flex items-center">
                  <User className="w-[18px] h-[18px] text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t.register.firstNamePlaceholder}
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 text-[14px] bg-white rounded-xl border ${getBorderClass('firstName')} focus:outline-none focus:ring-4 transition text-gray-800 placeholder-gray-400`}
                  />
                </div>
                {errors.firstName && <p className="text-[11px] text-rose-500 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{t.register.lastNameLabel}</label>
                <div className="relative flex items-center">
                  <User className="w-[18px] h-[18px] text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t.register.lastNamePlaceholder}
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2.5 text-[14px] bg-white rounded-xl border ${getBorderClass('lastName')} focus:outline-none focus:ring-4 transition text-gray-800 placeholder-gray-400`}
                  />
                </div>
                {errors.lastName && <p className="text-[11px] text-rose-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* อีเมล */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{t.register.emailLabel}</label>
              <div className="relative flex items-center">
                <Mail className="w-[18px] h-[18px] text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder={t.register.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2.5 text-[14px] bg-white rounded-xl border ${getBorderClass('email')} focus:outline-none focus:ring-4 transition text-gray-800 placeholder-gray-400`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
            </div>

            {/* ตำแหน่ง */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{t.register.positionLabel}</label>
              <div className="relative flex items-center">
                <Briefcase className="w-[18px] h-[18px] text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-8 py-2.5 text-[14px] bg-white rounded-xl border ${getBorderClass('position')} focus:outline-none focus:ring-4 transition ${formData.position ? 'text-gray-800' : 'text-gray-400'} appearance-none cursor-pointer`}
                >
                  <option value="" disabled hidden>{t.register.positionPlaceholder}</option>
                  <option value="marketing" className="text-gray-800">{t.register.posMarketing}</option>
                  <option value="marketing_manager" className="text-gray-800">{t.register.posMarketingManager}</option>
                  <option value="director" className="text-gray-800">{t.register.posDirector}</option>
                  <option value="accounting" className="text-gray-800">{t.register.posAccounting}</option>
                </select>
                <div className="absolute right-4 top-3.5 text-gray-400 text-[10px]">▼</div>
              </div>
              {errors.position && <p className="text-[11px] text-rose-500 mt-1">{errors.position}</p>}
            </div>

            {/* รหัสผ่าน */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{t.register.passwordLabel}</label>
              <div className="relative flex items-center">
                <Lock className="w-[18px] h-[18px] text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  placeholder={t.register.passwordPlaceholder}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2.5 text-[14px] bg-white rounded-xl border ${getBorderClass('password')} focus:outline-none focus:ring-4 transition text-gray-800 placeholder-gray-400 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  <Eye className="w-[18px] h-[18px]" />
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5">{t.register.passwordHint}</p>
              {errors.password && <p className="text-[11px] text-rose-500 mt-1">{errors.password}</p>}
            </div>

            {/* ยืนยันรหัสผ่าน */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{t.register.confirmPasswordLabel}</label>
              <div className="relative flex items-center">
                <Lock className="w-[18px] h-[18px] text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder={t.register.confirmPasswordPlaceholder}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2.5 text-[14px] bg-white rounded-xl border ${getBorderClass('confirmPassword')} focus:outline-none focus:ring-4 transition text-gray-800 placeholder-gray-400 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden`}
                />
              </div>
              {errors.confirmPassword && <p className="text-[11px] text-rose-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Notice Banner */}
            <div className="bg-[#F8F9FA] border border-gray-100 rounded-xl p-3 flex items-start gap-2.5 mt-2">
              <ShieldCheck className="w-[18px] h-[18px] text-gray-400 shrink-0 mt-0.5" />
              <p className="text-[12px] text-gray-500 leading-relaxed">
                {t.register.approvalNotice}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[14px] font-medium rounded-xl shadow-sm transition-colors duration-200 flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <span>{t.register.submitBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-[13px] text-gray-500">
            <span>{t.common.hasAccount} </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#6366F1] font-semibold hover:underline bg-transparent border-none cursor-pointer"
            >
              {t.common.loginLink}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}