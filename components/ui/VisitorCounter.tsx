'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [settings, setSettings] = useState<{
    min_value: number;
    max_value: number;
    change_interval_seconds: number;
  } | null>(null);
  
  const supabase = createClientComponentClient();

  // جلب إعدادات عداد الزوار
  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from('visitor_counter_settings')
        .select('min_value, max_value, change_interval_seconds')
        .single();

      if (data && !error) {
        setSettings(data);
        // تعيين قيمة عشوائية أولية
        setCount(Math.floor(Math.random() * (data.max_value - data.min_value + 1)) + data.min_value);
      } else {
        // قيم افتراضية في حالة الفشل
        setSettings({
          min_value: 1000,
          max_value: 5000,
          change_interval_seconds: 45,
        });
        setCount(Math.floor(Math.random() * 4001) + 1000);
      }
    }

    fetchSettings();
  }, [supabase]);

  // تحديث العداد بشكل دوري
  useEffect(() => {
    if (!settings) return;

    const interval = setInterval(() => {
      const newCount = Math.floor(
        Math.random() * (settings.max_value - settings.min_value + 1)
      ) + settings.min_value;
      setCount(newCount);
    }, settings.change_interval_seconds * 1000);

    return () => clearInterval(interval);
  }, [settings]);

  return (
    <div className="flex items-center gap-2 text-sm text-[#333333]">
      <svg
        className="w-5 h-5 text-[#004705]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <span className="font-medium">{count.toLocaleString('ar-EG')}</span>
      <span className="text-xs">زائر</span>
    </div>
  );
}
