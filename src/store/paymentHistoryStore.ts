import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Payment {
  status: any;
  paymentId: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  _id: string;
  user: User;
  amount: number;
  paymentStatus: "Completed" | "Pending" | "Failed" | "success";
  transactionId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentHistoryState {
  payments: Payment[];
  loading: boolean;
  error: string | null;

  fetchPayments: () => Promise<void>;
  clearError: () => void;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const usePaymentHistoryStore = create<PaymentHistoryState>((set) => ({
  payments: [],
  loading: false,
  error: null,

  fetchPayments: async () => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;

      const res = await axios.get(`${BASE_URL}/api/v1/payment-history/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ payments: res.data.data || [], loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch payments",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
