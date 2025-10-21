import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

interface Product {
  _id: string;
  name: string;
  price: number;
  sellingPrice?: number;
  images?: { url: string; alt?: string }[];
}

interface OrderItemDetail {
  product: Product;
  quantity: number;
  serials: string[];
  price: number;
  gstAmount: number;
  shippingCharge: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
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

interface PaymentInfo {
  method: "COD" | "UPI" | "Card" | "Wallet";
  status: "Pending" | "Completed" | "Failed";
  transactionId?: string;
}

export interface Order {
  _id: string;
  user: User;
  items: OrderItemDetail[];
  subTotal: number;
  shippingCharges: number;
  gstAmount: number;
  totalAmount: number;
  payment: PaymentInfo;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  userOrders: Order[];
  allOrders: Order[];
  singleOrder: Order | null;
  loading: boolean;
  error: string | null;

  fetchUserOrders: () => Promise<void>;
  fetchAllOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
  clearSingleOrder: () => void;
  clearError: () => void;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL


export const useOrderStore = create<OrderState>((set) => ({
  userOrders: [],
  allOrders: [],
  singleOrder: null,
  loading: false,
  error: null,

  fetchUserOrders: async () => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.get(`${BASE_URL}/api/v1/order/get-my-order`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ userOrders: res.data.orders || [], loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch user orders",
        loading: false,
      });
    }
  },

  fetchAllOrders: async () => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.get(`${BASE_URL}/api/v1/order/all-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ allOrders: res.data.orders || [], loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch all orders",
        loading: false,
      });
    }
  },

  fetchOrderById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.get(`${BASE_URL}/api/v1/order/get-order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ singleOrder: res.data.order, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch order",
        loading: false,
      });
    }
  },

  clearSingleOrder: () => set({ singleOrder: null }),
  clearError: () => set({ error: null }),
}));
