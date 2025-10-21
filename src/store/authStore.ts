import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { JSX } from "react/jsx-runtime";

const API_URL = "http://localhost:5000/api/v1";

interface User {
  [x: string]: any;
  map(
    arg0: (user: any) => JSX.Element
  ): import("react").ReactNode | Iterable<import("react").ReactNode>;
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

  signup: (
    email: string,
    phone: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getProfile: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: {
    name?: string;
    phone?: string;
    role?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  updateUserRole: (
    userId: string,
    role: string
  ) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (userId: string) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (
    email: string
  ) => Promise<{ success: boolean; resetToken?: string; error?: string }>;
  resetPassword: (
    token: string,
    newPassword: string
  ) => Promise<{ success: boolean; error?: string }>;
  getAllUsers: () => Promise<{
    success: boolean;
    users?: User[];
    error?: string;
  }>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      // ✅ Signup
      signup: async (email, phone, password) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.post(`${API_URL}/register`, {
            email,
            phone,
            password,
          });
          const { token, user } = res.data;
          set({ user, token, loading: false });
          return { success: true };
        } catch (err: any) {
          const message = err.response?.data?.message || "Signup failed";
          set({ loading: false, error: message });
          return { success: false, error: message };
        }
      },

      // ✅ Login
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

      // ✅ Logout
      logout: () => {
        set({ user: null, token: null, loading: false, error: null });
      },

      // ✅ Get current user profile
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
          const message =
            err.response?.data?.message || "Failed to load profile";
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      // ✅ Update profile
      updateProfile: async (updatedData: any) => {
        const token = get().token; // get token from store
        if (!token) throw new Error("Not authorized. Token missing.");

        set({ loading: true, error: null });
        try {
          const { data } = await axios.put(`${API_URL}/profile`, updatedData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          // update store user
          set({ user: data.user, loading: false });
          return data.user; // return updated user
        } catch (err: any) {
          const msg =
            err.response?.data?.message ||
            err.message ||
            "Failed to update profile";
          set({ error: msg, loading: false });
          throw new Error(msg);
        }
      },

      // ✅ Admin only — update any user role
      updateUserRole: async (userId, role) => {
        try {
          const token = get().token;
          if (!token) return { success: false, error: "No token" };

          await axios.put(
            `${API_URL}/users/${userId}/role`,
            { role },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          return { success: true };
        } catch (err: any) {
          const message =
            err.response?.data?.message || "Failed to update user role";
          return { success: false, error: message };
        }
      },

      // ✅ Delete user
      deleteUser: async (userId) => {
        try {
          const token = get().token;
          if (!token) return { success: false, error: "No token" };

          await axios.delete(`${API_URL}/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (get().user?.id === userId) set({ user: null, token: null });
          return { success: true };
        } catch (err: any) {
          const message =
            err.response?.data?.message || "Failed to delete user";
          return { success: false, error: message };
        }
      },

      // ✅ Forgot password
      forgotPassword: async (email) => {
        try {
          const res = await axios.post(`${API_URL}/forgot-password`, { email });
          return { success: true, resetToken: res.data.resetToken };
        } catch (err: any) {
          const message =
            err.response?.data?.message || "Failed to send reset email";
          return { success: false, error: message };
        }
      },

      // ✅ Reset password
      resetPassword: async (token, newPassword) => {
        try {
          await axios.post(`${API_URL}/reset-password/${token}`, {
            newPassword,
          });
          return { success: true };
        } catch (err: any) {
          const message =
            err.response?.data?.message || "Failed to reset password";
          return { success: false, error: message };
        }
      },

      // ✅ Get all users
      getAllUsers: async () => {
        try {
          const token = get().token;
          if (!token) return { success: false, error: "No token" };

          const res = await axios.get(`${API_URL}/get-users`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          return { success: true, users: res.data.users };
        } catch (err: any) {
          const message =
            err.response?.data?.message || "Failed to fetch users";
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
