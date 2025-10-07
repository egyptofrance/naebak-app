'use client';

import React, { useState, useRef } from 'react';

interface CitizenData {
  fullName: string;
  birthDate: string;
  governorate: string;
  district: string;
  village: string;
  phone: string;
  whatsapp: string;
  job: string;
  gender: 'male' | 'female' | '';
  profileImage: File | null;
}

interface Message {
  id: number;
  recipient: string;
  subject: string;
  content: string;
  date: string;
  status: 'sent' | 'read' | 'replied';
}

interface Complaint {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  assignedTo?: string;
}

const governorates = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر', 'البحيرة', 'الفيوم', 'الغربية', 'الإسماعيلية',
  'المنيا', 'المنوفية', 'الوادي الجديد', 'شمال سيناء', 'جنوب سيناء', 'بورسعيد', 'دمياط', 'الشرقية', 'سوهاج',
  'السويس', 'أسوان', 'أسيوط', 'بني سويف', 'كفر الشيخ', 'مطروح', 'الأقصر', 'قنا'
];

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'messages' | 'complaints'>('profile');
  const [citizenData, setCitizenData] = useState<CitizenData>({
    fullName: '',
    birthDate: '',
    governorate: '',
    district: '',
    village: '',
    phone: '',
    whatsapp: '',
    job: '',
    gender: '',
    profileImage: null
  });

  const [messages] = useState<Message[]>([
    {
      id: 1,
      recipient: 'النائب أحمد محمد',
      subject: 'استفسار حول مشروع الطرق',
      content: 'أود الاستفسار عن موعد بدء مشروع تطوير الطرق في منطقتنا...',
      date: '2025-01-15',
      status: 'replied'
    },
    {
      id: 2,
      recipient: 'النائبة فاطمة علي',
      subject: 'مقترح لتحسين الخدمات الصحية',
      content: 'أقترح إنشاء مركز صحي جديد في المنطقة...',
      date: '2025-01-10',
      status: 'read'
    }
  ]);

  const [complaints] = useState<Complaint[]>([
    {
      id: 1,
      title: 'انقطاع المياه المستمر',
      description: 'انقطاع المياه في منطقة الحي الثالث لأكثر من أسبوع',
      category: 'خدمات عامة',
      date: '2025-01-12',
      status: 'in_progress',
      assignedTo: 'النائب محمد أحمد'
    },
    {
      id: 2,
      title: 'تدهور حالة الطرق',
      description: 'الطرق في حالة سيئة جداً وتحتاج إلى إصلاح عاجل',
      category: 'بنية تحتية',
      date: '2025-01-08',
      status: 'resolved',
      assignedTo: 'النائبة سارة محمود'
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCitizenData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCitizenData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // هنا سيتم ربط البيانات بقاعدة البيانات
    console.log('Citizen Data:', citizenData);
    alert('تم حفظ البيانات بنجاح!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent': return 'مُرسل';
      case 'read': return 'مقروء';
      case 'replied': return 'تم الرد';
      case 'pending': return 'قيد الانتظار';
      case 'in_progress': return 'قيد المعالجة';
      case 'resolved': return 'تم الحل';
      case 'rejected': return 'مرفوض';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-[#004705] mb-8">
          لوحة تحكم المواطن
        </h1>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-[#004705] text-white border-b-2 border-[#004705]'
                  : 'text-gray-600 hover:text-[#004705] hover:bg-gray-50'
              }`}
            >
              البيانات الشخصية
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                activeTab === 'messages'
                  ? 'bg-[#004705] text-white border-b-2 border-[#004705]'
                  : 'text-gray-600 hover:text-[#004705] hover:bg-gray-50'
              }`}
            >
              إدارة الرسائل
            </button>
            <button
              onClick={() => setActiveTab('complaints')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                activeTab === 'complaints'
                  ? 'bg-[#004705] text-white border-b-2 border-[#004705]'
                  : 'text-gray-600 hover:text-[#004705] hover:bg-gray-50'
              }`}
            >
              إدارة الشكاوى
            </button>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#004705] mb-6">البيانات الشخصية</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-[#004705]">
                    {citizenData.profileImage ? (
                      <img
                        src={URL.createObjectURL(citizenData.profileImage)}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-[#FF8C00] text-white p-2 rounded-full hover:bg-[#FF7700] transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <p className="text-sm text-gray-600 mt-2">اضغط لرفع صورة شخصية</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={citizenData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                    placeholder="أدخل الاسم الكامل"
                  />
                </div>

                {/* Birth Date */}
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                    تاريخ الميلاد *
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={citizenData.birthDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Governorate */}
                <div>
                  <label htmlFor="governorate" className="block text-sm font-medium text-gray-700 mb-2">
                    المحافظة *
                  </label>
                  <select
                    id="governorate"
                    name="governorate"
                    value={citizenData.governorate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">اختر المحافظة</option>
                    {governorates.map(gov => (
                      <option key={gov} value={gov}>{gov}</option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                    الحي / المدينة / المركز *
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={citizenData.district}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                    placeholder="أدخل الحي أو المدينة أو المركز"
                  />
                </div>

                {/* Village */}
                <div>
                  <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-2">
                    القرية (إن وجدت)
                  </label>
                  <input
                    type="text"
                    id="village"
                    name="village"
                    value={citizenData.village}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                    placeholder="أدخل اسم القرية (اختياري)"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    رقم التليفون *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={citizenData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                    placeholder="01xxxxxxxxx"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الواتساب
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={citizenData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                    placeholder="01xxxxxxxxx"
                  />
                </div>

                {/* Job */}
                <div>
                  <label htmlFor="job" className="block text-sm font-medium text-gray-700 mb-2">
                    الوظيفة *
                  </label>
                  <input
                    type="text"
                    id="job"
                    name="job"
                    value={citizenData.job}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent transition-all duration-200"
                    placeholder="أدخل الوظيفة"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">الجنس *</label>
                <div className="flex space-x-6 space-x-reverse">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={citizenData.gender === 'male'}
                      onChange={handleInputChange}
                      className="ml-2 w-4 h-4 text-[#004705] focus:ring-[#004705]"
                    />
                    ذكر
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={citizenData.gender === 'female'}
                      onChange={handleInputChange}
                      className="ml-2 w-4 h-4 text-[#004705] focus:ring-[#004705]"
                    />
                    أنثى
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-[#004705] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#006607] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  حفظ البيانات
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#004705]">إدارة الرسائل</h2>
              <button className="bg-[#004705] text-white px-6 py-2 rounded-lg hover:bg-[#006607] transition-colors duration-200">
                رسالة جديدة
              </button>
            </div>

            <div className="space-y-4">
              {messages.map(message => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{message.subject}</h3>
                      <p className="text-sm text-gray-600">إلى: {message.recipient}</p>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(message.status)}`}>
                        {getStatusText(message.status)}
                      </span>
                      <span className="text-sm text-gray-500">{message.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{message.content}</p>
                  <div className="mt-4 flex space-x-3 space-x-reverse">
                    <button className="text-[#004705] hover:text-[#006607] font-medium">عرض</button>
                    <button className="text-gray-600 hover:text-gray-800 font-medium">تعديل</button>
                    <button className="text-red-600 hover:text-red-800 font-medium">حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complaints Tab */}
        {activeTab === 'complaints' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#004705]">إدارة الشكاوى</h2>
              <button className="bg-[#004705] text-white px-6 py-2 rounded-lg hover:bg-[#006607] transition-colors duration-200">
                شكوى جديدة
              </button>
            </div>

            <div className="space-y-4">
              {complaints.map(complaint => (
                <div key={complaint.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{complaint.title}</h3>
                      <p className="text-sm text-gray-600">الفئة: {complaint.category}</p>
                      {complaint.assignedTo && (
                        <p className="text-sm text-gray-600">مُسند إلى: {complaint.assignedTo}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                        {getStatusText(complaint.status)}
                      </span>
                      <span className="text-sm text-gray-500">{complaint.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{complaint.description}</p>
                  <div className="mt-4 flex space-x-3 space-x-reverse">
                    <button className="text-[#004705] hover:text-[#006607] font-medium">عرض التفاصيل</button>
                    <button className="text-gray-600 hover:text-gray-800 font-medium">متابعة</button>
                    {complaint.status === 'pending' && (
                      <button className="text-red-600 hover:text-red-800 font-medium">إلغاء</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
