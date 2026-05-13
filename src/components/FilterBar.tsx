import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import type { SortOption } from '../types';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption | '';
  setSortOption: (option: SortOption | '') => void;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative w-full sm:min-w-[220px]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full bg-slate-50/50 border border-slate-200 text-slate-500 py-4 px-6 rounded-3xl transition-all duration-500 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-slate-100/50 hover:border-slate-300 ${isOpen ? 'ring-4 ring-blue-500/5 bg-white border-blue-200 shadow-sm' : ''}`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {icon}
          <span className={`truncate ${value ? 'text-slate-900' : ''}`}>{value ? selectedOption?.label : label}</span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-500 shrink-0 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-3 z-50 overflow-hidden transform-gpu transition-all">
          <div className="max-h-[300px] overflow-y-auto no-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:bg-blue-50/50 group/item ${value === option.value ? 'text-blue-600 bg-blue-50/30' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <span className="truncate">{option.label}</span>
                {value === option.value && (
                  <div className="bg-blue-600 rounded-full p-0.5">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categoryOptions = [
    { label: 'All Categories', value: '' },
    ...categories.map(c => ({ label: c, value: c }))
  ];

  const sortOptions = [
    { label: 'Sort Orders', value: '' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Name: A to Z', value: 'name-asc' },
    { label: 'Name: Z to A', value: 'name-desc' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-3 md:p-4 shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-slate-200 mb-12 md:sticky md:top-24 z-40 flex flex-col lg:flex-row gap-4 items-center">
      
      {/* Search & Toggle Group */}
      <div className="flex items-center w-full lg:w-auto flex-grow gap-3">
        <div className="relative flex-grow group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-5 py-4 border border-slate-200 rounded-3xl bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-200 transition-all duration-500 text-sm font-medium"
            placeholder="Search for perfection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={`lg:hidden flex items-center justify-center w-[52px] h-[52px] rounded-3xl border transition-all duration-300 ${showMobileFilters ? 'bg-blue-600 border-blue-600 text-white shadow-[0_10px_20px_rgba(37,_99,_235,_0.2)]' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
        >
          <SlidersHorizontal className={`w-5 h-5 transition-transform duration-500 ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Dropdowns (Collapsible on Mobile) */}
      <div className={`${showMobileFilters ? 'flex animate-in fade-in slide-in-from-top-4' : 'hidden lg:flex'} flex-col sm:flex-row w-full lg:w-auto gap-3 mt-2 lg:mt-0`}>
        <CustomSelect 
          label="Categories"
          value={selectedCategory}
          options={categoryOptions}
          onChange={setSelectedCategory}
        />

        <CustomSelect 
          label="Sort By"
          value={sortOption}
          options={sortOptions}
          onChange={(val) => setSortOption(val as SortOption)}
          icon={<SlidersHorizontal className="h-3.5 w-3.5" />}
        />
      </div>
    </div>
  );
};
