import { create } from "zustand";
import axios from "axios";
import { useAuthStore } from "./authStore";
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;
  
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
  isB2b?: boolean;
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
  addToCart: (productId: string, quantity: number, isB2b?: boolean) => Promise<boolean>;
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

  addToCart: async (productId, quantity, isB2b = false) => {
    try {
      if (quantity <= 0) return false;
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      const res = await axios.post(`${API_URL}/cart/add`, { productId, quantity, isB2b }, { headers: { Authorization: `Bearer ${token}` } });
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
    console.log("createOrderAndProcessPayment: Starting payment process.");
    set({ loading: true, error: null });
    const token = useAuthStore.getState().token;
    const { cart, shippingAddress, paymentMethod, deliveryOption } = get();

    console.log("createOrderAndProcessPayment: Current state -", { cart, shippingAddress, paymentMethod, deliveryOption });

    if (cart.length === 0) {
      set({ error: "Cart is empty", loading: false });
      console.error("createOrderAndProcessPayment: Cart is empty.");
      return null;
    }

    if (deliveryOption === 'shipping' && !shippingAddress) {
      set({ error: "Shipping address is required", loading: false });
      console.error("createOrderAndProcessPayment: Shipping address is required.");
      return null;
    }

    try {
      // Step 1: Create the order on the backend
      console.log("createOrderAndProcessPayment: Calling /order/create API.");
      const orderResponse = await axios.post(
        `${API_URL}/order/create`,
        { cart, shippingAddress, paymentMethod, deliveryOption },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("createOrderAndProcessPayment: /order/create API response:", orderResponse.data);

      const newOrder = orderResponse.data.order;
      const razorpayOrderId = orderResponse.data.razorpayOrderId;

      console.log("createOrderAndProcessPayment: New Order:", newOrder);
      console.log("createOrderAndProcessPayment: Razorpay Order ID:", razorpayOrderId);

      // Step 2: Process the payment
      if (paymentMethod === 'COD') {
        console.log("createOrderAndProcessPayment: Payment method is COD. Calling /payment/confirm-cod API.");
        const codResponse = await axios.post(
          `${API_URL}/payment/confirm-cod`,
          { orderId: newOrder._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("createOrderAndProcessPayment: /payment/confirm-cod API response:", codResponse.data);
        set({ loading: false, cart: [], totalItems: 0, confirmedOrder: codResponse.data.order });
        console.log("createOrderAndProcessPayment: COD order confirmed:", codResponse.data.order);
        return codResponse.data.order;
      } else {
        console.log("createOrderAndProcessPayment: Payment method is not COD. Initiating Razorpay payment.");
        return new Promise(async (resolve, reject) => {
          try {
            console.log("createOrderAndProcessPayment: Calling /payment/get-key API.");
            const { data: { key } } = await axios.get(`${API_URL}/payment/get-key`, { headers: { Authorization: `Bearer ${token}` } });
            console.log("createOrderAndProcessPayment: Razorpay key received.");

            const options = {
              key,
              amount: newOrder.totalAmount * 100, // amount in smallest currency unit
              currency: "INR",
              name: "Bidua",
              description: "Test Transaction",
              order_id: razorpayOrderId,
              handler: async function (response: any) {
                console.log("Razorpay handler: Payment successful. Verifying payment.");
                try {
                  const data = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                  };
                  console.log("Razorpay handler: Verification data:", data);

                  const verificationResponse = await axios.post(
                    `${API_URL}/order/verify-payment`,
                    data,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  console.log("Razorpay handler: Payment verification response:", verificationResponse.data);

                  set({ loading: false, cart: [], totalItems: 0, confirmedOrder: verificationResponse.data.order });
                  resolve(verificationResponse.data.order);
                } catch (error) {
                  console.error("Razorpay handler: Payment verification failed:", error);
                  set({ loading: false, error: "Payment verification failed" });
                  reject(error);
                }
              },
              modal: {
                ondismiss: function () {
                  console.warn("Razorpay modal dismissed: Payment was cancelled.");
                  set({ loading: false, error: "Payment was cancelled" });
                  reject("Payment was cancelled");
                },
              },
              prefill: {
                name: shippingAddress?.fullName || "Piyush Garg",
                email: useAuthStore.getState().user?.email || "youremail@example.com",
                contact: shippingAddress?.phone || "9999999999",
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            console.log("createOrderAndProcessPayment: Razorpay options:", options);
            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
            console.log("createOrderAndProcessPayment: Razorpay modal opened.");
          } catch (error) {
            console.error("createOrderAndProcessPayment: Failed to initialize payment:", error);
            set({ loading: false, error: "Failed to initialize payment" });
            reject(error);
          }
        });
      }
    } catch (err: any) {
      console.error("createOrderAndProcessPayment: Checkout process failed with error:", err);
      set({
        error: err.response?.data?.message || "Checkout process failed",
        loading: false,
      });
      return null;
    }
  },
}));