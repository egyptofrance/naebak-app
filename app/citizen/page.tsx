'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, MessageSquare, FileText, Settings, Bell, Star, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  dob: string;
  gender: string;
  job_title: string;
  city: string;
  village: string;
  avatar: string | null;
  total_points: number;
  created_at: string;
  governorate: {
    name: string;
  };
}

interface MessageData {
  id: number;
  body: string;
  is_approved: boolean;
  created_at: string;
  to_user: {
    first_name: string;
    last_name: string;
  };
}

interface ComplaintData {
  id: number;
  title: string;
  status: string;
  created_at: string;
  type: {
    name: string;
  };
}

export default function CitizenDashboard() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [complaints, setComplaints] = useState<ComplaintData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Get current user from auth
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/login');
          return;
        }

        // Get user data with governorate
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select(`
            *,
            governorate:governorates(name)
          `)
          .eq('auth_id', authUser.id)
          .single();

        if (userError || !userData) {
          console.error('Error fetching user data:', userError);
          router.push('/login');
          return;
        }

        // Check if user is a citizen
        const { data: roleData, error: roleError } = await supabase
          .from('roles')
          .select('name')
          .eq('id', userData.role_id)
          .single();

        if (roleError || !roleData || roleData.name !== 'citizen') {
          router.push('/unauthorized');
          return;
        }

        setUser(userData);

        // Fetch user's messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select(`
            id,
            body,
            is_approved,
            created_at,
            to_user:users!messages_to_user_id_fkey(first_name, last_name)
          `)
          .eq('from_user_id', userData.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (!messagesError && messagesData) {
          setMessages(messagesData);
        }

        // Fetch user's complaints
        const { data: complaintsData, error: complaintsError } = await supabase
          .from('complaints')
          .select(`
            id,
            title,
            status,
            created_at,
            type:complaint_types(name)
          `)
          .eq('citizen_id', userData.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (!complaintsError && complaintsData) {
          setComplaints(complaintsData);
        }

      } catch (error) {
        console.error('Error in fetchUserData:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [router, supabase]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جديدة';
      case 'assigned': return 'مُحالة';
      case 'responded': return 'تم الرد';
      case 'resolved': return 'محلولة';
      case 'rejected': return 'مرفوضة';
      default: return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004705]"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#004705] rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-gray-600 mb-2">{user.job_title}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {user.governorate?.name} - {user.city}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {user.total_points} نقطة
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'profile'
                    ? 'border-[#004705] text-[#004705]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="w-4 h-4 inline-block ml-2" />
                الملف الشخصي
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'messages'
                    ? 'border-[#004705] text-[#004705]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline-block ml-2" />
                الرسائل
              </button>
              <button
                onClick={() => setActiveTab('complaints')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'complaints'
                    ? 'border-[#004705] text-[#004705]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-4 h-4 inline-block ml-2" />
                الشكاوى
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">البيانات الشخصية</h3>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">رقم الهاتف</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">واتساب</p>
                      <p className="font-medium">{user.whatsapp}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">تاريخ الميلاد</p>
                      <p className="font-medium">{new Date(user.dob).toLocaleDateString('ar-EG')}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات إضافية</h3>
                  
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">الجنس</p>
                      <p className="font-medium">{user.gender}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">العنوان</p>
                      <p className="font-medium">{user.governorate?.name} - {user.city} - {user.village}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">إجمالي النقاط</p>
                      <p className="font-medium">{user.total_points} نقطة</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">تاريخ التسجيل</p>
                      <p className="font-medium">{new Date(user.created_at).toLocaleDateString('ar-EG')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">رسائلي</h3>
                  <Link
                    href="/citizen/messages"
                    className="bg-[#004705] text-white px-4 py-2 rounded-lg hover:bg-[#003604] transition-colors"
                  >
                    إدارة الرسائل
                  </Link>
                </div>

                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">لا توجد رسائل حتى الآن</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-gray-900">
                              إلى: {message.to_user.first_name} {message.to_user.last_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(message.created_at).toLocaleDateString('ar-EG')}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            message.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {message.is_approved ? 'معتمدة' : 'في الانتظار'}
                          </span>
                        </div>
                        <p className="text-gray-700">{message.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'complaints' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">شكاويي</h3>
                  <Link
                    href="/citizen/complaints"
                    className="bg-[#004705] text-white px-4 py-2 rounded-lg hover:bg-[#003604] transition-colors"
                  >
                    إدارة الشكاوى
                  </Link>
                </div>

                {complaints.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">لا توجد شكاوى حتى الآن</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {complaints.map((complaint) => (
                      <div key={complaint.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{complaint.title}</h4>
                            <p className="text-sm text-gray-500">
                              {complaint.type?.name} • {new Date(complaint.created_at).toLocaleDateString('ar-EG')}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(complaint.status)}`}>
                            {getStatusText(complaint.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
