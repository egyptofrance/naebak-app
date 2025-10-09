// Supabase Storage Configuration
export const SUPABASE_STORAGE_CONFIG = {
  // Supabase project URL
  baseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://brjgqodpzrhjfwteryse.supabase.co',
  
  // Storage bucket for public images
  publicImagesBucket: 'banner_public_images',
  
  // Helper function to get public URL for images
  getPublicImageUrl: (fileName: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://brjgqodpzrhjfwteryse.supabase.co';
    return `${baseUrl}/storage/v1/object/public/banner_public_images/${fileName}`;
  }
};

// Image file names in the bucket
export const IMAGE_FILES = {
  logoGreen: 'logo-naebak-green.png',
  logoWhite: 'logo-naebak-white.png',
  banner: 'sisi-banner.jpg',
  favicon16: 'favicon-16x16.png',
  favicon32: 'favicon-32x32.png',
  faviconIco: 'favicon.ico',
  appleTouchIcon: 'apple-touch-icon.png'
};
