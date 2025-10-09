import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image 
        src="https://brjgqodpzrhjfwteryse.supabase.co/storage/v1/object/public/banner_public_images/logo-naebak-green.png" 
        alt="نائبك.com" 
        width={120}
        height={48}
        className="h-12 w-auto"
        priority
        unoptimized
      />
    </Link>
  );
}
