'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  FileText, 
  Star, 
  User, 
  Bell,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Eye,
  Send,
  AlertCircle
} from 'lucide-react';

interface CitizenStats {
  totalComplaints: number;
  pendingComplaints: number;
  resolvedComplaints: number;
  totalMessages: number;
  unreadMessages: number;
  totalRatings: number;
}

interface RecentActivity {
  id: number;
  type: 'complaint' | 'message' | 'rating';
  title: string;
  description: string;
  date: string;
  status?: string;
}

export default function CitizenDashboard({ user }: { user: any }) {
  const [stats, setStats] = useState<CitizenStats>({
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalRatings: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setStats({
        totalComplaints: 5,
        pendingComplaints: 2,
        resolvedComplaints: 3,
        totalMessages: 12,
        unreadMessages: 3,
        totalRatings: 8
      });

      setRecentActivity([
        {
          id: 1,
          type: 'complaint',
          title: 'شكوى جديدة',
          description: 'تم إرسال شكوى حول مشكلة في الطرق',
          date: '2024-10-07',
          status: 'pending'
        },
        {
          id: 2,
          type: 'message',
          title: 'رد من النائب أحمد محمد',
          description: 'تم الرد على رسالتك حول موضوع التعليم',
          date: '2024-10-06',
          status: 'unread'
        },
        {
          id: 3,
          type: 'rating',
          title: 'تقييم جديد',
          description: 'قمت بتقييم النائب سارة أحمد بـ 4 نجوم',
          date: '2024-10-05'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'complaint': return FileText;
      case 'message': return MessageSquare;
      case 'rating': return Star;
      default: return Bell;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'complaint': return 'text-orange-600 bg-orange-100';
      case 'message': return 'text-blue-600 bg-blue-100';
      case 'rating': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    const statusConfig = {
      pending: { label: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800' },
      resolved: { label: 'تم الحل', color: 'bg-green-100 text-green-800' },
      unread: { label: 'غير مقروء', color: 'bg-red-100 text-red-800' },
      read: { label: 'مقروء', color: 'bg-gray-100 text-gray-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* ترحيب */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً، {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-600">
            إليك نظرة عامة على نشاطك في منصة نائبك
          </p>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي الشكاوى</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalComplaints}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">قيد المراجعة</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingComplaints}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">تم الحل</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resolvedComplaints}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الرسائل</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">غير مقروءة</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unreadMessages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">التقييمات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRatings}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* الإجراءات السريعة */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الإجراءات السريعة</h3>
              <div className="space-y-3">
                <Link
                  href="/citizen/complaints/new"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-orange-100 group-hover:bg-orange-200">
                    <Send className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إرسال شكوى جديدة</span>
                </Link>

                <Link
                  href="/citizen/messages/new"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-blue-100 group-hover:bg-blue-200">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إرسال رسالة</span>
                </Link>

                <Link
                  href="/candidates"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-yellow-100 group-hover:bg-yellow-200">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">تقييم المرشحين</span>
                </Link>

                <Link
                  href="/citizen/profile"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-green-100 group-hover:bg-green-200">
                    <Edit3 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">تحديث الملف الشخصي</span>
                </Link>
              </div>
            </div>

            {/* معلومات الملف الشخصي */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الملف الشخصي</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-600">الاسم:</span>
                  <span className="mr-2 font-medium">{user.first_name} {user.last_name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-600">البريد:</span>
                  <span className="mr-2 font-medium">{user.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-600">الهاتف:</span>
                  <span className="mr-2 font-medium">{user.phone || 'غير محدد'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-600">المحافظة:</span>
                  <span className="mr-2 font-medium">{user.governorate?.name || 'غير محدد'}</span>
                </div>
              </div>
              <Link
                href="/citizen/profile"
                className="mt-4 inline-flex items-center text-sm text-[#004705] hover:text-[#003604] font-medium"
              >
                <Edit3 className="w-4 h-4 ml-1" />
                تحديث المعلومات
              </Link>
            </div>
          </div>

          {/* النشاط الأخير */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">النشاط الأخير</h3>
                <Link
                  href="/citizen/activity"
                  className="text-sm text-[#004705] hover:text-[#003604] font-medium flex items-center"
                >
                  <Eye className="w-4 h-4 ml-1" />
                  عرض الكل
                </Link>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className={`p-2 rounded-full ${getActivityColor(activity.type)} ml-4`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                          {getStatusBadge(activity.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3 ml-1" />
                          {new Date(activity.date).toLocaleDateString('ar-EG')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {recentActivity.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">لا يوجد نشاط حديث</p>
                  <p className="text-sm text-gray-400 mt-1">
                    ابدأ بإرسال شكوى أو رسالة للنواب
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
