'use client';

import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Clock, AlertCircle, Mail, Phone } from 'lucide-react';

export default function PendingApprovalPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getAccountTypeLabel = () => {
    const accountType = user?.user_metadata?.account_type;
    switch (accountType) {
      case 'candidate': return 'مرشح';
      case 'mp': return 'نائب';
      default: return 'مستخدم';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            في انتظار الموافقة
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            حسابك كـ{getAccountTypeLabel()} قيد المراجعة
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <AlertCircle className="flex-shrink-0 h-5 w-5 text-yellow-400 mt-0.5" />
              <div className="mr-3">
                <h3 className="text-sm font-medium text-gray-900">
                  حالة الحساب: في انتظار الموافقة
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  تم إرسال طلبك للمراجعة من قبل فريق الإدارة. سيتم التواصل معك خلال 24-48 ساعة.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                ما يحدث الآن:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  تم استلام طلبك بنجاح
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  جاري مراجعة البيانات والوثائق
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                  التحقق من صحة المعلومات
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
                  إرسال نتيجة المراجعة
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                متطلبات إضافية للـ{getAccountTypeLabel()}:
              </h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-blue-800">
                  {user?.user_metadata?.account_type === 'candidate' && (
                    <>
                      <li>• التحقق من صحة البيانات الانتخابية</li>
                      <li>• مراجعة الوثائق المطلوبة</li>
                      <li>• التأكد من أهلية الترشح</li>
                    </>
                  )}
                  {user?.user_metadata?.account_type === 'mp' && (
                    <>
                      <li>• التحقق من عضوية البرلمان</li>
                      <li>• مراجعة الوثائق الرسمية</li>
                      <li>• التأكد من صحة البيانات</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                تحتاج مساعدة؟
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:support@naebak.com" className="text-blue-600 hover:underline">
                    support@naebak.com
                  </a>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+20 123 456 7890</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSignOut}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            تسجيل الخروج
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <div className="mr-3">
              <h3 className="text-sm font-medium text-yellow-800">
                ملاحظة مهمة
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                يرجى عدم إنشاء حسابات متعددة. سيتم رفض الطلبات المكررة تلقائياً.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
