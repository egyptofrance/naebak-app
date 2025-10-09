'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient();
      
      try {
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/auth/login?error=callback_error');
          return;
        }

        if (data.session) {
          console.log('Auth callback successful, redirecting to registration step 2');
          // Redirect to step 2 of registration
          router.push('/auth/register?step=2');
        } else {
          console.log('No session found, redirecting to login');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        router.push('/auth/login?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004705] mx-auto"></div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            جاري التحقق من البريد الإلكتروني...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            يرجى الانتظار بينما نتحقق من تأكيد بريدك الإلكتروني
          </p>
        </div>
      </div>
    </div>
  );
}
