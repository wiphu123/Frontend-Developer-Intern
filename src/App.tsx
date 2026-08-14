import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import KolRegisterPage from './KolRegisterPage';
import KolRegisterPage2 from './KolRegisterPage2';
import KolRegisterPage3 from './KolRegisterPage3';
import KolRegisterPage4 from './KolRegisterPage4';
import KolRegisterPage5 from './KolRegisterPage5';

import KolRegisterPage6 from './KolRegisterPage6';


type PageState = 'login' | 'staff-register' | 'kol-step1' | 'kol-step2' | 'kol-step3' | 'kol-step4' | 'kol-step5' | 'kol-step6';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('login');

  return (
    <main className="min-h-screen w-full bg-[#F3F0FF]">
      
      {currentPage === 'login' && (
        <LoginPage 
          onNavigateToStaffRegister={() => setCurrentPage('staff-register')}
          onNavigateToKolRegister={() => setCurrentPage('kol-step1')}
        />
      )}

      {currentPage === 'staff-register' && (
        <RegisterPage 
          onNavigateToLogin={() => setCurrentPage('login')} 
        />
      )}

      {currentPage === 'kol-step1' && (
        <KolRegisterPage 
          onNext={() => setCurrentPage('kol-step2')} 
          onNavigateToLogin={() => setCurrentPage('login')} 
        />
      )}

      {currentPage === 'kol-step2' && (
        <KolRegisterPage2 
          onBack={() => setCurrentPage('kol-step1')} 
          onSkip={() => setCurrentPage('kol-step3')} 
          onNext={() => setCurrentPage('kol-step3')} 
          onNavigateToLogin={() => setCurrentPage('login')} 
        />
      )}

      {currentPage === 'kol-step3' && (
        <KolRegisterPage3 
          onBack={() => setCurrentPage('kol-step2')} 
          onSkip={() => setCurrentPage('kol-step4')} 
          onNext={() => setCurrentPage('kol-step4')} 
          onNavigateToLogin={() => setCurrentPage('login')} 
        />
      )}

      {currentPage === 'kol-step4' && (
        <KolRegisterPage4 
          onBack={() => setCurrentPage('kol-step3')} 
          onSkip={() => setCurrentPage('kol-step5')} 
          onNext={() => setCurrentPage('kol-step5')} 
          onNavigateToLogin={() => setCurrentPage('login')} 
        />
      )}

      
      {currentPage === 'kol-step5' && (
        <KolRegisterPage5 
          onBack={() => setCurrentPage('kol-step4')} 
          onSkip={() => setCurrentPage('kol-step6')} 
          onNext={() => setCurrentPage('kol-step6')} 
          onNavigateToLogin={() => setCurrentPage('login')} 
        />
      )}

      
      {currentPage === 'kol-step6' && (
        <KolRegisterPage6 
          onBack={() => setCurrentPage('kol-step5')} 
          onSubmit={(finalData) => {
            alert('ลงทะเบียนสำเร็จ! ข้อมูลของคุณถูกส่งไปรอการตรวจสอบแล้ว');
            setCurrentPage('login'); // กลับไปหน้าล็อคอิน
          }} 
          onNavigateToLogin={() => setCurrentPage('login')} 
        />
      )}
      
    </main>
  );
}