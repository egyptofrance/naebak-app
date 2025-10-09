'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { loginSchema, type LoginData } from '@/lib/validations/auth';
import { signIn } from '@/lib/auth';

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo = '/' }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn(data.email, data.password);
      
      if (result.success) {
        // فحص ما إذا كان المستخدم يحتاج لتحديد نوع الحساب
        if (result.needsAccountSetup) {
          router.push('/auth/account-setup');
          return;
        }
        
        // فحص ما إذا كان المستخدم يحتاج لإكمال الملف الشخصي
        if (result.needsProfileCompletion) {
          router.push('/auth/profile-completion');
          return;
        }
        
        // إذا كان كل شيء جاهز، توجيه للصفحة المطلوبة أو لوحة التحكم
        router.push(redirectTo === '/' ? '/dashboard' : redirectTo);
        router.refresh();
      } else {
        setError(result.error || 'حدث خطأ أثناء تسجيل الدخول');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#0c6303] mb-2">
              تسجيل الدخول
            </h2>
            <p className="text-gray-600">
              أدخل بياناتك للوصول إلى حسابك
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 ml-2" />
                <div className="text-sm text-red-700">{error}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className={`block w-full pr-10 pl-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`block w-full pr-10 pl-10 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...register('rememberMe')}
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-[#004705] focus:ring-[#004705] border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="mr-2 block text-sm text-gray-700">
                  تذكرني
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/auth/forgot-password"
                  className="font-medium text-[#004705] hover:underline"
                >
                  نسيت كلمة المرور؟
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004705] hover:bg-[#003504] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري تسجيل الدخول...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 ml-2" />
                  تسجيل الدخول
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] transition-colors duration-200"
                onClick={() => {
                  // TODO: Implement Google OAuth
                  console.log('Google login clicked');
                }}
              >
                <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                تسجيل الدخول بـ Google
              </button>

              <button
                type="button"
                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] transition-colors duration-200"
                onClick={() => {
                  // TODO: Implement Facebook OAuth
                  console.log('Facebook login clicked');
                }}
              >
                <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                تسجيل الدخول بـ Facebook
              </button>
            </div>


            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ليس لديك حساب؟{' '}
                <Link href="/auth/register" className="font-medium text-[#004705] hover:underline">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
