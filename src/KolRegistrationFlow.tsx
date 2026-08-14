import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KolRegisterPage from './KolRegisterPage';
import KolRegisterPage2 from './KolRegisterPage2';
import KolRegisterPage3 from './KolRegisterPage3';
import KolRegisterPage4 from './KolRegisterPage4';
import KolRegisterPage5 from './KolRegisterPage5';
import KolRegisterPage6 from './KolRegisterPage6';

interface StepData {
  step1?: {
    firstName: string;
    lastName: string;
    phone: string;
    lineId: string;
  };
  step2?: string[];
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
      // Final submission
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
    setStepData((prev) => ({ ...prev, step6: finalData }));
    alert('ลงทะเบียนเสร็จสิ้น!');
    navigate('/login');
  };

  // Render the appropriate step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <KolRegisterPage onNext={handleNext} onNavigateToLogin={handleNavigateToLogin} />;
      case 2:
        return (
          <KolRegisterPage2
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      case 3:
        return (
          <KolRegisterPage3
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      case 4:
        return (
          <KolRegisterPage4
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      case 5:
        return (
          <KolRegisterPage5
            onBack={handleBack}
            onSkip={handleSkip}
            onNext={handleNext}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      case 6:
        return (
          <KolRegisterPage6
            onBack={handleBack}
            onSubmit={handleSubmit}
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      default:
        return <KolRegisterPage onNext={handleNext} onNavigateToLogin={handleNavigateToLogin} />;
    }
  };

  return renderStep();
}
