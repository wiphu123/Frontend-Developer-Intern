import React, { useState, useEffect } from 'react';
import { ArrowRight, Landmark, User, CreditCard, ChevronDown } from 'lucide-react';
import HeroSection from './HeroSection';
import { useLanguage } from './contexts/LanguageContext';

interface KolRegisterPage5Props {
  initialData?: {
    bank: string;
    otherBank: string;
    accountName: string;
    accountNumber: string;
  };
  onBack: (data: any) => void;
  onSkip: (data: any) => void;
  onNext: (paymentData: any) => void;
  onNavigateToLogin: () => void;
}

export default function KolRegisterPage5({
  initialData,
  onBack,
  onSkip,
  onNext,
  onNavigateToLogin,
}: KolRegisterPage5Props) {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    bank: initialData?.bank || '',
    otherBank: initialData?.otherBank || '',
    accountName: initialData?.accountName || '',
    accountNumber: initialData?.accountNumber || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // คอยอัปเดต State ทันทีเมื่อ initialData มีการเปลี่ยนแปลง (ตอนกดปุ่ม Back กลับมา)
  useEffect(() => {
    if (initialData) {
      setFormData({
        bank: initialData.bank || '',
        otherBank: initialData.otherBank || '',
        accountName: initialData.accountName || '',
        accountNumber: initialData.accountNumber || ''
      });
    }
  }, [initialData]);

  const validateField = (name: string, value: string, currentData = formData) => {
    let errorMsg = '';

    switch (name) {
      case 'bank':
        if (!value) {
          errorMsg = 'Please select a bank';
        }
        break;
      case 'otherBank':
        if (currentData.bank === 'other' && !value.trim()) {
          errorMsg = 'Please specify bank name';
        }
        break;
      case 'accountName':
        if (!value.trim()) {
          errorMsg = 'Account name is required';
        }
        break;
      case 'accountNumber':
        if (!value.trim()) {
          errorMsg = 'Account number is required';
        } else if (!/^[0-9]{8,15}$/.test(value)) {
          errorMsg = 'Invalid account number format';
        }
        break;
      default:
        break;
    }

    return errorMsg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'accountNumber') {
      processedValue = value.replace(/\D/g, '').slice(0, 15);
    }

    setTouched((prev) => ({ ...prev, [name]: true }));
    const updatedData = { ...formData, [name]: processedValue };
    setFormData(updatedData);

    const errorMsg = validateField(name, processedValue, updatedData);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (errorMsg) {
        newErrors[name] = errorMsg;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });

    if (name === 'bank' && value !== 'other') {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.otherBank;
        return newErrors;
      });
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ['bank', 'accountName', 'accountNumber'];
    if (formData.bank === 'other') {
      fieldsToValidate.push('otherBank');
    }

    fieldsToValidate.forEach((field) => {
      const errorMsg = validateField(field, formData[field as keyof typeof formData], formData);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    setTouched({
      bank: true,
      otherBank: true,
      accountName: true,
      accountNumber: true,
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    }
  };

  const getInputClassName = (fieldName: string, isSelect = false) => {
    const baseClass = isSelect
      ? "w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition appearance-none cursor-pointer"
      : "w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border focus:outline-none focus:ring-2 transition text-slate-800 placeholder-slate-300";
    
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-rose-500 focus:ring-rose-200 ${isSelect ? 'bg-rose-50/20' : ''}`;
    }
    return `${baseClass} border-slate-200 focus:ring-indigo-200 ${isSelect ? 'bg-slate-50/70' : ''}`;
  };

  const bankKeys = [
    'bangkok',
    'kasikorn',
    'scb',
    'krungthai',
    'krungsri',
    'ttb',
    'uob',
    'gsb',
    'baac',
    'cimb',
    'kiatnakin',
    'tisco',
    'lhbank',
    'ghb',
    'other'
  ];

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F3F0FF] text-slate-800 font-['Prompt'] relative">
      
      {/* ฝั่งซ้าย: Hero Section */}
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
            <p className="text-xs text-slate-400 font-medium">{t.step5.stepInfo}</p>
            
            {/* Stepper Bar (Active 5 ช่อง) */}
            <div className="flex items-center justify-center gap-1.5 mt-3 max-w-xs mx-auto">
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
            </div>

            <p className="text-[11px] text-slate-400 mt-2.5">
              {t.common.optionalNotice}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <form onSubmit={handleContinue} noValidate>
              
              <div className="space-y-4 mb-8">
                
                {/* ธนาคาร (Select) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step5.bankLabel}</label>
                  <div className="relative flex items-center">
                    <Landmark className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                    <select
                      name="bank"
                      value={formData.bank}
                      onChange={handleChange}
                      className={`${getInputClassName('bank', true)} ${formData.bank ? 'text-slate-800' : 'text-slate-400'}`}
                    >
                      <option value="" disabled hidden>{t.step5.bankPlaceholder}</option>
                      {bankKeys.map((key) => (
                        <option key={key} value={key} className="text-slate-800">
                          {t.step5.banks[key as keyof typeof t.step5.banks]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" />
                  </div>
                  {errors.bank && <p className="text-[11px] text-rose-500 mt-1">{errors.bank}</p>}
                </div>

                {/* แสดงช่องกรอกเพิ่มเติมถ้าเลือก "อื่นๆ" */}
                {formData.bank === 'other' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step5.otherBankPlaceholder}</label>
                    <div className="relative flex items-center">
                      <Landmark className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        name="otherBank"
                        placeholder={t.step5.otherBankPlaceholder}
                        value={formData.otherBank}
                        onChange={handleChange}
                        className={getInputClassName('otherBank')}
                      />
                    </div>
                    {errors.otherBank && <p className="text-[11px] text-rose-500 mt-1">{errors.otherBank}</p>}
                  </div>
                )}

                {/* ชื่อบัญชี */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step5.accountNameLabel}</label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      name="accountName"
                      placeholder={t.step5.accountNamePlaceholder}
                      value={formData.accountName}
                      onChange={handleChange}
                      className={getInputClassName('accountName')}
                    />
                  </div>
                  {errors.accountName && <p className="text-[11px] text-rose-500 mt-1">{errors.accountName}</p>}
                </div>

                {/* เลขที่บัญชี */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step5.accountNumberLabel}</label>
                  <div className="relative flex items-center">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      name="accountNumber"
                      maxLength={15}
                      placeholder={t.step5.accountNumberPlaceholder}
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className={getInputClassName('accountNumber')}
                    />
                  </div>
                  {errors.accountNumber && <p className="text-[11px] text-rose-500 mt-1">{errors.accountNumber}</p>}
                </div>

              </div>

              {/* Action Buttons: ส่ง formData กลับไปตอนกด Back และ Skip */}
              <div className="flex items-center justify-between gap-2.5 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onBack(formData)}
                    className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
                  >
                    {t.common.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => onSkip(formData)}
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