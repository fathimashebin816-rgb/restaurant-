export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
  available: boolean;
  tags?: string[];
  calories?: number;
  protein?: number;
}

export type Category = 
  | 'coffee'
  | 'tea'
  | 'fresh-juices'
  | 'milkshakes'
  | 'snacks'
  | 'burgers'
  | 'sandwiches'
  | 'desserts';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  fullName: string;
  phoneNumber: string;
  email?: string;
  tableNumber?: string;
  orderType: 'dine-in' | 'takeaway';
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  orderDetails: OrderDetails;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: Date;
  estimatedPrepTime: string;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  icon: string;
  image: string;
}