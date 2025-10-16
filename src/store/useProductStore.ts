
import { create } from "zustand";
import axios from "axios";

// const API_URL = "https://backend.biduabeauty.com/api/v1/products";
const API_URL = "http://localhost:5000/api/v1/products";

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
  sku: string;
  _id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  sellingPrice?: number;
  b2bPrice?: number;
  discountPercentage?: number;
  category?: string;
  brand?: string;
  stock: number;
  images?: {
    [x: string]: any; url: string; alt?: string 
}[];
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
  addProduct: (data: FormData, token: string) => Promise<any>;
  updateProduct: (id: string, data: FormData, token: string) => Promise<any>;
  deleteProduct: (id: string, token: string) => Promise<void>;
  rateProduct: (
    id: string,
    rating: number,
    comment: string,
    token: string
  ) => Promise<void>;

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

  // 📦 Fetch all products
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}`);
      set({ products: data.products, loading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to fetch products";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // 📦 Fetch single product
  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(`${API_URL}/${id}`);
      set({ selectedProduct: data.product, loading: false });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to fetch product";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // 🆕 Add Product
  addProduct: async (formData, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API_URL}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      set({
        products: [...get().products, data.product],
        loading: false,
      });
      return data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to add product";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ✏️ Update Product (Handles Multer & backend errors)
  updateProduct: async (id, formData, token) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      set({
        products: get().products.map((p) => (p._id === id ? data.product : p)),
        loading: false,
      });
      return data; // ✅ return full response for frontend toast
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to update product";
      set({ error: msg, loading: false });
      throw new Error(msg); // ✅ rethrow so frontend toast can catch
    }
  },

// ➕ Add Stock
  addStock: async (productId: string, additionalStock: number, token: string) => {
    set({ loading: true, error: null });
    try {
      // Send request to backend
      const { data } = await axios.post(
        `${API_URL}/${productId}/add-stock`,
        { additionalStock },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Backend should return updated product
      const updatedProduct: Product = data.product;

      // Update local product list
      set({
        products: get().products.map((p) =>
          p._id === updatedProduct._id ? updatedProduct : p
        ),
        loading: false,
      });

      return updatedProduct; // can be used for UI updates
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to add stock";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // 🗑️ Delete Product
  deleteProduct: async (id, token) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({
        products: get().products.filter((p) => p._id !== id),
        loading: false,
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to delete product";
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ⭐ Rate Product
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
      const msg = err.response?.data?.message || "Failed to rate product";
      set({ error: msg, loading: false });
      throw new Error(msg);
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

    const availableUnits = product.units.filter((u) => !u.isSold);
    if (availableUnits.length < quantity) {
      set({ error: "Not enough stock available" });
      return;
    }

    const allocated = availableUnits.slice(0, quantity).map((u) => u.serial);
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
