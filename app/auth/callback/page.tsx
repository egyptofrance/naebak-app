'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient();
      
      try {
        // Get the code from URL parameters
        const code = searchParams.get('code');
        
        if (code) {
          // Exchange the code for a session
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error('Auth callback error:', error);
            router.push('/auth/login?error=callback_error');
            return;
          }

          if (data.session && data.user) {
            console.log('Auth callback successful, user:', data.user);
            
            // Check if user needs account setup
            const accountType = data.user.user_metadata?.account_type;
            const profileCompleted = data.user.user_metadata?.profile_completed;
            
            if (!accountType) {
              console.log('User needs account setup');
              router.push('/auth/account-setup');
            } else if (!profileCompleted) {
              console.log('User needs profile completion');
              router.push('/auth/profile-completion');
            } else {
              console.log('User is fully set up, redirecting to dashboard');
              router.push('/dashboard');
            }
            return;
          }
        }
        
        // Fallback: try to get existing session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          router.push('/auth/login?error=session_error');
          return;
        }

        if (sessionData.session) {
          console.log('Existing session found, redirecting to account setup');
          router.push('/auth/account-setup');
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
  }, [router, searchParams]);

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
