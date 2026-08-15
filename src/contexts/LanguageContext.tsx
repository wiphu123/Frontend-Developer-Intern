import React, { createContext, useContext, useState, ReactNode } from 'react';

// นำเข้าไฟล์แปลภาษาทั้งหมดมาไว้ที่ส่วนกลาง
import { th } from '../locales/th';
import { en } from '../locales/en';

type Language = 'th' | 'en';

// รวบรวมไฟล์แปลภาษา
const translations = {
  th,
  en,
};

// กำหนดโครงสร้างข้อมูลที่จะส่งผ่าน Context
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof th; // ช่วยให้ Auto-complete ตอนพิมพ์ t. ทำงานได้สมบูรณ์
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // ดึงค่าภาษาจาก localStorage (ถ้ามี) ค่าเริ่มต้นคือ 'th'
  const [lang, setLangState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('appLanguage');
    return (savedLang === 'th' || savedLang === 'en') ? savedLang : 'th';
  });

  // ฟังก์ชันเปลี่ยนภาษา พร้อมบันทึกลง localStorage
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('appLanguage', newLang);
  };

  // ตัวแปร t ที่เก็บคำแปลตามภาษาที่เลือก
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom Hook สำหรับเรียกใช้งานง่ายๆ
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage ต้องถูกเรียกใช้งานภายใต้ LanguageProvider');
  }
  return context;
}