import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, color: string) => void;
  updateQuantity: (id: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.color === item.color
          );
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.color === item.color
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },
      
      removeItem: (id, color) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.color === color)),
        }));
      },
      
      updateQuantity: (id, color, quantity) => {
        if (quantity < 1) {
          get().removeItem(id, color);
          return;
        }
        
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.color === color ? { ...i, quantity } : i
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'bolt-cart',
    }
  )
);
