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
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200 peer placeholder-transparent"
                    placeholder="الاسم الكامل"
                  />
                  <label 
                    htmlFor="name" 
                    className={`absolute right-4 transition-all duration-200 pointer-events-none ${
                      formData.name 
                        ? 'text-sm text-[#004705] -top-2 bg-white px-2' 
                        : 'text-gray-500 top-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#004705] peer-focus:bg-white peer-focus:px-2'
                    }`}
                  >
                    الاسم الكامل *
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200 peer placeholder-transparent"
                    placeholder="البريد الإلكتروني"
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute right-4 transition-all duration-200 pointer-events-none ${
                      formData.email 
                        ? 'text-sm text-[#004705] -top-2 bg-white px-2' 
                        : 'text-gray-500 top-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#004705] peer-focus:bg-white peer-focus:px-2'
                    }`}
                  >
                    البريد الإلكتروني *
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200 peer placeholder-transparent"
                    placeholder="رقم الهاتف"
                  />
                  <label 
                    htmlFor="phone" 
                    className={`absolute right-4 transition-all duration-200 pointer-events-none ${
                      formData.phone 
                        ? 'text-sm text-[#004705] -top-2 bg-white px-2' 
                        : 'text-gray-500 top-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#004705] peer-focus:bg-white peer-focus:px-2'
                    }`}
                  >
                    رقم الهاتف
                  </label>
                </div>

                <div className="relative">
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

              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200 peer placeholder-transparent"
                  placeholder="موضوع الرسالة"
                />
                <label 
                  htmlFor="subject" 
                  className={`absolute right-4 transition-all duration-200 pointer-events-none ${
                    formData.subject 
                      ? 'text-sm text-[#004705] -top-2 bg-white px-2' 
                      : 'text-gray-500 top-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#004705] peer-focus:bg-white peer-focus:px-2'
                  }`}
                >
                  موضوع الرسالة *
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200 resize-vertical peer placeholder-transparent"
                  placeholder="الرسالة"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className={`absolute right-4 transition-all duration-200 pointer-events-none ${
                    formData.message 
                      ? 'text-sm text-[#004705] -top-2 bg-white px-2' 
                      : 'text-gray-500 top-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-[#004705] peer-focus:bg-white peer-focus:px-2'
                  }`}
                >
                  الرسالة *
                </label>
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
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <div className="space-y-8">
              <div className="text-center border-b border-gray-200 pb-6">
                <h3 className="text-2xl font-bold text-[#004705] mb-2">البريد الإلكتروني</h3>
                <p className="text-lg text-gray-700">info@naebak.com</p>
                <p className="text-lg text-gray-700">support@naebak.com</p>
              </div>

              <div className="text-center border-b border-gray-200 pb-6">
                <h3 className="text-2xl font-bold text-[#004705] mb-2">الهاتف</h3>
                <p className="text-lg text-gray-700">+20 123 456 7890</p>
                <p className="text-lg text-gray-700">+20 987 654 3210</p>
              </div>

              <div className="text-center border-b border-gray-200 pb-6">
                <h3 className="text-2xl font-bold text-[#004705] mb-2">العنوان</h3>
                <p className="text-lg text-gray-700">القاهرة، مصر</p>
                <p className="text-lg text-gray-700">مدينة نصر</p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#004705] mb-2">ساعات العمل</h3>
                <p className="text-lg text-gray-700">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                <p className="text-lg text-gray-700">الجمعة - السبت: 10:00 ص - 4:00 م</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
