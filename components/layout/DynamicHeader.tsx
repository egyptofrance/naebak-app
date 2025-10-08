'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';
import { 
  Bell, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Users,
  MessageSquare,
  FileText,
  Star,
  Shield
} from 'lucide-react';

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role_id: number;
  roles: {
    name: string;
  };
}

export default function DynamicHeader() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [visitorCount, setVisitorCount] = useState(12547); // سيتم ربطه بالـ API لاحقاً
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      setUser(userData);
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // تحديث عداد الزوار كل 30 ثانية
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    router.push('/');
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    return `${user.first_name} ${user.last_name}`;
  };

  const getUserRoleDisplay = () => {
    if (!user) return '';
    switch (user.role_id) {
      case 1: return 'مدير النظام';
      case 2: return 'مدير';
      case 3: return 'مواطن';
      case 4: return 'نائب';
      case 5: return 'مرشح';
      default: return 'مستخدم';
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    switch (user.role_id) {
      case 1: return '/admin/dashboard';
      case 2: return '/manager/dashboard';
      case 3: return '/citizen/dashboard';
      case 4: return '/mp/dashboard';
      case 5: return '/candidate/dashboard';
      default: return '/dashboard';
    }
  };

  const getMenuItems = () => {
    const baseItems = [
      { href: '/', label: 'الرئيسية' },
      { href: '/candidates', label: 'المرشحين' },
      { href: '/mps', label: 'النواب' },
      { href: '/about', label: 'من نحن' },
      { href: '/contact', label: 'اتصل بنا' },
    ];

    if (user && user.role_id === 1) {
      baseItems.splice(2, 0, { href: '/admin', label: 'لوحة الإدارة' });
    }

    return baseItems;
  };

  const getUserMenuItems = () => {
    if (!user) return [];

    const baseItems = [
      {
        href: getDashboardLink(),
        label: 'لوحة التحكم',
        icon: Settings
      }
    ];

    // إضافة عناصر خاصة بكل نوع مستخدم
    switch (user.role_id) {
      case 1: // Admin
        baseItems.push(
          { href: '/admin/users', label: 'إدارة المستخدمين', icon: Users },
          { href: '/admin/complaints', label: 'إدارة الشكاوى', icon: FileText },
          { href: '/admin/messages', label: 'إدارة الرسائل', icon: MessageSquare }
        );
        break;
      case 2: // Manager
        baseItems.push(
          { href: '/manager/complaints', label: 'إدارة الشكاوى', icon: FileText },
          { href: '/manager/messages', label: 'إدارة الرسائل', icon: MessageSquare }
        );
        break;
      case 3: // Citizen
        baseItems.push(
          { href: '/citizen/complaints', label: 'شكاواي', icon: FileText },
          { href: '/citizen/messages', label: 'رسائلي', icon: MessageSquare },
          { href: '/citizen/ratings', label: 'تقييماتي', icon: Star }
        );
        break;
      case 4: // MP
      case 5: // Candidate
        baseItems.push(
          { href: '/profile/edit', label: 'تحرير الملف الشخصي', icon: User },
          { href: '/profile/complaints', label: 'الشكاوى المستلمة', icon: FileText },
          { href: '/profile/messages', label: 'الرسائل', icon: MessageSquare }
        );
        break;
    }

    return baseItems;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* اللوجو */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-green.png"
                alt="نائبك"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* القائمة الرئيسية - Desktop */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {getMenuItems().map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#004705] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* الجانب الأيمن */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* جرس الإشعارات */}
            <button className="relative p-2 text-gray-600 hover:text-[#004705] transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* عداد الزوار */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1">
              <Users className="w-4 h-4 text-gray-600 ml-1" />
              <span className="text-sm font-medium text-gray-700">
                {visitorCount.toLocaleString('ar-EG')}
              </span>
            </div>

            {/* منطقة المستخدم */}
            {isLoading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-[#004705] transition-colors duration-200"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium">{getUserDisplayName()}</div>
                    <div className="text-xs text-gray-500">{getUserRoleDisplay()}</div>
                  </div>
                  <div className="w-8 h-8 bg-[#004705] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.first_name.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* القائمة المنسدلة */}
                {showUserMenu && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{getUserDisplayName()}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-xs text-[#004705] font-medium">{getUserRoleDisplay()}</div>
                    </div>
                    
                    {getUserMenuItems().map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#004705] transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <IconComponent className="w-4 h-4 ml-3" />
                          {item.label}
                        </Link>
                      );
                    })}
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 ml-3" />
                        تسجيل الخروج
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-[#004705] px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="bg-[#004705] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#003604] transition-colors duration-200"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* زر القائمة المحمولة */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-[#004705] transition-colors duration-200"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* القائمة المحمولة */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {getMenuItems().map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-[#004705] hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* عداد الزوار في الموبايل */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center bg-gray-100 rounded-full px-3 py-2 mx-3">
                <Users className="w-4 h-4 text-gray-600 ml-1" />
                <span className="text-sm font-medium text-gray-700">
                  عدد الزوار: {visitorCount.toLocaleString('ar-EG')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
