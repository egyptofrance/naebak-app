import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import CandidateDashboard from '@/components/dashboards/CandidateDashboard';

export const metadata: Metadata = {
  title: 'لوحة تحكم المرشح | نائبك',
  description: 'إدارة حملتك الانتخابية وتفاعلك مع المواطنين',
};

export default async function CandidateDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role_id !== 5) {
    redirect('/dashboard');
  }

  return <CandidateDashboard user={user} />;
}
