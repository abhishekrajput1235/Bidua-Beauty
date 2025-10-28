// src/store/b2bProfile.ts
import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "./authStore";

/**
 * Types
 */

export interface SubscriptionPayment {
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  paidAt?: string;
  amount?: number;
  currency?: string;
}

export interface BusinessProfile {
  _id?: string;
  user: string | any;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  gstNumber?: string | null;
  subscriptionStatus?: "pending" | "active" | "expired";
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  subscriptionPayment?: SubscriptionPayment;
  subscriptionRazorpayOrderId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
  [key: string]: unknown;
}

export interface PaymentRecord {
  _id?: string;
  user: string;
  businessProfile?: string;
  paymentFor: "subscription" | "product";
  order?: string | null;
  amount: number;
  currency?: string;
  paymentMethod: string;
  paymentStatus: "pending" | "success" | "failed" | "refunded" | "completed";
  transactionId: string;
  subscriptionType?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Store interface
 */
interface BusinessProfileStore {
  // data
  profiles: BusinessProfile[];
  myProfile: BusinessProfile | null;
  currentProfile: BusinessProfile | null;
  razorpayOrder: RazorpayOrder | null;
  paymentRecord: PaymentRecord | null;
  businessData: Omit<BusinessProfile, "_id" | "user"> | null;

  // status
  loading: boolean;
  error: string | null;
  successMessage: string | null;

  // actions
  setBusinessData: (data: Omit<BusinessProfile, "_id" | "user">) => void;
  createProfile: (data: Omit<BusinessProfile, "_id" | "user">) => Promise<{ razorpayOrder?: RazorpayOrder; paymentRecord?: PaymentRecord } | void>;
  verifyPayment: (payload: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; businessProfileId: string; }) => Promise<void>;
  getAllProfiles: () => Promise<void>;
  getProfileById: (id: string) => Promise<void>;
  getMyProfile: () => Promise<void>;

  updateProfile: (id: string, data: Partial<BusinessProfile>) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  clearError: () => void;
  resetStatus: () => void;
}

/**
 * API base
 */
const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/b2b` : "http://localhost:5000/api/v1/b2b";

/**
 * Axios instance (minimal). It will add Authorization header using token from authStore.
 */
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 20_000,
});

// Request interceptor to attach token from authStore if available.
// Using useAuthStore.getState() ensures we always get the latest token (no stale closure).
axiosInstance.interceptors.request.use((config) => {
  try {
    const { token } = useAuthStore.getState();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

/**
 * Helper to extract error message
 */
function extractErrorMessage(err: unknown): string {
  if (!err) return "Unknown error";
  if ((err as AxiosError).isAxiosError) {
    const aErr = err as AxiosError;
    return (aErr.response?.data?.message as string) || aErr.message || "Network / Axios error";
  }
  return (err as Error).message || String(err);
}

/**
 * Zustand store
 */
export const useBusinessProfileStore = create<BusinessProfileStore>((set, get) => ({
  // initial state
  profiles: [],
  myProfile: null,
  currentProfile: null,
  razorpayOrder: null,
  paymentRecord: null,
  businessData: null,

  loading: false,
  error: null,
  successMessage: null,

  // actions
  setBusinessData: (data) => set({ businessData: data }),
  createProfile: async (data) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const res = await axiosInstance.post("/business-profile", data);
      // expect response:
      // { message, businessProfile, paymentRecord, razorpayOrder, razorpayKeyId, amount }
      const body = res.data || {};

      // update store
      if (body.businessProfile) {
        set({ myProfile: body.businessProfile });
      }
      if (body.razorpayOrder) {
        set({ razorpayOrder: body.razorpayOrder });
      } else {
        set({ razorpayOrder: null });
      }
      if (body.paymentRecord) {
        set({ paymentRecord: body.paymentRecord });
      } else {
        set((s) => ({ ...s }));
      }

      if (body.message) set({ successMessage: body.message });

      return {
        razorpayOrder: body.razorpayOrder,
        paymentRecord: body.paymentRecord,
      };
    } catch (err) {
      const message = extractErrorMessage(err);
      set({ error: message });
      console.error("createProfile error:", err);
    } finally {
      set({ loading: false });
    }
  },

  verifyPayment: async (payload) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const res = await axiosInstance.post("/business-profile/verify", payload);
      const body = res.data || {};
      if (body.data) {
        set({ myProfile: body.data });
      }
      if (body.message) set({ successMessage: body.message });
    } catch (err) {
      const message = extractErrorMessage(err);
      set({ error: message });
      console.error("verifyPayment error:", err);
    } finally {
      set({ loading: false });
    }
  },

  getAllProfiles: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/business-profiles");
      const body = res.data || {};
      set({ profiles: body.data || [] });
    } catch (err) {
      const message = extractErrorMessage(err);
      set({ error: message });
      console.error("getAllProfiles error:", err);
    } finally {
      set({ loading: false });
    }
  },

  getProfileById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/business-profile/${id}`);
      const body = res.data || {};
      set({ currentProfile: body.data || null });
    } catch (err) {
      const message = extractErrorMessage(err);
      set({ error: message });
      console.error("getProfileById error:", err);
    } finally {
      set({ loading: false });
    }
  },

  getMyProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/my-business-profile");
      const body = res.data || {};
      set({ myProfile: body.data || null });
    } catch (err) {
      const message = extractErrorMessage(err);
      set({ error: message });
      console.error("getMyProfile error:", err);
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (id, data) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const res = await axiosInstance.put(`/business-profile/${id}`, data);
      const body = res.data || {};
      if (body.data) {
        // update either currentProfile or myProfile if it matches
        set((state) => {
          const updated = body.data;
          const newProfiles = state.profiles.map((p) => (p._id === id ? updated : p));
          const newMy = state.myProfile && state.myProfile._id === id ? updated : state.myProfile;
          const newCurrent = state.currentProfile && state.currentProfile._id === id ? updated : state.currentProfile;
          return { profiles: newProfiles, myProfile: newMy, currentProfile: newCurrent, successMessage: body.message || "Updated profile" };
        });
      }
    } catch (err) {
      const message = extractErrorMessage(err);
      set({ error: message });
      console.error("updateProfile error:", err);
    } finally {
      set({ loading: false });
    }
  },

  deleteProfile: async (id) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      await axiosInstance.delete(`/business-profile/${id}`);
      set((state) => ({
        profiles: state.profiles.filter((p) => p._id !== id),
        myProfile: state.myProfile && state.myProfile._id === id ? null : state.myProfile,
        currentProfile: state.currentProfile && state.currentProfile._id === id ? null : state.currentProfile,
        successMessage: "Profile deleted successfully",
      }));
    } catch (err) {
      const message = extractErrorMessage(err);
      set({ error: message });
      console.error("deleteProfile error:", err);
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
  resetStatus: () => set({ error: null, successMessage: null }),
}));
