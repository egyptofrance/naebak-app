'use client';

export default function HeaderSkeleton() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo Skeleton - اليمين */}
          <div className="flex-shrink-0">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Navigation Links Skeleton - الوسط (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-16 h-4 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </nav>

          {/* Right Section Skeleton - اليسار */}
          <div className="flex items-center gap-4">
            {/* عداد الزوار Skeleton */}
            <div className="hidden md:block">
              <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* أزرار تسجيل الدخول والتسجيل Skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-12 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Hamburger Menu Button Skeleton (Mobile) */}
            <div className="lg:hidden">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
