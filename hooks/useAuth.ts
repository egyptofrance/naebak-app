'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email?: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
    account_type?: string;
    profile_completed?: boolean;
    account_status?: 'active' | 'pending' | 'rejected';
  };
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // جلب المستخدم الحالي
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user as AuthUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();

    // الاستماع لتغييرات المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (session?.user) {
          setUser(session.user as AuthUser);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const refreshUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user as AuthUser);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  return {
    user,
    isLoading,
    refreshUser,
    isAuthenticated: !!user,
    isProfileCompleted: user?.user_metadata?.profile_completed || false,
    accountStatus: user?.user_metadata?.account_status || 'active'
  };
}
