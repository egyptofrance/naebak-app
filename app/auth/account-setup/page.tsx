import { Metadata } from 'next';
import AccountSetupForm from '@/components/auth/AccountSetupForm';

export const metadata: Metadata = {
  title: 'إعداد الحساب - منصة نائبك',
  description: 'حدد نوع حسابك لإكمال عملية التسجيل في منصة نائبك',
  keywords: 'إعداد الحساب، نوع الحساب، نائبك، مجلس النواب، مجلس الشيوخ، مصر',
};

export default function AccountSetupPage() {
  return <AccountSetupForm />;
}
