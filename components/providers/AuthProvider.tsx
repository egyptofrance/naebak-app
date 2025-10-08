'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  roles: {
    name: string;
  };
  phone?: string;
  governorate?: {
    name: string;
  };
  profile?: {
    district?: string;
    council?: {
      name: string;
    };
    party?: {
      name: string;
    };
    is_independent?: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refreshUser: async () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
