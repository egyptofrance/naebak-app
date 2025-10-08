'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth';

interface Governorate {
  id: number;
  name: string;
}

interface Council {
  id: number;
  name: string;
}

interface Party {
  id: number;
  name: string;
}

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // بيانات أساسية
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    whatsapp: '',
    
    // بيانات شخصية
    governorateId: '',
    city: '',
    village: '',
    dob: '',
    gender: '',
    jobTitle: '',
    
    // نوع الحساب
    accountType: 'citizen' as 'citizen' | 'mp' | 'candidate',
    
    // بيانات إضافية للمرشحين والنواب
    councilId: '',
    partyId: '',
    isIndependent: false,
    electoralNumber: '',
    district: '',
    committee: ''
  });

  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // تحميل البيانات من قاعدة البيانات
  useEffect(() => {
    // هنا يمكن إضافة استدعاءات API لتحميل المحافظات والمجالس والأحزاب
    // مؤقتاً سنستخدم بيانات وهمية
    setGovernorates([
      { id: 1, name: 'القاهرة' },
      { id: 2, name: 'الجيزة' },
      { id: 3, name: 'الإسكندرية' },
      // يمكن إضافة باقي المحافظات
    ]);

    setCouncils([
      { id: 1, name: 'مجلس النواب' },
      { id: 2, name: 'مجلس الشيوخ' }
    ]);

    setParties([
      { id: 1, name: 'مستقل' },
      { id: 2, name: 'حزب الوفد' },
      { id: 3, name: 'حزب المصريين الأحرار' },
      // يمكن إضافة باقي الأحزاب
    ]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        return !!(formData.password && formData.confirmPassword && formData.password === formData.confirmPassword);
      case 3:
        return !!(formData.governorateId && formData.city && formData.dob && formData.gender);
      case 4:
        if (formData.accountType === 'citizen') return true;
        return !!(formData.councilId && (formData.partyId || formData.isIndependent));
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      setError('');
    } else {
      setError('يرجى ملء جميع الحقول المطلوبة');
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setLoading(true);
    setError('');

    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      governorate_id: parseInt(formData.governorateId),
      city: formData.city,
      village: formData.village,
      dob: formData.dob,
      gender: formData.gender,
      job_title: formData.jobTitle,
      account_type: formData.accountType,
      council_id: formData.councilId ? parseInt(formData.councilId) : null,
      party_id: formData.partyId ? parseInt(formData.partyId) : null,
      is_independent: formData.isIndependent,
      electoral_number: formData.electoralNumber,
      district: formData.district,
      committee: formData.committee
    };

    const result = await signUp(formData.email, formData.password, userData);

    if (result.success) {
      setSuccess('تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      setError(result.error || 'حدث خطأ أثناء إنشاء الحساب');
    }

    setLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">البيانات الأساسية</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأول *
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الأخير *
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني *
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الواتساب
                </label>
                <input
                  name="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">كلمة المرور</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور *
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">يجب أن تكون 6 أحرف على الأقل</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تأكيد كلمة المرور *
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-red-500 text-sm">كلمات المرور غير متطابقة</p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">البيانات الشخصية</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المحافظة *
              </label>
              <select
                name="governorateId"
                required
                value={formData.governorateId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">اختر المحافظة</option>
                {governorates.map((gov) => (
                  <option key={gov.id} value={gov.id}>{gov.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المدينة *
                </label>
                <input
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  القرية/الحي
                </label>
                <input
                  name="village"
                  type="text"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ الميلاد *
                </label>
                <input
                  name="dob"
                  type="date"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الجنس *
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">اختر الجنس</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المهنة
              </label>
              <input
                name="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">نوع الحساب</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نوع الحساب *
              </label>
              <select
                name="accountType"
                required
                value={formData.accountType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="citizen">مواطن</option>
                <option value="mp">نائب حالي</option>
                <option value="candidate">مرشح</option>
              </select>
            </div>

            {(formData.accountType === 'mp' || formData.accountType === 'candidate') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نوع المجلس *
                  </label>
                  <select
                    name="councilId"
                    required
                    value={formData.councilId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">اختر نوع المجلس</option>
                    {councils.map((council) => (
                      <option key={council.id} value={council.id}>{council.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      name="isIndependent"
                      type="checkbox"
                      checked={formData.isIndependent}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">مستقل</span>
                  </label>
                </div>

                {!formData.isIndependent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الحزب *
                    </label>
                    <select
                      name="partyId"
                      required={!formData.isIndependent}
                      value={formData.partyId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">اختر الحزب</option>
                      {parties.map((party) => (
                        <option key={party.id} value={party.id}>{party.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الرقم الانتخابي
                    </label>
                    <input
                      name="electoralNumber"
                      type="text"
                      value={formData.electoralNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الدائرة الانتخابية
                    </label>
                    <input
                      name="district"
                      type="text"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اللجنة
                  </label>
                  <input
                    name="committee"
                    type="text"
                    value={formData.committee}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            انضم إلى منصة نائبك
          </p>
        </div>

        {/* مؤشر التقدم */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 space-x-reverse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {renderStep()}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                السابق
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-auto"
              >
                التالي
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 ml-auto"
              >
                {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
              </button>
            )}
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <a href="/login" className="font-medium text-green-600 hover:text-green-500">
                تسجيل الدخول
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
