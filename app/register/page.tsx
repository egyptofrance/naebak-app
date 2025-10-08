import { Metadata } from 'next';
import EnhancedRegisterForm from '@/components/auth/EnhancedRegisterForm';

export const metadata: Metadata = {
  title: 'إنشاء حساب جديد | نائبك',
  description: 'انضم إلى منصة نائبك وابدأ التواصل مع نوابك ومرشحيك',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <EnhancedRegisterForm />
    </div>
  );
}
