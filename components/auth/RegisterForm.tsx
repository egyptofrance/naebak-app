'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUpWithEmail, getGovernorates } from '@/lib/auth';

interface Governorate {
  id: number;
  name: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
  });

  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGovernorates() {
      const { governorates: data, error } = await getGovernorates();
      if (!error && data) {
        setGovernorates(data);
      }
    }
    fetchGovernorates();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
      return;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (!formData.acceptTerms) {
      setError('يجب الموافقة على الشروط والأحكام');
      return;
    }

    if (!formData.governorateId || formData.governorateId === 0) {
      setError('يرجى اختيار المحافظة');
      return;
    }

    setIsLoading(true);

    try {
      const { user, error: signUpError } = await signUpWithEmail({
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
      });

      if (signUpError) {
        setError(signUpError);
        setIsLoading(false);
        return;
      }

      if (user) {
        // Redirect to login page with success message
        router.push('/login?registered=true');
      }
    } catch (err) {
      setError('حدث خطأ أثناء إنشاء الحساب');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-[#004705]">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link
              href="/login"
              className="font-medium text-[#004705] hover:text-[#003604]"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* الاسم الأول */}
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="الاسم الأول *"
              />
            </div>

            {/* الاسم الأخير */}
            <div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="الاسم الأخير *"
              />
            </div>

            {/* البريد الإلكتروني */}
            <div className="md:col-span-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="البريد الإلكتروني *"
              />
            </div>

            {/* كلمة المرور */}
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="كلمة المرور *"
              />
            </div>

            {/* تأكيد كلمة المرور */}
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="تأكيد كلمة المرور *"
              />
            </div>

            {/* رقم الهاتف */}
            <div>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="رقم الهاتف *"
              />
            </div>

            {/* رقم الواتساب */}
            <div>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="رقم الواتساب *"
              />
            </div>

            {/* المحافظة */}
            <div>
              <select
                id="governorateId"
                name="governorateId"
                required
                value={formData.governorateId}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
              >
                <option value="0">المحافظة *</option>
                {governorates.map((gov) => (
                  <option key={gov.id} value={gov.id}>
                    {gov.name}
                  </option>
                ))}
              </select>
            </div>

            {/* المدينة */}
            <div>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="المدينة *"
              />
            </div>

            {/* القرية */}
            <div>
              <input
                id="village"
                name="village"
                type="text"
                value={formData.village}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="القرية (اختياري)"
              />
            </div>

            {/* تاريخ الميلاد */}
            <div>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={formData.dob}
                onChange={handleChange}
                placeholder="تاريخ الميلاد *"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
              />
            </div>

            {/* الجنس */}
            <div>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
              >
                <option value="">الجنس *</option>
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>

            {/* الوظيفة */}
            <div>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                required
                value={formData.jobTitle}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#004705] focus:border-[#004705] sm:text-sm"
                placeholder="الوظيفة *"
              />
            </div>
          </div>

          {/* الموافقة على الشروط */}
          <div className="flex items-start">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 text-[#004705] focus:ring-[#004705] border-gray-300 rounded mt-1"
            />
            <label htmlFor="acceptTerms" className="mr-2 block text-sm text-gray-700">
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

          {/* زر التسجيل */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#004705] hover:bg-[#003604] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004705] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  جاري إنشاء الحساب...
                </span>
              ) : (
                'إنشاء حساب'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
