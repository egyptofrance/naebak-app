'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/lib/auth';
import RoleSelectionStep from './RoleSelectionStep';
import CitizenDataForm from './CitizenDataForm';
import CandidateDataForm from './CandidateDataForm';
import DeputyDataForm from './DeputyDataForm';
import CompletionStep from './CompletionStep';

type Step = 'role-selection' | 'data-collection' | 'completion';
type UserRole = 'citizen' | 'candidate' | 'mp';

interface UserProfile {
  id: string;
  email: string;
  role?: UserRole;
  profile_completed?: boolean;
  registration_completed?: boolean;
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('role-selection');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const result = await getUserProfile();
      if (result.success && result.data) {
        const userProfile = result.data as UserProfile;
        setProfile(userProfile);
        
        // إذا كان المستخدم أكمل التسجيل، توجيهه للصفحة الرئيسية
        if (userProfile.registration_completed) {
          router.push('/');
          return;
        }
        
        // إذا كان اختار نوع الحساب، الانتقال لجمع البيانات
        if (userProfile.role) {
          setSelectedRole(userProfile.role);
          setCurrentStep('data-collection');
        }
      } else {
        // إذا لم يكن مسجل دخول، توجيهه لصفحة تسجيل الدخول
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentStep('data-collection');
  };

  const handleDataCompletion = () => {
    setCurrentStep('completion');
  };

  const handleOnboardingComplete = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004705] mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل بياناتك...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <img src="/logo.png" alt="نائبك" className="h-8 w-auto" />
                <h1 className="text-xl font-bold text-gray-900">إعداد حسابك</h1>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === 'role-selection' ? 'bg-[#004705] text-white' : 
                  currentStep === 'data-collection' || currentStep === 'completion' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 ${
                  currentStep === 'data-collection' || currentStep === 'completion' ? 'bg-[#004705]' : 'bg-gray-200'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === 'data-collection' ? 'bg-[#004705] text-white' : 
                  currentStep === 'completion' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
                }`}>
                  2
                </div>
                <div className={`w-16 h-1 ${
                  currentStep === 'completion' ? 'bg-[#004705]' : 'bg-gray-200'
                }`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === 'completion' ? 'bg-[#004705] text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'role-selection' && (
          <RoleSelectionStep 
            onRoleSelect={handleRoleSelection}
            userEmail={profile?.email}
          />
        )}
        
        {currentStep === 'data-collection' && selectedRole && (
          <>
            {selectedRole === 'citizen' && (
              <CitizenDataForm 
                onComplete={handleDataCompletion}
                userProfile={profile}
              />
            )}
            {selectedRole === 'candidate' && (
              <CandidateDataForm 
                onComplete={handleDataCompletion}
                userProfile={profile}
              />
            )}
            {selectedRole === 'mp' && (
              <DeputyDataForm 
                onComplete={handleDataCompletion}
                userProfile={profile}
              />
            )}
          </>
        )}
        
        {currentStep === 'completion' && (
          <CompletionStep 
            selectedRole={selectedRole}
            onComplete={handleOnboardingComplete}
          />
        )}
      </div>
    </div>
  );
}
