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
    <footer className="bg-[#004705] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section: White Logo */}
        <div className="text-center mb-8">
          <Image
            src="/logo-naebak-white.png"
            alt="نائبك.com"
            width={200}
            height={80}
            className="mx-auto"
            priority
          />
        </div>

        {/* Middle Section: Copyright Text */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} نائبك.com - جميع الحقوق محفوظة
          </p>
        </div>

        {/* Bottom Section: Social Media Icons Only */}
        <div className="flex justify-center items-center">
          <div className="flex gap-6">
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
    </footer>
  );
}
