'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Users, UserCheck, Crown, AlertCircle, ArrowRight } from 'lucide-react';
import { accountTypeSchema, type AccountTypeData } from '@/lib/validations/auth';
import { setAccountType } from '@/lib/auth';

export default function AccountSetupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AccountTypeData>({
    resolver: zodResolver(accountTypeSchema),
  });

  const selectedAccountType = watch('accountType');

  const onSubmit = async (data: AccountTypeData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await setAccountType(data.accountType);
      
      if (result.success) {
        // توجيه لصفحة إكمال الملف الشخصي
        router.push('/auth/profile-completion');
      } else {
        setError(result.error || 'حدث خطأ أثناء تحديد نوع الحساب');
      }
    } catch (error: any) {
      console.error('Account setup error:', error);
      setError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const accountTypes = [
    {
      value: 'citizen',
      title: 'مواطن',
      description: 'أنا مواطن مصري أريد التواصل مع النواب والمرشحين وتقديم الشكاوى',
      icon: Users,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      value: 'candidate',
      title: 'مرشح',
      description: 'أنا مرشح للانتخابات وأريد التواصل مع الناخبين وعرض برنامجي الانتخابي',
      icon: UserCheck,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      value: 'mp',
      title: 'نائب حالي',
      description: 'أنا نائب في مجلس النواب أو الشيوخ وأريد التواصل مع المواطنين',
      icon: Crown,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#004705]">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            حدد نوع حسابك
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            اختر نوع الحساب المناسب لك لإكمال عملية التسجيل
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {accountTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedAccountType === type.value;
              
              return (
                <label
                  key={type.value}
                  className={`relative flex cursor-pointer rounded-lg border p-6 transition-all duration-200 ${
                    isSelected
                      ? 'border-[#004705] bg-[#004705]/5 ring-2 ring-[#004705]'
                      : type.color
                  }`}
                >
                  <input
                    {...register('accountType')}
                    type="radio"
                    value={type.value}
                    className="sr-only"
                  />
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 ${isSelected ? 'text-[#004705]' : type.iconColor}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="mr-4 flex-1">
                      <h3 className={`text-lg font-medium ${isSelected ? 'text-[#004705]' : 'text-gray-900'}`}>
                        {type.title}
                      </h3>
                      <p className={`mt-1 text-sm ${isSelected ? 'text-[#004705]/80' : 'text-gray-600'}`}>
                        {type.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="flex-shrink-0">
                        <div className="h-5 w-5 rounded-full bg-[#004705] flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          {errors.accountType && (
            <p className="text-sm text-red-600">{errors.accountType.message}</p>
          )}

          <div className="flex justify-between items-center pt-6">
            <div className="text-sm text-gray-500">
              الخطوة 1 من 2
            </div>
            <button
              type="submit"
              disabled={isLoading || !selectedAccountType}
              className="flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#004705] hover:bg-[#003604] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري الحفظ...
                </div>
              ) : (
                <>
                  التالي
                  <ArrowRight className="h-4 w-4 mr-2" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">💡 ملاحظة:</h3>
          <p className="text-xs text-blue-700">
            يمكنك تغيير نوع حسابك لاحقاً من إعدادات الحساب. اختيار نوع الحساب يحدد الميزات المتاحة لك في المنصة.
          </p>
        </div>
      </div>
    </div>
  );
}
