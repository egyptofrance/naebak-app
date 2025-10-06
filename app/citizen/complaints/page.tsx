'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FileText, Plus, ArrowRight, Search, Filter, Calendar, MapPin, User, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import Link from 'next/link';

interface ComplaintData {
  id: number;
  title: string;
  body: string;
  status: string;
  created_at: string;
  assigned_at: string | null;
  due_date: string | null;
  points_awarded: number;
  agree_publish_public: boolean;
  type: {
    name: string;
  };
  governorate: {
    name: string;
  };
  assigned_to?: {
    first_name: string;
    last_name: string;
  };
  complaint_actions: Array<{
    id: number;
    action: string;
    note: string;
    created_at: string;
    actor_user: {
      first_name: string;
      last_name: string;
    };
  }>;
}

interface ComplaintType {
  id: number;
  name: string;
}

interface Governorate {
  id: number;
  name: string;
}

export default function ComplaintsPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [complaints, setComplaints] = useState<ComplaintData[]>([]);
  const [complaintTypes, setComplaintTypes] = useState<ComplaintType[]>([]);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    type_id: '',
    governorate_id: '',
    agree_publish_public: false
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Get current user
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/login');
          return;
        }

        // Get user data
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, role_id')
          .eq('auth_id', authUser.id)
          .single();

        if (userError || !userData) {
          router.push('/login');
          return;
        }

        // Check if user is a citizen
        const { data: roleData, error: roleError } = await supabase
          .from('roles')
          .select('name')
          .eq('id', userData.role_id)
          .single();

        if (roleError || !roleData || roleData.name !== 'citizen') {
          router.push('/unauthorized');
          return;
        }

        setCurrentUserId(userData.id);

        // Fetch user's complaints
        const { data: complaintsData, error: complaintsError } = await supabase
          .from('complaints')
          .select(`
            id,
            title,
            body,
            status,
            created_at,
            assigned_at,
            due_date,
            points_awarded,
            agree_publish_public,
            type:complaint_types(name),
            governorate:governorates(name),
            assigned_to:users!complaints_assigned_to_fkey(first_name, last_name),
            complaint_actions(
              id,
              action,
              note,
              created_at,
              actor_user:users!complaint_actions_actor_user_id_fkey(first_name, last_name)
            )
          `)
          .eq('citizen_id', userData.id)
          .order('created_at', { ascending: false });

        if (!complaintsError && complaintsData) {
          setComplaints(complaintsData);
        }

        // Fetch complaint types
        const { data: typesData, error: typesError } = await supabase
          .from('complaint_types')
          .select('id, name')
          .order('name');

        if (!typesError && typesData) {
          setComplaintTypes(typesData);
        }

        // Fetch governorates
        const { data: governoratesData, error: governoratesError } = await supabase
          .from('governorates')
          .select('id, name')
          .order('name');

        if (!governoratesError && governoratesData) {
          setGovernorates(governoratesData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [router, supabase]);

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim() || !formData.type_id || !formData.governorate_id || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('complaints')
        .insert({
          citizen_id: currentUserId,
          title: formData.title.trim(),
          body: formData.body.trim(),
          type_id: parseInt(formData.type_id),
          governorate_id: parseInt(formData.governorate_id),
          agree_publish_public: formData.agree_publish_public,
          status: 'new'
        });

      if (error) {
        console.error('Error submitting complaint:', error);
        alert('حدث خطأ أثناء تقديم الشكوى');
        return;
      }

      // Reset form
      setFormData({
        title: '',
        body: '',
        type_id: '',
        governorate_id: '',
        agree_publish_public: false
      });
      setShowNewComplaintForm(false);
      
      // Refresh complaints
      window.location.reload();
      
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('حدث خطأ أثناء تقديم الشكوى');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-purple-100 text-purple-800';
      case 'on_hold': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جديدة';
      case 'assigned': return 'مُحالة';
      case 'responded': return 'تم الرد';
      case 'on_hold': return 'معلقة';
      case 'rejected': return 'مرفوضة';
      case 'accepted': return 'مقبولة';
      case 'resolved': return 'محلولة';
      case 'archived': return 'مؤرشفة';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="w-4 h-4" />;
      case 'assigned': return <User className="w-4 h-4" />;
      case 'responded': return <AlertCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.type.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterStatus === 'all' || complaint.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004705]"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/citizen"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">إدارة الشكاوى</h1>
              <p className="text-gray-600">تقديم ومتابعة شكاويك</p>
            </div>
          </div>
          <button
            onClick={() => setShowNewComplaintForm(true)}
            className="bg-[#004705] text-white px-4 py-2 rounded-lg hover:bg-[#003604] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            شكوى جديدة
          </button>
        </div>

        {/* New Complaint Form Modal */}
        {showNewComplaintForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">تقديم شكوى جديدة</h3>
              <form onSubmit={handleSubmitComplaint} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان الشكوى
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent"
                    maxLength={100}
                    placeholder="عنوان مختصر للشكوى"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.title.length}/100 حرف
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع الشكوى
                  </label>
                  <select
                    value={formData.type_id}
                    onChange={(e) => setFormData({...formData, type_id: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent"
                    required
                  >
                    <option value="">اختر نوع الشكوى</option>
                    {complaintTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المحافظة
                  </label>
                  <select
                    value={formData.governorate_id}
                    onChange={(e) => setFormData({...formData, governorate_id: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent"
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
                    تفاصيل الشكوى
                  </label>
                  <textarea
                    value={formData.body}
                    onChange={(e) => setFormData({...formData, body: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent"
                    rows={6}
                    maxLength={1500}
                    placeholder="اشرح تفاصيل الشكوى بوضوح..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.body.length}/1500 حرف
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="agree_publish"
                    checked={formData.agree_publish_public}
                    onChange={(e) => setFormData({...formData, agree_publish_public: e.target.checked})}
                    className="w-4 h-4 text-[#004705] border-gray-300 rounded focus:ring-[#004705]"
                  />
                  <label htmlFor="agree_publish" className="text-sm text-gray-700">
                    أوافق على نشر هذه الشكوى للعامة (اختياري)
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#004705] text-white py-2 px-4 rounded-lg hover:bg-[#003604] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    تقديم الشكوى
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewComplaintForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Complaint Details Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedComplaint.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedComplaint.created_at).toLocaleDateString('ar-EG')}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedComplaint.governorate.name}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedComplaint.status)}`}>
                      {getStatusText(selectedComplaint.status)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">تفاصيل الشكوى</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{selectedComplaint.body}</p>
                  </div>
                </div>

                {selectedComplaint.assigned_to && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">مُحالة إلى</h4>
                    <p className="text-gray-700">
                      {selectedComplaint.assigned_to.first_name} {selectedComplaint.assigned_to.last_name}
                    </p>
                  </div>
                )}

                {selectedComplaint.complaint_actions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">سجل الإجراءات</h4>
                    <div className="space-y-3">
                      {selectedComplaint.complaint_actions.map((action) => (
                        <div key={action.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-gray-900">
                              {action.actor_user.first_name} {action.actor_user.last_name}
                            </p>
                            <span className="text-sm text-gray-500">
                              {new Date(action.created_at).toLocaleDateString('ar-EG')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">الإجراء: {action.action}</p>
                          {action.note && (
                            <p className="text-gray-700">{action.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث في الشكاوى..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent"
              >
                <option value="all">جميع الشكاوى</option>
                <option value="new">جديدة</option>
                <option value="assigned">مُحالة</option>
                <option value="responded">تم الرد</option>
                <option value="resolved">محلولة</option>
                <option value="rejected">مرفوضة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-lg shadow-md">
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد شكاوى</h3>
              <p className="text-gray-500 mb-4">ابدأ بتقديم شكوى جديدة</p>
              <button
                onClick={() => setShowNewComplaintForm(true)}
                className="bg-[#004705] text-white px-6 py-2 rounded-lg hover:bg-[#003604] transition-colors"
              >
                تقديم شكوى جديدة
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">{complaint.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {complaint.type.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {complaint.governorate.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(complaint.created_at).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-2">{complaint.body}</p>
                    </div>
                    <div className="flex items-center gap-3 mr-4">
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        {getStatusText(complaint.status)}
                      </span>
                      <button
                        onClick={() => setSelectedComplaint(complaint)}
                        className="p-2 text-gray-400 hover:text-[#004705] hover:bg-gray-100 rounded-lg transition-colors"
                        title="عرض التفاصيل"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
