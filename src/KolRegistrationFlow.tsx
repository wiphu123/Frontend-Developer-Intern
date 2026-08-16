import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KolRegisterPage from './KolRegisterPage';
import KolRegisterPage2 from './KolRegisterPage2';
import KolRegisterPage3 from './KolRegisterPage3';
import KolRegisterPage4 from './KolRegisterPage4';
import KolRegisterPage5 from './KolRegisterPage5';
import KolRegisterPage6 from './KolRegisterPage6';

interface StepData {
  step1?: any;
  step2?: any;
  step3?: any;
  step4?: any;
  step5?: any;
  step6?: any;
}

export default function KolRegistrationFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [stepData, setStepData] = useState<StepData>({});

  const handleNext = (data?: any) => {
    if (data) {
      setStepData((prev) => ({ ...prev, [`step${currentStep}`]: data }));
    }
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission (กรณีเผื่อมีการกด Next ในหน้าสุดท้าย)
      const finalPayload = { ...stepData };
      console.log('Registration Data:', finalPayload);
      navigate('/register-kol-success');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/register-kol-success');
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (finalData: any) => {
    const completeData = { ...stepData, step6: finalData };
    setStepData(completeData);

    // 1. ดึงข้อมูลผู้ใช้เก่าที่มีอยู่ออกมาจาก localStorage (ใช้คีย์ 'allUsers' ร่วมกัน)
    const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');

    // 2. สร้างโครงสร้างข้อมูลใหม่ที่เก็บอีเมลและรหัสผ่านจากขั้นตอนสุดท้ายของ KOL
    const newUser = {
      email: finalData.email,
      password: finalData.password,
    };

    // 3. นำข้อมูลใหม่เพิ่มต่อท้ายเข้าไปในอาเรย์
    existingUsers.push(newUser);

    // 4. บันทึกข้อมูลทั้งหมดกลับลงไปใน localStorage
    localStorage.setItem('allUsers', JSON.stringify(existingUsers));

    console.log('All Users Saved (KOL):', existingUsers);
    console.log('All Registration Steps Data:', completeData);

    // 5. เปลี่ยนเส้นทางไปหน้าสำเร็จของ KOL
    navigate('/register-kol-success');
  };

  // Render the appropriate step component พร้อมส่งข้อมูลเดิม (initialData) กลับไปแสดงผล
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <KolRegisterPage 
            initialData={stepData.step1}
            onNext={handleNext} 
            onNavigateToLogin={handleNavigateToLogin} 
          />
        );
      case 2:
        return (
          <KolRegisterPage2
            initialData={stepData.step2}
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      case 3:
        return (
          <KolRegisterPage3
            initialData={stepData.step3}
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      case 4:
        return (
          <KolRegisterPage4
            initialData={stepData.step4}
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      case 5:
        return (
          <KolRegisterPage5
            initialData={stepData.step5}
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      case 6:
        return (
          <KolRegisterPage6
            initialData={stepData.step6}
            onBack={handleBack}
            onSubmit={handleSubmit}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      default:
        return (
          <KolRegisterPage 
            initialData={stepData.step1}
            onNext={handleNext} 
            onNavigateToLogin={handleNavigateToLogin} 
          />
        );
    }
  };

  return renderStep();
}