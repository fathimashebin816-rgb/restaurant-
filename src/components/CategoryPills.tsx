'use client';

import React from 'react';
import { CATEGORIES, CategoryFilter } from '@/lib/types';

interface CategoryPillsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryPills({ activeCategory, onCategoryChange }: CategoryPillsProps) {
  return (
    <nav
      className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
      role="tablist"
      aria-label="Menu categories"
    >
      {CATEGORIES.map((category: CategoryFilter) => (
        <button
          key={category.id}
          role="tab"
          aria-selected={activeCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap shadow-sm transition-all
            ${activeCategory === category.id
              ? 'bg-primary-container text-on-primary'
              : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant'
            }
          `}
        >
          {category.label}
        </button>
      ))}
    </nav>
  );
}