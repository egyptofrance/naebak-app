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
    <footer className="bg-[#004705] text-white py-8">
      <div className="container mx-auto px-4">
        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-4">
          
          {/* Left Section: White Logo */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/logo-naebak-white.png"
              alt="نائبك.com"
              width={150}
              height={60}
              className="h-auto"
              priority
            />
          </div>

          {/* Center Section: Copyright Text */}
          <div className="text-center">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} نائبك.com - جميع الحقوق محفوظة
            </p>
          </div>

          {/* Right Section: Social Media Icons */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex gap-4">
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
          
        </div>
      </div>
    </footer>
  );
}
