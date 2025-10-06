'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';

interface SocialIconProps {
  platform: string;
  url: string;
}

const getSocialIcon = (platform: string) => {
  const iconProps = {
    size: 24,
    className: "text-white hover:text-gray-300 transition-colors duration-200"
  };

  switch (platform.toLowerCase()) {
    case 'facebook':
      return <Facebook {...iconProps} />;
    case 'twitter':
      return <Twitter {...iconProps} />;
    case 'instagram':
      return <Instagram {...iconProps} />;
    case 'youtube':
      return <Youtube {...iconProps} />;
    case 'whatsapp':
      return <MessageCircle {...iconProps} />;
    default:
      return <Facebook {...iconProps} />; // Fallback
  }
};

const getSocialLabel = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return 'Facebook';
    case 'twitter':
      return 'Twitter';
    case 'instagram':
      return 'Instagram';
    case 'youtube':
      return 'YouTube';
    case 'whatsapp':
      return 'WhatsApp';
    default:
      return platform;
  }
};

export default function SocialIcon({ platform, url }: SocialIconProps) {
  const isValidUrl = url && url !== '#' && url.trim() !== '';
  
  if (!isValidUrl) {
    return (
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-not-allowed opacity-50">
        {getSocialIcon(platform)}
      </div>
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 group"
      aria-label={`Visit our ${getSocialLabel(platform)} page`}
    >
      {getSocialIcon(platform)}
    </Link>
  );
}
