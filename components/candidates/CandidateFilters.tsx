'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import ElectoralDistrictInput from '@/components/forms/ElectoralDistrictInput';
import Image from 'next/image';

interface Governorate {
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

interface CandidateFiltersProps {
  governorates: Governorate[];

  parties: Party[];
  symbols: Symbol[];
  onFilterChange: (filters: {
    governorate: string;
    electoralDistrict: string;
    party: string;
    symbol: string;
    search: string;
  }) => void;
}

export default function CandidateFilters({
  governorates,
  electoralDistrict: initialElectoralDistrict,
  parties,
  symbols,
  onFilterChange,
}: CandidateFiltersProps) {
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCouncil, setSelectedCouncil] = useState(initialElectoralDistrict || "");
  const [selectedParty, setSelectedParty] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({
      governorate: selectedGovernorate,
      electoralDistrict: selectedCouncil, // selectedCouncil now holds the manual input
      party: selectedParty,
      symbol: selectedSymbol,
      search: searchTerm,
    });
  };

  const clearFilters = () => {
    setSelectedGovernorate('');
    setSelectedCouncil('');
    setSelectedParty('');
    setSelectedSymbol('');
    setSearchTerm('');
    onFilterChange({
      governorate: "",
      electoralDistrict: "",
      party: "",
      symbol: "",
      search: "",
    });
  };

  const hasActiveFilters = selectedGovernorate || selectedCouncil || selectedParty || selectedSymbol || searchTerm;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="البحث بالاسم..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // Auto-trigger search after typing
              setTimeout(() => {
                onFilterChange({
                  governorate: selectedGovernorate,
                  council: selectedCouncil,
                  party: selectedParty,
                  symbol: selectedSymbol,
                  search: e.target.value,
                });
              }, 300);
            }}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-blue-600 transition-colors"
        >
          <Filter size={20} />
          <span>فلاتر متقدمة</span>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              نشط
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Governorate Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المحافظة
              </label>
              <select
                value={selectedGovernorate}
                onChange={(e) => {
                  setSelectedGovernorate(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">جميع المحافظات</option>
                {governorates.map((governorate) => (
                  <option key={governorate.id} value={governorate.id}>
                    {governorate.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Electoral District Manual Input */}
            <ElectoralDistrictInput
              value={selectedCouncil}
              onChange={(value) => {
                setSelectedCouncil(value);
                handleFilterChange();
              }}
            />

            {/* Party Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحزب
              </label>
              <select
                value={selectedParty}
                onChange={(e) => {
                  setSelectedParty(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">جميع الأحزاب</option>
                {parties.map((party) => (
                  <option key={party.id} value={party.id}>
                    {party.name}
                  </option>
                ))}
                <option value="independent">مستقل</option>
              </select>
            </div>

            {/* Electoral Symbol Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الرمز الانتخابي
              </label>
              <select
                value={selectedSymbol}
                onChange={(e) => {
                  setSelectedSymbol(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">جميع الرموز</option>
                {symbols.map((symbol) => (
                  <option key={symbol.id} value={symbol.id}>
                    {symbol.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Symbol Preview */}
          {selectedSymbol && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-sm font-medium text-blue-900">الرمز المحدد:</span>
                {(() => {
                  const symbol = symbols.find(s => s.id === selectedSymbol);
                  return symbol ? (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {symbol.icon_path && (
                        <div className="w-8 h-8 relative">
                          <Image
                            src={symbol.icon_path}
                            alt={symbol.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-sm font-medium text-blue-900">
                        {symbol.name}
                      </span>
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-red-600 transition-colors"
              >
                <X size={16} />
                <span>مسح الفلاتر</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
