import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";

// Interfaces
interface CartItem {
  [x: string]: any; // To allow for flexible properties
  productId: string;
  name: string;
  quantity: number;
  price: number;
  sellingPrice: number;
  discountPercentage: number;
  gstPercentage: number;
  shippingCharge: number;
  images: { url: string; alt?: string }[];
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Main Store Interface
interface CartState {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  confirmedOrder: any | null; // New state for confirmed order

  // New state for checkout process
  shippingAddress: ShippingAddress | null;
  billingAddress: ShippingAddress | null;
  paymentMethod: string;
  deliveryOption: 'shipping' | 'warehouse';

  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<boolean>;
  removeFromCart: (productId: string) => Promise<void>;
  incrementCart: (productId: string) => Promise<void>;
  decrementCart: (productId: string) => Promise<void>;
  clearCart: () => void;
  clearError: () => void;

  // New actions for checkout
  setShippingAddress: (address: ShippingAddress) => void;
  setBillingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: string) => void;
  setDeliveryOption: (option: 'shipping' | 'warehouse') => void;

  // New checkout flow
  createOrderAndProcessPayment: () => Promise<any | null>;
}

const API_URL = "http://localhost:5000/api/v1";

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  loading: false,
  error: null,
  totalItems: 0,
  confirmedOrder: null,

  // New state
  shippingAddress: null,
  billingAddress: null,
  paymentMethod: "Credit Card", // Default payment method
  deliveryOption: 'shipping', // Default delivery option

  // Actions
  fetchCart: async () => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      const res = await axios.get(`${API_URL}/cart/`, { headers: { Authorization: `Bearer ${token}` } });
      const cartData = Array.isArray(res.data.cart) ? res.data.cart : [];
      set({
        cart: cartData,
        totalItems: cartData.reduce((sum, item) => sum + item.quantity, 0),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to fetch cart", loading: false });
    }
  },

  addToCart: async (productId, quantity) => {
    try {
      if (quantity <= 0) return false;
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      const res = await axios.post(`${API_URL}/cart/add`, { productId, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      set({
        cart: res.data.cart || [],
        totalItems: (res.data.cart || []).reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
        loading: false,
      });
      return true;
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to add to cart", loading: false });
      return false;
    }
  },

  removeFromCart: async (productId) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      const res = await axios.delete(`${API_URL}/cart/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
      set({
        cart: res.data.cart || [],
        totalItems: (res.data.cart || []).reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to remove from cart", loading: false });
    }
  },

  incrementCart: async (productId) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      const res = await axios.patch(`${API_URL}/cart/increment/${productId}`, { productId }, { headers: { Authorization: `Bearer ${token}` } });
      set({
        cart: res.data.cart || [],
        totalItems: (res.data.cart || []).reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to increment cart", loading: false });
    }
  },

  decrementCart: async (productId) => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      const res = await axios.patch(`${API_URL}/cart/decrement/${productId}`, { productId }, { headers: { Authorization: `Bearer ${token}` } });
      set({
        cart: res.data.cart || [],
        totalItems: (res.data.cart || []).reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to decrement cart", loading: false });
    }
  },

  clearCart: () => set({ cart: [], totalItems: 0 }),
  clearError: () => set({ error: null }),

  // New actions for checkout
  setShippingAddress: (address) => set({ shippingAddress: address }),
  setBillingAddress: (address) => set({ billingAddress: address }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setDeliveryOption: (option) => set({ deliveryOption: option }),

  // New checkout flow
  createOrderAndProcessPayment: async () => {
    set({ loading: true, error: null });
    const token = useAuthStore.getState().token;
    const { cart, shippingAddress, paymentMethod, deliveryOption } = get();

    if (cart.length === 0) {
      set({ error: "Cart is empty", loading: false });
      return null;
    }

    if (deliveryOption === 'shipping' && !shippingAddress) {
      set({ error: "Shipping address is required", loading: false });
      return null;
    }

    try {
      // Step 1: Create the order on the backend
      const orderResponse = await axios.post(
        `${API_URL}/order/create`,
        { cart, shippingAddress, paymentMethod, deliveryOption },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newOrder = orderResponse.data.order;
      const razorpayOrderId = orderResponse.data.razorpayOrderId;

      // Step 2: Process the payment
      if (paymentMethod === 'COD') {
        const codResponse = await axios.post(
          `${API_URL}/payment/confirm-cod`,
          { orderId: newOrder._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        set({ loading: false, cart: [], totalItems: 0, confirmedOrder: codResponse.data.order });
        return codResponse.data.order;
      } else {
        return new Promise(async (resolve, reject) => {
          try {
            const { data: { key } } = await axios.get(`${API_URL}/payment/get-key`, { headers: { Authorization: `Bearer ${token}` } });

            const options = {
              key,
              amount: newOrder.totalAmount * 100,
              currency: "INR",
              name: "Bidua",
              description: "Test Transaction",
              order_id: razorpayOrderId,
              handler: async function (response: any) {
                try {
                  const data = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                  };

                  const verificationResponse = await axios.post(
                    `${API_URL}/payment/verify-payment`,
                    data,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );

                  set({ loading: false, cart: [], totalItems: 0, confirmedOrder: verificationResponse.data.order });
                  resolve(verificationResponse.data.order);
                } catch (error) {
                  set({ loading: false, error: "Payment verification failed" });
                  reject(error);
                }
              },
              modal: {
                ondismiss: function () {
                  set({ loading: false, error: "Payment was cancelled" });
                  reject("Payment was cancelled");
                },
              },
              prefill: {
                name: "Piyush Garg",
                email: "youremail@example.com",
                contact: "9999999999",
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
          } catch (error) {
            set({ loading: false, error: "Failed to initialize payment" });
            reject(error);
          }
        });
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Checkout process failed",
        loading: false,
      });
      return null;
    }
  },
}));