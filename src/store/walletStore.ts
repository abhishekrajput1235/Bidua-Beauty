import { create } from 'zustand';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Transaction {
  _id?: string;
  type: 'credit' | 'debit';
  amount: number;
  description?: string;
  method?: 'razorpay' | 'cod' | 'refund' | 'manual' | 'reward' | 'adjustment';
  orderId?: string;
  status?: 'success' | 'pending' | 'failed';
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
}

interface WalletState {
  wallet: Wallet | null;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  getWallet: () => Promise<void>;
  addTransaction: (transactionData: Transaction) => Promise<void>;
  getWalletTransactions: () => Promise<void>;
}

const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  transactions: [],
  loading: false,
  error: null,
  getWallet: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/wallet`);
      set({ wallet: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch wallet', loading: false });
    }
  },
  addTransaction: async (transactionData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/wallet/transactions`, transactionData);
      set((state) => ({
        ...state,
        wallet: response.data,
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add transaction', loading: false });
    }
  },
  getWalletTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/wallet/transactions`);
      set({ transactions: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch transactions', loading: false });
    }
  },
}));

export default useWalletStore;
