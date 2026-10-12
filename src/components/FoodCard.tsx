'use client';

import React from 'react';
import { MenuItem } from '@/lib/types';
import { Badge } from './ui/Badge';
import { QuantityStepper } from './ui/QuantityStepper';
import { Button } from './ui/Button';
import { useCart } from '@/lib/cartContext';

interface FoodCardProps {
  item: MenuItem;
  inCart?: boolean;
  initialQty?: number;
}

export function FoodCard({ item, inCart = false, initialQty = 1 }: FoodCardProps) {
  const { addItem, updateQty, removeItem } = useCart();
  const isInCart = inCart;

  const handleAdd = () => {
    addItem(item);
  };

  const handleQtyChange = (qty: number) => {
    updateQty(item.id, qty);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const primaryTag = item.tags[0];
  const secondaryTag = item.tags[1];

  return (
    <article
      className="group flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-all"
      data-item-id={item.id}
    >
      {/* Image Section */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-surface-container">
        <img
          src={item.image}
          alt={item.description || item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1 flex-wrap">
          {primaryTag && (
            <Badge variant="primary" dot size="sm">
              {primaryTag}
            </Badge>
          )}
          {secondaryTag && (
            <Badge
              variant={secondaryTag === 'HIGH-PROTEIN' ? 'primary' : 'tertiary'}
              size="sm"
            >
              {secondaryTag}
            </Badge>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1">
        {/* Nutrition Badges */}
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <Badge variant="tertiary" size="sm">
            {item.calories} kcal
          </Badge>
          <Badge variant="primary" size="sm" dot>
            {item.protein}g Protein
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-title-sm text-title-sm text-on-surface mb-1 truncate">
          {item.name}
        </h3>

        {/* Price & Action */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-outline">Price</span>
            <span className="font-title-md text-title-md text-on-surface font-bold">
              ₹{item.price}
            </span>
          </div>

          {isInCart ? (
            <QuantityStepper
              value={initialQty}
              onChange={handleQtyChange}
              size="md"
            />
          ) : (
            <Button variant="primary" size="md" onClick={handleAdd}>
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}