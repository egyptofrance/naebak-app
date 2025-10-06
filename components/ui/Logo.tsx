import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <div className="text-2xl font-bold text-[#004705]">
        نائبك
      </div>
    </Link>
  );
}
