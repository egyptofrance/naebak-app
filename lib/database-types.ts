// Database Types and Interfaces for Naebak Platform

export interface CitizenProfile {
  id: string;
  user_id: string;
  full_name: string;
  birth_date: string;
  governorate: string;
  district: string;
  village?: string;
  phone: string;
  whatsapp?: string;
  job: string;
  gender: 'male' | 'female';
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Representative {
  id: string;
  full_name: string;
  position: 'mp' | 'senator'; // Member of Parliament or Senator
  governorate: string;
  district: string;
  party?: string;
  bio?: string;
  profile_image_url?: string;
  contact_email?: string;
  contact_phone?: string;
  rating: number; // Average rating from citizens
  total_ratings: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string; // Citizen ID
  recipient_id: string; // Representative ID
  subject: string;
  content: string;
  status: 'sent' | 'read' | 'replied';
  reply_content?: string;
  reply_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Complaint {
  id: string;
  citizen_id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'rejected';
  assigned_to?: string; // Representative ID
  assigned_date?: string;
  resolution_notes?: string;
  resolved_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Rating {
  id: string;
  citizen_id: string;
  representative_id: string;
  rating: number; // 1-5 stars
  comment?: string;
  created_at: string;
  updated_at: string;
}

export interface ComplaintHistory {
  id: string;
  complaint_id: string;
  action: string;
  description: string;
  performed_by: string; // User ID who performed the action
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Data Types
export interface CitizenRegistrationData {
  fullName: string;
  birthDate: string;
  governorate: string;
  district: string;
  village?: string;
  phone: string;
  whatsapp?: string;
  job: string;
  gender: 'male' | 'female';
  profileImage?: File;
}

export interface MessageFormData {
  recipientId: string;
  subject: string;
  content: string;
}

export interface ComplaintFormData {
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface RatingFormData {
  representativeId: string;
  rating: number;
  comment?: string;
}

// Database Service Interface
export interface DatabaseService {
  // Citizen Profile Operations
  createCitizenProfile(data: CitizenRegistrationData): Promise<ApiResponse<CitizenProfile>>;
  updateCitizenProfile(id: string, data: Partial<CitizenProfile>): Promise<ApiResponse<CitizenProfile>>;
  getCitizenProfile(userId: string): Promise<ApiResponse<CitizenProfile>>;
  
  // Representative Operations
  getRepresentatives(governorate?: string, district?: string): Promise<ApiResponse<Representative[]>>;
  getRepresentativeById(id: string): Promise<ApiResponse<Representative>>;
  
  // Message Operations
  sendMessage(data: MessageFormData): Promise<ApiResponse<Message>>;
  getMessages(citizenId: string, page?: number, limit?: number): Promise<ApiResponse<PaginatedResponse<Message>>>;
  markMessageAsRead(messageId: string): Promise<ApiResponse<void>>;
  deleteMessage(messageId: string): Promise<ApiResponse<void>>;
  
  // Complaint Operations
  submitComplaint(data: ComplaintFormData): Promise<ApiResponse<Complaint>>;
  getComplaints(citizenId: string, page?: number, limit?: number): Promise<ApiResponse<PaginatedResponse<Complaint>>>;
  updateComplaintStatus(complaintId: string, status: Complaint['status']): Promise<ApiResponse<Complaint>>;
  getComplaintHistory(complaintId: string): Promise<ApiResponse<ComplaintHistory[]>>;
  
  // Rating Operations
  submitRating(data: RatingFormData): Promise<ApiResponse<Rating>>;
  getRatings(representativeId: string): Promise<ApiResponse<Rating[]>>;
  updateRating(ratingId: string, data: Partial<RatingFormData>): Promise<ApiResponse<Rating>>;
}

// Constants
export const GOVERNORATES = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر', 'البحيرة', 'الفيوم', 'الغربية', 'الإسماعيلية',
  'المنيا', 'المنوفية', 'الوادي الجديد', 'شمال سيناء', 'جنوب سيناء', 'بورسعيد', 'دمياط', 'الشرقية', 'سوهاج',
  'السويس', 'أسوان', 'أسيوط', 'بني سويف', 'كفر الشيخ', 'مطروح', 'الأقصر', 'قنا'
] as const;

export const COMPLAINT_CATEGORIES = [
  'خدمات عامة',
  'بنية تحتية',
  'صحة',
  'تعليم',
  'نقل ومواصلات',
  'بيئة',
  'أمن وسلامة',
  'خدمات اجتماعية',
  'اقتصاد وتجارة',
  'أخرى'
] as const;

export const PRIORITY_LEVELS = [
  { value: 'low', label: 'منخفضة' },
  { value: 'medium', label: 'متوسطة' },
  { value: 'high', label: 'عالية' },
  { value: 'urgent', label: 'عاجلة' }
] as const;

export const MESSAGE_STATUS = [
  { value: 'sent', label: 'مُرسل' },
  { value: 'read', label: 'مقروء' },
  { value: 'replied', label: 'تم الرد' }
] as const;

export const COMPLAINT_STATUS = [
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'assigned', label: 'مُسند' },
  { value: 'in_progress', label: 'قيد المعالجة' },
  { value: 'resolved', label: 'تم الحل' },
  { value: 'rejected', label: 'مرفوض' }
] as const;
