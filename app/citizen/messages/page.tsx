'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { MessageSquare, Send, ArrowRight, Search, Filter, Plus, Eye, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface MessageData {
  id: number;
  body: string;
  is_approved: boolean;
  created_at: string;
  to_user: {
    id: string;
    first_name: string;
    last_name: string;
    role_id: number;
  };
  from_user: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

interface MPData {
  id: string;
  first_name: string;
  last_name: string;
  role_id: number;
  profile?: {
    council: {
      name: string;
    };
    party: {
      name: string;
    };
    district: string;
  };
}

export default function MessagesPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [mps, setMPs] = useState<MPData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const [selectedMP, setSelectedMP] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentUserId, setCurrentUserId] = useState<string>('');

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

        // Fetch user's messages (both sent and received)
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select(`
            id,
            body,
            is_approved,
            created_at,
            to_user:users!messages_to_user_id_fkey(id, first_name, last_name, role_id),
            from_user:users!messages_from_user_id_fkey(id, first_name, last_name)
          `)
          .or(`from_user_id.eq.${userData.id},to_user_id.eq.${userData.id}`)
          .order('created_at', { ascending: false });

        if (!messagesError && messagesData) {
          setMessages(messagesData);
        }

        // Fetch MPs and Candidates for new message form
        const { data: mpsData, error: mpsError } = await supabase
          .from('users')
          .select(`
            id,
            first_name,
            last_name,
            role_id,
            profile:profiles(
              council:councils(name),
              party:parties(name),
              district
            )
          `)
          .in('role_id', [4, 5]) // MP and Candidate role IDs
          .order('first_name');

        if (!mpsError && mpsData) {
          setMPs(mpsData);
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMP || !messageBody.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          from_user_id: currentUserId,
          to_user_id: selectedMP,
          body: messageBody.trim(),
          is_approved: false
        });

      if (error) {
        console.error('Error sending message:', error);
        alert('حدث خطأ أثناء إرسال الرسالة');
        return;
      }

      // Reset form
      setSelectedMP('');
      setMessageBody('');
      setShowNewMessageForm(false);
      
      // Refresh messages
      window.location.reload();
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('حدث خطأ أثناء إرسال الرسالة');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.to_user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.to_user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from_user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from_user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.body.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'approved' && message.is_approved) ||
      (filterStatus === 'pending' && !message.is_approved);

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
              <h1 className="text-2xl font-bold text-gray-900">إدارة الرسائل</h1>
              <p className="text-gray-600">تواصل مع النواب والمرشحين</p>
            </div>
          </div>
          <button
            onClick={() => setShowNewMessageForm(true)}
            className="bg-[#004705] text-white px-4 py-2 rounded-lg hover:bg-[#003604] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            رسالة جديدة
          </button>
        </div>

        {/* New Message Form Modal */}
        {showNewMessageForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-4">رسالة جديدة</h3>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المرسل إليه
                  </label>
                  <select
                    value={selectedMP}
                    onChange={(e) => setSelectedMP(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent"
                    required
                  >
                    <option value="">اختر النائب أو المرشح</option>
                    {mps.map((mp) => (
                      <option key={mp.id} value={mp.id}>
                        {mp.first_name} {mp.last_name}
                        {mp.profile && ` - ${mp.profile.district}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نص الرسالة
                  </label>
                  <textarea
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004705] focus:border-transparent"
                    rows={4}
                    maxLength={500}
                    placeholder="اكتب رسالتك هنا..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {messageBody.length}/500 حرف
                  </p>
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
                      <Send className="w-4 h-4" />
                    )}
                    إرسال
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewMessageForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
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
                placeholder="البحث في الرسائل..."
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
                <option value="all">جميع الرسائل</option>
                <option value="approved">المعتمدة</option>
                <option value="pending">في الانتظار</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-md">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد رسائل</h3>
              <p className="text-gray-500 mb-4">ابدأ بإرسال رسالة جديدة للتواصل مع النواب والمرشحين</p>
              <button
                onClick={() => setShowNewMessageForm(true)}
                className="bg-[#004705] text-white px-6 py-2 rounded-lg hover:bg-[#003604] transition-colors"
              >
                إرسال رسالة جديدة
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredMessages.map((message) => {
                const isFromCurrentUser = message.from_user.id === currentUserId;
                const otherUser = isFromCurrentUser ? message.to_user : message.from_user;
                
                return (
                  <div key={message.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#004705] rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {otherUser.first_name?.charAt(0)}{otherUser.last_name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {isFromCurrentUser ? 'إلى: ' : 'من: '}
                            {otherUser.first_name} {otherUser.last_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(message.created_at).toLocaleDateString('ar-EG', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {message.is_approved ? (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            معتمدة
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-600 text-sm">
                            <Clock className="w-4 h-4" />
                            في الانتظار
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{message.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
