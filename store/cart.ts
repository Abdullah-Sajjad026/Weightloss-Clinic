import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartStore, CartItem } from '@/types/cart';

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      itemCount: 0,
      totalPrice: 0,
      isOpen: false,

      // Actions
      addItem: (newItem) => {
        const { items } = get();
        const quantity = newItem.quantity ?? 1;
        
        // Check if item with same productId and variant already exists
        const existingItemIndex = items.findIndex(
          (item) => item.productId === newItem.productId && item.variant === newItem.variant
        );

        let updatedItems: CartItem[];
        
        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          updatedItems = items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          const cartItem: CartItem = {
            ...newItem,
            id: `${newItem.productId}-${newItem.variant || 'default'}-${Date.now()}`,
            quantity,
          };
          updatedItems = [...items, cartItem];
        }

        // Calculate new totals
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({
          items: updatedItems,
          itemCount,
          totalPrice,
          isOpen: true, // Open cart when item is added
        });
      },

      removeItem: (itemId) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.id !== itemId);
        
        // Calculate new totals
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({
          items: updatedItems,
          itemCount,
          totalPrice,
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const { items } = get();
        const updatedItems = items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );

        // Calculate new totals
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({
          items: updatedItems,
          itemCount,
          totalPrice,
        });
      },

      clearCart: () => {
        set({
          items: [],
          itemCount: 0,
          totalPrice: 0,
          isOpen: false,
        });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      openCart: () => {
        set({ isOpen: true });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist cart items and totals, not the isOpen state
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount,
        totalPrice: state.totalPrice,
      }),
      // Rehydrate the state and recalculate totals on load
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Recalculate totals in case of data inconsistency
          const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          
          state.itemCount = itemCount;
          state.totalPrice = totalPrice;
          state.isOpen = false; // Always start with cart closed
        }
      },
    }
  )
);

export default useCartStore;