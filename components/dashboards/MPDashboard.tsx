'use client';

import { useState } from 'react';

interface User {
  id: string;
  email?: string;
  user_metadata: {
    firstName?: string;
    lastName?: string;
    account_type?: string;
    phone?: string;
    governorate?: string;
    city?: string;
    job?: string;
    party?: string;
    electoralSymbol?: string;
    electoralNumber?: string;
  };
}

interface MPDashboardProps {
  user: User;
}

export default function MPDashboard({ user }: MPDashboardProps) {
  const fullName = `${user.user_metadata?.firstName || ''} ${user.user_metadata?.lastName || ''}`.trim();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                مرحباً، النائب {fullName}
              </h1>
              <p className="text-gray-600">لوحة تحكم عضو مجلس النواب</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              نائب حالي
            </div>
          </div>
        </div>

        {/* Parliamentary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">الشكاوى الواردة</p>
                <p className="text-2xl font-semibold text-gray-900">47</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">مشاريع القوانين</p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">الناخبين</p>
                <p className="text-2xl font-semibold text-gray-900">125,430</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">تقييم الأداء</p>
                <p className="text-2xl font-semibold text-gray-900">4.2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parliamentary Activities */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">الأنشطة البرلمانية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">مراجعة الشكاوى</span>
            </button>

            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">مشاريع القوانين</span>
            </button>

            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">التواصل مع الناخبين</span>
            </button>

            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900">تقارير الأداء</span>
            </button>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">الشكاوى الأخيرة</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">مشكلة في شبكة المياه - حي النصر</p>
                  <p className="text-sm text-gray-600">مقدمة من: سعد محمد أحمد</p>
                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">عاجل</span>
                </div>
                <span className="text-xs text-gray-500">منذ ساعة</span>
              </div>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">تحسين الإضاءة في الشوارع</p>
                  <p className="text-sm text-gray-600">مقدمة من: نادية علي حسن</p>
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1">متوسط</span>
                </div>
                <span className="text-xs text-gray-500">منذ 3 ساعات</span>
              </div>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">طلب إنشاء مدرسة جديدة</p>
                  <p className="text-sm text-gray-600">مقدمة من: لجنة أولياء الأمور</p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">عادي</span>
                </div>
                <span className="text-xs text-gray-500">أمس</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">الجلسات القادمة</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">جلسة مناقشة قانون التعليم الجديد</p>
                <p className="text-sm text-gray-600">الأحد 15 أكتوبر - 10:00 صباحاً</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">مؤكدة</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">لجنة الصحة والسكان</p>
                <p className="text-sm text-gray-600">الثلاثاء 17 أكتوبر - 2:00 مساءً</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">في الانتظار</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
