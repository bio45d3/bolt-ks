import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    image: string;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface AuthStore {
  user: User | null;
  orders: Order[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],
      isAuthenticated: false,

      login: async (email, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo, accept any email/password with basic validation
        if (email && password.length >= 6) {
          const user: User = {
            id: `user_${Date.now()}`,
            email,
            firstName: email.split('@')[0],
            lastName: '',
            createdAt: new Date().toISOString(),
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (data.email && data.password.length >= 6) {
          const user: User = {
            id: `user_${Date.now()}`,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            createdAt: new Date().toISOString(),
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...data } });
        }
      },

      addOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          id: `BO-${Date.now().toString().slice(-8)}`,
          date: new Date().toISOString(),
        };
        set((state) => ({ orders: [order, ...state.orders] }));
      },
    }),
    {
      name: 'bolt-auth',
    }
  )
);
