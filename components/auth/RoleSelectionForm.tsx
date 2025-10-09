'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Users, Crown, Vote, FileText, Check } from 'lucide-react';
import { roleSelectionSchema, type RoleSelectionData } from '@/lib/validations/auth';
import { updateUserRole } from '@/lib/auth';

interface RoleSelectionFormProps {
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
}

interface RoleOption {
  id: 'citizen' | 'deputy' | 'candidate';
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  requiresVerification: boolean;
}

export default function RoleSelectionForm({ onSuccess, onError }: RoleSelectionFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RoleSelectionData>({
    resolver: zodResolver(roleSelectionSchema),
  });

  const selectedRole = watch('role');

  const roleOptions: RoleOption[] = [
    {
      id: 'citizen',
      title: 'مواطن',
      description: 'للمواطنين الذين يريدون التواصل مع نوابهم وتقديم الشكاوى',
      icon: <Users className="h-8 w-8" />,
      features: [
        'التواصل مع النواب والمرشحين',
        'تقديم الشكاوى ومتابعتها',
        'تقييم أداء النواب',
        'المشاركة في الاستطلاعات',
        'متابعة الأخبار والفعاليات',
      ],
      requiresVerification: false,
    },
    {
      id: 'deputy',
      title: 'نائب',
      description: 'للنواب الحاليين في مجلس النواب أو مجلس الشيوخ',
      icon: <Crown className="h-8 w-8" />,
      features: [
        'إدارة الملف الشخصي والإنجازات',
        'الرد على رسائل المواطنين',
        'إدارة الشكاوى والمتابعة',
        'نشر الأخبار والفعاليات',
        'إحصائيات مفصلة عن الأداء',
      ],
      requiresVerification: true,
    },
    {
      id: 'candidate',
      title: 'مرشح',
      description: 'للمرشحين في الانتخابات القادمة',
      icon: <Vote className="h-8 w-8" />,
      features: [
        'إنشاء الملف الانتخابي',
        'التواصل مع الناخبين',
        'نشر البرنامج الانتخابي',
        'إدارة الحملة الانتخابية',
        'متابعة التأييد والدعم',
      ],
      requiresVerification: true,
    },
  ];

  const onSubmit = async (data: RoleSelectionData) => {
    setIsLoading(true);
    
    try {
      const result = await updateUserRole(data);
      
      if (result.success) {
        onSuccess(data);
      } else {
        onError(result.error || 'حدث خطأ أثناء تحديث الدور');
      }
    } catch (error) {
      onError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#004705] mb-2">
          اختيار نوع الحساب
        </h2>
        <p className="text-gray-600">
          المرحلة الثالثة: حدد نوع حسابك والصلاحيات المطلوبة
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Role Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roleOptions.map((option) => (
            <div key={option.id} className="relative">
              <input
                {...register('role')}
                type="radio"
                id={option.id}
                value={option.id}
                className="sr-only"
              />
              <label
                htmlFor={option.id}
                className={`block p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-[#004705] ${
                  selectedRole === option.id
                    ? 'border-[#004705] bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-full ${
                      selectedRole === option.id
                        ? 'bg-[#004705] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {option.icon}
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {option.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="w-full">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      المميزات المتاحة:
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-3 w-3 text-green-500 ml-1 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verification Badge */}
                  {option.requiresVerification && (
                    <div className="w-full mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-xs text-yellow-700 font-medium">
                        يتطلب التحقق من الهوية
                      </p>
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {selectedRole === option.id && (
                    <div className="absolute top-4 left-4 w-6 h-6 bg-[#004705] rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>

        {errors.role && (
          <p className="text-center text-sm text-red-600">{errors.role.message}</p>
        )}

        {/* Bio Field (Optional) */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
            نبذة شخصية (اختياري)
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 pointer-events-none">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              {...register('bio')}
              id="bio"
              rows={4}
              className={`block w-full pr-10 pl-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004705] focus:border-[#004705] resize-none ${
                errors.bio ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="اكتب نبذة مختصرة عن نفسك (حتى 500 حرف)"
              maxLength={500}
            />
          </div>
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        {/* Verification Notice */}
        {selectedRole && roleOptions.find(r => r.id === selectedRole)?.requiresVerification && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <h3 className="text-sm font-medium text-blue-800">
                  التحقق من الهوية مطلوب
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    بعد إنشاء الحساب، ستحتاج إلى تقديم الوثائق التالية للتحقق من هويتك:
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>صورة واضحة من البطاقة الشخصية</li>
                    <li>وثيقة رسمية تثبت الصفة (شهادة عضوية، ترشح، إلخ)</li>
                    <li>صورة شخصية واضحة</li>
                  </ul>
                  <p className="mt-2 font-medium">
                    سيتم مراجعة طلبك خلال 24-48 ساعة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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
              إنهاء إنشاء الحساب
            </>
          )}
        </button>
      </form>
    </div>
  );
}
