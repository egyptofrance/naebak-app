import { Metadata } from 'next';
import RegistrationWizard from '@/components/auth/RegistrationWizard';

export const metadata: Metadata = {
  title: 'إنشاء حساب جديد - منصة نائبك',
  description: 'أنشئ حساباً جديداً في منصة نائبك للتواصل مع نوابك ومرشحيك وتقديم الشكاوى',
  keywords: 'تسجيل، حساب جديد، نائبك، مجلس النواب، مجلس الشيوخ، مصر',
};

export default function RegisterPage() {
  return <RegistrationWizard />;
}
