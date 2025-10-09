'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import Logo from '../ui/Logo';
import VisitorCounter from '../ui/VisitorCounter';

interface User {
  id: string;
  email?: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
    account_type?: string;
  };
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  // جلب بيانات المستخدم الحالي
  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    const firstName = user.user_metadata?.first_name || '';
    const lastName = user.user_metadata?.last_name || '';
    return `${firstName} ${lastName}`.trim() || user.email || 'مستخدم';
  };

  const getAccountTypeLabel = () => {
    const accountType = user?.user_metadata?.account_type;
    switch (accountType) {
      case 'citizen': return 'مواطن';
      case 'mp': return 'نائب';
      case 'candidate': return 'مرشح';
      case 'admin': return 'إدارة';
      case 'manager': return 'مدير';
      default: return 'مستخدم';
    }
  };

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/mps', label: 'النواب' },
    { href: '/candidates', label: 'المرشحين' },
    { href: '/complaints', label: 'الشكاوى' },
    { href: '/about', label: 'من نحن' },
    { href: '/contact', label: 'اتصل بنا' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo - اليمين */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Navigation Links - الوسط (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#333333] hover:text-[#0c6303] font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section - اليسار */}
          <div className="flex items-center gap-4">
            {/* عداد الزوار */}
            <div className="hidden md:block">
              <VisitorCounter />
            </div>

            {!isLoading && (
              <>
                {user ? (
                  <div className="relative">
                    {/* قائمة المستخدم */}
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </div>
                      <div className="hidden sm:block text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getAccountTypeLabel()}
                        </p>
                      </div>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isUserMenuOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* قائمة منسدلة */}
                    {isUserMenuOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <Link
                          href="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          لوحة التحكم
                        </Link>
                        
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          الإعدادات
                        </Link>

                        <hr className="my-1" />
                        
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          تسجيل الخروج
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link
                      href="/auth/login"
                      className="text-[#2c3e50] hover:text-[#27ae60] transition-colors"
                    >
                      دخول
                    </Link>
                    <Link
                      href="/auth/register"
                      className="bg-[#ffa516] text-white px-4 py-2 rounded-lg hover:bg-[#e6941a] transition-colors"
                    >
                      تسجيل
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Hamburger Menu Button (Mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors"
              aria-label="القائمة"
            >
              <svg
                className="w-6 h-6 text-[#333333]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#f5f5f5] py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#333333] hover:text-[#0c6303] hover:bg-[#f5f5f5] font-medium transition-colors px-4 py-2 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* قائمة المستخدم في الموبايل */}
              {user && (
                <>
                  <hr className="my-2" />
                  <Link
                    href="/dashboard"
                    className="text-[#333333] hover:text-[#0c6303] hover:bg-[#f5f5f5] font-medium transition-colors px-4 py-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    لوحة التحكم
                  </Link>
                  <Link
                    href="/profile"
                    className="text-[#333333] hover:text-[#0c6303] hover:bg-[#f5f5f5] font-medium transition-colors px-4 py-2 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    الإعدادات
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-red-600 hover:bg-red-50 font-medium transition-colors px-4 py-2 rounded-lg text-right"
                  >
                    تسجيل الخروج
                  </button>
                </>
              )}
            </nav>
            
            {/* عداد الزوار في الموبايل */}
            <div className="mt-4 px-4">
              <VisitorCounter />
            </div>
          </div>
        )}
      </div>

      {/* إغلاق القائمة عند النقر خارجها */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
}
