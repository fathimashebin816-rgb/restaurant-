'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { CartItem, CartState, MenuItem, AppliedCoupon, OrderSummary, VALID_COUPONS, GST_RATE, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from './types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QTY'; payload: { id: string; qty: number } }
  | { type: 'SET_SPECIAL_INSTRUCTIONS'; payload: string }
  | { type: 'APPLY_COUPON'; payload: string }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }
  | { type: 'SET_ITEM_INSTRUCTIONS'; payload: { id: string; instructions: string } };

const CART_STORAGE_KEY = 'siluzz-cafe-cart';

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: Math.min(99, item.qty + 1) }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...action.payload,
          qty: 1,
        };
        newItems = [...state.items, newItem];
      }

      return { ...state, items: newItems };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    }

    case 'UPDATE_QTY': {
      const nextQty = Number.isFinite(action.payload.qty)
        ? Math.min(99, Math.floor(action.payload.qty))
        : 0;
      if (nextQty <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: nextQty }
            : item
        ),
      };
    }

    case 'SET_SPECIAL_INSTRUCTIONS': {
      return { ...state, specialInstructions: action.payload };
    }

    case 'SET_ITEM_INSTRUCTIONS': {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, specialInstructions: action.payload.instructions }
            : item
        ),
      };
    }

    case 'APPLY_COUPON': {
      const coupon = VALID_COUPONS[action.payload.toUpperCase()];
      if (!coupon) return state;

      return {
        ...state,
        appliedCoupon: {
          code: action.payload.toUpperCase(),
          discount: coupon.discount,
          description: coupon.description,
        },
      };
    }

    case 'REMOVE_COUPON': {
      return { ...state, appliedCoupon: undefined };
    }

    case 'CLEAR_CART': {
      return { items: [], appliedCoupon: undefined, specialInstructions: undefined };
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  setSpecialInstructions: (instructions: string) => void;
  setItemInstructions: (id: string, instructions: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  orderSummary: OrderSummary;
  itemCount: number;
  uniqueItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateOrderSummary(state: CartState): OrderSummary {
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discount = state.appliedCoupon?.discount || 0;
  const actualDiscount = Math.min(discount, subtotal);
  const taxableAmount = Math.max(0, subtotal - actualDiscount);
  const tax = Math.round(taxableAmount * GST_RATE * 100) / 100;

  // Free delivery for orders above threshold
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  const grandTotal = Math.round((taxableAmount + tax + delivery) * 100) / 100;

  return {
    subtotal,
    discount: actualDiscount,
    tax,
    delivery,
    grandTotal,
    savings: actualDiscount,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    appliedCoupon: undefined,
    specialInstructions: undefined,
  } as CartState);
  const [cartHydrated, setCartHydrated] = React.useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && 'items' in parsed && Array.isArray(parsed.items)) {
          const validItems = parsed.items.filter((item): item is CartItem =>
            !!item && typeof item === 'object' &&
            typeof item.id === 'string' && typeof item.name === 'string' &&
            Number.isFinite(item.price) && item.price >= 0 &&
            Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 99
          );
          dispatch({ type: 'LOAD_CART', payload: { ...parsed, items: validItems } as CartState });
        }
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    } finally {
      setCartHydrated(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!cartHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [state, cartHydrated]);

  const addItem = useCallback((item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    const safeQty = Number.isFinite(qty) ? Math.floor(qty) : 0;
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty: Math.max(0, Math.min(99, safeQty)) } });
  }, []);

  const setSpecialInstructions = useCallback((instructions: string) => {
    dispatch({ type: 'SET_SPECIAL_INSTRUCTIONS', payload: instructions });
  }, []);

  const setItemInstructions = useCallback((id: string, instructions: string) => {
    dispatch({ type: 'SET_ITEM_INSTRUCTIONS', payload: { id, instructions } });
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const coupon = VALID_COUPONS[code.toUpperCase()];
    if (coupon) {
      dispatch({ type: 'APPLY_COUPON', payload: code });
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    dispatch({ type: 'REMOVE_COUPON' });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const orderSummary = calculateOrderSummary(state);
  const itemCount = state.items.reduce((sum, item) => sum + item.qty, 0);
  const uniqueItemCount = state.items.length;

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQty,
        setSpecialInstructions,
        setItemInstructions,
        applyCoupon,
        removeCoupon,
        clearCart,
        orderSummary,
        itemCount,
        uniqueItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
