'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SimpleBanner from '@/components/layout/SimpleBanner';
import NewsBar from '@/components/layout/NewsBar';

interface LayoutWrapperProps {
  children: React.ReactNode;
  newsItems: { id: string; text: string }[];
  newsDirection: 'ltr' | 'rtl';
  newsSpeedSeconds: number;
}

// تحديد الصفحات التي لا تعرض البانر والشريط الإخباري
const isControlPanelPage = (pathname: string) => {
  return pathname.startsWith('/dashboard') ||
         pathname.startsWith('/admin') ||
         pathname.startsWith('/citizen') ||
         pathname.startsWith('/mp') ||
         pathname.startsWith('/candidate') ||
         pathname.startsWith('/auth/login') ||
         pathname.startsWith('/auth/register') ||
         pathname.startsWith('/auth/');
};

const getBannerPageType = (pathname: string): 'landing' | 'candidates' | 'mps' | 'complaints' => {
  if (pathname.startsWith('/candidates')) {
    return 'candidates';
  } else if (pathname.startsWith('/mps')) {
    return 'mps';
  } else if (pathname.startsWith('/complaints')) {
    return 'complaints';
  }
  return 'landing';
};

const getGovernorateFromPath = (pathname: string): string | null => {
  // Extract governorate from URL patterns like:
  // /candidates/governorate/[id]
  // /mps/governorate/[id]
  // /complaints/governorate/[id]
  const governorateMatch = pathname.match(/\/governorate\/([^\/]+)/);
  return governorateMatch ? governorateMatch[1] : null;
};

export default function LayoutWrapper({
  children,
  newsItems,
  newsDirection,
  newsSpeedSeconds,
}: LayoutWrapperProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [governorateId, setGovernorateId] = useState<string | null>(null);

  // Determine if banner and news bar should be shown
  const showBannerAndNewsBar = !isControlPanelPage(pathname);

  // Determine page type for Banner based on pathname
  const bannerPageType = getBannerPageType(pathname);

  useEffect(() => {
    // Get governorate ID from URL path
    const pathGovernorate = getGovernorateFromPath(pathname);
    
    // Get governorate ID from search params as fallback
    const searchGovernorate = searchParams.get('governorate') || searchParams.get('governorate_id');
    
    // Use path governorate first, then search params, then null
    const finalGovernorate = pathGovernorate || searchGovernorate || null;
    
    setGovernorateId(finalGovernorate);
  }, [pathname, searchParams]);

  return (
    <>
      {showBannerAndNewsBar && (
        <>
          <SimpleBanner 
            pageType={bannerPageType} 
            governorateId={governorateId} 
          />
          <NewsBar
            newsItems={newsItems}
            direction={newsDirection}
            speedSeconds={newsSpeedSeconds}
          />
        </>
      )}
      <main className="flex-1">
        {children}
      </main>
    </>
  );
}
