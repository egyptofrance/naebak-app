'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Shield, Users, Award, Building, Save, AlertCircle, Check } from 'lucide-react';
import { z } from 'zod';

const accountTypeSchema = z.object({
  role: z.enum(['citizen', 'candidate', 'mp']).refine((val) => val !== undefined, {
    message: 'يرجى اختيار نوع الحساب'
  }),
  bio: z.string().optional()
});

type AccountTypeData = z.infer<typeof accountTypeSchema>;

interface AccountTypeFormProps {
  profile: any;
  onUpdate: (data: any) => Promise<{success: boolean, error?: string}>;
}

export default function AccountTypeForm({ profile, onUpdate }: AccountTypeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountTypeData>({
    resolver: zodResolver(accountTypeSchema),
    defaultValues: {
      role: profile?.role || '',
      bio: profile?.bio || '',
    }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: AccountTypeData) => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      const result = await onUpdate(data);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'تم تحديث نوع حسابك بنجاح!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء التحديث' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ غير متوقع' });
    } finally {
      setIsLoading(false);
    }
  };

  const accountTypes = [
    {
      id: 'citizen',
      name: 'مواطن عادي',
      description: 'أريد التواصل مع النواب والمرشحين وتقديم الشكاوى',
      icon: Users,
      features: [
        'تقديم الشكاوى والاقتراحات',
        'التواصل مع النواب والمرشحين',
        'متابعة أخبار الدائرة الانتخابية',
        'المشاركة في الاستطلاعات'
      ]
    },
    {
      id: 'candidate',
      name: 'مرشح للانتخابات',
      description: 'أنا مرشح في الانتخابات وأريد التواصل مع الناخبين',
      icon: Award,
      features: [
        'إنشاء ملف شخصي للمرشح',
        'نشر البرنامج الانتخابي',
        'التواصل مع الناخبين',
        'إدارة الحملة الانتخابية'
      ]
    },
    {
      id: 'mp',
      name: 'نائب في البرلمان',
      description: 'أنا نائب منتخب وأريد التواصل مع المواطنين في دائرتي',
      icon: Building,
      features: [
        'إدارة الملف الشخصي للنائب',
        'استقبال الشكاوى والاقتراحات',
        'نشر التقارير والإنجازات',
        'التواصل المباشر مع المواطنين'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">نوع الحساب</h2>
        <p className="mt-1 text-sm text-gray-600">
          اختر نوع حسابك للحصول على الميزات المناسبة لك
        </p>
      </div>

      {message && (
        <div className={`rounded-md p-4 ${
          message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex">
            {message.type === 'success' ? (
              <Check className="h-5 w-5 text-green-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400" />
            )}
            <div className="ml-3">
              <p className={`text-sm ${
                message.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {message.text}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* اختيار نوع الحساب */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            نوع الحساب *
          </label>
          
          <div className="grid grid-cols-1 gap-4">
            {accountTypes.map((type) => {
              const Icon = type.icon;
              return (
                <label
                  key={type.id}
                  className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                    selectedRole === type.id
                      ? 'border-[#004705] ring-2 ring-[#004705] bg-[#004705]/5'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    {...register('role')}
                    type="radio"
                    value={type.id}
                    className="sr-only"
                  />
                  <div className="flex items-start space-x-3 space-x-reverse w-full">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedRole === type.id ? 'bg-[#004705] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium ${
                          selectedRole === type.id ? 'text-[#004705]' : 'text-gray-900'
                        }`}>
                          {type.name}
                        </h3>
                        {selectedRole === type.id && (
                          <Check className="w-5 h-5 text-[#004705]" />
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {type.description}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {type.features.map((feature, index) => (
                          <li key={index} className="text-xs text-gray-500 flex items-center">
                            <div className="w-1 h-1 bg-gray-400 rounded-full ml-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
          
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        {/* النبذة الشخصية */}
        {(selectedRole === 'candidate' || selectedRole === 'mp') && (
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              النبذة الشخصية (اختياري)
            </label>
            <textarea
              {...register('bio')}
              rows={4}
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent"
              placeholder={
                selectedRole === 'candidate' 
                  ? 'اكتب نبذة عن خلفيتك وأهدافك الانتخابية...'
                  : 'اكتب نبذة عن خلفيتك وإنجازاتك كنائب...'
              }
            />
            <p className="mt-1 text-sm text-gray-500">
              ستظهر هذه النبذة في ملفك الشخصي العام
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#004705] hover:bg-[#003604] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 ml-2" />
                حفظ نوع الحساب
              </>
            )}
          </button>
        </div>
      </form>

      {/* معلومات إضافية */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">💡 ملاحظة مهمة:</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• يمكنك تغيير نوع حسابك في أي وقت من هذه الصفحة</li>
          <li>• إذا اخترت "مرشح" أو "نائب"، ستحتاج لتأكيد هويتك لاحقاً</li>
          <li>• جميع أنواع الحسابات تتمتع بحماية كاملة للخصوصية</li>
        </ul>
      </div>
    </div>
  );
}
