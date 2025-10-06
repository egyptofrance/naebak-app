'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function redirectToDashboard() {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push('/login');
          return;
        }

        // Get user role
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role_id')
          .eq('auth_id', user.id)
          .single();

        if (userError || !userData) {
          console.error('Error fetching user data:', userError);
          router.push('/login');
          return;
        }

        const { data: roleData, error: roleError } = await supabase
          .from('roles')
          .select('name')
          .eq('id', userData.role_id)
          .single();

        if (roleError || !roleData) {
          console.error('Error fetching role data:', roleError);
          router.push('/login');
          return;
        }

        // Redirect based on role
        switch (roleData.name) {
          case 'admin':
            router.push('/admin');
            break;
          case 'manager':
            router.push('/manager');
            break;
          case 'citizen':
            router.push('/citizen');
            break;
          case 'mp':
            router.push('/mp');
            break;
          case 'candidate':
            router.push('/candidate');
            break;
          default:
            router.push('/');
        }
      } catch (error) {
        console.error('Dashboard redirect error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    }

    redirectToDashboard();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004705]"></div>
        <p className="mt-4 text-gray-600">جاري التحميل...</p>
      </div>
    </div>
  );
}
