import { create } from 'zustand';
import axios from 'axios';
import { useAuthStore } from './authStore';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Transaction {
  _id?: string;
  type: 'credit' | 'debit' | 'withdrawal';
  amount: number;
  description?: string;
  method?: 'razorpay' | 'cod' | 'refund' | 'manual' | 'reward' | 'adjustment' | 'withdrawal';
  orderId?: string;
  status?: 'success' | 'pending' | 'failed' | 'approved' | 'rejected';
  balanceAfter?: number;
  createdAt?: string;
}

interface Wallet {
  _id: string;
  user: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
  isActive: boolean;
  totalRealized: number;
  escrowPending: number;
}

interface WalletState {
  wallet: Wallet | null;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  totalRealized: number;
  escrowPending: number;
  getWallet: () => Promise<void>;
  addTransaction: (transactionData: Transaction) => Promise<void>;
  requestWithdrawal: (amount: number) => Promise<void>;
}

const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  transactions: [],
  loading: false,
  error: null,
  totalRealized: 0,
  escrowPending: 0,
  getWallet: async () => {
    set({ loading: true, error: null });
    try {
      const { token } = useAuthStore.getState();
      if (!token) {
        throw new Error("No authentication token found.");
      }
      const response = await axios.get<{ data: Wallet }>(`${API_BASE_URL}/api/v1/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        wallet: response.data.data,
        transactions: response.data.data.transactions || [],
        totalRealized: response.data.data.totalRealized,
        escrowPending: response.data.data.escrowPending,
        loading: false
      });
    } catch (error: any) {
      set({ error: `Failed to fetch wallet: ${error.response?.data?.msg || error.message}`, loading: false });
    }
  },
  addTransaction: async (transactionData) => {
    set({ loading: true, error: null });
    try {
      const { token } = useAuthStore.getState();
      if (!token) {
        throw new Error("No authentication token found.");
      }
      const response = await axios.post<{ data: Wallet }>(`${API_BASE_URL}/api/v1/wallet/transactions`, transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        ...state,
        wallet: response.data.data,
        transactions: response.data.data.transactions || [],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: `Failed to add transaction: ${error.response?.data?.msg || error.message}`, loading: false });
    }
  },
  requestWithdrawal: async (amount) => {
    set({ loading: true, error: null });
    try {
      const { token } = useAuthStore.getState();
      if (!token) {
        throw new Error("No authentication token found.");
      }
      const response = await axios.post<{ data: Wallet }>(`${API_BASE_URL}/api/v1/wallet/withdraw`, { amount }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        ...state,
        wallet: response.data.data,
        transactions: response.data.data.transactions || [],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: `Failed to request withdrawal: ${error.response?.data?.msg || error.message}`, loading: false });
    }
  },
}));

export default useWalletStore;
