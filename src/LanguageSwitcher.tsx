import React from 'react';
import { useLanguage } from './contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="bg-white/80 backdrop-blur rounded-lg p-1 border border-slate-200/60 shadow-sm flex items-center text-xs font-semibold">
      <button 
        type="button" 
        onClick={() => setLang('en')} 
        className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
          lang === 'en' 
            ? 'text-indigo-600 font-bold' 
            : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        EN
      </button>
      <button 
        type="button" 
        onClick={() => setLang('th')} 
        className={`px-2.5 py-1 rounded-md transition ${
          lang === 'th' 
            ? 'text-indigo-600 font-bold' 
            : 'text-slate-400 hover:text-slate-700'
        }`}
      >
        ไทย
      </button>
    </div>
  );
}