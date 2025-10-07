'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال النموذج
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-extrabold text-center text-[#004705] mb-12 leading-tight">
          اتصل بنا
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 mb-12">
          <p className="text-xl leading-relaxed text-gray-700 text-center">
            نحن هنا لمساعدتك! تواصل معنا في أي وقت وسنكون سعداء للإجابة على استفساراتك ومساعدتك في استخدام منصة نائبك بأفضل طريقة ممكنة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* نموذج الاتصال */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
              <span className="text-4xl text-[#FF8C00] mr-4">📝</span>
              أرسل لنا رسالة
            </h2>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <p className="text-green-800 font-semibold">
                  ✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="text-red-800 font-semibold">
                  ❌ حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-[#004705] mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-[#004705] mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-lg font-semibold text-[#004705] mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                    placeholder="+20 123 456 7890"
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-lg font-semibold text-[#004705] mb-2">
                    نوع الاستفسار *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                  >
                    <option value="general">استفسار عام</option>
                    <option value="technical">مشكلة تقنية</option>
                    <option value="complaint">شكوى</option>
                    <option value="suggestion">اقتراح</option>
                    <option value="partnership">شراكة</option>
                    <option value="media">استفسار إعلامي</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-lg font-semibold text-[#004705] mb-2">
                  موضوع الرسالة *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                  placeholder="اكتب موضوع رسالتك"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold text-[#004705] mb-2">
                  الرسالة *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200 resize-vertical"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#004705] hover:bg-[#006607] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري الإرسال...
                  </span>
                ) : (
                  'إرسال الرسالة'
                )}
              </button>
            </form>
          </div>

          {/* معلومات الاتصال */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
                <span className="text-4xl text-[#FF8C00] mr-4">📍</span>
                معلومات الاتصال
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="text-3xl text-[#FF8C00]">📧</div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#004705] mb-2">البريد الإلكتروني</h3>
                    <p className="text-lg text-gray-700">info@naebak.com</p>
                    <p className="text-lg text-gray-700">support@naebak.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="text-3xl text-[#FF8C00]">📞</div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#004705] mb-2">الهاتف</h3>
                    <p className="text-lg text-gray-700">+20 123 456 7890</p>
                    <p className="text-lg text-gray-700">+20 987 654 3210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="text-3xl text-[#FF8C00]">🏢</div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#004705] mb-2">العنوان</h3>
                    <p className="text-lg text-gray-700">القاهرة، مصر</p>
                    <p className="text-lg text-gray-700">مدينة نصر</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="text-3xl text-[#FF8C00]">⏰</div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#004705] mb-2">ساعات العمل</h3>
                    <p className="text-lg text-gray-700">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                    <p className="text-lg text-gray-700">الجمعة - السبت: 10:00 ص - 4:00 م</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-[#004705] mb-6 flex items-center">
                <span className="text-4xl text-[#FF8C00] mr-4">🚀</span>
                الدعم السريع
              </h2>
              
              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">المشاكل التقنية</h3>
                  <p className="text-lg text-green-700">
                    للحصول على مساعدة فورية في المشاكل التقنية، تواصل معنا عبر البريد الإلكتروني أو الهاتف.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">الاستفسارات العامة</h3>
                  <p className="text-lg text-blue-700">
                    لأي استفسارات حول كيفية استخدام المنصة أو خدماتنا، نحن هنا لمساعدتك.
                  </p>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">الشراكات والتعاون</h3>
                  <p className="text-lg text-purple-700">
                    مهتم بالشراكة معنا؟ تواصل معنا لمناقشة فرص التعاون المختلفة.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#004705] text-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <span className="text-4xl text-[#FF8C00] mr-4">💬</span>
                تابعنا على وسائل التواصل
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-4 rounded-lg transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">📘</div>
                  <p className="font-semibold">فيسبوك</p>
                </a>
                <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-4 rounded-lg transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">🐦</div>
                  <p className="font-semibold">تويتر</p>
                </a>
                <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-4 rounded-lg transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">📷</div>
                  <p className="font-semibold">إنستغرام</p>
                </a>
                <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-4 rounded-lg transition-all duration-200 text-center">
                  <div className="text-2xl mb-2">💼</div>
                  <p className="font-semibold">لينكد إن</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
