import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

export const metadata: Metadata = {
  title: 'لوحة تحكم الإدارة | نائبك',
  description: 'إدارة شاملة لمنصة نائبك',
};

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role_id !== 1) {
    redirect('/dashboard');
  }

  return <AdminDashboard user={user} />;
}
