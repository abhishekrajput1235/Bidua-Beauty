import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

interface Payment {
  _id?: string;
  user?: string;
  businessProfile?: string | { _id: string; businessName: string };
  amount: number;
  currency?: string;
  paymentMethod: string;
  paymentStatus?: "pending" | "completed" | "failed";
  transactionId: string;
  subscriptionType?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  createdAt?: string;
}

interface PaymentStore {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  success: boolean;

  createPayment: (data: Payment) => Promise<void>;
  fetchMyPayments: () => Promise<void>;
  fetchPaymentById: (id: string) => Promise<void>;
  clearMessages: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  payments: [],
  loading: false,
  error: null,
  success: false,

  /** ✅ Create new payment */
  createPayment: async (data) => {
    try {
      set({ loading: true, error: null, success: false });
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}/payments`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set((state) => ({
        payments: [res.data.data, ...state.payments],
        loading: false,
        success: true,
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create payment",
        loading: false,
      });
    }
  },

  /** ✅ Fetch all payments for logged-in user */
  fetchMyPayments: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/my-payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ payments: res.data.data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch payments",
        loading: false,
      });
    }
  },

  /** ✅ Fetch payment by ID */
  fetchPaymentById: async (id) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/payments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Replace or append payment in state
      set((state) => {
        const existingIndex = state.payments.findIndex((p) => p._id === id);
        if (existingIndex >= 0) {
          const updatedPayments = [...state.payments];
          updatedPayments[existingIndex] = res.data.data;
          return { payments: updatedPayments, loading: false };
        } else {
          return { payments: [res.data.data, ...state.payments], loading: false };
        }
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch payment",
        loading: false,
      });
    }
  },

  clearMessages: () => set({ error: null, success: false }),
}));
