import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Trash2, AlertCircle } from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';

interface KolRegisterPage3Props {
  initialData?: {
    selectedPlatforms?: string[];
    platformsData?: Record<string, PlatformData>;
  };
  onBack: (data: { selectedPlatforms: string[]; platformsData: Record<string, PlatformData> }) => void;
  onSkip: (data: { selectedPlatforms: string[]; platformsData: Record<string, PlatformData> }) => void;
  onNext: (selectedPlatforms: string[], platformsData: Record<string, PlatformData>) => void;
  onNavigateToLogin: () => void;
}

interface PlatformData {
  url: string;
  followers: string;
  rateVideo: string;
  ratePhoto: string;
  rateLive: string;
}

const PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: (
      <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: (
      <svg className="w-6 h-6 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: (
      <svg className="w-6 h-6 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    )
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: (
      <svg className="w-6 h-6 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    id: 'x',
    name: 'X',
    icon: <span className="text-lg font-black text-slate-900 leading-none">𝕏</span>
  },
  {
    id: 'lemon8',
    name: 'Lemon8',
    icon: (
      <div className="w-6 h-6 bg-[#FFE600] rounded-lg flex items-center justify-center font-bold text-[10px] text-black shadow-xs">
        L8
      </div>
    )
  },
  {
    id: 'shopee',
    name: 'Shopee',
    icon: (
      <svg className="w-6 h-6 text-[#EE4D2D]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.8 8.4h-3.3C16.1 4.9 14.3 2 12 2S7.9 4.9 7.5 8.4H4.2c-.7 0-1.2.6-1.2 1.3l1.4 11.2c.1.9.9 1.6 1.8 1.6h15.6c.9 0 1.7-.7 1.8-1.6l1.4-11.2c0-.7-.5-1.3-1.2-1.3zm-7.8-4.5c1.3 0 2.4 2.1 2.7 4.5H9.3c.3-2.4 1.4-4.5 2.7-4.5zm6.8 16.2H5.2L4 9.9h3.3v1.8c0 .4.3.7.7.7s.7-.3.7-.7V9.9h6.6v1.8c0 .4.3.7.7.7s.7-.3.7-.7V9.9h3.3l-1.2 10.2z"/>
      </svg>
    )
  }
];

export default function KolRegisterPage3({
  initialData,
  onBack,
  onSkip,
  onNext,
  onNavigateToLogin,
}: KolRegisterPage3Props) {
  const { t } = useLanguage();
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(initialData?.selectedPlatforms || []);
  const [platformsData, setPlatformsData] = useState<Record<string, PlatformData>>(initialData?.platformsData || {});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialData) {
      setSelectedPlatforms(initialData.selectedPlatforms || []);
      setPlatformsData(initialData.platformsData || {});
    }
  }, [initialData]);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(id)) {
        const newData = { ...platformsData };
        delete newData[id];
        setPlatformsData(newData);
        return prev.filter((p) => p !== id);
      } else {
        setPlatformsData((d) => ({
          ...d,
          [id]: { url: '', followers: '', rateVideo: '', ratePhoto: '', rateLive: '' }
        }));
        return [...prev, id];
      }
    });
    if (errorMsg) setErrorMsg('');
  };

  const handleDataChange = (platformId: string, field: keyof PlatformData, value: string) => {
    setPlatformsData((prev) => ({
      ...prev,
      [platformId]: {
        ...prev[platformId],
        [field]: value
      }
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    for (const platformId of selectedPlatforms) {
      const data = platformsData[platformId];
      if (!data || !data.url.trim() || !data.followers.trim()) {
        setErrorMsg(t.step3.validationError || 'กรอก URL หรือชื่อผู้ใช้สำหรับทุกแพลตฟอร์ม');
        return;
      }
    }

    setErrorMsg('');
    if (onNext) {
      onNext(selectedPlatforms, platformsData);
    }
  };

  return (
    /* ปรับคลาสหลักให้ใช้ w-full h-screen lg:h-full พร้อม snap-start และ overflow-y-auto เพื่อจัดกึ่งกลางและเลื่อนได้พอดีในฝั่งขวา */
    <div className="w-full h-screen lg:h-full snap-start lg:snap-none flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 bg-[#F3F0FF] text-slate-800 font-['Prompt'] relative overflow-y-auto">
      
      <div className="my-auto max-w-lg w-full mx-auto py-8">
        
        <div className="text-center mb-5">
          <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-1">{t.common.title}</h2>
          <p className="text-xs text-slate-400 font-medium">{t.step3.stepInfo}</p>
          
          <div className="flex items-center justify-center gap-1.5 mt-3 max-w-xs mx-auto">
            <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
            <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
            <div className="h-1 flex-1 bg-indigo-600 rounded-full"></div>
            <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
            <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
            <div className="h-1 flex-1 bg-indigo-200/60 rounded-full"></div>
          </div>

          <p className="text-[11px] text-slate-400 mt-2.5">
            {t.common.optionalNotice}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8 border border-slate-100/80">
          
          {errorMsg && (
            <div className="mb-4 bg-[#FDF2F2] border border-[#FAD2D2] rounded-xl p-3 flex items-center gap-2 text-[#DC2626]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="text-xs font-medium leading-relaxed">
                {errorMsg}
              </p>
            </div>
          )}

          <form onSubmit={handleContinue}>
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 mb-3 text-left">
                {t.step3.platformLabel}
              </label>

              <div className="grid grid-cols-4 gap-2.5 mb-3">
                {PLATFORMS.map((platform) => {
                  const isSelected = selectedPlatforms.includes(platform.id);
                  return (
                    <button
                      type="button"
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`flex flex-col items-center justify-center py-4 px-2 rounded-2xl border transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500 text-indigo-700'
                          : 'border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 shadow-sm text-slate-600'
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center mb-2">
                        {platform.icon}
                      </div>
                      <span className={`text-[11px] font-medium ${isSelected ? 'text-indigo-700' : 'text-slate-700'}`}>
                        {platform.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-slate-400 mb-5 text-left">
                {t.step3.platformHint}
              </p>

              {selectedPlatforms.length === 0 ? (
                <div className="border border-dashed border-slate-200 rounded-2xl py-3.5 px-4 text-center bg-slate-50/40 flex items-center justify-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400 font-normal">
                    {t.step3.noPlatformText}
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedPlatforms.map((platformId) => {
                    const platform = PLATFORMS.find((p) => p.id === platformId)!;
                    const data = platformsData[platformId] || { url: '', followers: '', rateVideo: '', ratePhoto: '', rateLive: '' };

                    return (
                      <div key={platformId} className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm transition-all">
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 flex items-center justify-center">{platform.icon}</div>
                            <span className="font-bold text-sm text-slate-800">{platform.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => togglePlatform(platformId)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1.5">{t.step3.profileUrlLabel}</label>
                            <div className="relative flex items-center">
                              <span className="absolute left-3.5 text-slate-400 font-medium text-sm">@</span>
                              <input
                                type="text"
                                placeholder={t.step3.profileUrlPlaceholder}
                                value={data.url}
                                onChange={(e) => handleDataChange(platformId, 'url', e.target.value)}
                                className="w-full pl-8 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1.5">{t.step3.followersLabel}</label>
                            <div className="relative flex items-center">
                              <Users className="absolute left-3.5 w-3.5 h-3.5 text-slate-400" />
                              <input
                                type="number"
                                placeholder="0"
                                value={data.followers}
                                onChange={(e) => handleDataChange(platformId, 'followers', e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-xs font-bold text-slate-800">{t.step3.rateCardTitle}</span>
                            <span className="text-[10px] text-slate-400">{t.step3.rateCardSubtitle}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-[10px] font-medium text-slate-600 mb-1">{t.step3.rateVideo}</label>
                              <div className="relative flex items-center">
                                <span className="absolute left-3 text-slate-400 font-medium text-xs">฿</span>
                                <input
                                  type="number"
                                  placeholder="0"
                                  value={data.rateVideo}
                                  onChange={(e) => handleDataChange(platformId, 'rateVideo', e.target.value)}
                                  className="w-full pl-7 pr-2 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-slate-600 mb-1">{t.step3.ratePhoto}</label>
                              <div className="relative flex items-center">
                                <span className="absolute left-3 text-slate-400 font-medium text-xs">฿</span>
                                <input
                                  type="number"
                                  placeholder="0"
                                  value={data.ratePhoto}
                                  onChange={(e) => handleDataChange(platformId, 'ratePhoto', e.target.value)}
                                  className="w-full pl-7 pr-2 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-medium text-slate-600 mb-1">{t.step3.rateLive}</label>
                              <div className="relative flex items-center">
                                <span className="absolute left-3 text-slate-400 font-medium text-xs">฿</span>
                                <input
                                  type="number"
                                  placeholder="0"
                                  value={data.rateLive}
                                  onChange={(e) => handleDataChange(platformId, 'rateLive', e.target.value)}
                                  className="w-full pl-7 pr-2 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2.5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onBack({ selectedPlatforms, platformsData })}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
                >
                  {t.common.backBtn}
                </button>
                <button
                  type="button"
                  onClick={() => onSkip({ selectedPlatforms, platformsData })}
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

          <div className="mt-6 pt-2 text-center text-xs text-slate-500">
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

    </div>
  );
}