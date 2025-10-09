'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone, Calendar, MapPin, ChevronDown, Save, AlertCircle, Check } from 'lucide-react';
import { profileCompletionSchema, type ProfileCompletionData } from '@/lib/validations/auth';
import { getGovernorates } from '@/lib/auth';

interface PersonalInfoFormProps {
  profile: any;
  onUpdate: (data: any) => Promise<{success: boolean, error?: string}>;
}

export default function PersonalInfoForm({ profile, onUpdate }: PersonalInfoFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const governorates = getGovernorates().data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileCompletionData>({
    resolver: zodResolver(profileCompletionSchema),
    defaultValues: {
      firstName: profile?.first_name || '',
      lastName: profile?.last_name || '',
      phone: profile?.phone || '',
      gender: profile?.gender === 'ذكر' ? 'male' : profile?.gender === 'أنثى' ? 'female' : undefined,
      birthDate: profile?.date_of_birth || '',
      governorateId: profile?.governorate_id || '',
      constituency: profile?.constituency || '',
    }
  });

  const onSubmit = async (data: ProfileCompletionData) => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // تحويل البيانات للتنسيق المطلوب
      const formattedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        gender: data.gender === 'male' ? 'ذكر' : data.gender === 'female' ? 'أنثى' : data.gender,
        dateOfBirth: data.birthDate,
        governorateId: data.governorateId,
        constituency: data.constituency,
      };
      
      const result = await onUpdate(formattedData);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'تم تحديث بياناتك الشخصية بنجاح!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء التحديث' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ غير متوقع' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">البيانات الشخصية</h2>
        <p className="mt-1 text-sm text-gray-600">
          أكمل بياناتك الشخصية للحصول على تجربة مخصصة أكثر
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم الأول */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              الاسم الأول *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('firstName')}
                type="text"
                className={`block w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent ${
                  errors.firstName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="أدخل اسمك الأول"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          {/* الاسم الأخير */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              الاسم الأخير *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('lastName')}
                type="text"
                className={`block w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent ${
                  errors.lastName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="أدخل اسمك الأخير"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          {/* رقم الهاتف */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              رقم الهاتف (اختياري)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('phone')}
                type="tel"
                className={`block w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="01234567890"
                dir="ltr"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* الجنس */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              الجنس *
            </label>
            <div className="relative">
              <select
                {...register('gender')}
                className={`block w-full pr-3 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent appearance-none ${
                  errors.gender ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">اختر الجنس</option>
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
          </div>

          {/* تاريخ الميلاد */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
              تاريخ الميلاد *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('birthDate')}
                type="date"
                className={`block w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent ${
                  errors.birthDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
            )}
          </div>

          {/* المحافظة */}
          <div>
            <label htmlFor="governorateId" className="block text-sm font-medium text-gray-700 mb-2">
              المحافظة *
            </label>
            <div className="relative">
              <select
                {...register('governorateId', { valueAsNumber: true })}
                className={`block w-full pr-3 pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent appearance-none ${
                  errors.governorateId ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">اختر المحافظة</option>
                {governorates.map((gov) => (
                  <option key={gov.id} value={gov.id}>
                    {gov.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.governorateId && (
              <p className="mt-1 text-sm text-red-600">{errors.governorateId.message}</p>
            )}
          </div>
        </div>

        {/* الدائرة الانتخابية */}
        <div>
          <label htmlFor="constituency" className="block text-sm font-medium text-gray-700 mb-2">
            الدائرة الانتخابية *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('constituency')}
              type="text"
              className={`block w-full pr-10 pl-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-transparent ${
                errors.constituency ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="مثال: الدائرة الأولى - مدينة نصر"
            />
          </div>
          {errors.constituency && (
            <p className="mt-1 text-sm text-red-600">{errors.constituency.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            اكتب اسم دائرتك الانتخابية كما تعرفها
          </p>
        </div>

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
                حفظ التغييرات
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
