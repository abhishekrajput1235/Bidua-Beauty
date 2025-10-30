


// import { create } from "zustand";
// import axios from "axios";

// const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1/order`;

// export interface OrderItem {
//   product: any;
//   quantity: number;
//   serials: string[];
//   price: number;
//   gstAmount: number;
//   shippingCharge: number;
//   status: string;
// }

// export interface Order {
//   _id: string;
//   user: any;
//   items: OrderItem[];
//   subTotal: number;
//   shippingCharges: number;
//   gstAmount: number;
//   totalAmount: number;
//   payment: {
//     method: string;
//     status: string;
//     transactionId?: string;
//   };
//   orderStatus: string;
//   shippingAddress?: {
//     fullName?: string;
//     phone?: string;
//     street?: string;
//     city?: string;
//     state?: string;
//     postalCode?: string;
//     country?: string;
//   };
//   createdAt: string;
// }

// interface OrderState {
//   orders: Order[];
//   allOrders: Order[];
//   selectedOrder: Order | null;
//   loading: boolean;
//   error: string | null;

//   // Actions
//   fetchUserOrders: (token: string) => Promise<void>;
//   fetchAllOrders: (token: string) => Promise<void>;
//   fetchOrderById: (id: string, token: string) => Promise<void>;
//   createBrppOrder: (amount: number, userId: string, token: string) => Promise<Order | null>;
//   updateProductStatus: (orderId: string, productId: string, status: string, token: string) => Promise<void>;
// }

// export const useOrderStore = create<OrderState>((set, get) => ({
//   orders: [],
//   allOrders: [],
//   selectedOrder: null,
//   loading: false,
//   error: null,

//   // Fetch logged-in user's orders
//   fetchUserOrders: async (token) => {
//     try {
//       set({ loading: true, error: null });
//       const res = await axios.get(`${API_URL}/get-my-order`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ orders: res.data.orders, loading: false });
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Failed to fetch orders", loading: false });
//     }
//   },

//   // Admin: Fetch all orders
//   fetchAllOrders: async (token) => {
//     try {
//       set({ loading: true, error: null });
//       const res = await axios.get(`${API_URL}/all-orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ allOrders: res.data.orders, loading: false });
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Failed to fetch all orders", loading: false });
//     }
//   },

//   // Fetch single order details
//   fetchOrderById: async (id, token) => {
//     try {
//       set({ loading: true, error: null });
//       const res = await axios.get(`${API_URL}/get-order/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       set({ selectedOrder: res.data.order, loading: false });
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Order not found", loading: false });
//     }
//   },

//   // Create BRPP order
//   createBrppOrder: async (amount, userId, token) => {
//     try {
//       set({ loading: true, error: null });
//       const res = await axios.post(
//         `${API_URL}/brpp`,
//         { amount, userId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       return res.data;
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Failed to create BRPP order", loading: false });
//       return null;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // Admin: Update product status
//   updateProductStatus: async (orderId, productId, status, token) => {
//     try {
//       set({ loading: true, error: null });
//       await axios.put(
//         `${API_URL}/${orderId}/product/${productId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // update local state
//       const updatedOrders = get().allOrders.map((order) =>
//         order._id === orderId
//           ? {
//               ...order,
//               items: order.items.map((i) =>
//                 i.product._id === productId ? { ...i, status } : i
//               ),
//             }
//           : order
//       );
//       set({ allOrders: updatedOrders, loading: false });
//     } catch (err: any) {
//       set({ error: err.response?.data?.message || "Failed to update product status", loading: false });
//     }
//   },
// }));




import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/v1/order`;

export interface OrderItem {
  product: any;
  quantity: number;
  serials: string[];
  price: number;
  gstAmount: number;
  shippingCharge: number;
  status: string;
}

export interface Order {
  _id: string;
  user: any;
  items: OrderItem[];
  subTotal: number;
  shippingCharges: number;
  gstAmount: number;
  totalAmount: number;
  payment: {
    method: string;
    status: string;
    transactionId?: string;
  };
  orderStatus: string;
  shippingAddress?: {
    fullName?: string;
    phone?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  allOrders: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;

  fetchUserOrders: (token: string) => Promise<void>;
  fetchAllOrders: (token: string) => Promise<void>;
  fetchOrderById: (id: string, token: string) => Promise<void>;
  createBrppOrder: (amount: number, userId: string, token: string) => Promise<Order | null>;
  updateProductStatus: (orderId: string, productId: string, status: string, token: string) => Promise<void>;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      allOrders: [],
      selectedOrder: null,
      loading: false,
      error: null,

      // ✅ Fetch user's orders
      fetchUserOrders: async (token) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.get(`${API_URL}/get-my-order`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ orders: res.data.orders, loading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Failed to fetch orders",
            loading: false,
          });
        }
      },

      // ✅ Admin: Fetch all orders
      fetchAllOrders: async (token) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.get(`${API_URL}/all-orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ allOrders: res.data.orders, loading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Failed to fetch all orders",
            loading: false,
          });
        }
      },

      // ✅ Fetch single order
      fetchOrderById: async (id, token) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.get(`${API_URL}/get-order/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ selectedOrder: res.data.order, loading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Order not found",
            loading: false,
          });
        }
      },

      // ✅ Create BRPP order
      createBrppOrder: async (amount, userId, token) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.post(
            `${API_URL}/brpp`,
            { amount, userId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return res.data;
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Failed to create BRPP order",
            loading: false,
          });
          return null;
        } finally {
          set({ loading: false });
        }
      },

      // ✅ Admin: Update product status
      updateProductStatus: async (orderId, productId, status, token) => {
        try {
          set({ loading: true, error: null });
          await axios.put(
            `${API_URL}/${orderId}/product/${productId}/status`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const updatedOrders = get().allOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  items: order.items.map((i) =>
                    i.product._id === productId ? { ...i, status } : i
                  ),
                }
              : order
          );

          set({ allOrders: updatedOrders, loading: false });
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Failed to update product status",
            loading: false,
          });
        }
      },
    }),
    {
      name: "order-storage", // localStorage key
      partialize: (state) => ({
        allOrders: state.allOrders,
        orders: state.orders,
      }),
    }
  )
);
