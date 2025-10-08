'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUpWithEmailAndProfile } from '@/lib/auth';
import { getGovernorates, getCouncils, getParties, getSymbols } from '@/lib/supabase-queries';
import type { Governorate, Council, Party, Symbol } from '@/lib/supabase-queries';
import { User, Users, Crown, Vote, Shield } from 'lucide-react';

export default function EnhancedRegisterForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // البيانات الأساسية
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    whatsapp: '',
    governorateId: 0,
    city: '',
    village: '',
    dob: '',
    gender: '',
    jobTitle: '',
    acceptTerms: false,
    
    // البيانات السياسية
    accountType: 'citizen' as 'citizen' | 'mp' | 'candidate',
    councilId: 0,
    partyId: 0,
    isIndependent: false,
    electoralSymbolId: 0,
    electoralNumber: '',
    district: '',
    committee: '',
  });

  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const [govs, couns, parts, syms] = await Promise.all([
        getGovernorates(),
        getCouncils(),
        getParties(),
        getSymbols(),
      ]);
      
      setGovernorates(govs);
      setCouncils(couns);
      setParties(parts);
      setSymbols(syms);
    }
    fetchData();
  }, []);

  // حساب قوة كلمة المرور
  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  const accountTypes = [
    {
      id: 'citizen',
      title: 'مواطن',
      description: 'للمواطنين الراغبين في التواصل مع النواب والمرشحين',
      icon: User,
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      id: 'candidate',
      title: 'مرشح',
      description: 'للمرشحين لعضوية مجلس النواب أو الشيوخ',
      icon: Vote,
      color: 'bg-green-50 border-green-200 text-green-800',
      iconColor: 'text-green-600'
    },
    {
      id: 'mp',
      title: 'نائب حالي',
      description: 'لأعضاء مجلس النواب أو الشيوخ الحاليين',
      icon: Crown,
      color: 'bg-purple-50 border-purple-200 text-purple-800',
      iconColor: 'text-purple-600'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'governorateId' || name === 'councilId' || name === 'partyId' || name === 'electoralSymbolId') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAccountTypeSelect = (type: 'citizen' | 'mp' | 'candidate') => {
    setFormData((prev) => ({ ...prev, accountType: type }));
    setCurrentStep(2);
  };

  const validateStep = (step: number): boolean => {
    setError('');
    
    if (step === 2) {
      if (!formData.firstName.trim()) {
        setError('يرجى إدخال الاسم الأول');
        return false;
      }
      if (!formData.lastName.trim()) {
        setError('يرجى إدخال الاسم الأخير');
        return false;
      }
      if (!formData.email.trim()) {
        setError('يرجى إدخال البريد الإلكتروني');
        return false;
      }
      if (formData.password.length < 6) {
        setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
        return false;
      }
    }
    
    if (step === 3) {
      if (!formData.phone.trim()) {
        setError('يرجى إدخال رقم الهاتف');
        return false;
      }
      if (!formData.whatsapp.trim()) {
        setError('يرجى إدخال رقم الواتساب');
        return false;
      }
      if (!formData.governorateId || formData.governorateId === 0) {
        setError('يرجى اختيار المحافظة');
        return false;
      }
      if (!formData.city.trim()) {
        setError('يرجى إدخال المدينة');
        return false;
      }
      if (!formData.dob) {
        setError('يرجى إدخال تاريخ الميلاد');
        return false;
      }
      if (!formData.gender) {
        setError('يرجى اختيار الجنس');
        return false;
      }
      if (!formData.jobTitle.trim()) {
        setError('يرجى إدخال الوظيفة');
        return false;
      }
    }
    
    if (step === 4 && formData.accountType !== 'citizen') {
      if (!formData.councilId || formData.councilId === 0) {
        setError('يرجى اختيار المجلس');
        return false;
      }
      if (!formData.isIndependent && (!formData.partyId || formData.partyId === 0)) {
        setError('يرجى اختيار الحزب أو تحديد مستقل');
        return false;
      }
      if (!formData.district.trim()) {
        setError('يرجى إدخال الدائرة الانتخابية');
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      setError('يجب الموافقة على الشروط والأحكام');
      return;
    }

    setIsLoading(true);

    try {
      const { user, error: signUpError } = await signUpWithEmailAndProfile({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        governorateId: formData.governorateId,
        city: formData.city,
        village: formData.village,
        dob: formData.dob,
        gender: formData.gender,
        jobTitle: formData.jobTitle,
        accountType: formData.accountType,
        councilId: formData.councilId || undefined,
        partyId: formData.partyId || undefined,
        isIndependent: formData.isIndependent,
        electoralSymbolId: formData.electoralSymbolId || undefined,
        electoralNumber: formData.electoralNumber || undefined,
        district: formData.district || undefined,
        committee: formData.committee || undefined,
      });

      if (signUpError) {
        setError(signUpError);
        setIsLoading(false);
        return;
      }

      if (user) {
        if (formData.accountType === 'citizen') {
          router.push('/login?registered=true&message=تم إنشاء حسابك بنجاح');
        } else {
          router.push('/login?registered=true&message=تم إنشاء حسابك بنجاح وسيتم مراجعته من قبل الإدارة');
        }
      }
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الحساب');
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-yellow-500';
    if (passwordStrength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'ضعيفة';
    if (passwordStrength <= 2) return 'متوسطة';
    if (passwordStrength <= 3) return 'جيدة';
    return 'قوية';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#004705]">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link
              href="/login"
              className="font-medium text-[#004705] hover:text-[#003604]"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>

        {/* مؤشر التقدم */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-[#004705] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-[#004705]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* الخطوة 1: اختيار نوع الحساب */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-gray-900">
              اختر نوع حسابك
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accountTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleAccountTypeSelect(type.id as any)}
                    className={`p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${type.color} hover:scale-105`}
                  >
                    <div className="text-center">
                      <IconComponent className={`w-12 h-12 mx-auto mb-4 ${type.iconColor}`} />
                      <h4 className="text-lg font-semibold mb-2">{type.title}</h4>
                      <p className="text-sm opacity-80">{type.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* الخطوة 2: البيانات الأساسية */}
        {currentStep === 2 && (
          <form className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-gray-900">
              البيانات الأساسية
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="الاسم الأول *"
                />
              </div>
              <div>
                <input
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="الاسم الأخير *"
                />
              </div>
              <div className="md:col-span-2">
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="البريد الإلكتروني *"
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="كلمة المرور *"
                />
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>قوة كلمة المرور:</span>
                      <span className={`font-medium ${
                        passwordStrength <= 1 ? 'text-red-500' :
                        passwordStrength <= 2 ? 'text-yellow-500' :
                        passwordStrength <= 3 ? 'text-blue-500' : 'text-green-500'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="تأكيد كلمة المرور *"
                />
                {formData.confirmPassword && (
                  <div className="mt-1 text-sm">
                    {formData.password === formData.confirmPassword ? (
                      <span className="text-green-600">✓ كلمة المرور متطابقة</span>
                    ) : (
                      <span className="text-red-600">✗ كلمة المرور غير متطابقة</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                السابق
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-[#004705] text-white rounded-lg hover:bg-[#003604]"
              >
                التالي
              </button>
            </div>
          </form>
        )}

        {/* الخطوة 3: البيانات الشخصية */}
        {currentStep === 3 && (
          <form className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-gray-900">
              البيانات الشخصية
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="رقم الهاتف *"
                />
              </div>
              <div>
                <input
                  name="whatsapp"
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="رقم الواتساب *"
                />
              </div>
              <div>
                <select
                  name="governorateId"
                  required
                  value={formData.governorateId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                >
                  <option value="0">المحافظة *</option>
                  {governorates.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {gov.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="المدينة *"
                />
              </div>
              <div>
                <input
                  name="village"
                  type="text"
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="القرية (اختياري)"
                />
              </div>
              <div>
                <input
                  name="dob"
                  type="date"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                />
              </div>
              <div>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                >
                  <option value="">الجنس *</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              <div>
                <input
                  name="jobTitle"
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="الوظيفة *"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                السابق
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-[#004705] text-white rounded-lg hover:bg-[#003604]"
              >
                {formData.accountType === 'citizen' ? 'إنهاء التسجيل' : 'التالي'}
              </button>
            </div>
          </form>
        )}

        {/* الخطوة 4: البيانات السياسية (للنواب والمرشحين فقط) */}
        {currentStep === 4 && formData.accountType !== 'citizen' && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold text-center text-gray-900">
              البيانات السياسية
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <select
                  name="councilId"
                  required
                  value={formData.councilId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                >
                  <option value="0">المجلس *</option>
                  {councils.map((council) => (
                    <option key={council.id} value={council.id}>
                      {council.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2 flex items-center">
                <input
                  name="isIndependent"
                  type="checkbox"
                  checked={formData.isIndependent}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#004705] focus:ring-[#004705] border-gray-300 rounded"
                />
                <label className="mr-2 text-sm text-gray-700">
                  مستقل (بدون حزب)
                </label>
              </div>

              {!formData.isIndependent && (
                <div className="md:col-span-2">
                  <select
                    name="partyId"
                    required={!formData.isIndependent}
                    value={formData.partyId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  >
                    <option value="0">الحزب *</option>
                    {parties.map((party) => (
                      <option key={party.id} value={party.id}>
                        {party.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <input
                  name="district"
                  type="text"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="الدائرة الانتخابية *"
                />
              </div>

              {formData.accountType === 'candidate' && (
                <>
                  <div>
                    <select
                      name="electoralSymbolId"
                      value={formData.electoralSymbolId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                    >
                      <option value="0">الرمز الانتخابي (اختياري)</option>
                      {symbols.map((symbol) => (
                        <option key={symbol.id} value={symbol.id}>
                          {symbol.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <input
                      name="electoralNumber"
                      type="text"
                      value={formData.electoralNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                      placeholder="الرقم الانتخابي (اختياري)"
                    />
                  </div>
                </>
              )}

              <div>
                <input
                  name="committee"
                  type="text"
                  value={formData.committee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705]"
                  placeholder="اللجنة (اختياري)"
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 text-[#004705] focus:ring-[#004705] border-gray-300 rounded mt-1"
              />
              <label className="mr-2 text-sm text-gray-700">
                أوافق على{' '}
                <Link href="/terms" className="text-[#004705] hover:text-[#003604] font-medium">
                  الشروط والأحكام
                </Link>
                {' '}و{' '}
                <Link href="/privacy" className="text-[#004705] hover:text-[#003604] font-medium">
                  سياسة الخصوصية
                </Link>
              </label>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>ملاحظة:</strong> سيتم مراجعة حسابك من قبل الإدارة قبل التفعيل النهائي.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                السابق
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#004705] text-white rounded-lg hover:bg-[#003604] disabled:opacity-50"
              >
                {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
              </button>
            </div>
          </form>
        )}

        {/* إنهاء التسجيل للمواطنين */}
        {currentStep === 4 && formData.accountType === 'citizen' && (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                إنهاء التسجيل
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <User className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  مرحباً بك كمواطن في منصة نائبك
                </h4>
                <p className="text-green-700">
                  ستتمكن من التواصل مع النواب والمرشحين، إرسال الشكاوى، وتقييم الأداء
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <input
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 text-[#004705] focus:ring-[#004705] border-gray-300 rounded mt-1"
              />
              <label className="mr-2 text-sm text-gray-700">
                أوافق على{' '}
                <Link href="/terms" className="text-[#004705] hover:text-[#003604] font-medium">
                  الشروط والأحكام
                </Link>
                {' '}و{' '}
                <Link href="/privacy" className="text-[#004705] hover:text-[#003604] font-medium">
                  سياسة الخصوصية
                </Link>
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                السابق
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#004705] text-white rounded-lg hover:bg-[#003604] disabled:opacity-50"
              >
                {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
