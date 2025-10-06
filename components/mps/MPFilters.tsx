'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

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

interface MPFiltersProps {
  governorates: Governorate[];
  councils: Council[];
  parties: Party[];
  onFilterChange: (filters: {
    governorate: string;
    council: string;
    party: string;
    search: string;
  }) => void;
}

export default function MPFilters({
  governorates,
  councils,
  parties,
  onFilterChange,
}: MPFiltersProps) {
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [selectedCouncil, setSelectedCouncil] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = () => {
    onFilterChange({
      governorate: selectedGovernorate,
      council: selectedCouncil,
      party: selectedParty,
      search: searchTerm,
    });
  };

  const clearFilters = () => {
    setSelectedGovernorate('');
    setSelectedCouncil('');
    setSelectedParty('');
    setSearchTerm('');
    onFilterChange({
      governorate: '',
      council: '',
      party: '',
      search: '',
    });
  };

  const hasActiveFilters = selectedGovernorate || selectedCouncil || selectedParty || searchTerm;

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

            {/* Council Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المجلس
              </label>
              <select
                value={selectedCouncil}
                onChange={(e) => {
                  setSelectedCouncil(e.target.value);
                  handleFilterChange();
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">جميع المجالس</option>
                {councils.map((council) => (
                  <option key={council.id} value={council.id}>
                    {council.name}
                  </option>
                ))}
              </select>
            </div>

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
          </div>

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
