'use client';

import { useState } from 'react';
import { Users, Award, Building, ArrowLeft, Check } from 'lucide-react';
import { updateUserRole } from '@/lib/auth';

type UserRole = 'citizen' | 'candidate' | 'mp';

interface RoleSelectionStepProps {
  onRoleSelect: (role: UserRole) => void;
  userEmail?: string;
}

export default function RoleSelectionStep({ onRoleSelect, userEmail }: RoleSelectionStepProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    {
      id: 'citizen' as UserRole,
      name: 'مواطن عادي',
      description: 'أريد التواصل مع النواب والمرشحين وتقديم الشكاوى والاقتراحات',
      icon: Users,
      color: 'blue',
      features: [
        'تقديم الشكاوى والاقتراحات للنواب',
        'التواصل المباشر مع ممثليك',
        'متابعة أخبار دائرتك الانتخابية',
        'المشاركة في الاستطلاعات والنقاشات',
        'الحصول على تحديثات فورية',
        'تقييم أداء النواب والمرشحين'
      ]
    },
    {
      id: 'candidate' as UserRole,
      name: 'مرشح للانتخابات',
      description: 'أنا مرشح في الانتخابات وأريد التواصل مع الناخبين وعرض برنامجي',
      icon: Award,
      color: 'orange',
      features: [
        'إنشاء ملف شخصي احترافي للمرشح',
        'نشر البرنامج الانتخابي والرؤية',
        'التواصل المباشر مع الناخبين',
        'إدارة الحملة الانتخابية',
        'نشر الأخبار والفعاليات',
        'استقبال الأسئلة والاستفسارات'
      ]
    },
    {
      id: 'mp' as UserRole,
      name: 'نائب في البرلمان',
      description: 'أنا نائب منتخب وأريد التواصل مع المواطنين في دائرتي وخدمتهم',
      icon: Building,
      color: 'green',
      features: [
        'إدارة الملف الشخصي الرسمي للنائب',
        'استقبال الشكاوى والاقتراحات',
        'نشر التقارير والإنجازات',
        'التواصل المباشر مع المواطنين',
        'إدارة المناسبات والفعاليات',
        'نشر البيانات والمواقف الرسمية'
      ]
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: {
        border: isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 hover:border-blue-400',
        bg: isSelected ? 'bg-blue-50' : 'bg-white hover:bg-blue-50',
        icon: isSelected ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600',
        text: isSelected ? 'text-blue-700' : 'text-gray-900'
      },
      orange: {
        border: isSelected ? 'border-orange-500 ring-2 ring-orange-500' : 'border-gray-300 hover:border-orange-400',
        bg: isSelected ? 'bg-orange-50' : 'bg-white hover:bg-orange-50',
        icon: isSelected ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600',
        text: isSelected ? 'text-orange-700' : 'text-gray-900'
      },
      green: {
        border: isSelected ? 'border-[#004705] ring-2 ring-[#004705]' : 'border-gray-300 hover:border-[#004705]',
        bg: isSelected ? 'bg-green-50' : 'bg-white hover:bg-green-50',
        icon: isSelected ? 'bg-[#004705] text-white' : 'bg-green-100 text-[#004705]',
        text: isSelected ? 'text-[#004705]' : 'text-gray-900'
      }
    };
    return colors[color as keyof typeof colors];
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await updateUserRole({ role: selectedRole });
      
      if (result.success) {
        onRoleSelect(selectedRole);
      } else {
        setError(result.error || 'حدث خطأ أثناء حفظ نوع الحساب');
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          مرحباً بك في منصة نائبك! 🎉
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          {userEmail && `أهلاً ${userEmail}`}
        </p>
        <p className="text-lg text-gray-600">
          لنبدأ بإعداد حسابك. اختر نوع حسابك للحصول على التجربة المناسبة لك:
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Role Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          const colorClasses = getColorClasses(role.color, isSelected);
          
          return (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${colorClasses.border} ${colorClasses.bg}`}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 left-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${colorClasses.icon}`}>
                <Icon className="w-8 h-8" />
              </div>
              
              {/* Content */}
              <h3 className={`text-xl font-bold mb-3 ${colorClasses.text}`}>
                {role.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {role.description}
              </p>
              
              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">ما يمكنك فعله:</h4>
                <ul className="space-y-1">
                  {role.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 ml-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                  {role.features.length > 3 && (
                    <li className="text-xs text-gray-500 italic">
                      +{role.features.length - 3} مميزات أخرى
                    </li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!selectedRole || isLoading}
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#004705] hover:bg-[#003604] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
              جاري الحفظ...
            </>
          ) : (
            <>
              المتابعة
              <ArrowLeft className="w-5 h-5 mr-2" />
            </>
          )}
        </button>
        
        {selectedRole && (
          <p className="mt-3 text-sm text-gray-600">
            اخترت: <span className="font-medium">{roles.find(r => r.id === selectedRole)?.name}</span>
          </p>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-medium text-blue-900 mb-2">💡 لا تقلق!</h3>
          <p className="text-blue-800 text-sm">
            يمكنك تغيير نوع حسابك في أي وقت من إعدادات الحساب. 
            اختر النوع الذي يناسبك الآن وابدأ رحلتك معنا.
          </p>
        </div>
      </div>
    </div>
  );
}
