'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import CitizenDashboard from '@/components/dashboards/CitizenDashboard';
import CandidateDashboard from '@/components/dashboards/CandidateDashboard';
import MPDashboard from '@/components/dashboards/MPDashboard';

interface User {
  id: string;
  email?: string;
  user_metadata: {
    firstName?: string;
    lastName?: string;
    account_type?: string;
    profile_completed?: boolean;
    phone?: string;
    governorate?: string;
    city?: string;
    job?: string;
    party?: string;
  };
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      
      if (!currentUser) {
        router.push('/auth/login');
        return;
      }

      // التحقق من إكمال الملف الشخصي
      const accountType = currentUser.user_metadata?.account_type;
      const profileCompleted = currentUser.user_metadata?.profile_completed;

      if (!accountType) {
        router.push('/auth/account-setup');
        return;
      }

      if (!profileCompleted) {
        router.push('/auth/profile-completion');
        return;
      }

      setUser(currentUser);
      setLoading(false);
    };

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004705] mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // سيتم التوجيه إلى صفحة تسجيل الدخول
  }

  // توجيه المستخدم حسب نوع الحساب
  const accountType = user.user_metadata?.account_type || 'citizen';

  switch (accountType) {
    case 'citizen':
      return <CitizenDashboard user={user} />;
    case 'candidate':
      return <CandidateDashboard user={user} />;
    case 'mp':
      return <MPDashboard user={user} />;
    default:
      return <CitizenDashboard user={user} />;
  }
}
