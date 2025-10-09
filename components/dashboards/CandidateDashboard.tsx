'use client';

import { useState } from 'react';
import { 
  User, 
  FileText, 
  Calendar, 
  Trophy, 
  Users, 
  MessageSquare, 
  Settings,
  Plus,
  Edit,
  Eye,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

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

interface CandidateDashboardProps {
  user: User;
}

export default function CandidateDashboard({ user }: CandidateDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const fullName = `${user.user_metadata?.firstName || ''} ${user.user_metadata?.lastName || ''}`.trim();

  const stats = [
    {
      title: 'المتابعون',
      value: '1,234',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'المشاهدات',
      value: '5,678',
      icon: Eye,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'التفاعلات',
      value: '890',
      icon: MessageSquare,
      color: 'bg-purple-500',
      change: '+15%',
    },
    {
      title: 'الفعاليات',
      value: '12',
      icon: Calendar,
      color: 'bg-orange-500',
      change: '+3',
    },
  ];

  const quickActions = [
    {
      title: 'إضافة منشور جديد',
      description: 'شارك آخر أخبارك مع المتابعين',
      icon: Plus,
      href: '/dashboard/posts/new',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    },
    {
      title: 'تحديث البرنامج الانتخابي',
      description: 'عدّل برنامجك الانتخابي',
      icon: Edit,
      href: '/dashboard/program',
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
    },
    {
      title: 'إضافة فعالية',
      description: 'أنشئ فعالية أو مناسبة جديدة',
      icon: Calendar,
      href: '/dashboard/events/new',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    },
    {
      title: 'عرض الإحصائيات',
      description: 'تابع أداء حملتك الانتخابية',
      icon: BarChart3,
      href: '/dashboard/analytics',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
    },
  ];

  const recentActivities = [
    {
      type: 'post',
      title: 'نشر منشور جديد: "رؤيتي للتعليم"',
      time: 'منذ ساعتين',
      icon: FileText,
    },
    {
      type: 'event',
      title: 'إضافة فعالية: لقاء مع الشباب',
      time: 'منذ 4 ساعات',
      icon: Calendar,
    },
    {
      type: 'follower',
      title: 'انضم 15 متابع جديد',
      time: 'منذ 6 ساعات',
      icon: Users,
    },
    {
      type: 'achievement',
      title: 'تحديث الإنجازات',
      time: 'أمس',
      icon: Trophy,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                مرحباً، {fullName || 'المرشح'}
              </h1>
              <p className="text-gray-600">
                {user.user_metadata?.party} - {user.user_metadata?.governorate}
              </p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link
                href="/dashboard/settings"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="h-6 w-6" />
              </Link>
              <div className="h-8 w-8 bg-[#004705] rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <span className="text-sm text-green-600 mr-2">{stat.change}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">الإجراءات السريعة</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Link
                        key={index}
                        href={action.href}
                        className={`p-4 border-2 rounded-lg transition-colors ${action.color}`}
                      >
                        <div className="flex items-start">
                          <Icon className="h-6 w-6 text-gray-700 mt-1" />
                          <div className="mr-3">
                            <h3 className="font-medium text-gray-900">{action.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Campaign Progress */}
            <div className="bg-white rounded-lg shadow mt-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">تقدم الحملة الانتخابية</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">البرنامج الانتخابي</span>
                      <span className="text-gray-900">85%</span>
                    </div>
                    <div className="mt-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#004705] h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">الإنجازات</span>
                      <span className="text-gray-900">60%</span>
                    </div>
                    <div className="mt-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">المناسبات والفعاليات</span>
                      <span className="text-gray-900">40%</span>
                    </div>
                    <div className="mt-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">النشاطات الأخيرة</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="mr-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-lg shadow mt-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">ملخص الملف الشخصي</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">الاسم:</span>
                    <p className="font-medium">{fullName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">المحافظة:</span>
                    <p className="font-medium">{user.user_metadata?.governorate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">الحزب:</span>
                    <p className="font-medium">{user.user_metadata?.party}</p>
                  </div>
                  {user.user_metadata?.electoralSymbol && (
                    <div>
                      <span className="text-sm text-gray-600">الرمز الانتخابي:</span>
                      <p className="font-medium">{user.user_metadata.electoralSymbol}</p>
                    </div>
                  )}
                  {user.user_metadata?.electoralNumber && (
                    <div>
                      <span className="text-sm text-gray-600">الرقم الانتخابي:</span>
                      <p className="font-medium">{user.user_metadata.electoralNumber}</p>
                    </div>
                  )}
                </div>
                <Link
                  href="/dashboard/profile"
                  className="mt-4 block w-full text-center py-2 px-4 border border-[#004705] text-[#004705] rounded-lg hover:bg-[#004705] hover:text-white transition-colors"
                >
                  عرض الملف الكامل
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
