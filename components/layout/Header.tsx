'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Logo from '../ui/Logo';
import VisitorCounter from '../ui/VisitorCounter';
import NotificationBell from '../ui/NotificationBell';
import UserMenu from '../ui/UserMenu';

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  role_id: number;
}

export default function Header() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const supabase = createClientComponentClient();

  // جلب بيانات المستخدم الحالي
  useEffect(() => {
    async function fetchUser() {
      try {
        // جلب المستخدم من Supabase Auth
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

        if (authError || !authUser) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // جلب بيانات المستخدم من جدول users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, first_name, last_name, avatar, role_id')
          .eq('auth_id', authUser.id)
          .single();

        if (!userError && userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [supabase]);

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
                className="text-[#333333] hover:text-[#004705] font-medium transition-colors text-sm"
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
                  <>
                    {/* جرس الإشعارات */}
                    <NotificationBell userId={user.id} />
                    
                    {/* قائمة المستخدم */}
                    <UserMenu user={user} />
                  </>
                ) : (
                  /* زر تسجيل الدخول */
                  <Link
                    href="/login"
                    className="bg-[#004705] text-white px-6 py-2 rounded-lg hover:bg-[#003604] transition-colors font-medium text-sm"
                  >
                    تسجيل الدخول
                  </Link>
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
                  className="text-[#333333] hover:text-[#004705] hover:bg-[#f5f5f5] font-medium transition-colors px-4 py-2 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            {/* عداد الزوار في الموبايل */}
            <div className="mt-4 px-4">
              <VisitorCounter />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
