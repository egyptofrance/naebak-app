'use client';

export default function FooterSkeleton() {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Icons Skeleton */}
          <div className="flex items-center gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-white/20 rounded animate-pulse"
              ></div>
            ))}
          </div>

          {/* Copyright Text Skeleton */}
          <div className="w-48 h-4 bg-white/20 rounded animate-pulse"></div>

          {/* Logo Skeleton */}
          <div className="w-24 h-8 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>
    </footer>
  );
}
