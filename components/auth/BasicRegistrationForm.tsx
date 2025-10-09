'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, Check } from 'lucide-react';
import { basicRegistrationSchema, type BasicRegistrationData } from '@/lib/validations/auth';
import { signUp } from '@/lib/auth';

interface BasicRegistrationFormProps {
  onSuccess: (data: { user: any; needsEmailConfirmation: boolean }) => void;
  onError: (error: string) => void;
}

export default function BasicRegistrationForm({ onSuccess, onError }: BasicRegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BasicRegistrationData>({
    resolver: zodResolver(basicRegistrationSchema),
  });

  const password = watch('password');

  const onSubmit = async (data: BasicRegistrationData) => {
    setIsLoading(true);
    
    try {
      const result = await signUp(data.email, data.password, {});
      
      if (result.success) {
        onSuccess({ 
          user: result.user, 
          needsEmailConfirmation: !result.user 
        });
      } else {
        onError(result.error || 'حدث خطأ أثناء إنشاء الحساب');
      }
    } catch (error) {
      onError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const labels = ['ضعيف جداً', 'ضعيف', 'متوسط', 'قوي', 'قوي جداً'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || 'bg-gray-300',
    };
  };

  const passwordStrength = getPasswordStrength(password || '');

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#004705] mb-2">
          إنشاء حساب جديد
        </h2>
        <p className="text-gray-600">
          المرحلة الأولى: البيانات الأساسية
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
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
              id="email"
              className={`block w-full pr-10 pl-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
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
            كلمة المرور *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`block w-full pr-10 pl-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
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
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">{passwordStrength.label}</span>
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            تأكيد كلمة المرور *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className={`block w-full pr-10 pl-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="أعد إدخال كلمة المرور"
              dir="ltr"
            />
            <button
              type="button"
              className="absolute inset-y-0 left-0 pl-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              {...register('agreeToTerms')}
              id="agreeToTerms"
              type="checkbox"
              className="focus:ring-[#004705] h-4 w-4 text-[#004705] border-gray-300 rounded"
            />
          </div>
          <div className="mr-3">
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              أوافق على{' '}
              <a href="/terms" className="text-[#004705] hover:underline" target="_blank">
                الشروط والأحكام
              </a>{' '}
              و{' '}
              <a href="/privacy-policy" className="text-[#004705] hover:underline" target="_blank">
                سياسة الخصوصية
              </a>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}
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
              جاري إنشاء الحساب...
            </>
          ) : (
            <>
              <Check className="h-4 w-4 ml-2" />
              إنشاء الحساب
            </>
          )}
        </button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            لديك حساب بالفعل؟{' '}
            <a href="/auth/login" className="font-medium text-[#004705] hover:underline">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
