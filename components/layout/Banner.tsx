'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getBanner } from '@/lib/banners';

interface BannerProps {
  pageType: 'landing' | 'candidates' | 'mps' | 'complaints';
  governorateId?: string | null;
}

export default function Banner({ pageType, governorateId = null }: BannerProps) {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndSetBanner = async () => {
      setIsLoading(true);
      setError(false);
      
      try {
        const bannerData = await getBanner(pageType, governorateId);
        if (bannerData?.publicUrl) {
          setBannerUrl(bannerData.publicUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch banner:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSetBanner();
  }, [pageType, governorateId]);

  const handleImageError = () => {
    console.error('Error loading banner image. Falling back to placeholder.');
    setError(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full bg-gray-200 animate-pulse">
        <div className="h-64 bg-gray-300"></div>
      </div>
    );
  }

  // Error state or no banner URL
  if (error || !bannerUrl) {
    return (
      <div className="w-full bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="h-64 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-lg flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <p className="text-sm font-medium">لا توجد صورة بانر متاحة</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-hidden">
      {/* Full height container that preserves original image dimensions */}
      <div className="relative w-full">
        <Image
          src={bannerUrl}
          alt="Platform Banner"
          width={1920}
          height={0}
          priority
          className="w-full h-auto object-cover"
          onError={handleImageError}
          sizes="100vw"
          quality={90}
          style={{ height: 'auto' }}
        />
      </div>
      
      {/* Optional: Add a subtle overlay for better text readability if needed in future */}
      {/* Currently no overlay as per requirements */}
    </div>
  );
}
