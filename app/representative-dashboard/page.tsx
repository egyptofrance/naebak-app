
'use client';

import React, { useState, useRef, useEffect } from 'react';
import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/SelectField';
import RadioGroup from '@/components/ui/RadioGroup';
import ImageUpload from '@/components/ui/ImageUpload';
import BannerUpload from '@/components/ui/BannerUpload';
import StarRating from '@/components/ui/StarRating';
import TextArea from '@/components/ui/TextArea';
import MessageCard from '@/components/ui/MessageCard';
import ComplaintCard from '@/components/ui/ComplaintCard';
import {
  GOVERNORATES,
  REPRESENTATIVE_POSITIONS,
  COUNCIL_TYPES,
  MOCK_PARTIES,
  MOCK_PARLIAMENTARY_COMMITTEES,
  GENDERS,
  Complaint,
  Message,
  RepresentativeRegistrationData,
} from '@/lib/database-types';

interface RepresentativeData extends RepresentativeRegistrationData {
  profileImage: File | null;
  bannerImage: File | null;
}

export default function RepresentativeDashboard() {
  const [activeTab, setActiveTab] = useState<'profile' | 'messages' | 'complaints' | 'ratings'>('profile');
  const [repData, setRepData] = useState<RepresentativeData>({
    fullName: '',
    slug: '',
    position: '' as any, // Will be set by user
    governorate: '',
    electoralDistrict: '',
    councilType: '' as any, // Will be set by user
    party: '',
    bio: '',
    profileImage: null,
    bannerImage: null,
    contactEmail: '',
    contactPhone: '',
    parliamentaryCommittee: '',
    electoralSymbol: '',
    electoralNumber: '',
  });

  const [messages] = useState<Message[]>([
    {
      id: 'msg_rep_1',
      sender_id: 'citizen_1',
      recipient_id: 'rep_1',
      subject: 'استفسار حول مشروع الطرق',
      content: 'أود الاستفسار عن موعد بدء مشروع تطوير الطرق في منطقتنا...',
          status: 'sent',
          created_at: '2025-01-15T10:00:00Z',
          updated_at: '2025-01-15T10:00:00Z',
    },
    {
      id: 'msg_rep_2',
      sender_id: 'citizen_2',
      recipient_id: 'rep_1',
      subject: 'مقترح لتحسين الخدمات الصحية',
      content: 'أقترح إنشاء مركز صحي جديد في المنطقة...',
          status: 'read',
          created_at: '2025-01-10T10:00:00Z',
          updated_at: '2025-01-10T10:00:00Z',
    },
  ]);

  const [complaints] = useState<Complaint[]>([
    {
      id: 'comp_rep_1',
      citizen_id: 'citizen_3',
      title: 'انقطاع المياه المستمر',
      description: 'انقطاع المياه في منطقة الحي الثالث لأكثر من أسبوع',
      category: 'خدمات عامة',
      priority: 'high',
      assigned_to: 'rep_1',
      created_at: '2025-01-12T10:00:00Z',
      updated_at: '2025-01-12T10:00:00Z',
    },
    {
      id: 'comp_rep_2',
      citizen_id: 'citizen_4',
      title: 'تدهور حالة الطرق',
      description: 'الطرق في حالة سيئة جداً وتحتاج إلى إصلاح عاجل',
      category: 'بنية تحتية',
      priority: 'urgent',

      status: 'in_progress',
      assigned_to: 'rep_1',
      created_at: '2025-01-08T10:00:00Z',
      updated_at: '2025-01-08T10:00:00Z',
    },
  ]);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRepData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (type: 'profile' | 'banner') => (file: File | null) => {
    setRepData(prev => ({
      ...prev,
      [`${type}Image`]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // هنا سيتم ربط البيانات بقاعدة البيانات
    console.log('Representative Data:', repData);
    alert('تم حفظ البيانات بنجاح!');
  };

  const handleMessageAction = (action: string, id: number) => {
    console.log(`Message ${action} for ID: ${id}`);
    alert(`تم تنفيذ ${action} للرسالة رقم ${id}`);
  };

  const handleComplaintAction = (action: string, id: number) => {
    console.log(`Complaint ${action} for ID: ${id}`);
    alert(`تم تنفيذ ${action} للشكوى رقم ${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'assigned': return 'bg-purple-100 text-purple-800';
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
      case 'assigned': return 'مُسندة';
      case 'in_progress': return 'قيد المعالجة';
      case 'resolved': return 'تم الحل';
      case 'rejected': return 'مرفوضة';
      default: return status;
    }
  };

  const renderStar = (index: number) => {
    const filled = index <= (hoverRating || rating);
    return (
      <span
        key={index}
        className={`cursor-pointer text-3xl ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
        onClick={() => setRating(index)}
        onMouseEnter={() => setHoverRating(index)}
        onMouseLeave={() => setHoverRating(0)}
      >
        ★
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-[#004705] mb-8">
          لوحة تحكم النائب / المرشح
        </h1>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-[#004705] text-white border-b-2 border-[#004705]' // Active style
                  : 'text-gray-600 hover:text-[#004705] hover:bg-gray-50' // Inactive style
              }`}
            >
              البيانات الشخصية والبرلمانية
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
            <button
              onClick={() => setActiveTab('ratings')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                activeTab === 'ratings'
                  ? 'bg-[#004705] text-white border-b-2 border-[#004705]'
                  : 'text-gray-600 hover:text-[#004705] hover:bg-gray-50'
              }`}
            >
              التقييمات
            </button>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#004705] mb-6">البيانات الشخصية والبرلمانية</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile and Banner Image Upload */}
              <div className="flex flex-col items-center mb-8 space-y-6">
                <BannerUpload
                  image={repData.bannerImage}
                  onImageChange={handleImageChange('banner')}
                />

                <ImageUpload
                  image={repData.profileImage}
                  onImageChange={handleImageChange('profile')}
                  className="-mt-24 z-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="الاسم الكامل"
                  name="fullName"
                  value={repData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل الاسم الكامل"
                />
                <InputField
                  label="الاسم التعريفي (Slug)"
                  name="slug"
                  value={repData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="مثال: ahmed-mohamed"
                />
                <SelectField
                  label="المنصب"
                  name="position"
                  value={repData.position}
                  onChange={handleInputChange}
                  required
                  options={REPRESENTATIVE_POSITIONS.map(pos => ({ value: pos.value, label: pos.label }))}
                  placeholder="اختر المنصب"
                />
                <SelectField
                  label="نوع المجلس"
                  name="councilType"
                  value={repData.councilType}
                  onChange={handleInputChange}
                  required
                  options={COUNCIL_TYPES.map(type => ({ value: type.value, label: type.label }))}
                  placeholder="اختر نوع المجلس"
                />
                <SelectField
                  label="المحافظة"
                  name="governorate"
                  value={repData.governorate}
                  onChange={handleInputChange}
                  required
                  options={GOVERNORATES.map(gov => ({ value: gov, label: gov }))}
                  placeholder="اختر المحافظة"
                />
                <InputField
                  label="الدائرة الانتخابية"
                  name="electoralDistrict"
                  value={repData.electoralDistrict}
                  onChange={handleInputChange}
                  required
                  placeholder="أدخل الدائرة الانتخابية"
                />
                <SelectField
                  label="الحزب"
                  name="party"
                  value={repData.party || ''}
                  onChange={handleInputChange}
                  options={MOCK_PARTIES.map(p => ({ value: p, label: p }))}
                  placeholder="اختر الحزب (اختياري)"
                />
                <InputField
                  label="البريد الإلكتروني للتواصل"
                  type="email"
                  name="contactEmail"
                  value={repData.contactEmail || ''}
                  onChange={handleInputChange}
                  placeholder="أدخل البريد الإلكتروني (اختياري)"
                />
                <InputField
                  label="رقم الهاتف للتواصل"
                  type="tel"
                  name="contactPhone"
                  value={repData.contactPhone || ''}
                  onChange={handleInputChange}
                  placeholder="أدخل رقم الهاتف (اختياري)"
                />

                {repData.position === 'mp' && (
                  <SelectField
                    label="اللجنة البرلمانية"
                    name="parliamentaryCommittee"
                    value={repData.parliamentaryCommittee || ''}
                    onChange={handleInputChange}
                    options={MOCK_PARLIAMENTARY_COMMITTEES.map(c => ({ value: c, label: c }))}
                    placeholder="اختر اللجنة البرلمانية (اختياري)"
                  />
                )}

                {repData.position === 'candidate' && (
                  <>
                    <InputField
                      label="الرمز الانتخابي"
                      name="electoralSymbol"
                      value={repData.electoralSymbol || ''}
                      onChange={handleInputChange}
                      placeholder="أدخل الرمز الانتخابي"
                    />
                    <InputField
                      label="الرقم الانتخابي"
                      name="electoralNumber"
                      value={repData.electoralNumber || ''}
                      onChange={handleInputChange}
                      placeholder="أدخل الرقم الانتخابي"
                    />
                  </>
                )}
              </div>

              <TextArea
                label="نبذة تعريفية"
                name="bio"
                value={repData.bio || ''}
                onChange={handleInputChange}
                placeholder="اكتب نبذة مختصرة عنك..."
                rows={4}
                maxLength={500}
              />

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
                <MessageCard
                  key={message.id}
                  message={message}
                  onView={(id) => handleMessageAction('view', id)}
                  onEdit={(id) => handleMessageAction('edit', id)}
                  onDelete={(id) => handleMessageAction('delete', id)}
                />
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
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onViewDetails={(id) => handleComplaintAction('view', id)}
                  onTrack={(id) => handleComplaintAction('track', id)}
                  onCancel={(id) => handleComplaintAction('cancel', id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#004705] mb-6">التقييمات</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Rating Display */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">التقييم الحالي</h3>
                <div className="flex items-center justify-center">
                  <StarRating
                    rating={4.2}
                    readonly={true}
                    size="lg"
                    showText={true}
                  />
                </div>
                <div className="text-center mt-4">
                  <p className="text-gray-600">بناءً على 150 تقييم</p>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">توزيع التقييمات</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center">
                      <span className="w-8 text-sm text-gray-600">{stars}★</span>
                      <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${Math.random() * 80 + 10}%` }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-gray-600">{Math.floor(Math.random() * 50)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">آخر التقييمات</h3>
              <div className="space-y-4">
                {[
                  { name: 'أحمد محمد', rating: 5, comment: 'نائب ممتاز ومتجاوب مع المواطنين', date: '2025-01-15' },
                  { name: 'فاطمة علي', rating: 4, comment: 'جهود طيبة في حل مشاكل المنطقة', date: '2025-01-12' },
                  { name: 'محمد حسن', rating: 5, comment: 'سرعة في الاستجابة وحل المشاكل', date: '2025-01-10' }
                ].map((review, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{review.name}</h4>
                        <StarRating rating={review.rating} readonly={true} size="sm" showText={false} />
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

