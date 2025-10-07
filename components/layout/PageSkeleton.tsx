'use client';

import HeaderSkeleton from './HeaderSkeleton';
import ContentSkeleton from './ContentSkeleton';
import FooterSkeleton from './FooterSkeleton';

export default function PageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderSkeleton />
      <div className="flex-1">
        <ContentSkeleton />
      </div>
      <FooterSkeleton />
    </div>
  );
}
