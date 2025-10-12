import { create } from "zustand";
import axios from "axios";

// const API_URL = "https://backend.biduabeauty.com/api/v1/products";
const API_URL = "http://localhost:5000/api/v1/products";

// adjust if needed

interface Unit {
  serial: string;
  isSold: boolean;
  _id?: string;
}

interface Rating {
  user: string;
  rating: number;
  comment: string;
}

export interface Product {
  minOrderQty: ReactI18NextChildren | Iterable<ReactI18NextChildren>;
  id: any;
  mrp: any;
  image: any;
  _id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  b2bPrice?: number;
  sellingPrice?: number;
  discountPercentage?: number;
  category?: string;
  brand?: string;
  stock: number;
  images?: string[];
  isFeatured?: boolean;
  tags?: string[];
  units: Unit[];
  ratings: Rating[];
  averageRating?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  serialNumbers: string[];
}

interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  cart: CartItem[];
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
  addProduct: (data: Partial<Product>, token: string) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>, token: string) => Promise<void>;
  deleteProduct: (id: string, token: string) => Promise<void>;
  rateProduct: (id: string, rating: number, comment: string, token: string) => Promise<void>;

  // Cart
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  selectedProduct: null,
  cart: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}`);
      set({ products: data.products, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to fetch products", loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      set({ selectedProduct: data.product, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to fetch product", loading: false });
    }
  },

  addProduct: async (productData, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ products: [...get().products, data.product], loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to add product", loading: false });
    }
  },

  updateProduct: async (id, productData, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        products: get().products.map((p) => (p._id === id ? data.product : p)),
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to update product", loading: false });
    }
  },

  deleteProduct: async (id, token) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ products: get().products.filter((p) => p._id !== id), loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to delete product", loading: false });
    }
  },

  rateProduct: async (id, rating, comment, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(
        `${API_URL}/${id}/rate`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set({
        products: get().products.map((p) => (p._id === id ? data.product : p)),
        selectedProduct: data.product,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to rate product", loading: false });
    }
  },

  // 🛒 CART HANDLING
  addToCart: (productId, quantity) => {
    const { products, cart } = get();
    const product = products.find((p) => p._id === productId);
    if (!product) {
      set({ error: "Product not found" });
      return;
    }

    // Find available (unsold) units
    const availableUnits = product.units.filter((u) => !u.isSold);
    if (availableUnits.length < quantity) {
      set({ error: "Not enough stock available" });
      return;
    }

    // Allocate units
    const allocated = availableUnits.slice(0, quantity).map((u) => u.serial);

    // If product already in cart → update quantity
    const existing = cart.find((c) => c.product._id === productId);
    let newCart;
    if (existing) {
      existing.quantity += quantity;
      existing.serialNumbers.push(...allocated);
      newCart = [...cart];
    } else {
      newCart = [...cart, { product, quantity, serialNumbers: allocated }];
    }

    set({ cart: newCart, error: null });
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    set({ cart: cart.filter((c) => c.product._id !== productId) });
  },

  clearCart: () => {
    set({ cart: [] });
  },
}));
