import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'تسجيل الدخول - منصة نائبك',
  description: 'سجل دخولك إلى منصة نائبك للوصول إلى حسابك والتواصل مع نوابك',
};

export default function LoginPage() {
  return <LoginForm />;
}
