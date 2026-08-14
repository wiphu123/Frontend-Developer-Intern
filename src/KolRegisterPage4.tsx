import React, { useState } from 'react';
import { ArrowRight, MapPin, Search, Building2 } from 'lucide-react';
import HeroSection from './HeroSection';

interface KolRegisterPage4Props {
  onBack: () => void;
  onSkip: () => void;
  onNext: (addressData: any) => void;
  onNavigateToLogin: () => void;
}

const translations = {
  th: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'ลงทะเบียน KOL',
    stepInfo: 'ขั้นตอนที่ 4 จาก 6 · ที่อยู่',
    optionalNotice: 'ไม่บังคับ — คุณสามารถเพิ่มข้อมูลนี้ในโปรไฟล์ได้ภายหลัง',
    
    addressLabel: 'ที่อยู่',
    addressPlaceholder: 'บ้านเลขที่ หมู่บ้าน ซอย ถนน',
    zipcodeLabel: 'รหัสไปรษณีย์',
    zipcodePlaceholder: '10110',
    subdistrictLabel: 'ตำบล/แขวง',
    subdistrictPlaceholder: 'กรอกรหัสไปรษณีย์ก่อน',
    districtLabel: 'อำเภอ/เขต',
    districtPlaceholder: 'กรอกอัตโนมัติจากรหัสไปรษณีย์',
    provinceLabel: 'จังหวัด',
    provincePlaceholder: 'กรอกอัตโนมัติจากรหัสไปรษณีย์',
    
    backBtn: 'ย้อนกลับ',
    skipBtn: 'ข้าม',
    submitBtn: 'ดำเนินการต่อ',
    hasAccount: 'มีบัญชีอยู่แล้ว?',
    loginLink: 'เข้าสู่ระบบ',
    privacy: 'ความเป็นส่วนตัว',
    terms: 'ข้อกำหนด',
    help: 'ศูนย์ช่วยเหลือ',
  },
  en: {
    heroTag: 'JSW KOL PLATFORM',
    heroSubtitle: 'A simpler way to manage campaigns, creators, approvals, and results.',
    footerCopyright: '© JSW All rights reserved',
    title: 'KOL Registration',
    stepInfo: 'Step 4 of 6 · Address',
    optionalNotice: 'Optional — You can add this info to your profile later',
    
    addressLabel: 'Address',
    addressPlaceholder: 'House No., Village, Soi, Road',
    zipcodeLabel: 'Zip Code',
    zipcodePlaceholder: '10110',
    subdistrictLabel: 'Sub-district',
    subdistrictPlaceholder: 'Enter zip code first',
    districtLabel: 'District',
    districtPlaceholder: 'Auto-filled from zip code',
    provinceLabel: 'Province',
    provincePlaceholder: 'Auto-filled from zip code',
    
    backBtn: 'Back',
    skipBtn: 'Skip',
    submitBtn: 'Continue',
    hasAccount: 'Already have an account?',
    loginLink: 'Log In',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    help: 'Help Center',
  }
};

export default function KolRegisterPage4({
  onBack,
  onSkip,
  onNext,
  onNavigateToLogin,
}: KolRegisterPage4Props) {
  const [lang, setLang] = useState<'th' | 'en'>('th');
  
  const [formData, setFormData] = useState({
    addressDetails: '',
    zipcode: '',
    subdistrict: '',
    district: '',
    province: ''
  });

  const t = translations[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // จำลองระบบดึงข้อมูลอัตโนมัติเมื่อกรอกรหัสไปรษณีย์ครบ 5 หลัก
    if (name === 'zipcode') {
      const zip = value.replace(/\D/g, '').slice(0, 5); // รับเฉพาะตัวเลข 5 หลัก
      
      if (zip.length === 5) {
        // จำลองข้อมูลขึ้นมาเมื่อพิมพ์ครบ
        setFormData(prev => ({
          ...prev,
          zipcode: zip,
          subdistrict: 'คลองเตยเหนือ',
          district: 'วัฒนา',
          province: 'กรุงเทพมหานคร'
        }));
      } else {
        // ล้างข้อมูลถ้าพิมพ์ไม่ครบ
        setFormData(prev => ({
          ...prev,
          zipcode: zip,
          subdistrict: '',
          district: '',
          province: ''
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  // เช็คว่ารหัสไปรษณีย์ถูกกรอกครบหรือยัง เพื่อจัดการสไตล์ของช่องที่เหลือ
  const isZipcodeFilled = formData.zipcode.length === 5;

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
              {t.optionalNotice}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
            <form onSubmit={handleContinue}>
              
              <div className="space-y-4 mb-8">
                
                {/* ที่อยู่ (รายละเอียด) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.addressLabel}</label>
                  <textarea
                    name="addressDetails"
                    rows={3}
                    placeholder={t.addressPlaceholder}
                    value={formData.addressDetails}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-slate-800 placeholder-slate-300 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* รหัสไปรษณีย์ */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.zipcodeLabel}</label>
                    <div className="relative flex items-center">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        name="zipcode"
                        placeholder={t.zipcodePlaceholder}
                        value={formData.zipcode}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50/70 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-slate-800 placeholder-slate-300"
                      />
                    </div>
                  </div>

                  {/* ตำบล/แขวง */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.subdistrictLabel}</label>
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        name="subdistrict"
                        placeholder={t.subdistrictPlaceholder}
                        value={formData.subdistrict}
                        onChange={handleChange}
                        readOnly={!isZipcodeFilled}
                        className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 outline-none transition text-slate-800 ${isZipcodeFilled ? 'bg-slate-50/70 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-slate-100/50 text-slate-500 placeholder-slate-300 cursor-not-allowed'}`}
                      />
                    </div>
                  </div>

                  {/* อำเภอ/เขต */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.districtLabel}</label>
                    <div className="relative flex items-center">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        name="district"
                        placeholder={t.districtPlaceholder}
                        value={formData.district}
                        onChange={handleChange}
                        readOnly={!isZipcodeFilled}
                        className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 outline-none transition text-slate-800 ${isZipcodeFilled ? 'bg-slate-50/70 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-slate-100/50 text-slate-500 placeholder-slate-300 cursor-not-allowed'}`}
                      />
                    </div>
                  </div>

                  {/* จังหวัด */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.provinceLabel}</label>
                    <div className="relative flex items-center">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        name="province"
                        placeholder={t.provincePlaceholder}
                        value={formData.province}
                        onChange={handleChange}
                        readOnly={!isZipcodeFilled}
                        className={`w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 outline-none transition text-slate-800 ${isZipcodeFilled ? 'bg-slate-50/70 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' : 'bg-slate-100/50 text-slate-500 placeholder-slate-300 cursor-not-allowed'}`}
                      />
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
                    {t.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={onSkip}
                    className="px-3.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 bg-transparent rounded-xl transition cursor-pointer"
                  >
                    {t.skipBtn}
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-indigo-200 transition duration-200 flex items-center gap-1.5 cursor-pointer"
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