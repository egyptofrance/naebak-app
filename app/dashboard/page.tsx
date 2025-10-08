'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import CitizenDashboard from '@/components/dashboards/CitizenDashboard';

interface User {
  id: string;
  email: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
    account_type?: string;
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
        router.push('/login');
        return;
      }

      setUser(currentUser);
      setLoading(false);
    };

    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
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
      return <CitizenDashboard />;
    case 'mp':
    case 'candidate':
      // يمكن إضافة لوحات تحكم أخرى لاحقاً
      return <CitizenDashboard />; // مؤقتاً
    case 'admin':
    case 'manager':
      // يمكن إضافة لوحات تحكم إدارية لاحقاً
      return <CitizenDashboard />; // مؤقتاً
    default:
      return <CitizenDashboard />;
  }
}
