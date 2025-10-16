import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

interface CartItem {
  [x: string]: number;
  price: number;
  productId: string;
  name: string;
  sellingPrice: number;
  discountPercentage: number;
  images: { url: string; alt: string; _id: string }[];
  quantity: number;
}

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  units: string[];
  price: number;
  totalPrice: number;
  createdAt?: string;
}

interface CartState {
  cart: CartItem[];
  orders: OrderItem[];
  loading: boolean;
  error: string | null;
  totalItems: number;

  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  incrementCart: (productId: string) => Promise<void>;
  decrementCart: (productId: string) => Promise<void>;
  checkout: () => Promise<void>;
  clearError: () => void;
  getTotalItems: () => number;
}

// const API_URL = "https://backend.biduabeauty.com/api/v1/cart";
const API_URL = "http://localhost:5000/api/v1/cart";



export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  orders: [],
  loading: false,
  error: null,
  totalItems: 0,

  getTotalItems: () =>
    get().cart.reduce((sum, item) => sum + (item.quantity || 0), 0),

  fetchCart: async () => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.get(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartData = Array.isArray(res.data.cart) ? res.data.cart : [];
      const ordersData = Array.isArray(res.data.orders) ? res.data.orders : [];

      set({
        cart: cartData,
        orders: ordersData,
        totalItems: cartData.reduce((sum, item) => sum + item.quantity, 0),
        loading: false,
      });
    } catch (err: any) {
      console.error("❌ fetchCart error:", err);
      set({
        error: err.response?.data?.message || "Failed to fetch cart",
        loading: false,
      });
    }
  },

  addToCart: async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) return;
      set({ loading: true, error: null });

      const token = useAuthStore.getState().token;
      console.log("Adding to cart", { productId, quantity, token });

      const res = await axios.post(
        `${API_URL}/add`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set({
        cart: res.data.cart || [],
        totalItems: (res.data.cart || []).reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        ),
        loading: false,
      });
    } catch (err: any) {
      console.error("❌ addToCart error:", err);
      set({
        error: err.response?.data?.message || "Failed to add to cart",
        loading: false,
      });
    }
  },

  removeFromCart: async (productId: string) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({
        cart: res.data.cart || [],
        totalItems: (res.data.cart || []).reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        ),
        loading: false,
      });
    } catch (err: any) {
      console.error("❌ removeFromCart error:", err);
      set({
        error: err.response?.data?.message || "Failed to remove from cart",
        loading: false,
      });
    }
  },

  incrementCart: async (productId: string) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      // Controller expects productId in body, but route has param
      const res = await axios.patch(
        `${API_URL}/increment/${productId}`,
        {productId},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set({
        cart: res.data.cart || [],
        totalItems: (res.data.cart || []).reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        ),
        loading: false,
      });
    } catch (err: any) {
      console.error("❌ incrementCart error:", err);
      set({
        error: err.response?.data?.message || "Failed to increment cart",
        loading: false,
      });
    }
  },

  decrementCart: async (productId: string) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.patch(
        `${API_URL}/decrement/${productId}`,
        {productId},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set({
        cart: res.data.cart || [],
        totalItems: (res.data.cart || []).reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        ),
        loading: false,
      });
    } catch (err: any) {
      console.error("❌ decrementCart error:", err);
      set({
        error: err.response?.data?.message || "Failed to decrement cart",
        loading: false,
      });
    }
  },

  checkout: async () => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.post(
        `${API_URL}/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set({
        cart: [],
        orders: res.data.orders || [],
        totalItems: 0,
        loading: false,
      });
    } catch (err: any) {
      console.error("❌ checkout error:", err);
      set({
        error: err.response?.data?.message || "Checkout failed",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
