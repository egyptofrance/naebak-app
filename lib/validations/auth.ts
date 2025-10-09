import { z } from 'zod';

// Registration schema
export const registrationSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('يرجى إدخال بريد إلكتروني صحيح'),
  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
});

// Account type selection schema
export const accountTypeSchema = z.object({
  accountType: z.enum(['citizen', 'candidate', 'mp'], {
    message: 'يرجى اختيار نوع الحساب',
  }),
});

// Citizen profile completion schema
export const citizenProfileSchema = z.object({
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
    .min(1, 'رقم التليفون مطلوب')
    .regex(/^(\+20|0)?1[0125]\d{8}$/, 'يرجى إدخال رقم هاتف مصري صحيح'),
  whatsapp: z
    .string()
    .optional()
    .refine((val) => !val || /^(\+20|0)?1[0125]\d{8}$/.test(val), {
      message: 'يرجى إدخال رقم واتساب مصري صحيح',
    }),
  governorate: z
    .string()
    .min(1, 'المحافظة مطلوبة'),
  city: z
    .string()
    .min(1, 'المدينة أو الحي مطلوب'),
  village: z
    .string()
    .optional(),
  job: z
    .string()
    .min(1, 'الوظيفة مطلوبة'),
  party: z
    .string()
    .min(1, 'يرجى تحديد الحزب أو اختيار مستقل'),
  constituency: z
    .string()
    .optional(),
});

// Candidate/MP profile completion schema
export const candidateProfileSchema = z.object({
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
    .min(1, 'رقم التليفون مطلوب')
    .regex(/^(\+20|0)?1[0125]\d{8}$/, 'يرجى إدخال رقم هاتف مصري صحيح'),
  whatsapp: z
    .string()
    .optional()
    .refine((val) => !val || /^(\+20|0)?1[0125]\d{8}$/.test(val), {
      message: 'يرجى إدخال رقم واتساب مصري صحيح',
    }),
  governorate: z
    .string()
    .min(1, 'المحافظة مطلوبة'),
  city: z
    .string()
    .min(1, 'المدينة أو الحي مطلوب'),
  village: z
    .string()
    .optional(),
  job: z
    .string()
    .min(1, 'الوظيفة مطلوبة'),
  party: z
    .string()
    .min(1, 'يرجى تحديد الحزب أو اختيار مستقل'),
  electoralSymbol: z
    .string()
    .optional(),
  electoralNumber: z
    .string()
    .optional(),
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
export type RegistrationData = z.infer<typeof registrationSchema>;
export type AccountTypeData = z.infer<typeof accountTypeSchema>;
export type CitizenProfileData = z.infer<typeof citizenProfileSchema>;
export type CandidateProfileData = z.infer<typeof candidateProfileSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type PasswordResetData = z.infer<typeof passwordResetSchema>;
export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
