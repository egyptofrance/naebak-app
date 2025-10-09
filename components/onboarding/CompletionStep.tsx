'use client';

import { CheckCircle, Users, Award, Building, ArrowLeft, Home, Clock, AlertCircle } from 'lucide-react';

type UserRole = 'citizen' | 'candidate' | 'mp';

interface CompletionStepProps {
  selectedRole: UserRole | null;
  onComplete: () => void;
}

export default function CompletionStep({ selectedRole, onComplete }: CompletionStepProps) {
  const requiresApproval = selectedRole === 'candidate' || selectedRole === 'mp';
  
  const getRoleInfo = () => {
    switch (selectedRole) {
      case 'citizen':
        return {
          name: 'مواطن عادي',
          icon: Users,
          color: 'blue',
          message: 'أهلاً بك في منصة نائبك! يمكنك الآن التواصل مع نوابك ومرشحيك وتقديم الشكاوى والاقتراحات.',
          features: [
            'تقديم الشكاوى والاقتراحات',
            'التواصل مع النواب والمرشحين',
            'متابعة أخبار دائرتك',
            'المشاركة في الاستطلاعات'
          ]
        };
      case 'candidate':
        return {
          name: 'مرشح للانتخابات',
          icon: Award,
          color: 'orange',
          message: 'مرحباً بك في منصة نائبك! يمكنك الآن إدارة حملتك الانتخابية والتواصل مع الناخبين.',
          features: [
            'إدارة الحملة الانتخابية',
            'نشر البرنامج الانتخابي',
            'التواصل مع الناخبين',
            'إدارة الفعاليات والمناسبات'
          ]
        };
      case 'mp':
        return {
          name: 'نائب في البرلمان',
          icon: Building,
          color: 'green',
          message: 'أهلاً بك في منصة نائبك! يمكنك الآن خدمة مواطني دائرتك والتواصل معهم بفعالية.',
          features: [
            'استقبال الشكاوى والاقتراحات',
            'نشر التقارير والإنجازات',
            'إدارة المناسبات والفعاليات',
            'التواصل مع المواطنين'
          ]
        };
      default:
        return {
          name: 'مستخدم',
          icon: Users,
          color: 'gray',
          message: 'مرحباً بك في منصة نائبك!',
          features: []
        };
    }
  };

  const roleInfo = getRoleInfo();
  const Icon = roleInfo.icon;

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
        button: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-[#004705]',
        border: 'border-green-200',
        button: 'bg-[#004705] hover:bg-[#003604] focus:ring-[#004705]'
      },
      gray: {
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        border: 'border-gray-200',
        button: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
      }
    };
    return colors[color as keyof typeof colors];
  };

  const colorClasses = getColorClasses(roleInfo.color);

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Animation */}
      <div className="mb-8">
        <div className="relative">
          <div className={`w-24 h-24 ${colorClasses.bg} rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse`}>
            <Icon className={`w-12 h-12 ${colorClasses.text}`} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {requiresApproval ? '📋 تم إرسال طلبك بنجاح!' : '🎉 تم إعداد حسابك بنجاح!'}
        </h1>
        <div className={`inline-flex items-center px-4 py-2 rounded-full ${colorClasses.bg} ${colorClasses.border} border mb-4`}>
          <Icon className={`w-5 h-5 ${colorClasses.text} ml-2`} />
          <span className={`font-medium ${colorClasses.text}`}>
            {roleInfo.name}
          </span>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          {requiresApproval ? 
            `طلبك كـ${roleInfo.name} قيد المراجعة من قبل فريق الإدارة. سيتم التواصل معك خلال 24-48 ساعة.` : 
            roleInfo.message
          }
        </p>
      </div>

      {/* Features */}
      {roleInfo.features.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ما يمكنك فعله الآن:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roleInfo.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full ml-3 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="mb-8">
        {requiresApproval ? (
          <div className="space-y-4">
            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-yellow-600 ml-2" />
                <h3 className="text-lg font-medium text-yellow-900">
                  ⏳ في انتظار الموافقة
                </h3>
              </div>
              <div className="text-yellow-800 text-sm space-y-2">
                <p>• سيتم مراجعة طلبك خلال 24-48 ساعة</p>
                <p>• ستتلقى إشعاراً عبر البريد الإلكتروني بالنتيجة</p>
                <p>• يمكنك تسجيل الدخول لمتابعة حالة الطلب</p>
                <p>• في حالة الحاجة لمعلومات إضافية، سنتواصل معك</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <div className="flex items-center mb-3">
                <AlertCircle className="w-5 h-5 text-blue-600 ml-2" />
                <h3 className="text-lg font-medium text-blue-900">
                  📋 متطلبات المراجعة
                </h3>
              </div>
              <div className="text-blue-800 text-sm space-y-2">
                {selectedRole === 'candidate' && (
                  <>
                    <p>• التحقق من صحة البيانات الانتخابية</p>
                    <p>• مراجعة الوثائق المطلوبة</p>
                    <p>• التأكد من أهلية الترشح</p>
                  </>
                )}
                {selectedRole === 'mp' && (
                  <>
                    <p>• التحقق من عضوية البرلمان</p>
                    <p>• مراجعة الوثائق الرسمية</p>
                    <p>• التأكد من صحة البيانات</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-3">
              💡 الخطوات التالية
            </h3>
            <div className="text-blue-800 text-sm space-y-2">
              <p>• استكشف المنصة وتعرف على مميزاتها</p>
              <p>• يمكنك تعديل بياناتك في أي وقت من إعدادات الحساب</p>
              <p>• ابدأ في استخدام المنصة للتواصل والمشاركة</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={onComplete}
          className={`w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white ${colorClasses.button} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
        >
          {requiresApproval ? (
            <>
              <Clock className="w-6 h-6 ml-2" />
              متابعة حالة الطلب
            </>
          ) : (
            <>
              <Home className="w-6 h-6 ml-2" />
              الذهاب للصفحة الرئيسية
            </>
          )}
        </button>
        
        {(selectedRole === 'candidate' || selectedRole === 'mp') && (
          <button
            onClick={() => window.location.href = '/profile'}
            className="w-full inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            إكمال الملف الشخصي
            <ArrowLeft className="w-5 h-5 mr-2" />
          </button>
        )}
      </div>

      {/* Welcome Message */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            مرحباً بك في عائلة نائبك! 🤝
          </h3>
          <p className="text-gray-600 text-sm">
            نحن سعداء بانضمامك إلينا. معاً نبني جسور التواصل بين المواطنين ونوابهم 
            لخدمة مصر وتطويرها نحو الأفضل.
          </p>
        </div>
      </div>
    </div>
  );
}
