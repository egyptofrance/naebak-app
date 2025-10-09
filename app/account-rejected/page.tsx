'use client';

import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { XCircle, AlertTriangle, Mail, Phone, RefreshCw } from 'lucide-react';

export default function AccountRejectedPage() {
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

  const getRejectionReason = () => {
    // يمكن إضافة سبب الرفض من user_metadata لاحقاً
    return (user?.user_metadata as any)?.rejection_reason || 'لم يتم تحديد السبب';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            تم رفض الطلب
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            طلب التسجيل كـ{getAccountTypeLabel()} لم يتم قبوله
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <XCircle className="flex-shrink-0 h-5 w-5 text-red-400 mt-0.5" />
              <div className="mr-3">
                <h3 className="text-sm font-medium text-gray-900">
                  حالة الحساب: مرفوض
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  تم رفض طلبك بعد المراجعة. يمكنك الاطلاع على الأسباب أدناه.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                أسباب الرفض المحتملة:
              </h4>
              <div className="bg-red-50 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-red-800">
                  {user?.user_metadata?.account_type === 'candidate' && (
                    <>
                      <li>• عدم استيفاء شروط الترشح</li>
                      <li>• نقص في الوثائق المطلوبة</li>
                      <li>• عدم صحة البيانات المقدمة</li>
                      <li>• عدم الأهلية للترشح</li>
                    </>
                  )}
                  {user?.user_metadata?.account_type === 'mp' && (
                    <>
                      <li>• عدم التحقق من عضوية البرلمان</li>
                      <li>• نقص في الوثائق الرسمية</li>
                      <li>• عدم صحة البيانات المقدمة</li>
                      <li>• انتهاء فترة العضوية</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                ماذا يمكنك فعله الآن؟
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <RefreshCw className="flex-shrink-0 h-4 w-4 text-blue-500 mt-1" />
                  <div className="mr-3">
                    <p className="text-sm text-gray-700">
                      <strong>إعادة التقديم:</strong> يمكنك إنشاء حساب جديد بعد تصحيح الأخطاء وتوفير الوثائق المطلوبة.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="flex-shrink-0 h-4 w-4 text-green-500 mt-1" />
                  <div className="mr-3">
                    <p className="text-sm text-gray-700">
                      <strong>التواصل معنا:</strong> للاستفسار عن تفاصيل أكثر حول سبب الرفض.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                تواصل مع الدعم:
              </h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:appeals@naebak.com" className="text-blue-600 hover:underline">
                    appeals@naebak.com
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

        <div className="flex space-x-4 space-x-reverse">
          <button
            onClick={() => router.push('/auth/register')}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            إعادة التقديم
          </button>
          <button
            onClick={handleSignOut}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
          >
            تسجيل الخروج
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <div className="mr-3">
              <h3 className="text-sm font-medium text-amber-800">
                إرشادات مهمة
              </h3>
              <div className="mt-1 text-sm text-amber-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>تأكد من صحة جميع البيانات قبل إعادة التقديم</li>
                  <li>قم بتوفير جميع الوثائق المطلوبة</li>
                  <li>لا تقم بإنشاء حسابات متعددة</li>
                  <li>تواصل مع الدعم للحصول على توضيحات</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
