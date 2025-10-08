'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Star, 
  Settings,
  TrendingUp,
  Calendar,
  Eye,
  UserPlus,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Globe,
  Palette,
  Image as ImageIcon,
  Bell,
  Activity
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  pendingApprovals: number;
  totalComplaints: number;
  pendingComplaints: number;
  resolvedComplaints: number;
  totalMessages: number;
  totalRatings: number;
  activeManagers: number;
}

interface PendingUser {
  id: number;
  name: string;
  email: string;
  type: 'candidate' | 'mp';
  district: string;
  party: string;
  date: string;
}

interface RecentActivity {
  id: number;
  type: 'user_registration' | 'complaint' | 'message' | 'rating';
  title: string;
  description: string;
  date: string;
  status?: string;
}

export default function AdminDashboard({ user }: { user: any }) {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    pendingApprovals: 0,
    totalComplaints: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
    totalMessages: 0,
    totalRatings: 0,
    activeManagers: 0
  });

  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        pendingApprovals: 8,
        totalComplaints: 156,
        pendingComplaints: 23,
        resolvedComplaints: 133,
        totalMessages: 892,
        totalRatings: 2341,
        activeManagers: 5
      });

      setPendingUsers([
        {
          id: 1,
          name: 'أحمد محمد علي',
          email: 'ahmed@example.com',
          type: 'candidate',
          district: 'القاهرة الأولى',
          party: 'حزب المستقبل',
          date: '2024-10-07'
        },
        {
          id: 2,
          name: 'سارة أحمد محمود',
          email: 'sara@example.com',
          type: 'mp',
          district: 'الجيزة الثانية',
          party: 'مستقل',
          date: '2024-10-06'
        },
        {
          id: 3,
          name: 'محمد حسن إبراهيم',
          email: 'mohamed@example.com',
          type: 'candidate',
          district: 'الإسكندرية الأولى',
          party: 'حزب التقدم',
          date: '2024-10-05'
        }
      ]);

      setRecentActivity([
        {
          id: 1,
          type: 'user_registration',
          title: 'تسجيل مرشح جديد',
          description: 'تم تسجيل أحمد محمد علي كمرشح في القاهرة الأولى',
          date: '2024-10-07',
          status: 'pending'
        },
        {
          id: 2,
          type: 'complaint',
          title: 'شكوى جديدة',
          description: 'شكوى حول مشكلة في الطرق من المواطن علي أحمد',
          date: '2024-10-07',
          status: 'pending'
        },
        {
          id: 3,
          type: 'message',
          title: 'رسالة جديدة',
          description: 'رسالة من مواطن إلى النائب سارة محمد',
          date: '2024-10-06'
        },
        {
          id: 4,
          type: 'rating',
          title: 'تقييم جديد',
          description: 'تم تقييم النائب أحمد علي بـ 5 نجوم',
          date: '2024-10-06'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleApproveUser = async (userId: number) => {
    // محاكاة الموافقة على المستخدم
    setPendingUsers(prev => prev.filter(user => user.id !== userId));
    setStats(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
  };

  const handleRejectUser = async (userId: number) => {
    // محاكاة رفض المستخدم
    setPendingUsers(prev => prev.filter(user => user.id !== userId));
    setStats(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration': return UserPlus;
      case 'complaint': return FileText;
      case 'message': return MessageSquare;
      case 'rating': return Star;
      default: return Bell;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user_registration': return 'text-blue-600 bg-blue-100';
      case 'complaint': return 'text-orange-600 bg-orange-100';
      case 'message': return 'text-green-600 bg-green-100';
      case 'rating': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
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
            لوحة تحكم الإدارة - إدارة شاملة لمنصة نائبك
          </p>
        </div>

        {/* تنبيهات سريعة */}
        {stats.pendingApprovals > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-600 ml-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  يوجد {stats.pendingApprovals} طلب موافقة في انتظار المراجعة
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  يرجى مراجعة طلبات التسجيل الجديدة للمرشحين والنواب
                </p>
              </div>
              <Link
                href="#pending-approvals"
                className="mr-auto bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700"
              >
                مراجعة الطلبات
              </Link>
            </div>
          </div>
        )}

        {/* الإحصائيات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                {stats.pendingApprovals > 0 && (
                  <p className="text-xs text-yellow-600">{stats.pendingApprovals} في الانتظار</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الشكاوى</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalComplaints}</p>
                <p className="text-xs text-green-600">{stats.resolvedComplaints} تم حلها</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الرسائل</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">المديرين النشطين</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeManagers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* الإجراءات السريعة */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الإجراءات السريعة</h3>
              <div className="space-y-3">
                <Link
                  href="/admin/users"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-blue-100 group-hover:bg-blue-200">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إدارة المستخدمين</span>
                </Link>

                <Link
                  href="/admin/managers"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-purple-100 group-hover:bg-purple-200">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إدارة المديرين</span>
                </Link>

                <Link
                  href="/admin/complaints"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-orange-100 group-hover:bg-orange-200">
                    <FileText className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إدارة الشكاوى</span>
                  {stats.pendingComplaints > 0 && (
                    <span className="mr-auto bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                      {stats.pendingComplaints}
                    </span>
                  )}
                </Link>

                <Link
                  href="/admin/messages"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-green-100 group-hover:bg-green-200">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إدارة الرسائل</span>
                </Link>

                <Link
                  href="/admin/ratings"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-yellow-100 group-hover:bg-yellow-200">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إدارة التقييمات</span>
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200">
                    <Settings className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إعدادات النظام</span>
                </Link>
              </div>
            </div>

            {/* إدارة المحتوى */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">إدارة المحتوى</h3>
              <div className="space-y-3">
                <Link
                  href="/admin/banners"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-indigo-100 group-hover:bg-indigo-200">
                    <ImageIcon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إدارة البانرات</span>
                </Link>

                <Link
                  href="/admin/news"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-red-100 group-hover:bg-red-200">
                    <Globe className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">الشريط الإخباري</span>
                </Link>

                <Link
                  href="/admin/colors"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-pink-100 group-hover:bg-pink-200">
                    <Palette className="w-4 h-4 text-pink-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إدارة الألوان</span>
                </Link>

                <Link
                  href="/admin/visitor-counter"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-teal-100 group-hover:bg-teal-200">
                    <BarChart3 className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">عداد الزوار</span>
                </Link>
              </div>
            </div>
          </div>

          {/* طلبات الموافقة والنشاط الأخير */}
          <div className="lg:col-span-2 space-y-8">
            {/* طلبات الموافقة */}
            <div id="pending-approvals" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">طلبات الموافقة</h3>
                <Link
                  href="/admin/approvals"
                  className="text-sm text-[#004705] hover:text-[#003604] font-medium flex items-center"
                >
                  <Eye className="w-4 h-4 ml-1" />
                  عرض الكل
                </Link>
              </div>

              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
                        <span className={`mr-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.type === 'candidate' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {user.type === 'candidate' ? 'مرشح' : 'نائب'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {user.district} • {user.party} • {new Date(user.date).toLocaleDateString('ar-EG')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => handleApproveUser(user.id)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                        title="موافقة"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRejectUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="رفض"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {pendingUsers.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد طلبات موافقة في الانتظار</p>
                </div>
              )}
            </div>

            {/* النشاط الأخير */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">النشاط الأخير</h3>
                <Link
                  href="/admin/activity"
                  className="text-sm text-[#004705] hover:text-[#003604] font-medium flex items-center"
                >
                  <Activity className="w-4 h-4 ml-1" />
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
                        <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
