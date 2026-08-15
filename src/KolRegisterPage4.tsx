import React, { useState } from 'react';
import { ArrowRight, MapPin, Search, Building2, ChevronDown } from 'lucide-react';
import HeroSection from './HeroSection';
import { useLanguage } from './contexts/LanguageContext';

interface KolRegisterPage4Props {
  initialData?: {
    addressDetails: string;
    zipcode: string;
    subdistrict: string;
    district: string;
    province: string;
  };
  onBack: () => void;
  onSkip: () => void;
  onNext: (addressData: any) => void;
  onNavigateToLogin: () => void;
}

export default function KolRegisterPage4({
  initialData,
  onBack,
  onSkip,
  onNext,
  onNavigateToLogin,
}: KolRegisterPage4Props) {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    addressDetails: initialData?.addressDetails || '',
    zipcode: initialData?.zipcode || '',
    subdistrict: initialData?.subdistrict || '',
    district: initialData?.district || '',
    province: initialData?.province || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const provinceKeys = Object.keys(t.step4.provinces || {});
  const zipcodeKeys = Object.keys(t.step4.zipcodes || {});
  const subdistrictKeys = Object.keys(t.step4.subdistricts || {});
  const districtKeys = Object.keys(t.step4.districts || {});

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
            <p className="text-xs text-slate-400 font-medium">{t.step4.stepInfo}</p>
            
            {/* Stepper Bar (Active 4 ช่อง) */}
            <div className="flex items-center justify-center gap-1.5 mt-3 max-w-xs mx-auto">
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
              <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
            </div>

            <p className="text-[11px] text-slate-400 mt-2.5">
              {t.common.optionalNotice}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <form onSubmit={handleContinue}>
              
              <div className="space-y-4 mb-8">
                
                {/* ที่อยู่ (รายละเอียด) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step4.addressLabel}</label>
                  <textarea
                    name="addressDetails"
                    rows={3}
                    placeholder={t.step4.addressPlaceholder}
                    value={formData.addressDetails}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-slate-800 placeholder-slate-300 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* จังหวัด (Dropdown) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step4.provinceLabel}</label>
                    <div className="relative flex items-center">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition appearance-none cursor-pointer bg-slate-50/70 ${formData.province ? 'text-slate-800' : 'text-slate-400'}`}
                      >
                        <option value="" disabled hidden>{t.step4.provincePlaceholder}</option>
                        {provinceKeys.map((key) => {
                          const name = t.step4.provinces[key as keyof typeof t.step4.provinces];
                          return (
                            <option key={key} value={name} className="text-slate-800">
                              {name}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* รหัสไปรษณีย์ (Dropdown) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step4.zipcodeLabel}</label>
                    <div className="relative flex items-center">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <select
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition appearance-none cursor-pointer bg-slate-50/70 ${formData.zipcode ? 'text-slate-800' : 'text-slate-400'}`}
                      >
                        <option value="" disabled hidden>{t.step4.zipcodePlaceholder}</option>
                        {zipcodeKeys.map((zipKey) => {
                          const zipVal = t.step4.zipcodes[zipKey as keyof typeof t.step4.zipcodes];
                          return (
                            <option key={zipKey} value={zipVal} className="text-slate-800">
                              {zipVal}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* ตำบล/แขวง (Dropdown) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step4.subdistrictLabel}</label>
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <select
                        name="subdistrict"
                        value={formData.subdistrict}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition appearance-none cursor-pointer bg-slate-50/70 ${formData.subdistrict ? 'text-slate-800' : 'text-slate-400'}`}
                      >
                        <option value="" disabled hidden>{t.step4.subdistrictPlaceholder}</option>
                        {subdistrictKeys.map((key) => {
                          const name = t.step4.subdistricts[key as keyof typeof t.step4.subdistricts];
                          return (
                            <option key={key} value={name} className="text-slate-800">
                              {name}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* อำเภอ/เขต (Dropdown) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.step4.districtLabel}</label>
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition appearance-none cursor-pointer bg-slate-50/70 ${formData.district ? 'text-slate-800' : 'text-slate-400'}`}
                      >
                        <option value="" disabled hidden>{t.step4.districtPlaceholder}</option>
                        {districtKeys.map((key) => {
                          const name = t.step4.districts[key as keyof typeof t.step4.districts];
                          return (
                            <option key={key} value={name} className="text-slate-800">
                              {name}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                </div>

              </div>

              {/* Action Buttons: ย้อนกลับ, ข้าม, ดำเนินการต่อ */}
              <div className="flex items-center justify-between gap-2.5 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
                  >
                    {t.common.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={onSkip}
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