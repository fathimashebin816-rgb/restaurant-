'use client';

import React from 'react';

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  showAddButtonOnly?: boolean;
  onAdd?: () => void;
}

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  size = 'md',
  showAddButtonOnly = false,
  onAdd,
}: QuantityStepperProps) {
  if (showAddButtonOnly) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-surface-container-low hover:bg-primary-container hover:text-on-primary text-primary font-label-md text-label-md transition-all active:scale-95"
        aria-label="Add to cart"
      >
        <span className="material-symbols-outlined text-[16px]">add</span>
        <span>Add</span>
      </button>
    );
  }

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const sizeStyles = {
    sm: 'w-7 h-7 text-[14px]',
    md: 'w-9 h-9 text-[16px]',
  };

  return (
    <div
      className={`flex items-center bg-surface-container-low rounded-full shadow-inner ${size === 'sm' ? 'px-1 py-0.5' : 'px-1.5 py-1'}`}
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className={`flex items-center justify-center rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${sizeStyles[size]}`}
        aria-label="Decrease quantity"
      >
        <span className="material-symbols-outlined">remove</span>
      </button>

      <span
        className={`font-title-sm text-title-sm text-on-surface tabular-nums font-bold ${size === 'sm' ? 'px-3' : 'px-4'}`}
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className={`flex items-center justify-center rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${sizeStyles[size]}`}
        aria-label="Increase quantity"
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
