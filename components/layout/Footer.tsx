'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import SocialIcon from '@/components/ui/SocialIcon';


interface SocialLink {
  platform: string;
  url: string;
}

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        // Check if Supabase is configured
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          console.warn('Supabase not configured, using fallback social links');
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', [
            'facebook_url',
            'twitter_url',
            'instagram_url',
            'youtube_url',
            'whatsapp_number'
          ]);

        if (error) {
          console.error('Error fetching social links:', error);
          return;
        }

        if (data) {
          const links: SocialLink[] = data
            .filter(item => item.value && item.value.trim() !== '')
            .map(item => ({
              platform: item.key.replace('_url', '').replace('_number', ''),
              url: item.key === 'whatsapp_number' ? `https://wa.me/${item.value}` : item.value
            }));
          
          setSocialLinks(links);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <footer className="bg-[#0c6303] text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo - Left on large screens, top on small screens */}
        <div className="mb-4 md:mb-0 md:order-1">
          <Image
            src="https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/logo-naebak-white.png"
            alt="نائبك.com"
            width={150}
            height={60}
            className="h-auto"
            priority
            unoptimized
          />
        </div>

        {/* Copyright - Center on large screens, middle on small screens */}
        <div className="text-sm mb-4 md:mb-0 md:order-2 md:flex-grow md:text-center">
          <p>© {new Date().getFullYear()} نائبك.com - جميع الحقوق محفوظة</p>
          <p className="text-xs opacity-75 mt-1">
            آخر نشر: 2025-10-09 06:16 | Commit: 80df594
          </p>
        </div>

        {/* Social Icons - Right on large screens, bottom on small screens */}
        <div className="flex space-x-4 md:order-3">
          {!isLoading && socialLinks.length > 0 ? (
            socialLinks.map((link) => (
              <SocialIcon
                key={link.platform}
                platform={link.platform}
                url={link.url}
              />
            ))
          ) : (
            // Fallback social icons when no data is available
            <>
              <SocialIcon platform="facebook" url="#" />
              <SocialIcon platform="twitter" url="#" />
              <SocialIcon platform="instagram" url="#" />
              <SocialIcon platform="youtube" url="#" />
              <SocialIcon platform="whatsapp" url="#" />
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
