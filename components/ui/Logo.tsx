import Link from 'next/link';
import Image from 'next/image';
import { SUPABASE_STORAGE_CONFIG, IMAGE_FILES } from '@/lib/supabase-config';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image 
        src={SUPABASE_STORAGE_CONFIG.getPublicImageUrl(IMAGE_FILES.logoGreen)} 
        alt="نائبك.com" 
        width={120}
        height={48}
        className="h-12 w-auto"
        priority
      />
    </Link>
  );
}
