import { create } from "zustand";
import axios from "axios";

interface BusinessProfile {
  _id?: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  gstNumber?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface BusinessProfileState {
  profiles: BusinessProfile[];
  currentProfile: BusinessProfile | null;
  loading: boolean;
  error: string | null;
  message: string | null;

  createProfile: (formData: Omit<BusinessProfile, "_id">, token: string) => Promise<void>;
  fetchProfiles: (token: string) => Promise<void>;
  fetchProfileById: (id: string, token: string) => Promise<void>;
  updateProfile: (id: string, formData: Partial<BusinessProfile>, token: string) => Promise<void>;
  deleteProfile: (id: string, token: string) => Promise<void>;
  clearMessages: () => void;
}

export const useBusinessProfileStore = create<BusinessProfileState>((set) => ({
  profiles: [],
  currentProfile: null,
  loading: false,
  error: null,
  message: null,

  // ✅ Create business profile (auto-upgrades user to B2B via backend)
  createProfile: async (formData, token) => {
    set({ loading: true, error: null, message: null });
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/business-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        loading: false,
        message: data.message || "Business profile created successfully.",
        currentProfile: data.data,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to create profile.",
      });
    }
  },

  // ✅ Fetch all profiles (admin use)
  fetchProfiles: async (token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/business-profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ loading: false, profiles: data.data });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch profiles.",
      });
    }
  },

  // ✅ Fetch single profile
  fetchProfileById: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/business-profile/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ loading: false, currentProfile: data.data });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch profile.",
      });
    }
  },

  // ✅ Update business profile
  updateProfile: async (id, formData, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/business-profile/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      set({
        loading: false,
        message: data.message || "Business profile updated successfully.",
        currentProfile: data.data,
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update profile.",
      });
    }
  },

  // ✅ Delete business profile
  deleteProfile: async (id, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/business-profile/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({
        loading: false,
        message: data.message || "Business profile deleted successfully.",
      });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete profile.",
      });
    }
  },

  clearMessages: () => set({ error: null, message: null }),
}));
