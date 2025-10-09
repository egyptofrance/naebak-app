'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone, CreditCard, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { profileCompletionSchema, type ProfileCompletionData } from '@/lib/validations/auth';
import { completeProfile, getGovernorates, getConstituencies } from '@/lib/auth';

interface ProfileCompletionFormProps {
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
}

interface Governorate {
  id: number;
  name: string;
  code: string;
}

interface Constituency {
  id: number;
  name: string;
  governorate_id: number;
}

export default function ProfileCompletionForm({ onSuccess, onError }: ProfileCompletionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [loadingConstituencies, setLoadingConstituencies] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileCompletionData>({
    resolver: zodResolver(profileCompletionSchema),
  });

  const selectedGovernorate = watch('governorateId');

  // Load governorates on component mount
  useEffect(() => {
    const loadGovernorates = async () => {
      const result = await getGovernorates();
      if (result.success && result.data) {
        setGovernorates(result.data);
      } else {
        onError('حدث خطأ أثناء تحميل المحافظات');
      }
    };

    loadGovernorates();
  }, [onError]);

  // Load constituencies when governorate changes
  useEffect(() => {
    if (selectedGovernorate) {
      const loadConstituencies = async () => {
        setLoadingConstituencies(true);
        const result = await getConstituencies(selectedGovernorate);
        if (result.success && result.data) {
          setConstituencies(result.data);
          setValue('constituencyId', 0); // Reset constituency selection
        } else {
          onError('حدث خطأ أثناء تحميل الدوائر الانتخابية');
        }
        setLoadingConstituencies(false);
      };

      loadConstituencies();
    } else {
      setConstituencies([]);
    }
  }, [selectedGovernorate, setValue, onError]);

  const onSubmit = async (data: ProfileCompletionData) => {
    setIsLoading(true);
    
    try {
      const result = await completeProfile(data);
      
      if (result.success) {
        onSuccess(data);
      } else {
        onError(result.error || 'حدث خطأ أثناء حفظ البيانات');
      }
    } catch (error) {
      onError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#004705] mb-2">
          إكمال الملف الشخصي
        </h2>
        <p className="text-gray-600">
          المرحلة الثانية: أدخل بياناتك الشخصية والموقع
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                id="firstName"
                className={`block w-full pr-10 pl-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                  errors.firstName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="أدخل الاسم الأول"
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

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
                id="lastName"
                className={`block w-full pr-10 pl-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                  errors.lastName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="أدخل الاسم الأخير"
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Phone and National ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                id="phone"
                className={`block w-full pr-10 pl-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="01xxxxxxxxx"
                dir="ltr"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-2">
              الرقم القومي *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('nationalId')}
                type="text"
                id="nationalId"
                maxLength={14}
                className={`block w-full pr-10 pl-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                  errors.nationalId ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="14 رقم"
                dir="ltr"
              />
            </div>
            {errors.nationalId && (
              <p className="mt-1 text-sm text-red-600">{errors.nationalId.message}</p>
            )}
          </div>
        </div>

        {/* Birth Date and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                id="birthDate"
                className={`block w-full pr-10 pl-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                  errors.birthDate ? 'border-red-300' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.birthDate && (
              <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              الجنس *
            </label>
            <div className="relative">
              <select
                {...register('gender')}
                id="gender"
                className={`block w-full pr-3 pl-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
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
        </div>

        {/* Location Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="governorateId" className="block text-sm font-medium text-gray-700 mb-2">
              المحافظة *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                {...register('governorateId', { valueAsNumber: true })}
                id="governorateId"
                className={`block w-full pr-10 pl-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                  errors.governorateId ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">اختر المحافظة</option>
                {governorates.map((governorate) => (
                  <option key={governorate.id} value={governorate.id}>
                    {governorate.name}
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

          <div>
            <label htmlFor="constituencyId" className="block text-sm font-medium text-gray-700 mb-2">
              الدائرة الانتخابية *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                {...register('constituencyId', { valueAsNumber: true })}
                id="constituencyId"
                disabled={!selectedGovernorate || loadingConstituencies}
                className={`block w-full pr-10 pl-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  errors.constituencyId ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">
                  {loadingConstituencies ? 'جاري التحميل...' : 'اختر الدائرة الانتخابية'}
                </option>
                {constituencies.map((constituency) => (
                  <option key={constituency.id} value={constituency.id}>
                    {constituency.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {errors.constituencyId && (
              <p className="mt-1 text-sm text-red-600">{errors.constituencyId.message}</p>
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
              جاري حفظ البيانات...
            </>
          ) : (
            'المتابعة إلى الخطوة التالية'
          )}
        </button>
      </form>
    </div>
  );
}
