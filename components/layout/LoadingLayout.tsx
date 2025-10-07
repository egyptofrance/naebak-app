'use client';

import { useState, useEffect } from 'react';
import HeaderSkeleton from './HeaderSkeleton';
import FooterSkeleton from './FooterSkeleton';

interface LoadingLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  minLoadingTime?: number; // الحد الأدنى لوقت عرض الـ skeleton (بالميلي ثانية)
}

export default function LoadingLayout({ 
  children, 
  header, 
  footer, 
  minLoadingTime = 500 
}: LoadingLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // تأكد من عرض الـ skeleton لفترة كافية لتحسين تجربة المستخدم
    const timer = setTimeout(() => {
      setIsLoading(false);
      // إضافة تأخير صغير لضمان سلاسة الانتقال
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <HeaderSkeleton />
        <div className="flex-1">
          {/* محتوى الصفحة Skeleton */}
          <div className="min-h-screen bg-gray-50">
            {/* Banner Skeleton */}
            <div className="relative h-96 bg-gray-300 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-300"></div>
              <div className="absolute bottom-4 right-4">
                <div className="w-64 h-6 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Main Content Skeleton */}
            <main className="container mx-auto px-4 py-12">
              <div className="text-center">
                {/* Title Skeleton */}
                <div className="w-80 h-10 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
                
                {/* Subtitle Skeleton */}
                <div className="w-96 h-6 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>

                {/* Cards Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                    >
                      {/* Icon Skeleton */}
                      <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                      
                      {/* Card Title Skeleton */}
                      <div className="w-32 h-6 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                      
                      {/* Card Description Skeleton */}
                      <div className="space-y-2">
                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-3/4 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
        <FooterSkeleton />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {header}
      <div className="flex-1">
        {children}
      </div>
      {footer}
    </div>
  );
}
