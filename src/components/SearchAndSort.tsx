'use client';

import React from 'react';
import { SORT_OPTIONS } from '@/lib/types';
import { Input } from './ui/Input';

interface SearchAndSortProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  onFilterClick: () => void;
}

export function SearchAndSort({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onFilterClick,
}: SearchAndSortProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-surface-container-lowest p-3 rounded-xl shadow-sm">
      <div className="relative flex-1">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" aria-hidden="true">
          search
        </span>
        <Input
          type="search"
          placeholder="Search dish, dietary tags, or ingredients..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-10 pl-9 pr-3 rounded-lg bg-surface-container-low focus:bg-surface-container-lowest"
          aria-label="Search menu items"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <label htmlFor="sort-select" className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          aria-label="Sort menu items"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onFilterClick}
          className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1 transition-colors font-label-sm text-label-sm"
          aria-label="Dietary filters"
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span className="hidden sm:inline">Dietary</span>
        </button>
      </div>
    </div>
  );
}