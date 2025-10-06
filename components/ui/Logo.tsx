import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image 
        src="/logo-naebak-green.png" 
        alt="نائبك.com" 
        width={120}
        height={48}
        className="h-12 w-auto"
        priority
      />
    </Link>
  );
}
