import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Users, Award, Hash, Vote } from 'lucide-react';

interface Candidate {
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
    electoral_symbol_id: string | null;
    symbols: { name: string; icon_path: string } | null;
    electoral_number: string | null;
  };
}

interface CandidateCardProps {
  candidate: Candidate;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  const fullName = `${candidate.first_name} ${candidate.last_name}`;
  const partyName = candidate.profiles.is_independent 
    ? 'مستقل' 
    : candidate.profiles.parties?.name || 'غير محدد';

  // Calculate rating based on points (simple formula)
  const rating = Math.min(5, Math.max(0, Math.round(candidate.total_points / 100)));

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Avatar and Basic Info */}
      <div className="p-6">
        <div className="flex items-center space-x-4 space-x-reverse mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {candidate.avatar ? (
              <Image
                src={candidate.avatar}
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
              {candidate.governorates.name}
            </div>
          </div>
        </div>

        {/* Council and Party */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">المجلس:</span>
            <span className="font-medium text-gray-900">
              {candidate.profiles.councils.name}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">الحزب:</span>
            <span className="font-medium text-gray-900">
              {partyName}
            </span>
          </div>
        </div>

        {/* Electoral Info */}
        {(candidate.profiles.electoral_number || candidate.profiles.symbols) && (
          <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-md">
            {candidate.profiles.electoral_number && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <Hash size={14} className="ml-1" />
                  الرقم الانتخابي:
                </span>
                <span className="font-medium text-blue-600">
                  {candidate.profiles.electoral_number}
                </span>
              </div>
            )}
            {candidate.profiles.symbols && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 flex items-center">
                  <Vote size={14} className="ml-1" />
                  الرمز الانتخابي:
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  {candidate.profiles.symbols.icon_path && (
                    <div className="w-6 h-6 relative">
                      <Image
                        src={candidate.profiles.symbols.icon_path}
                        alt={candidate.profiles.symbols.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="font-medium text-gray-900">
                    {candidate.profiles.symbols.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

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
            <span>{candidate.total_points} نقطة</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/profile/${candidate.profiles.slug}`}
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium"
        >
          عرض الملف الشخصي
        </Link>
      </div>
    </div>
  );
}
