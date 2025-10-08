import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import CitizenDashboard from '@/components/dashboards/CitizenDashboard';

export const metadata: Metadata = {
  title: 'لوحة تحكم المواطن | نائبك',
  description: 'إدارة شكاواك ورسائلك وتقييماتك',
};

export default async function CitizenDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role_id !== 3) {
    redirect('/dashboard');
  }

  return <CitizenDashboard user={user} />;
}
