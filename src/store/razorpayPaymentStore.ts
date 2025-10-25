import { create } from "zustand";
import axios from "axios";

interface RazorpayStore {
  rzpOrder: any | null;
  rzpLoading: boolean;
  rzpError: string | null;

  createRazorpayOrder: (amount: number) => Promise<void>;
  payWithRazorpay: (amount: number) => Promise<void>;
}

export const useRazorpayStore = create<RazorpayStore>((set, get) => ({
  rzpOrder: null,
  rzpLoading: false,
  rzpError: null,

  /** Create order on backend */
  createRazorpayOrder: async (amount) => {
    set({ rzpLoading: true, rzpError: null });
    try {
      const res = await axios.post(`/api/payment/create-order`, { amount });
      set({ rzpOrder: res.data.order, rzpLoading: false });
    } catch (err: any) {
      set({
        rzpError: err.response?.data?.message || "Failed to create order",
        rzpLoading: false,
      });
    }
  },

  /** Open Razorpay Checkout */
  payWithRazorpay: async (amount) => {
    await get().createRazorpayOrder(amount);
    const order = get().rzpOrder;
    if (!order) return;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      handler: async function (response: any) {
        try {
          await axios.post(`/api/payment/verify-payment`, response);
          alert("Payment successful!");
        } catch (err) {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  },
}));
