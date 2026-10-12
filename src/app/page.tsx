'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MENU_ITEMS, getFilteredMenuItems } from '@/lib/menuData';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/types';
import { FoodCard } from '@/components/FoodCard';
import { CategoryPills } from '@/components/CategoryPills';
import { SearchAndSort } from '@/components/SearchAndSort';
import { CartSidebar } from '@/components/CartSidebar';
import { useCart } from '@/lib/cartContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function MenuPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const { state, uniqueItemCount, itemCount } = useCart();

  const filteredItems = useMemo(() => {
    return getFilteredMenuItems(activeCategory, searchQuery, sortBy);
  }, [activeCategory, searchQuery, sortBy]);

  const cartItemsMap = useMemo(() => {
    const map: Record<string, number> = {};
    state.items.forEach(item => {
      map[item.id] = item.qty;
    });
    return map;
  }, [state.items]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="home-sticky-header bg-surface-container-lowest border-b border-outline-variant/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[18px]">nutrition</span>
              </div>
              <span className="font-title-sm text-title-sm text-primary">Siluzz Cafe</span>
            </div>

            {/* Mobile Cart Button */}
            <div className="lg:hidden flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => router.push('/checkout')}>
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary-container text-on-secondary text-[10px] flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-primary-container text-on-primary-container shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">eco</span>
            </div>
            <div>
              <h2 className="font-title-sm text-title-sm font-bold">Free Eco Delivery Unlocked!</h2>
              <p className="font-body-sm text-body-sm text-on-primary-container/85">
                Organic, biodegradable sugarcane packaging applied to this entire order.
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-surface-container-lowest/20 backdrop-blur-md px-3 py-1.5 rounded-xl shrink-0">
            <span className="material-symbols-outlined text-on-primary-container text-[16px]">electric_moped</span>
            <span className="font-label-sm text-label-sm text-on-primary-container uppercase font-semibold">Zero Carbon</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column - Menu */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Category Pills */}
            <CategoryPills
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Search & Sort */}
            <SearchAndSort
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onFilterClick={() => {}}
            />

            {/* Section Title & Counter */}
            <div className="home-headline-sticky flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-title-md text-title-md text-on-surface">Artisanal Plates & Elixirs</h2>
                <Badge variant="tertiary" size="sm">
                  {filteredItems.length} Available
                </Badge>
              </div>
              <span className="font-body-sm text-body-sm text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                Kitchen prep time: 15–20 mins
              </span>
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const qty = cartItemsMap[item.id];
                return (
                  <FoodCard
                    key={item.id}
                    item={item}
                    inCart={!!qty}
                    initialQty={qty || 1}
                  />
                );
              })}

              {filteredItems.length === 0 && (
                <div className="col-span-full text-center py-12 bg-surface-container-lowest rounded-2xl shadow-sm">
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant block mb-2">search_off</span>
                  <h3 className="font-title-md text-title-md text-on-surface">No dishes found</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>

            {/* Ingredient Guarantee Banner */}
            <div className="mt-4 p-4 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                  <span className="material-symbols-outlined text-[26px]">energy_savings_leaf</span>
                </div>
                <div>
                  <span className="font-title-sm text-title-sm text-on-surface">The Siluzz Transparency Guarantee</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    We print verified micro & macro breakdown on every biodegradable delivery package.
                  </p>
                </div>
              </div>
              <Button variant="tertiary" size="sm">
                Read Sourcing Report
              </Button>
            </div>
          </div>

          {/* Right Column - Cart Sidebar */}
          <CartSidebar />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[18px]">nutrition</span>
                </div>
                <span className="font-title-sm text-title-sm text-primary">Siluzz Cafe</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Holistic, chef-curated wholesome bowls and cold-pressed elixirs crafted for daily vitality and mindful wellness.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-title-sm text-title-sm text-on-surface mb-2">Kitchen Hub</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">100ft Road, Indiranagar</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Bengaluru, Karnataka 560038</span>
              <span className="font-body-sm text-body-sm text-primary font-semibold">Daily: 7:00 AM - 11:00 PM</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-title-sm text-title-sm text-on-surface mb-2">Explore Siluzz</span>
              <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Seasonal Harvest Menu</a>
              <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Calorie & Macro Breakdown</a>
              <a href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">Wholesome Weekly Plans</a>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-title-sm text-title-sm text-on-surface mb-2">Ingredient Transparency</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                100% cold-pressed oils • Zero refined sugar • Regenerative farm sourcing
              </p>
              <a href="#" className="font-body-sm text-body-sm text-primary hover:underline font-semibold">
                View Full Sourcing Report
              </a>
            </div>
          </div>

          <div className="border-t border-surface-container-high pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-on-surface-variant">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[16px]">eco</span>
              </div>
              <span className="font-title-sm text-title-sm text-on-surface">Siluzz Cafe</span>
              <span className="font-body-sm text-body-sm text-tertiary">• Fresh, organic wholesome dining</span>
            </div>
            <div className="flex items-center gap-4 font-label-md text-label-md">
              <a href="#" className="hover:text-on-surface transition-colors">Menu</a>
              <a href="#" className="hover:text-on-surface transition-colors">Special Diets</a>
              <a href="#" className="hover:text-on-surface transition-colors">Our Kitchen</a>
              <a href="#" className="hover:text-on-surface transition-colors">Past Orders</a>
            </div>
            <div className="font-body-sm text-body-sm text-outline">
              © 2025 Siluzz Cafe. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
