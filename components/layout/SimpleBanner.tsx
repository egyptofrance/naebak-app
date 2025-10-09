'use client';

import Image from 'next/image';

interface SimpleBannerProps {
  pageType?: 'landing' | 'candidates' | 'mps' | 'complaints';
  governorateId?: string | null;
}

export default function SimpleBanner({ pageType = 'landing', governorateId = null }: SimpleBannerProps) {
  // استخدام صورة البانر المباشرة من Supabase
  const bannerUrl = "https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/sisi-banner.jpg";

  const handleImageError = () => {
    console.error('Error loading banner image');
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="relative w-full">
        <Image
          src={bannerUrl}
          alt="منصة نائبك - ربط المواطنين بنوابهم"
          width={1920}
          height={400}
          priority
          className="w-full h-auto object-cover"
          onError={handleImageError}
          sizes="100vw"
          quality={90}
          style={{ height: 'auto' }}
          unoptimized
        />
      </div>
    </div>
  );
}
