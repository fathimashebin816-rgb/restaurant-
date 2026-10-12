/**
 * Siluzz Cafe - Type Definitions
 * Based on the design system and HTML mockups
 */

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  image: string;
  price: number;
  calories: number;
  protein: number;
  carbs?: number;
  fat?: number;
  tags: MenuItemTag[];
  dietary: DietaryTag[];
  defaultQty?: number;
}

export type MenuItemTag =
  | 'VEGAN'
  | 'VEG'
  | 'HIGH-PROTEIN'
  | 'RAW'
  | 'NO ADDED SUGAR'
  | 'GLUTEN-FREE'
  | 'KETO / LOW CARB'
  | 'LOW-CALORIE'
  | 'COLD-PRESSED';

export type DietaryTag =
  | 'vegan'
  | 'vegetarian'
  | 'high-protein'
  | 'low-carb'
  | 'keto'
  | 'gluten-free'
  | 'raw'
  | 'no-added-sugar'
  | 'low-calorie';

export interface CartItem extends MenuItem {
  qty: number;
  specialInstructions?: string;
}

export interface CartState {
  items: CartItem[];
  appliedCoupon?: AppliedCoupon;
  specialInstructions?: string;
}

export interface AppliedCoupon {
  code: string;
  discount: number;
  description: string;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  tax: number;
  delivery: number;
  grandTotal: number;
  savings: number;
}

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface CategoryFilter {
  id: string;
  label: string;
  count?: number;
}

export const CATEGORIES: CategoryFilter[] = [
  { id: 'all', label: 'All Dishes' },
  { id: 'low-calorie', label: 'Low-Calorie (<350 kcal)' },
  { id: 'high-protein', label: 'High-Protein' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'keto', label: 'Low-Carb / Keto' },
  { id: 'juices', label: 'Cold-Pressed Juices' },
  { id: 'bowls', label: 'Healthy Bowls' },
];

export const SORT_OPTIONS = [
  { value: 'protein-desc', label: 'Highest Protein' },
  { value: 'cal-asc', label: 'Lowest Calories' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'popular', label: 'Most Popular' },
] as const;

export const VALID_COUPONS: Record<string, { discount: number; description: string }> = {
  'SILUZZHEALTH': { discount: 50, description: '₹50 saved on healthy picks' },
  'ORGANIC20': { discount: 50, description: '₹50 off organic items' },
  'GREEN50': { discount: 50, description: 'Green savings ₹50' },
};

export const GST_RATE = 0.05; // 5%
export const FREE_DELIVERY_THRESHOLD = 299;
export const DELIVERY_FEE = 40;