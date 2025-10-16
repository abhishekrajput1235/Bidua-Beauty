import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore"; // ✅ Import your auth store

const API_URL = "http://localhost:5000/api/v1";

interface BusinessProfile {
  _id?: string;
  user?: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  gstNumber?: string;
  subscriptionStatus?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
}

interface BusinessProfileStore {
  profile: BusinessProfile | null;
  profiles: BusinessProfile[];
  loading: boolean;
  error: string | null;
  success: boolean;

  createProfile: (data: BusinessProfile) => Promise<boolean>;
  fetchMyProfile: () => Promise<void>;
  fetchProfileById: (id: string) => Promise<void>;
  updateProfile: (id: string, data: Partial<BusinessProfile>) => Promise<boolean>;
  deleteProfile: (id: string) => Promise<boolean>;
  clearMessages: () => void;
}

export const useBusinessProfileStore = create<BusinessProfileStore>((set, get) => ({
  profile: null,
  profiles: [],
  loading: false,
  error: null,
  success: false,

  /** ✅ Create new business profile */
  createProfile: async (data) => {
    try {
      set({ loading: true, error: null, success: false });
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("User not authenticated");

      const res = await axios.post(`${API_URL}/business-profile`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ profile: res.data.data, loading: false, success: true });
      return true;
    } catch (err: any) {
      set({ error: err.response?.data?.message || err.message || "Failed to create profile", loading: false });
      return false;
    }
  },

  /** ✅ Fetch current user's profile */
  fetchMyProfile: async () => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("User not authenticated");

      const res = await axios.get(`${API_URL}/my-business-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ profile: res.data.data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || err.message || "Failed to fetch profile", loading: false });
    }
  },

  /** ✅ Fetch profile by ID */
  fetchProfileById: async (id) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("User not authenticated");

      const res = await axios.get(`${API_URL}/business-profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ profile: res.data.data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || err.message || "Failed to fetch profile by ID", loading: false });
    }
  },

  /** ✅ Update profile */
  updateProfile: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("User not authenticated");

      const res = await axios.put(`${API_URL}/business-profile/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ profile: res.data.data, success: true, loading: false });
      return true;
    } catch (err: any) {
      set({ error: err.response?.data?.message || err.message || "Failed to update profile", loading: false });
      return false;
    }
  },

  /** ✅ Delete profile */
  deleteProfile: async (id) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      if (!token) throw new Error("User not authenticated");

      await axios.delete(`${API_URL}/business-profile/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ profile: null, success: true, loading: false });
      return true;
    } catch (err: any) {
      set({ error: err.response?.data?.message || err.message || "Failed to delete profile", loading: false });
      return false;
    }
  },

  /** ✅ Clear error & success messages */
  clearMessages: () => set({ error: null, success: false }),
}));
