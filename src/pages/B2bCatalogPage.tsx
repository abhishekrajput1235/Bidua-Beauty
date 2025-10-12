import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Package, LogIn } from "lucide-react";
import ProductImageSlider from "../components/ProductImageSlider";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useProductStore } from "../store/useProductStore";
import { toast } from "react-toastify";

const B2bCatalogPage = () => {
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { fetchProducts, loading, error, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading products...
      </div>
    );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-sm sm:max-w-md">
          <LogIn className="w-20 h-20 sm:w-24 sm:h-24 text-gray-600 mx-auto mb-6 sm:mb-8" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Login Required
          </h1>
          <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">
            Please login to access the B2B catalog
          </p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6 md:px-8 py-16 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-8 sm:mb-12 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 px-2 sm:px-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
            B2B Catalog
          </h1>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
            Exclusive wholesale pricing for business partners
          </p>
        </div>

        {/* Minimum Order Info */}
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-3 sm:p-4 text-center mb-8 sm:mb-12">
          <p className="text-amber-200 text-sm sm:text-base font-medium">
            Minimum order value: <span className="font-bold">₹20,000</span>
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col"
            >
              <div className="relative w-full h-48 sm:h-52 mb-3 sm:mb-4 rounded-xl overflow-hidden bg-gray-700">
                <ProductImageSlider
                  images={[product.images?.[0]?.url || "/placeholder.jpg"]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  showDots={false}
                  autoPlay={false}
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 truncate">
                {product.name}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 flex-grow truncate">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm line-through">
                    MRP: {formatPrice(product.price)}
                  </p>
                  <p className="text-amber-400 text-lg sm:text-2xl font-bold">
                    B2B Price: {formatPrice(product.b2bPrice)}
                  </p>
                </div>
                <span className="mt-1 sm:mt-0 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                  {Math.round((1 - product.b2bPrice / product.price) * 100)}% OFF
                </span>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                Min Order Qty: <span className="font-bold">{product.minOrderQty}</span> units
              </p>

              <button
                onClick={() => {
                  const itemToAdd = {
                    id: product.id,
                    name: product.name,
                    price: product.b2bPrice,
                    originalPrice: product.mrp,
                    image: product.image,
                    type: "b2b" as const,
                  };
                  addToCart(itemToAdd);
                  navigate("/cart");
                }}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Add to Order</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default B2bCatalogPage;
