'use client';

import { useState, useEffect } from 'react';
import { User, Settings, Shield, MapPin, Phone, Calendar, Mail, Edit3, Save, X } from 'lucide-react';
import { getUserProfile, completeProfile, updateUserRole } from '@/lib/auth';
import PersonalInfoForm from './PersonalInfoForm';
import AccountTypeForm from './AccountTypeForm';

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: string;
  date_of_birth?: string;
  governorate_id?: number;
  constituency?: string;
  role?: string;
  bio?: string;
  profile_completed?: boolean;
  registration_completed?: boolean;
}

export default function ProfileDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const result = await getUserProfile();
      if (result.success && result.data) {
        setProfile(result.data as UserProfile);
      } else {
        setError(result.error || 'فشل في تحميل الملف الشخصي');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalInfoUpdate = async (data: any) => {
    try {
      const result = await completeProfile(data);
      if (result.success) {
        await loadProfile(); // إعادة تحميل البيانات
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'حدث خطأ غير متوقع' };
    }
  };

  const handleAccountTypeUpdate = async (data: any) => {
    try {
      const result = await updateUserRole(data);
      if (result.success) {
        await loadProfile(); // إعادة تحميل البيانات
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'حدث خطأ غير متوقع' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004705]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadProfile}
            className="px-4 py-2 bg-[#004705] text-white rounded-lg hover:bg-[#003604]"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  const completionPercentage = () => {
    if (!profile) return 0;
    const fields = [
      profile.first_name,
      profile.last_name,
      profile.phone,
      profile.gender,
      profile.date_of_birth,
      profile.governorate_id,
      profile.constituency,
      profile.role
    ];
    const completed = fields.filter(field => field && field !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: User },
    { id: 'personal', name: 'البيانات الشخصية', icon: Settings },
    { id: 'account-type', name: 'نوع الحساب', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-[#004705] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.first_name && profile?.last_name 
                    ? `${profile.first_name} ${profile.last_name}`
                    : 'مرحباً بك'
                  }
                </h1>
                <p className="text-gray-600">{profile?.email}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500 ml-2">اكتمال الملف الشخصي:</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#004705] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage()}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-[#004705] mr-2">
                    {completionPercentage()}%
                  </span>
                </div>
              </div>
            </div>
            
            {profile?.role && (
              <div className="text-left">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#004705] text-white">
                  {profile.role === 'citizen' && 'مواطن'}
                  {profile.role === 'candidate' && 'مرشح'}
                  {profile.role === 'mp' && 'نائب'}
                  {profile.role === 'deputy' && 'نائب'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Completion Alert */}
        {completionPercentage() < 100 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Edit3 className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  أكمل ملفك الشخصي للحصول على تجربة أفضل
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  إكمال بياناتك الشخصية يساعدك في الحصول على خدمات مخصصة أكثر.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 space-x-reverse px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse ${
                      activeTab === tab.id
                        ? 'border-[#004705] text-[#004705]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">نظرة عامة على الحساب</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">البريد الإلكتروني</p>
                        <p className="text-sm text-gray-600">{profile?.email}</p>
                      </div>
                    </div>
                  </div>

                  {profile?.phone && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">رقم الهاتف</p>
                          <p className="text-sm text-gray-600">{profile.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {profile?.date_of_birth && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">تاريخ الميلاد</p>
                          <p className="text-sm text-gray-600">{profile.date_of_birth}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {profile?.constituency && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">الدائرة الانتخابية</p>
                          <p className="text-sm text-gray-600">{profile.constituency}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'personal' && (
              <PersonalInfoForm 
                profile={profile}
                onUpdate={handlePersonalInfoUpdate}
              />
            )}

            {activeTab === 'account-type' && (
              <AccountTypeForm 
                profile={profile}
                onUpdate={handleAccountTypeUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
