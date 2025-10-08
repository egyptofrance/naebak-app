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
  Users,
  Award,
  CheckCircle,
  Clock,
  AlertTriangle,
  Camera,
  Globe
} from 'lucide-react';

interface CandidateStats {
  totalMessages: number;
  unreadMessages: number;
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  averageRating: number;
  totalRatings: number;
  profileViews: number;
}

interface RecentActivity {
  id: number;
  type: 'message' | 'complaint' | 'rating' | 'profile_view';
  title: string;
  description: string;
  date: string;
  status?: string;
  from?: string;
}

export default function CandidateDashboard({ user }: { user: any }) {
  const [stats, setStats] = useState<CandidateStats>({
    totalMessages: 0,
    unreadMessages: 0,
    totalComplaints: 0,
    resolvedComplaints: 0,
    pendingComplaints: 0,
    averageRating: 0,
    totalRatings: 0,
    profileViews: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [accountStatus, setAccountStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setStats({
        totalMessages: 24,
        unreadMessages: 5,
        totalComplaints: 8,
        resolvedComplaints: 6,
        pendingComplaints: 2,
        averageRating: 4.3,
        totalRatings: 127,
        profileViews: 1250
      });

      setRecentActivity([
        {
          id: 1,
          type: 'message',
          title: 'رسالة جديدة',
          description: 'رسالة من المواطن أحمد علي حول موضوع التعليم',
          date: '2024-10-07',
          status: 'unread',
          from: 'أحمد علي'
        },
        {
          id: 2,
          type: 'complaint',
          title: 'شكوى مُحالة',
          description: 'تم تحويل شكوى حول مشكلة في الطرق إليك',
          date: '2024-10-06',
          status: 'pending'
        },
        {
          id: 3,
          type: 'rating',
          title: 'تقييم جديد',
          description: 'تم تقييمك بـ 5 نجوم من المواطن سارة محمد',
          date: '2024-10-05',
          from: 'سارة محمد'
        },
        {
          id: 4,
          type: 'profile_view',
          title: 'زيارة للملف الشخصي',
          description: 'تم عرض ملفك الشخصي 15 مرة اليوم',
          date: '2024-10-05'
        }
      ]);

      // محاكاة حالة الحساب
      setAccountStatus('approved'); // يمكن أن تكون pending, approved, rejected
      setIsLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'complaint': return FileText;
      case 'rating': return Star;
      case 'profile_view': return Eye;
      default: return Bell;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-600 bg-blue-100';
      case 'complaint': return 'text-orange-600 bg-orange-100';
      case 'rating': return 'text-yellow-600 bg-yellow-100';
      case 'profile_view': return 'text-green-600 bg-green-100';
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

  const getAccountStatusBadge = () => {
    const statusConfig = {
      pending: { 
        label: 'في انتظار الموافقة', 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock
      },
      approved: { 
        label: 'تم الموافقة', 
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle
      },
      rejected: { 
        label: 'مرفوض', 
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertTriangle
      }
    };

    const config = statusConfig[accountStatus];
    const IconComponent = config.icon;

    return (
      <div className={`inline-flex items-center px-3 py-2 rounded-lg border ${config.color}`}>
        <IconComponent className="w-4 h-4 ml-2" />
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
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
        {/* ترحيب وحالة الحساب */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                مرحباً، {user.first_name} {user.last_name}
              </h1>
              <p className="text-gray-600">
                لوحة تحكم المرشح - إدارة حملتك الانتخابية وتفاعلك مع المواطنين
              </p>
            </div>
            <div>
              {getAccountStatusBadge()}
            </div>
          </div>
        </div>

        {/* تنبيه حالة الحساب */}
        {accountStatus === 'pending' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-600 ml-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">حسابك قيد المراجعة</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  سيتم مراجعة بياناتك من قبل الإدارة وتفعيل حسابك خلال 24-48 ساعة
                </p>
              </div>
            </div>
          </div>
        )}

        {accountStatus === 'rejected' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 ml-3" />
              <div>
                <h3 className="text-sm font-medium text-red-800">تم رفض حسابك</h3>
                <p className="text-sm text-red-700 mt-1">
                  يرجى مراجعة بياناتك والتواصل مع الإدارة لمعرفة أسباب الرفض
                </p>
              </div>
            </div>
          </div>
        )}

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">الرسائل</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMessages}</p>
                {stats.unreadMessages > 0 && (
                  <p className="text-xs text-red-600">{stats.unreadMessages} غير مقروءة</p>
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
              <div className="p-3 rounded-full bg-yellow-100">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">التقييم</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
                <p className="text-xs text-gray-600">{stats.totalRatings} تقييم</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">مشاهدات الملف</p>
                <p className="text-2xl font-bold text-gray-900">{stats.profileViews.toLocaleString()}</p>
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
                  href="/candidate/profile/edit"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-blue-100 group-hover:bg-blue-200">
                    <Edit3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">تحديث الملف الشخصي</span>
                </Link>

                <Link
                  href="/candidate/messages"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-green-100 group-hover:bg-green-200">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إدارة الرسائل</span>
                  {stats.unreadMessages > 0 && (
                    <span className="mr-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {stats.unreadMessages}
                    </span>
                  )}
                </Link>

                <Link
                  href="/candidate/complaints"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-orange-100 group-hover:bg-orange-200">
                    <FileText className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">إدارة الشكاوى</span>
                  {stats.pendingComplaints > 0 && (
                    <span className="mr-auto bg-yellow-500 text-white text-xs rounded-full px-2 py-1">
                      {stats.pendingComplaints}
                    </span>
                  )}
                </Link>

                <Link
                  href="/candidate/banner"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-purple-100 group-hover:bg-purple-200">
                    <Camera className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">تحديث البانر</span>
                </Link>

                <Link
                  href={`/candidate/${user.id}`}
                  target="_blank"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-[#004705] transition-all duration-200 group"
                >
                  <div className="p-2 rounded-full bg-indigo-100 group-hover:bg-indigo-200">
                    <Globe className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="mr-3 font-medium text-gray-900">عرض الصفحة العامة</span>
                </Link>
              </div>
            </div>

            {/* معلومات الحملة */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الحملة</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-600">المرشح:</span>
                  <span className="mr-2 font-medium">{user.first_name} {user.last_name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-600">الدائرة:</span>
                  <span className="mr-2 font-medium">{user.profile?.district || 'غير محدد'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-600">المجلس:</span>
                  <span className="mr-2 font-medium">{user.profile?.council?.name || 'غير محدد'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-600">الحزب:</span>
                  <span className="mr-2 font-medium">
                    {user.profile?.is_independent ? 'مستقل' : user.profile?.party?.name || 'غير محدد'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* النشاط الأخير */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">النشاط الأخير</h3>
                <Link
                  href="/candidate/activity"
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
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 ml-1" />
                            {new Date(activity.date).toLocaleDateString('ar-EG')}
                          </div>
                          {activity.from && (
                            <span className="text-xs text-gray-500">من: {activity.from}</span>
                          )}
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
                    ابدأ بتحديث ملفك الشخصي والتفاعل مع المواطنين
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
