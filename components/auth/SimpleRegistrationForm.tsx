'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Check, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { signUp } from '@/lib/auth';

// Schema للتحقق من صحة البيانات
const simpleRegistrationSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
});

type SimpleRegistrationData = z.infer<typeof simpleRegistrationSchema>;

export default function SimpleRegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimpleRegistrationData>({
    resolver: zodResolver(simpleRegistrationSchema),
  });

  const onSubmit = async (data: SimpleRegistrationData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await signUp(data.email, data.password, {});
      
      if (result.success) {
        if (result.needsEmailConfirmation) {
          setSuccess('تم إرسال رابط التحقق إلى بريدك الإلكتروني. يرجى تأكيد بريدك الإلكتروني ثم تسجيل الدخول.');
          // إعادة توجيه لصفحة تسجيل الدخول بعد 3 ثوان
          setTimeout(() => {
            router.push('/auth/login?message=confirm_email');
          }, 3000);
        } else {
          setSuccess('تم إنشاء حسابك بنجاح! مرحباً بك في منصة نائبك.');
          // إعادة توجيه للصفحة الرئيسية
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      } else {
        setError(result.error || 'حدث خطأ أثناء إنشاء الحساب');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            انضم إلى منصة نائبك للتواصل مع نوابك ومرشحيك
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <Check className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* البريد الإلكتروني */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className={`block w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="أدخل بريدك الإلكتروني"
                  dir="ltr"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* كلمة المرور */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`block w-full pr-10 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="أدخل كلمة المرور"
                  dir="ltr"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#004705] hover:bg-[#003604] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  جاري إنشاء الحساب...
                </div>
              ) : (
                'إنشاء الحساب'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <a href="/auth/login" className="font-medium text-[#004705] hover:text-[#003604]">
                تسجيل الدخول
              </a>
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              بإنشاء الحساب، أنت توافق على{' '}
              <a href="/terms" className="text-[#004705] hover:underline">
                شروط الاستخدام
              </a>{' '}
              و{' '}
              <a href="/privacy-policy" className="text-[#004705] hover:underline">
                سياسة الخصوصية
              </a>
            </p>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">💡 نصيحة:</h3>
          <p className="text-xs text-blue-700">
            يمكنك إكمال بياناتك الشخصية وتحديد نوع حسابك (مواطن/مرشح/نائب) لاحقاً من لوحة التحكم.
          </p>
        </div>
      </div>
    </div>
  );
}
