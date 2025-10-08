'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithEmailAndProfile } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

interface Governorate {
  id: number;
  name: string;
}

interface Council {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

interface Party {
  id: number;
  name: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // البيانات من قاعدة البيانات
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  
  // بيانات النموذج
  const [formData, setFormData] = useState({
    // البيانات الأساسية
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // نوع الحساب
    accountType: '',
    
    // البيانات الشخصية
    gender: '',
    birthDate: '',
    nationalId: '',
    governorateId: '',
    address: '',
    
    // بيانات المرشح/النائب
    councilId: '',
    partyId: '',
    biography: '',
    education: '',
    experience: '',
    promises: '',
    
    // الموافقة على الشروط
    agreeToTerms: false
  });

  // تحميل البيانات من قاعدة البيانات
  useEffect(() => {
    loadDatabaseData();
  }, []);

  const loadDatabaseData = async () => {
    try {
      // تحميل المحافظات
      const { data: governoratesData, error: govError } = await supabase
        .from('governorates')
        .select('id, name')
        .order('name');
      
      if (govError) throw govError;
      setGovernorates(governoratesData || []);

      // تحميل المجالس
      const { data: councilsData, error: councilsError } = await supabase
        .from('councils')
        .select('id, name')
        .order('id');
      
      if (councilsError) throw councilsError;
      setCouncils(councilsData || []);

      // تحميل أنواع الحسابات (فقط المسموح للمستخدمين)
      const { data: rolesData, error: rolesError } = await supabase
        .from('roles')
        .select('id, name')
        .in('name', ['citizen', 'candidate', 'mp'])
        .order('id');
      
      if (rolesError) throw rolesError;
      setRoles(rolesData || []);

      // تحميل الأحزاب
      const { data: partiesData, error: partiesError } = await supabase
        .from('parties')
        .select('id, name')
        .order('name');
      
      if (partiesError) throw partiesError;
      setParties(partiesData || []);

    } catch (error) {
      console.error('Error loading database data:', error);
      setError('حدث خطأ في تحميل البيانات');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (step: number): boolean => {
    console.log('Validating step:', step, 'FormData:', formData);
    
    switch (step) {
      case 1:
        const step1Valid = !!(formData.firstName && formData.lastName && formData.email && 
                 formData.password && formData.confirmPassword && formData.phone);
        console.log('Step 1 validation:', step1Valid);
        return step1Valid;
      case 2:
        const step2Valid = !!formData.accountType;
        console.log('Step 2 validation:', step2Valid, 'accountType:', formData.accountType);
        return step2Valid;
      case 3:
        const step3Valid = !!(formData.gender && formData.birthDate && formData.nationalId && 
                 formData.governorateId && formData.address);
        console.log('Step 3 validation:', step3Valid, {
          gender: formData.gender,
          birthDate: formData.birthDate,
          nationalId: formData.nationalId,
          governorateId: formData.governorateId,
          address: formData.address
        });
        return step3Valid;
      case 4:
        if (formData.accountType === 'candidate' || formData.accountType === 'mp') {
          return !!(formData.councilId && formData.partyId && formData.biography);
        }
        return formData.agreeToTerms;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      setError('');
    } else {
      setError('يرجى ملء جميع الحقول المطلوبة');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      setError('يرجى ملء جميع الحقول المطلوبة والموافقة على الشروط');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await signUpWithEmailAndProfile({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        accountType: formData.accountType,
        gender: formData.gender,
        birthDate: formData.birthDate,
        nationalId: formData.nationalId,
        governorateId: parseInt(formData.governorateId),
        address: formData.address,
        councilId: formData.councilId ? parseInt(formData.councilId) : null,
        partyId: formData.partyId ? parseInt(formData.partyId) : null,
        biography: formData.biography,
        education: formData.education,
        experience: formData.experience,
        promises: formData.promises
      });

      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'حدث خطأ في إنشاء الحساب');
      }
    } catch (error: any) {
      setError(error.message || 'حدث خطأ في إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'citizen': return 'مواطن';
      case 'candidate': return 'مرشح';
      case 'mp': return 'نائب حالي';
      default: return type;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'البيانات الأساسية';
      case 2: return 'نوع الحساب';
      case 3: return 'البيانات الشخصية';
      case 4: return formData.accountType === 'citizen' ? 'إنهاء التسجيل' : 'البيانات المهنية';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-red-600 text-white p-6">
          <h2 className="text-3xl font-bold text-center mb-4">إنشاء حساب جديد</h2>
          <p className="text-center opacity-90">انضم إلى منصة نائبك</p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step <= currentStep
                      ? 'bg-white text-green-600'
                      : 'bg-green-200 text-green-600'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {getStepTitle()}
          </h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الأول *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="أدخل الاسم الأول"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الأخير *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="أدخل الاسم الأخير"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="أدخل البريد الإلكتروني"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="أدخل رقم الهاتف"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      كلمة المرور *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="أدخل كلمة المرور"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تأكيد كلمة المرور *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="أعد إدخال كلمة المرور"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Account Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <p className="text-gray-600 text-center mb-6">
                  اختر نوع الحساب الذي يناسبك
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className={`relative cursor-pointer rounded-xl border-2 p-6 text-center transition-all ${
                        formData.accountType === role.name
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, accountType: role.name }))}
                    >
                      <input
                        type="radio"
                        name="accountType"
                        value={role.name}
                        checked={formData.accountType === role.name}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      
                      <div className="text-4xl mb-3">
                        {role.name === 'citizen' && '👤'}
                        {role.name === 'candidate' && '🗳️'}
                        {role.name === 'mp' && '🏛️'}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {getAccountTypeLabel(role.name)}
                      </h3>
                      
                      <p className="text-sm text-gray-600">
                        {role.name === 'citizen' && 'للمواطنين الراغبين في التواصل مع النواب'}
                        {role.name === 'candidate' && 'للمرشحين في الانتخابات'}
                        {role.name === 'mp' && 'لأعضاء مجلسي النواب والشيوخ'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Personal Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الجنس *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">اختر الجنس</option>
                      <option value="male">ذكر</option>
                      <option value="female">أنثى</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ الميلاد *
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الرقم القومي *
                  </label>
                  <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="أدخل الرقم القومي"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المحافظة *
                  </label>
                  <select
                    name="governorateId"
                    value={formData.governorateId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">اختر المحافظة</option>
                    {governorates.map((gov) => (
                      <option key={gov.id} value={gov.id}>
                        {gov.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="أدخل العنوان التفصيلي"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: Professional Information or Final Step */}
            {currentStep === 4 && (
              <div className="space-y-4">
                {(formData.accountType === 'candidate' || formData.accountType === 'mp') ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          نوع المجلس *
                        </label>
                        <select
                          name="councilId"
                          value={formData.councilId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        >
                          <option value="">اختر المجلس</option>
                          {councils.map((council) => (
                            <option key={council.id} value={council.id}>
                              {council.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الحزب السياسي *
                        </label>
                        <select
                          name="partyId"
                          value={formData.partyId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        >
                          <option value="">اختر الحزب</option>
                          {parties.map((party) => (
                            <option key={party.id} value={party.id}>
                              {party.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        السيرة الذاتية *
                      </label>
                      <textarea
                        name="biography"
                        value={formData.biography}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="اكتب نبذة عن سيرتك الذاتية"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المؤهلات التعليمية
                      </label>
                      <textarea
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="اذكر مؤهلاتك التعليمية"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الخبرات المهنية
                      </label>
                      <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="اذكر خبراتك المهنية"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الوعود الانتخابية
                      </label>
                      <textarea
                        name="promises"
                        value={formData.promises}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="اذكر وعودك للناخبين"
                      />
                    </div>
                  </>
                ) : null}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    required
                  />
                  <label className="mr-2 block text-sm text-gray-900">
                    أوافق على{' '}
                    <a href="/terms" className="text-green-600 hover:text-green-500">
                      الشروط والأحكام
                    </a>{' '}
                    و{' '}
                    <a href="/privacy" className="text-green-600 hover:text-green-500">
                      سياسة الخصوصية
                    </a>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  السابق
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-auto"
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 mr-auto"
                >
                  {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
