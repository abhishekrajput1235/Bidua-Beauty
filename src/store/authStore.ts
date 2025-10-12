import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

interface User {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  signup: (email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;

  getProfile: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: { name?: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (userId: string) => Promise<{ success: boolean; error?: string }>;

  forgotPassword: (email: string) => Promise<{ success: boolean; resetToken?: string; error?: string }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;

  getAllUsers: () => Promise<{ success: boolean; users?: User[]; error?: string }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      signup: async (email, phone, password) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.post(`${API_URL}/register`, { email, phone, password });
          const { token, user } = res.data;
          set({ user, token, loading: false });
          return { success: true };
        } catch (err: any) {
          const message = err.response?.data?.message || "Signup failed";
          set({ loading: false, error: message });
          return { success: false, error: message };
        }
      },

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.post(`${API_URL}/login`, { email, password });
          const { token, user } = res.data;
          set({ user, token, loading: false });
          return { success: true };
        } catch (err: any) {
          const message = err.response?.data?.message || "Login failed";
          set({ loading: false, error: message });
          return { success: false, error: message };
        }
      },

      logout: () => {
        set({ user: null, token: null, loading: false, error: null });
      },

      getProfile: async () => {
        try {
          const token = get().token;
          if (!token) return { success: false, error: "No token" };

          set({ loading: true });
          const res = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({ user: res.data.user, loading: false });
          return { success: true };
        } catch (err: any) {
          const message = err.response?.data?.message || "Failed to load profile";
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      updateProfile: async (data) => {
        try {
          const token = get().token;
          if (!token) return { success: false, error: "No token" };

          const res = await axios.put(`${API_URL}/profile`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({ user: res.data.user });
          return { success: true };
        } catch (err: any) {
          const message = err.response?.data?.message || "Failed to update profile";
          return { success: false, error: message };
        }
      },

      deleteUser: async (userId) => {
        try {
          const token = get().token;
          if (!token) return { success: false, error: "No token" };

          await axios.delete(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (get().user?.id === userId) {
            set({ user: null, token: null });
          }

          return { success: true };
        } catch (err: any) {
          const message = err.response?.data?.message || "Failed to delete user";
          return { success: false, error: message };
        }
      },

      forgotPassword: async (email) => {
        try {
          const res = await axios.post(`${API_URL}/forgot-password`, { email });
          return { success: true, resetToken: res.data.resetToken };
        } catch (err: any) {
          const message = err.response?.data?.message || "Failed to send reset email";
          return { success: false, error: message };
        }
      },

      resetPassword: async (token, newPassword) => {
        try {
          await axios.post(`${API_URL}/reset-password/${token}`, { newPassword });
          return { success: true };
        } catch (err: any) {
          const message = err.response?.data?.message || "Failed to reset password";
          return { success: false, error: message };
        }
      },

      getAllUsers: async () => {
        try {
          const token = get().token;
          if (!token) return { success: false, error: "No token" };

          const res = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          return { success: true, users: res.data.users };
        } catch (err: any) {
          const message = err.response?.data?.message || "Failed to fetch users";
          return { success: false, error: message };
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
