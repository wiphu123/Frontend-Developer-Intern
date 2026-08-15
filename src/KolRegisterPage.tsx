import React, { useState } from 'react';
import { User, Phone, AtSign, ArrowRight } from 'lucide-react';
import HeroSection from './HeroSection';
import { useLanguage } from './contexts/LanguageContext';

interface KolRegisterPageProps {
  initialData?: {
    firstName: string;
    lastName: string;
    phone: string;
    lineId: string;
  };
  onNext: (data: any) => void;
  onNavigateToLogin: () => void;
}

export default function KolRegisterPage({ initialData, onNext, onNavigateToLogin }: KolRegisterPageProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    phone: initialData?.phone || '',
    lineId: initialData?.lineId || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    let errorMsg = '';

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          errorMsg = t.step1.reqFirstName;
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          errorMsg = t.step1.reqLastName;
        }
        break;
      case 'phone':
        if (!value.trim()) {
          errorMsg = t.step1.reqPhone;
        } else if (!/^[0-9]{9,10}$/.test(value)) {
          errorMsg = t.step1.invalidPhone;
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // ถ้าเป็นช่องเบอร์โทรศัพท์ ให้กรองรับเฉพาะตัวเลขเท่านั้น และจำกัดไม่เกิน 10 หลัก
    let processedValue = value;
    if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setTouched((prev) => ({ ...prev, [name]: true }));
    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    const errorMsg = validateField(name, processedValue);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMsg) {
        newErrors[name] = errorMsg;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ['firstName', 'lastName', 'phone'];

    fieldsToValidate.forEach((field) => {
      const errorMsg = validateField(field, formData[field as keyof typeof formData]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300";
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

        {/* Card Form Wrapper */}
        <div className="my-auto max-w-lg w-full mx-auto">
          
          <div className="text-center mb-5">
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-1">{t.common.title}</h2>
            <p className="text-xs text-slate-400 font-medium">{t.step1.stepInfo}</p>
            
            {/* Stepper Bar 6 ขั้นตอน */}
            <div className="flex items-center justify-center gap-1.5 mt-3 max-w-xs mx-auto">
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
            </div>
            
            <p className="text-[11px] text-transparent select-none mt-2.5">
              Spacing
            </p>
          </div>

          {/* White Card Form */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <form onSubmit={handleContinue} noValidate>
              
              <div className="space-y-4">
                
                {/* ชื่อ - นามสกุล */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step1.firstNameLabel}</label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="firstName"
                        placeholder={t.step1.firstNamePlaceholder}
                        value={formData.firstName}
                        onChange={handleChange}
                        className={getInputClassName('firstName')}
                      />
                    </div>
                    {errors.firstName && <p className="text-[11px] text-rose-500 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step1.lastNameLabel}</label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="lastName"
                        placeholder={t.step1.lastNamePlaceholder}
                        value={formData.lastName}
                        onChange={handleChange}
                        className={getInputClassName('lastName')}
                      />
                    </div>
                    {errors.lastName && <p className="text-[11px] text-rose-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* เบอร์โทรศัพท์ (กรอกได้เฉพาะตัวเลข) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step1.phoneLabel}</label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      placeholder={t.step1.phonePlaceholder}
                      value={formData.phone}
                      onChange={handleChange}
                      className={getInputClassName('phone')}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Line ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step1.lineIdLabel}</label>
                  <div className="relative flex items-center">
                    <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="lineId"
                      placeholder={t.step1.lineIdPlaceholder}
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
                  <span>{t.common.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
              </div>
            </form>

            {/* กลับหน้าเข้าสู่ระบบ */}
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