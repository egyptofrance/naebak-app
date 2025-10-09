'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { User, Phone, MapPin, Briefcase, Users, AlertCircle, Check } from 'lucide-react';
import { 
  citizenProfileSchema, 
  candidateProfileSchema, 
  type CitizenProfileData, 
  type CandidateProfileData 
} from '@/lib/validations/auth';
import { completeProfile, getCurrentUser, getGovernorates } from '@/lib/auth';

export default function ProfileCompletionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [accountType, setAccountType] = useState<'citizen' | 'candidate' | 'mp' | null>(null);
  const [governorates, setGovernorates] = useState<any[]>([]);
  const router = useRouter();

  // Determine which schema to use based on account type
  const isCandidate = accountType === 'candidate' || accountType === 'mp';
  const schema = isCandidate ? candidateProfileSchema : citizenProfileSchema;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    // Get current user and account type
    const fetchUserData = async () => {
      const user = await getCurrentUser();
      if (user?.user_metadata?.account_type) {
        setAccountType(user.user_metadata.account_type);
      } else {
        // Redirect to account setup if no account type
        router.push('/auth/account-setup');
      }
    };

    // Load governorates
    const { data } = getGovernorates();
    setGovernorates(data);

    fetchUserData();
  }, [router]);

  const onSubmit = async (data: CitizenProfileData | CandidateProfileData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await completeProfile(data);
      
      if (result.success) {
        // توجيه للوحة التحكم
        router.push('/dashboard');
      } else {
        setError(result.error || 'حدث خطأ أثناء حفظ البيانات');
      }
    } catch (error: any) {
      console.error('Profile completion error:', error);
      setError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const parties = [
    'مستقل',
    'حزب المؤتمر',
    'حزب الوفد',
    'حزب النور',
    'الحزب المصري الديمقراطي الاجتماعي',
    'حزب المصريين الأحرار',
    'حزب مستقبل وطن',
    'حزب الشعب الجمهوري',
  ];

  if (!accountType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004705]"></div>
      </div>
    );
  }

  const getAccountTypeLabel = () => {
    switch (accountType) {
      case 'citizen': return 'مواطن';
      case 'candidate': return 'مرشح';
      case 'mp': return 'نائب حالي';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[#004705]">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            إكمال الملف الشخصي
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أكمل بياناتك الشخصية كـ {getAccountTypeLabel()}
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
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 text-[#004705] ml-2" />
              البيانات الأساسية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* الاسم الأول */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الأول *
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                    errors.firstName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="أدخل الاسم الأول"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              {/* الاسم الأخير */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الأخير *
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
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

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Phone className="h-5 w-5 text-[#004705] ml-2" />
              بيانات الاتصال
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* رقم التليفون */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم التليفون *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="01xxxxxxxxx"
                  dir="ltr"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* رقم الواتساب */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الواتساب (اختياري)
                </label>
                <input
                  {...register('whatsapp')}
                  type="tel"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                    errors.whatsapp ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="01xxxxxxxxx"
                  dir="ltr"
                />
                {errors.whatsapp && (
                  <p className="mt-1 text-sm text-red-600">{errors.whatsapp.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-[#004705] ml-2" />
              العنوان
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* المحافظة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المحافظة *
                </label>
                <select
                  {...register('governorate')}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                    errors.governorate ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">اختر المحافظة</option>
                  {governorates.map((gov) => (
                    <option key={gov.id} value={gov.name}>
                      {gov.name}
                    </option>
                  ))}
                </select>
                {errors.governorate && (
                  <p className="mt-1 text-sm text-red-600">{errors.governorate.message}</p>
                )}
              </div>

              {/* المدينة أو الحي */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المدينة أو الحي أو المركز *
                </label>
                <input
                  {...register('city')}
                  type="text"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                    errors.city ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="أدخل المدينة أو الحي"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>

              {/* القرية */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  القرية (اختياري)
                </label>
                <input
                  {...register('village')}
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="أدخل اسم القرية إن وجدت"
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Briefcase className="h-5 w-5 text-[#004705] ml-2" />
              البيانات المهنية والسياسية
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* الوظيفة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوظيفة *
                </label>
                <input
                  {...register('job')}
                  type="text"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                    errors.job ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="أدخل وظيفتك"
                />
                {errors.job && (
                  <p className="mt-1 text-sm text-red-600">{errors.job.message}</p>
                )}
              </div>

              {/* الحزب */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الحزب *
                </label>
                <select
                  {...register('party')}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] ${
                    errors.party ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">اختر الحزب</option>
                  {parties.map((party) => (
                    <option key={party} value={party}>
                      {party}
                    </option>
                  ))}
                </select>
                {errors.party && (
                  <p className="mt-1 text-sm text-red-600">{errors.party.message}</p>
                )}
              </div>

              {/* الدائرة الانتخابية للمواطن أو الرمز الانتخابي للمرشح/النائب */}
              {!isCandidate ? (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الدائرة الانتخابية (اختياري)
                  </label>
                  <input
                    {...register('constituency')}
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705]"
                    placeholder="أدخل اسم الدائرة الانتخابية إذا كنت تعلمها"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الرمز الانتخابي (اختياري)
                    </label>
                    <input
                      {...register('electoralSymbol')}
                      type="text"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705]"
                      placeholder="أدخل الرمز الانتخابي"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الرقم الانتخابي (اختياري)
                    </label>
                    <input
                      {...register('electoralNumber')}
                      type="text"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705]"
                      placeholder="أدخل الرقم الانتخابي"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6">
            <div className="text-sm text-gray-500">
              الخطوة 2 من 2
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#004705] hover:bg-[#003604] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري الحفظ...
                </div>
              ) : (
                <>
                  <Check className="h-4 w-4 ml-2" />
                  إنهاء التسجيل
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">🎉 أوشكت على الانتهاء!</h3>
          <p className="text-xs text-green-700">
            بعد إكمال هذه البيانات، ستتمكن من الوصول إلى لوحة التحكم الخاصة بك والاستفادة من جميع ميزات المنصة.
          </p>
        </div>
      </div>
    </div>
  );
}
