'use client';

export default function ContentSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Skeleton */}
      <div className="relative h-96 bg-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-300"></div>
        <div className="absolute bottom-4 right-4">
          <div className="w-64 h-6 bg-white/20 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          {/* Title Skeleton */}
          <div className="w-80 h-10 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
          
          {/* Subtitle Skeleton */}
          <div className="w-96 h-6 bg-gray-200 rounded mx-auto mb-8 animate-pulse"></div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                {/* Icon Skeleton */}
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                
                {/* Card Title Skeleton */}
                <div className="w-32 h-6 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                
                {/* Card Description Skeleton */}
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
