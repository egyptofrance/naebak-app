import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Users, Award } from 'lucide-react';

interface MP {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  total_points: number;
  governorate_id: string;
  governorates: { name: string };
  profiles: {
    slug: string;
    council_id: string;
    councils: { name: string };
    party_id: string | null;
    parties: { name: string } | null;
    is_independent: boolean;
  };
}

interface MPCardProps {
  mp: MP;
}

export default function MPCard({ mp }: MPCardProps) {
  const fullName = `${mp.first_name} ${mp.last_name}`;
  const partyName = mp.profiles.is_independent 
    ? 'مستقل' 
    : mp.profiles.parties?.name || 'غير محدد';

  // Calculate rating based on points (simple formula)
  const rating = Math.min(5, Math.max(0, Math.round(mp.total_points / 100)));

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Avatar and Basic Info */}
      <div className="p-6">
        <div className="flex items-center space-x-4 space-x-reverse mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {mp.avatar ? (
              <Image
                src={mp.avatar}
                alt={fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Users size={24} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {fullName}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <MapPin size={14} className="ml-1" />
              {mp.governorates.name}
            </div>
          </div>
        </div>

        {/* Council and Party */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">المجلس:</span>
            <span className="font-medium text-gray-900">
              {mp.profiles.councils.name}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">الحزب:</span>
            <span className="font-medium text-gray-900">
              {partyName}
            </span>
          </div>
        </div>

        {/* Rating and Points */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 space-x-reverse">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Award size={14} className="ml-1" />
            <span>{mp.total_points} نقطة</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/profile/${mp.profiles.slug}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium"
        >
          عرض الملف الشخصي
        </Link>
      </div>
    </div>
  );
}
