'use client';

import { Suspense } from 'react';
import LayoutWrapper from './LayoutWrapper';

interface LayoutWrapperSuspenseProps {
  children: React.ReactNode;
  newsItems: { id: string; text: string }[];
  newsDirection: 'ltr' | 'rtl';
  newsSpeedSeconds: number;
}

function LayoutWrapperFallback() {
  return (
    <div className="w-full">
      {/* Banner placeholder */}
      <div className="w-full bg-gray-200 animate-pulse">
        <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 bg-gray-300"></div>
      </div>
      {/* NewsBar placeholder */}
      <div className="w-full bg-gray-100 h-12 animate-pulse"></div>
    </div>
  );
}

export default function LayoutWrapperSuspense(props: LayoutWrapperSuspenseProps) {
  return (
    <Suspense fallback={<LayoutWrapperFallback />}>
      <LayoutWrapper {...props} />
    </Suspense>
  );
}
