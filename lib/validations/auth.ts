import { z } from 'zod';

// Basic registration schema (Step 1)
export const basicRegistrationSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('يرجى إدخال بريد إلكتروني صحيح'),
  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'يجب الموافقة على الشروط والأحكام',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
});

// Profile completion schema (Step 2)
export const profileCompletionSchema = z.object({
  firstName: z
    .string()
    .min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل')
    .max(50, 'الاسم الأول طويل جداً')
    .regex(/^[\u0600-\u06FF\s]+$/, 'يرجى إدخال الاسم بالعربية فقط'),
  lastName: z
    .string()
    .min(2, 'الاسم الأخير يجب أن يكون حرفين على الأقل')
    .max(50, 'الاسم الأخير طويل جداً')
    .regex(/^[\u0600-\u06FF\s]+$/, 'يرجى إدخال الاسم بالعربية فقط'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^(\+20|0)?1[0125]\d{8}$/.test(val), {
      message: 'يرجى إدخال رقم هاتف مصري صحيح',
    }),

  birthDate: z
    .string()
    .min(1, 'تاريخ الميلاد مطلوب')
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 18 && age <= 100;
    }, 'يجب أن يكون العمر بين 18 و 100 سنة'),
  gender: z.enum(['male', 'female'], {
    message: 'يرجى تحديد الجنس',
  }),
  governorateId: z
    .number()
    .min(1, 'يرجى اختيار المحافظة'),
  constituencyId: z
    .number()
    .min(1, 'يرجى اختيار الدائرة الانتخابية'),
});

// Role selection schema (Step 3)
export const roleSelectionSchema = z.object({
  role: z.enum(['citizen', 'deputy', 'candidate'], {
    message: 'يرجى اختيار الدور المناسب',
  }),
  bio: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 500, {
      message: 'النبذة الشخصية يجب أن تكون أقل من 500 حرف',
    }),
});

// Identity verification schema (for deputies and candidates)
export const identityVerificationSchema = z.object({
  identityDocument: z
    .any()
    .refine((file) => file instanceof File, 'يرجى رفع صورة البطاقة الشخصية')
    .refine((file) => file?.size <= 5000000, 'حجم الملف يجب أن يكون أقل من 5 ميجابايت')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file?.type),
      'نوع الملف يجب أن يكون صورة (JPEG, PNG, WebP)'
    ),
  officialDocument: z
    .any()
    .refine((file) => file instanceof File, 'يرجى رفع الوثيقة الرسمية')
    .refine((file) => file?.size <= 5000000, 'حجم الملف يجب أن يكون أقل من 5 ميجابايت')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file?.type),
      'نوع الملف يجب أن يكون صورة أو PDF'
    ),
  profilePhoto: z
    .any()
    .refine((file) => file instanceof File, 'يرجى رفع صورة شخصية واضحة')
    .refine((file) => file?.size <= 3000000, 'حجم الملف يجب أن يكون أقل من 3 ميجابايت')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file?.type),
      'نوع الملف يجب أن يكون صورة (JPEG, PNG, WebP)'
    ),
});

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('يرجى إدخال بريد إلكتروني صحيح'),
  password: z
    .string()
    .min(1, 'كلمة المرور مطلوبة'),
  rememberMe: z.boolean().optional(),
});

// Password reset schema
export const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('يرجى إدخال بريد إلكتروني صحيح'),
});

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'كلمة المرور الحالية مطلوبة'),
  newPassword: z
    .string()
    .min(8, 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم'),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'كلمة المرور الجديدة غير متطابقة',
  path: ['confirmNewPassword'],
});

// Type exports
export type BasicRegistrationData = z.infer<typeof basicRegistrationSchema>;
export type ProfileCompletionData = z.infer<typeof profileCompletionSchema>;
export type RoleSelectionData = z.infer<typeof roleSelectionSchema>;
export type IdentityVerificationData = z.infer<typeof identityVerificationSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type PasswordResetData = z.infer<typeof passwordResetSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
