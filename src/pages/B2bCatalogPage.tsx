import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Package, LogIn } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/cartStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

const B2bCatalogPage: React.FC = () => {
  const { user } = useAuthStore();
  const { fetchProducts, loading, error, products } = useProductStore();
  const { addToCart } = useCartStore();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (error) toast.error(error, { position: "top-right", autoClose: 4000 });
  }, [error]);

  const isB2B = user?.role === 'b2b';
  console.log("User role:", user?.role, "isB2B:", isB2B);

  const computeAvailableUnits = (product: any): number => {
    if (Array.isArray(product.units) && product.units.length > 0) {
      return product.units.filter((u: any) => !u.isSold).length;
    }
    if (typeof product.stock === "number") {
      return product.stock;
    }
    return 0;
  };

  const handleQtyChange = (productId: string, delta: number, minQty = 1, availableUnits = Infinity) => {
    if (!isB2B) return;
    setQuantities((prev) => {
      const current = prev[productId] ?? minQty;
      let next = current + delta;
      if (next < minQty) next = minQty;
      if (next > availableUnits) next = availableUnits;
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = async (product: any) => {
    if (!isB2B) {
        toast.error("Only B2B users can add to cart.", { position: "top-right", autoClose: 3000 });
        return;
    }
    try {
      const availableUnits = computeAvailableUnits(product);
      const minQty = typeof product.minOrderQty === "number" && product.minOrderQty > 0 ? product.minOrderQty : 1;
      const qty = quantities[product._id] ?? minQty;

      if (availableUnits === 0) {
        toast.error("This product is out of stock.", { position: "top-right", autoClose: 3000 });
        return;
      }

      if (qty < minQty) {
        toast.error(`Minimum order quantity is ${minQty}.`, { position: "top-right", autoClose: 3000 });
        return;
      }

      if (qty > availableUnits) {
        toast.error(`Only ${availableUnits} units available.`, { position: "top-right", autoClose: 3000 });
        return;
      }

      const idForCart = product.productId ?? product._id;
      if (!idForCart) throw new Error("Invalid product id.");

      await addToCart(idForCart, qty);

      toast.success("Item added successfully.", { position: "top-right", autoClose: 3000 });
    } catch (err: any) {
      console.error("❌ addToCart error:", err);
      const msg = err?.response?.data?.message || err?.message || "Failed to add item to cart.";
      toast.error(msg, { position: "top-right", autoClose: 4000 });
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-sm sm:max-w-md">
          <LogIn className="w-20 h-20 sm:w-24 sm:h-24 text-gray-600 mx-auto mb-6 sm:mb-8" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">Please login to access the B2B catalog</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border-2 border-amber-400/50 text-amber-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading products...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6 md:px-8 py-16 relative">
      <Link to="/" className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-8 sm:mb-12 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm sm:text-base">Back to Home</span>
      </Link>

      {!isB2B && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 p-4 rounded-2xl text-center mb-8">
          <p className="font-semibold">This page is for B2B users only.</p>
          <p className="text-sm">To access B2B pricing and features, please join our B2B program.</p>
          <Link to="/join-brpp" className="mt-4 inline-block bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-2 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-400/25 transition-all duration-300">
            Become a B2B User
          </Link>
        </div>
      )}

      <div className="text-center mb-8 sm:mb-12 px-2 sm:px-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">B2B Catalog</h1>
        <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">Exclusive wholesale pricing for business partners</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product: any) => {
          const availableUnits = computeAvailableUnits(product);
          const minQty = typeof product.minOrderQty === "number" && product.minOrderQty > 0 ? product.minOrderQty : 1;
          const defaultQty = availableUnits >= minQty ? minQty : 0;
          const qty = quantities[product._id] ?? defaultQty;
          const isOutOfStock = availableUnits === 0;

          return (
            <div key={product._id} className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col relative">
              <div className="relative w-full h-48 sm:h-52 mb-3 sm:mb-4 rounded-xl overflow-hidden bg-gray-700">
                {isOutOfStock && <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">Out of Stock</div>}
                <img
                  src={
                    product.images?.[0]?.url
                      ? product.images[0].url.startsWith("http")
                        ? product.images[0].url
                        : `${BACKEND_URL}${product.images[0].url.startsWith("/") ? "" : "/"}${product.images[0].url}`
                      : "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 truncate">{product.name}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-2 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm line-through">MRP: {formatPrice(product.price)}</p>
                  <p className="text-amber-400 text-lg sm:text-2xl font-bold">B2B Price: {formatPrice(product.b2bPrice)}</p>
                </div>
                <span className="mt-1 sm:mt-0 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                  {product.price ? Math.round((1 - product.b2bPrice / product.price) * 100) : 0}% OFF
                </span>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                Min Order Qty: <span className="font-bold">{minQty}</span> units
              </p>

              <p className={`text-sm mb-3 ${isOutOfStock ? "text-red-400" : "text-green-400"}`}>
                {isOutOfStock ? "Out of stock" : `Available: ${availableUnits}`}
              </p>

              <div className={`flex items-center justify-between mb-3 ${isOutOfStock || !isB2B ? "opacity-50 cursor-not-allowed" : ""}`}>
                <button
                  onClick={() => handleQtyChange(product._id, -1, minQty, availableUnits)}
                  disabled={isOutOfStock || qty <= minQty || !isB2B}
                  className={`px-4 py-1 bg-gray-700 text-white rounded-lg border border-yellow-300 hover:bg-gray-600 transition ${isOutOfStock || qty <= minQty || !isB2B ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  -
                </button>

                <div className="w-16 text-center text-white bg-gray-800 rounded-lg border border-yellow-300 py-1">
                  {qty}
                </div>

                <button
                  onClick={() => handleQtyChange(product._id, 1, minQty, availableUnits)}
                  disabled={isOutOfStock || qty >= availableUnits || !isB2B}
                  className={`px-4 py-1 bg-gray-700 text-white rounded-lg border border-yellow-300 hover:bg-gray-600 transition ${isOutOfStock || qty >= availableUnits || !isB2B ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={isOutOfStock || qty < minQty || !isB2B}
                className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-black flex items-center justify-center space-x-2 transition-all duration-300 mt-auto ${
                  isOutOfStock || !isB2B ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-amber-400 to-yellow-500 hover:shadow-2xl hover:shadow-amber-400/25"
                }`}
              >
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{isOutOfStock ? "Out of Stock" : "Add to Order"}</span>
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          to={isB2B ? "/cart" : "#"}
          onClick={(e) => !isB2B && e.preventDefault()}
          className={`inline-block text-white font-bold text-xl lg:text-2xl px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 ${
            isB2B ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default B2bCatalogPage;
