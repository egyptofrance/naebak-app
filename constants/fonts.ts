/**
 * إعدادات الخطوط لمنصة نائبك
 * 
 * يستخدم التطبيق خط Tajawal من Google Fonts
 */

export const FONTS = {
  // الخط الأساسي
  primary: 'Tajawal, sans-serif',
  
  // أوزان الخطوط
  weights: {
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  
  // أحجام الخطوط
  sizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
} as const;

export type FontWeight = keyof typeof FONTS.weights;
export type FontSize = keyof typeof FONTS.sizes;
