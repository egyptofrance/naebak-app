'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import MPCard from '@/components/mps/MPCard';
import MPFilters from '@/components/mps/MPFilters';
import Banner from '@/components/layout/Banner';

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

interface Governorate {
  id: string;
  name: string;
}

interface Council {
  id: string;
  name: string;
}

interface Party {
  id: string;
  name: string;
}

const ITEMS_PER_PAGE = 12;

export default function MPsPage() {
  const [mps, setMps] = useState<MP[]>([]);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [councils, setCouncils] = useState<Council[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Filters
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('');
  const [selectedCouncil, setSelectedCouncil] = useState<string>('');
  const [selectedParty, setSelectedParty] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const supabase = createClientComponentClient();

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch governorates
        const { data: governoratesData } = await supabase
          .from('governorates')
          .select('id, name')
          .order('name');

        // Fetch councils
        const { data: councilsData } = await supabase
          .from('councils')
          .select('id, name')
          .order('name');

        // Fetch parties
        const { data: partiesData } = await supabase
          .from('parties')
          .select('id, name')
          .order('name');

        setGovernorates(governoratesData || []);
        setCouncils(councilsData || []);
        setParties(partiesData || []);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, [supabase]);

  // Fetch MPs with filters
  useEffect(() => {
    const fetchMPs = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('users')
          .select(`
            id,
            first_name,
            last_name,
            avatar,
            total_points,
            governorate_id,
            governorates (name),
            profiles!inner (
              slug,
              council_id,
              councils (name),
              party_id,
              parties (name),
              is_independent
            )
          `)
          .eq('role_id', 4); // MP role

        // Apply filters
        if (selectedGovernorate) {
          query = query.eq('governorate_id', selectedGovernorate);
        }

        if (selectedCouncil) {
          query = query.eq('profiles.council_id', selectedCouncil);
        }

        if (selectedParty) {
          query = query.eq('profiles.party_id', selectedParty);
        }

        if (searchTerm) {
          query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`);
        }

        // Get paginated results (count disabled temporarily)
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE - 1;

        const { data: mpsData } = await query
          .order('total_points', { ascending: false })
          .range(start, end);

        // @ts-ignore - Type mismatch will be fixed later
        setMps(mpsData || []);
        setTotalCount(mpsData?.length || 0);
      } catch (error) {
        console.error('Error fetching MPs:', error);
        setMps([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMPs();
  }, [supabase, selectedGovernorate, selectedCouncil, selectedParty, searchTerm, currentPage]);

  const handleFilterChange = (filters: {
    governorate: string;
    council: string;
    party: string;
    search: string;
  }) => {
    setSelectedGovernorate(filters.governorate);
    setSelectedCouncil(filters.council);
    setSelectedParty(filters.party);
    setSearchTerm(filters.search);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <Banner pageType="mps" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">النواب</h1>
          <p className="text-lg text-gray-600">
            تصفح جميع النواب واطلع على ملفاتهم الشخصية وإنجازاتهم
          </p>
        </div>

        {/* Filters */}
        <MPFilters
          governorates={governorates}
          councils={councils}
          parties={parties}
          onFilterChange={handleFilterChange}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            عدد النتائج: {totalCount} نائب
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* MPs Grid */}
            {mps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {mps.map((mp) => (
                  <MPCard key={mp.id} mp={mp} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">لا توجد نتائج مطابقة للبحث</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  السابق
                </button>
                
                <div className="flex space-x-1 space-x-reverse">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  التالي
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
