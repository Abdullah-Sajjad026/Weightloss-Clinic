export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  category: 'injections' | 'pills-tablets' | 'bariatric-surgery';
  variant?: string; // For dosage/strength like "2.5mg", "5mg", etc.
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  isprescription: boolean;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  isOpen: boolean;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}

export type CartStore = CartState & CartActions;

// For order management
export interface Order {
  id: string;
  userId?: string;
  customerEmail: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  prescriptionRequired: boolean;
  prescriptionUploaded?: boolean;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  
  // Billing Address
  billingIsSameAsShipping: boolean;
  billingStreet?: string;
  billingCity?: string;
  billingPostalCode?: string;
  billingCountry?: string;
  
  // Additional Info
  specialInstructions?: string;
  marketingOptIn: boolean;
  termsAccepted: boolean;
}