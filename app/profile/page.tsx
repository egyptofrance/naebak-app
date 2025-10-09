import { Metadata } from 'next';
import ProfileDashboard from '@/components/profile/ProfileDashboard';

export const metadata: Metadata = {
  title: 'الملف الشخصي - منصة نائبك',
  description: 'إدارة ملفك الشخصي وبياناتك على منصة نائبك',
  keywords: 'الملف الشخصي، لوحة التحكم، نائبك، إعدادات الحساب',
};

export default function ProfilePage() {
  return <ProfileDashboard />;
}
