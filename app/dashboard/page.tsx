import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // توجيه المستخدم إلى لوحة التحكم المناسبة حسب نوع الحساب
  switch (user.role_id) {
    case 1: // Admin
      redirect('/admin/dashboard');
    case 2: // Manager
      redirect('/manager/dashboard');
    case 3: // Citizen
      redirect('/citizen/dashboard');
    case 4: // MP
      redirect('/mp/dashboard');
    case 5: // Candidate
      redirect('/candidate/dashboard');
    default:
      redirect('/');
  }
}
