import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "@/store/authStore";
import {useProductStore} from "@/store/useProductStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface CartItem {
  stock: any;
  _id: string;
  productId?: string;
  name: string;
  quantity: number;
  price: number;
  sellingPrice: number;
  b2bPrice?: number;
  discountPercentage: number;
  images?: { url: string }[];
  units?: { isSold: boolean }[];
}

const { fetchProducts } = useProductStore.getState();
const CartPage = () => {
  const { t } = useTranslation();
  const { cart, fetchCart, removeFromCart, incrementCart, decrementCart, loading, error } = useCartStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, [fetchCart,fetchProducts]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  // Calculate subtotal based on user role
  const getSubtotal = () =>
    (cart as unknown as CartItem[]).reduce(
      (acc: number, item: CartItem) =>
        acc +
        (user?.role === "b2b" && item.b2bPrice ? item.b2bPrice : item.sellingPrice) *
          (item.quantity || 0),
      0
    );

  const getShippingCost = () => (getSubtotal() > 0 ? 50 : 0);
  const getTotalPrice = () => getSubtotal() + getShippingCost();

  const handleIncrement = async (productId: string) => {
    await incrementCart(productId);
    fetchCart();
  };

  const handleDecrement = async (productId: string) => {
    await decrementCart(productId);
    fetchCart();
  };

  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
    fetchCart();
  };

  if (!loading && (!cart || cart.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">{t("cart.empty")}</h1>
          <p className="text-gray-400 mb-8 text-lg">{t("cart.emptySubtitle")}</p>
          <Link
            to="/products"
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            {t("cart.continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span>{t("cart.continueShopping")}</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t("cart.title")}</h1>
          <p className="text-gray-300 text-lg">{t("cart.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {(cart as unknown as CartItem[])?.map((item: CartItem) => {
              let availableUnits = 0;
              // Use stock information directly from the cart item, which is populated by the backend.
              // This avoids using stale or incorrect mock data.
              if (item) {
                if (Array.isArray(item?.units) && item.units.length > 0) {
                  availableUnits = item.units.filter((u) => !u.isSold).length;
                } else if (typeof item.stock === "number") {
                  availableUnits = item.stock;
                }
              }

              availableUnits = Number.isFinite(availableUnits) ? availableUnits : 0;
              const isOutOfStock = availableUnits === 0;
              const hasReachedLimit = item.quantity >= availableUnits;

              // Decide price based on user role
              const displayPrice =
                user?.role === "b2b" && item.b2bPrice ? item.b2bPrice : item.sellingPrice;

              return (
                <div
                  key={item._id}
                  className={`bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4 lg:p-6 ${
                    isOutOfStock ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start lg:items-center space-x-4 lg:space-x-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl lg:rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={
                          item?.images?.[0]?.url
                            ? item.images[0].url.startsWith("http")
                              ? item.images[0].url
                              : `${BACKEND_URL}${item.images[0].url.startsWith("/") ? "" : "/"}${
                                  item.images[0].url
                                }`
                            : "/placeholder.png"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 lg:mb-3">
                        {item.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-400">
                          {formatPrice(displayPrice)}
                        </span>

                        {user?.role !== "b2b" && item.price !== item.sellingPrice && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(item.price)}
                            </span>

                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-bold">
                              {item.discountPercentage}% OFF
                            </span>
                          </>
                        )}
                      </div>

                      <p
                        className={`text-sm font-medium ${
                          isOutOfStock
                            ? "text-red-400"
                            : hasReachedLimit
                            ? "text-yellow-400"
                            : "text-green-400"
                        } mb-4`}
                      >
                        {isOutOfStock
                          ? "Out of Stock"
                          : hasReachedLimit
                          ? `Only ${availableUnits} left in stock`
                          : `In Stock (${availableUnits} available)`}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecrement(item.productId)}
                            disabled={isOutOfStock || item.quantity <= 1}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isOutOfStock
                                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                : "bg-gray-700 hover:bg-gray-600 text-white"
                            }`}
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-10 text-center text-white font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleIncrement(item.productId)}
                            disabled={isOutOfStock || hasReachedLimit}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isOutOfStock || hasReachedLimit
                                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                : "bg-gray-700 hover:bg-gray-600 text-white"
                            }`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemove(item.productId)}
                        
                          className="text-red-400 hover:text-red-300 transition-colors duration-300 p-2 hover:bg-red-400/10 rounded-lg"
                        >
                      
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-700/50 rounded-2xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6">{t("cart.orderSummary")}</h2>

              <div className="space-y-3 mb-4">
                {(cart as unknown as CartItem[])?.map((item) => {
                  const displayPrice =
                    user?.role === "b2b" && item.b2bPrice ? item.b2bPrice : item.sellingPrice;
                  return (
                    <div
                      key={item._id}
                      className="flex justify-between text-gray-300 text-sm"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">{formatPrice(displayPrice * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-700 pt-3 mb-4">
                <div className="flex justify-between text-gray-300 mb-2 text-sm">
                  <span>{t("cart.subtotal")}</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-gray-300 mb-2 text-sm">
                  <span>{t("cart.shipping")}</span>
                  <span>{formatPrice(getShippingCost())}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white">
                  <span>{t("cart.total")}</span>
                  <span className="text-amber-400">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-3 rounded-xl font-bold text-base hover:shadow-amber-400/30 transition-all duration-300 text-center block"
              >
                {t("cart.proceedToCheckout")}
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-6 text-center text-red-400 font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
