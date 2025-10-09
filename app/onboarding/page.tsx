import { Metadata } from 'next';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';

export const metadata: Metadata = {
  title: 'إعداد حسابك - منصة نائبك',
  description: 'اختر نوع حسابك وأكمل بياناتك الشخصية على منصة نائبك',
  keywords: 'إعداد الحساب، نوع الحساب، مواطن، مرشح، نائب، نائبك',
};

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
