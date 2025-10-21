import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

interface CartItem {
  [x: string]: any; // To allow for flexible properties
  productId: string;
  name: string;
  quantity: number;
  price: number;
  sellingPrice: number;
  discountPercentage: number;
  gstPercentage: number;
  shippingCharge: number;
  images: { url: string; alt?: string }[];
}

interface OrderItem {
  _id: string;
  items: {
    product: { _id: string; name: string };
    quantity: number;
    serials: string[];
    price: number;
    gstAmount: number;
    shippingCharge: number;
  }[];
  subTotal: number;
  shippingCharges: number;
  gstAmount: number;
  totalAmount: number;
  payment: {
    method: "COD" | "UPI" | "Card" | "Wallet";
    status: "Pending" | "Completed" | "Failed";
    transactionId?: string;
  };
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface CartState {
  cart: CartItem[];
  orders: OrderItem[];
  loading: boolean;
  error: string | null;
  totalItems: number;

  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<boolean>;
  removeFromCart: (productId: string) => Promise<void>;
  incrementCart: (productId: string) => Promise<void>;
  decrementCart: (productId: string) => Promise<void>;
  checkout: (shippingAddress: ShippingAddress, paymentMethod: string, transactionId?: string) => Promise<OrderItem | null>;
  clearCart: () => void;
  clearError: () => void;
  getTotalItems: () => number;
}

const API_URL = "http://localhost:5000/api/v1";

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

      const res = await axios.get(`${API_URL}/cart/`, {
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
      if (quantity <= 0) return false;
      set({ loading: true, error: null });

      const token = useAuthStore.getState().token;

      const res = await axios.post(
        `${API_URL}/cart/add`,
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
      return true;
    } catch (err: any) {
      console.error("❌ addToCart error:", err);
      set({
        error: err.response?.data?.message || "Failed to add to cart",
        loading: false,
      });
      return false;
    }
  },

  removeFromCart: async (productId: string) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.delete(`${API_URL}/cart/${productId}`, {
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

      const res = await axios.patch(
        `${API_URL}/cart/increment/${productId}`,
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
        `${API_URL}/cart/decrement/${productId}`,
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

  checkout: async (shippingAddress, paymentMethod, transactionId) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.post(
        `${API_URL}/checkout`,
        { shippingAddress, paymentMethod, transactionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set((state) => ({
        cart: [],
        orders: [...state.orders, res.data.order],
        totalItems: 0,
        loading: false,
      }));

      return res.data.order;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Checkout failed",
        loading: false,
      });
      return null;
    }
  },

  clearCart: () => set({ cart: [], totalItems: 0 }),

  clearError: () => set({ error: null }),
}));