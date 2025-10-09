import { Metadata } from 'next';
import ProfileCompletionForm from '@/components/auth/ProfileCompletionForm';

export const metadata: Metadata = {
  title: 'إكمال الملف الشخصي - منصة نائبك',
  description: 'أكمل بياناتك الشخصية لإنهاء عملية التسجيل في منصة نائبك',
  keywords: 'الملف الشخصي، البيانات الشخصية، نائبك، مجلس النواب، مجلس الشيوخ، مصر',
};

export default function ProfileCompletionPage() {
  return <ProfileCompletionForm />;
}
