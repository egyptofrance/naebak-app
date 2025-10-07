'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import HeaderSkeleton from './HeaderSkeleton';

export default function HeaderWithSkeleton() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة وقت التحميل للهيدر
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return <Header />;
}
