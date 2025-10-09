'use client';

import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react';
import BasicRegistrationForm from './BasicRegistrationForm';
import ProfileCompletionForm from './ProfileCompletionForm';
import RoleSelectionForm from './RoleSelectionForm';

interface RegistrationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<any>({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const steps: RegistrationStep[] = [
    {
      id: 1,
      title: 'البيانات الأساسية',
      description: 'إنشاء الحساب والتحقق من البريد الإلكتروني',
      completed: currentStep > 1,
    },
    {
      id: 2,
      title: 'الملف الشخصي',
      description: 'إكمال البيانات الشخصية والموقع',
      completed: currentStep > 2,
    },
    {
      id: 3,
      title: 'اختيار الدور',
      description: 'تحديد نوع الحساب والصلاحيات',
      completed: currentStep > 3,
    },
  ];

  const handleStepSuccess = (stepData: any) => {
    setError('');
    setUserData({ ...userData, ...stepData });
    
    if (currentStep === 1) {
      if (stepData.needsEmailConfirmation) {
        setSuccess('تم إرسال رابط التحقق إلى بريدك الإلكتروني. يرجى تأكيد بريدك الإلكتروني أولاً، ثم العودة لإكمال التسجيل.');
        // لا ننتقل للخطوة التالية - ننتظر تأكيد البريد
        // المستخدم سيعود عبر callback page
        return;
      } else {
        // إذا كان لديه session صالحة، انتقل مباشرة للخطوة التالية
        setSuccess('تم إنشاء حسابك بنجاح! الآن أكمل بياناتك الشخصية.');
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setSuccess('تم إنشاء حسابك بنجاح! مرحباً بك في منصة نائبك.');
      // Redirect to dashboard or home page
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  };

  const handleStepError = (errorMessage: string) => {
    setError(errorMessage);
    setSuccess('');
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
      setSuccess('');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicRegistrationForm
            onSuccess={handleStepSuccess}
            onError={handleStepError}
          />
        );
      case 2:
        return (
          <ProfileCompletionForm
            onSuccess={handleStepSuccess}
            onError={handleStepError}
          />
        );
      case 3:
        return (
          <RoleSelectionForm
            onSuccess={handleStepSuccess}
            onError={handleStepError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step.completed
                        ? 'bg-[#0c6303] border-[#0c6303] text-white'
                        : currentStep === step.id
                        ? 'bg-white border-[#0c6303] text-[#0c6303]'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {step.completed ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="mr-4">
                    <div
                      className={`text-sm font-medium ${
                        step.completed || currentStep === step.id
                          ? 'text-[#0c6303]'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronLeft
                    className={`w-5 h-5 mx-4 ${
                      step.completed ? 'text-[#004705]' : 'text-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#004705] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Global Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 ml-2" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-400 ml-2" />
              <div className="text-sm text-green-700">{success}</div>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="relative">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          {currentStep > 1 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={goToPreviousStep}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4 ml-1" />
                الخطوة السابقة
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
