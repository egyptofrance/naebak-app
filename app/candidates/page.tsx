'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import CandidateCard from '@/components/candidates/CandidateCard';
import CandidateFilters from '@/components/candidates/CandidateFilters';
import Banner from '@/components/layout/Banner';

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

interface Symbol {
  id: string;
  name: string;
  icon_path: string;
}

const ITEMS_PER_PAGE = 12;

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [governorates, setGovernorates] = useState<Governorate[]>([]);

  const [parties, setParties] = useState<Party[]>([]);
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Filters
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('');
  const [selectedElectoralDistrict, setSelectedElectoralDistrict] = useState<string>("");
  const [selectedParty, setSelectedParty] = useState<string>('');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
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



        // Fetch parties
        const { data: partiesData } = await supabase
          .from('parties')
          .select('id, name')
          .order('name');

        // Fetch electoral symbols
        const { data: symbolsData } = await supabase
          .from('symbols')
          .select('id, name, icon_path')
          .order('name');

        setGovernorates(governoratesData || []);

        setParties(partiesData || []);
        setSymbols(symbolsData || []);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, [supabase]);

  // Fetch candidates with filters
  useEffect(() => {
    const fetchCandidates = async () => {
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
              is_independent,
              electoral_symbol_id,
              symbols (name, icon_path),
              electoral_number
            )
          `)
          .eq('role_id', 5); // Candidate role

        // Apply filters
        if (selectedGovernorate) {
          query = query.eq('governorate_id', selectedGovernorate);
        }

        if (selectedElectoralDistrict) {
          query = query.ilike("profiles.district", `%${selectedElectoralDistrict}%`);
        }

        if (selectedParty) {
          query = query.eq('profiles.party_id', selectedParty);
        }

        if (selectedSymbol) {
          query = query.eq('profiles.electoral_symbol_id', selectedSymbol);
        }

        if (searchTerm) {
          query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`);
        }

        // Get paginated results (count disabled temporarily)
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE - 1;

        const { data: candidatesData } = await query
          .order('total_points', { ascending: false })
          .range(start, end);

        // @ts-ignore - Type mismatch will be fixed later
        setCandidates(candidatesData || []);
        setTotalCount(candidatesData?.length || 0);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setCandidates([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [supabase, selectedGovernorate, selectedElectoralDistrict, selectedParty, selectedSymbol, searchTerm, currentPage]);

  const handleFilterChange = (filters: {
    governorate: string;
    electoralDistrict: string;
    party: string;
    symbol: string;
    search: string;
  }) => {
    setSelectedGovernorate(filters.governorate);
    setSelectedElectoralDistrict(filters.electoralDistrict);
    setSelectedParty(filters.party);
    setSelectedSymbol(filters.symbol);
    setSearchTerm(filters.search);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <Banner pageType="candidates" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">المرشحين</h1>
          <p className="text-lg text-gray-600">
            تصفح جميع المرشحين واطلع على ملفاتهم الشخصية وبرامجهم الانتخابية
          </p>
        </div>

        {/* Filters */}
        <CandidateFilters
          governorates={governorates}
          electoralDistrict={selectedElectoralDistrict}
          parties={parties}
          symbols={symbols}
          onFilterChange={handleFilterChange}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            عدد النتائج: {totalCount} مرشح
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Candidates Grid */}
            {candidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {candidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
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
