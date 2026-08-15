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
      // Final submission (กรณีกด Next ในหน้าสุดท้าย)
      const finalPayload = { ...stepData };
      console.log('Registration Data:', finalPayload);
      alert('ลงทะเบียนเสร็จสิ้น!');
      navigate('/login');
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
      alert('ลงทะเบียนเสร็จสิ้น!');
      navigate('/login');
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (finalData: any) => {
    const completeData = { ...stepData, step6: finalData };
    setStepData(completeData);
    console.log('All Registration Steps Data:', completeData); // ข้อมูลทั้งหมดตั้งแต่สเต็ป 1-6 พร้อมส่ง Backend
    alert('ลงทะเบียนเสร็จสิ้น!');
    navigate('/login');
  };

  // Render the appropriate step componentพร้อมส่งข้อมูลเดิม (initialData) กลับไปแสดงผล
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