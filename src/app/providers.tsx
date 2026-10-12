'use client';

import React, { ReactNode } from 'react';
import { CartProvider } from '@/lib/cartContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}