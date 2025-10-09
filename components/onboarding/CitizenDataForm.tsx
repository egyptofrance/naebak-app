'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Phone, MapPin, Briefcase, Users, Map, ArrowLeft, Save } from 'lucide-react';
import { completeProfile } from '@/lib/auth';
import { getGovernorates } from '@/lib/auth';

// Schema للتحقق من صحة البيانات
const citizenDataSchema = z.object({
  firstName: z.string().min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل'),
  lastName: z.string().min(2, 'الاسم الأخير يجب أن يكون حرفين على الأقل'),
  phone: z.string().min(11, 'رقم الهاتف يجب أن يكون 11 رقم على الأقل'),
  whatsapp: z.string().optional(),
  governorateId: z.number().min(1, 'يرجى اختيار المحافظة'),
  city: z.string().min(2, 'يرجى إدخال المدينة أو الحي أو المركز'),
  village: z.string().optional(),
  job: z.string().min(2, 'يرجى إدخال الوظيفة'),
  party: z.string().optional(),
  constituency: z.string().optional(),
});

type CitizenData = z.infer<typeof citizenDataSchema>;

interface CitizenDataFormProps {
  onComplete: () => void;
  userProfile: any;
}

export default function CitizenDataForm({ onComplete, userProfile }: CitizenDataFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isIndependent, setIsIndependent] = useState(false);

  const governoratesResult = getGovernorates();
  const governorates = governoratesResult.success ? governoratesResult.data : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<CitizenData>({
    resolver: zodResolver(citizenDataSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      whatsapp: '',
      governorateId: 0,
      city: '',
      village: '',
      job: '',
      party: '',
      constituency: '',
    }
  });

  const watchPhone = watch('phone');

  const handleCopyPhone = () => {
    setValue('whatsapp', watchPhone);
  };

  const handlePartyChange = (value: string) => {
    setIsIndependent(value === 'مستقل');
    setValue('party', value);
  };

  const onSubmit = async (data: CitizenData) => {
    setIsLoading(true);
    setError('');

    try {
      const profileData = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        whatsapp: data.whatsapp || data.phone,
        governorate_id: data.governorateId,
        city: data.city,
        village: data.village || '',
        job: data.job,
        party: data.party || 'مستقل',
        constituency: data.constituency || '',
        role: 'citizen',
        profile_completed: true,
        registration_completed: true
      };

      const result = await completeProfile(profileData);

      if (result.success) {
        onComplete();
      } else {
        setError(result.error || 'حدث خطأ أثناء حفظ البيانات');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          إكمال البيانات الشخصية - مواطن
        </h1>
        <p className="text-gray-600">
          أكمل بياناتك الشخصية للحصول على تجربة مخصصة وللتواصل مع نوابك بفعالية
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 ml-2 text-gray-600" />
            البيانات الشخصية
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الأول *
              </label>
              <input
                {...register('firstName')}
                type="text"
                className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.firstName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="أدخل الاسم الأول"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الأخير *
              </label>
              <input
                {...register('lastName')}
                type="text"
                className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.lastName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="أدخل الاسم الأخير"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="w-5 h-5 ml-2 text-gray-600" />
            بيانات الاتصال
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف *
              </label>
              <input
                {...register('phone')}
                type="tel"
                className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="01xxxxxxxxx"
                dir="ltr"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                رقم الواتس اب
              </label>
              <div className="flex">
                <input
                  {...register('whatsapp')}
                  type="tel"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="01xxxxxxxxx"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-600 hover:bg-gray-200"
                  title="نسخ رقم الهاتف"
                >
                  نسخ
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">اتركه فارغاً إذا كان نفس رقم الهاتف</p>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 ml-2 text-gray-600" />
            البيانات الجغرافية
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Governorate */}
            <div>
              <label htmlFor="governorateId" className="block text-sm font-medium text-gray-700 mb-2">
                المحافظة *
              </label>
              <select
                {...register('governorateId', { valueAsNumber: true })}
                className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.governorateId ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value={0}>اختر المحافظة</option>
                {governorates.map((gov) => (
                  <option key={gov.id} value={gov.id}>
                    {gov.name}
                  </option>
                ))}
              </select>
              {errors.governorateId && (
                <p className="mt-1 text-sm text-red-600">{errors.governorateId.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                المدينة / الحي / المركز *
              </label>
              <input
                {...register('city')}
                type="text"
                className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.city ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="مثال: المعادي، الزمالك، طنطا"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/* Village */}
            <div className="md:col-span-2">
              <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-2">
                القرية (إن وجدت)
              </label>
              <input
                {...register('village')}
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="اتركه فارغاً إذا كنت في مدينة"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 ml-2 text-gray-600" />
            البيانات المهنية والسياسية
          </h2>
          
          <div className="space-y-4">
            {/* Job */}
            <div>
              <label htmlFor="job" className="block text-sm font-medium text-gray-700 mb-2">
                الوظيفة *
              </label>
              <input
                {...register('job')}
                type="text"
                className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.job ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="مثال: مهندس، طبيب، محاسب، طالب"
              />
              {errors.job && (
                <p className="mt-1 text-sm text-red-600">{errors.job.message}</p>
              )}
            </div>

            {/* Party */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الانتماء الحزبي
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="independent"
                    name="partyType"
                    value="مستقل"
                    onChange={(e) => handlePartyChange(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="independent" className="mr-2 text-sm text-gray-700">
                    مستقل (لا أنتمي لأي حزب)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="party_member"
                    name="partyType"
                    value="حزبي"
                    onChange={(e) => handlePartyChange('')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="party_member" className="mr-2 text-sm text-gray-700">
                    منتمي لحزب سياسي
                  </label>
                </div>
              </div>
              
              {!isIndependent && (
                <div className="mt-3">
                  <input
                    {...register('party')}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اسم الحزب"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Electoral Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Map className="w-5 h-5 ml-2 text-gray-600" />
            البيانات الانتخابية
          </h2>
          
          <div>
            <label htmlFor="constituency" className="block text-sm font-medium text-gray-700 mb-2">
              الدائرة الانتخابية (إذا كنت تعلمها)
            </label>
            <input
              {...register('constituency')}
              type="text"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="مثال: الدائرة الأولى، الدائرة الثانية"
            />
            <p className="mt-1 text-xs text-gray-500">
              يمكنك تركه فارغاً إذا كنت لا تعرف دائرتك الانتخابية
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 ml-2" />
                حفظ البيانات والمتابعة
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
