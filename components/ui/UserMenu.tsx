'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface UserMenuProps {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string | null;
    role_id: number;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // تحديد رابط لوحة التحكم حسب الدور
  const getDashboardLink = () => {
    switch (user.role_id) {
      case 1: return '/admin';
      case 2: return '/manager';
      case 3: return '/citizen';
      case 4: return '/mp';
      case 5: return '/candidate';
      default: return '/dashboard';
    }
  };

  const avatarUrl = user.avatar
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${user.avatar}`
    : '/default-avatar.png';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="قائمة المستخدم"
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#004705]">
          <Image
            src={avatarUrl}
            alt={`${user.first_name} ${user.last_name}`}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-[#333333] hidden md:block">
          {user.first_name} {user.last_name}
        </span>
        <svg
          className={`w-4 h-4 text-[#333333] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#f5f5f5] z-20">
            <div className="py-2">
              <Link
                href={getDashboardLink()}
                className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#f5f5f5] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                لوحة التحكم
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#f5f5f5] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                الملف الشخصي
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-[#333333] hover:bg-[#f5f5f5] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                الإعدادات
              </Link>
              <hr className="my-2 border-[#f5f5f5]" />
              <button
                onClick={() => {
                  // TODO: تنفيذ تسجيل الخروج
                  setIsOpen(false);
                }}
                className="block w-full text-right px-4 py-2 text-sm text-[#e86202] hover:bg-[#f5f5f5] transition-colors"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
