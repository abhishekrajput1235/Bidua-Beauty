import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Tag,
  Slice,
} from "lucide-react";
import type { Product } from "../store/useProductStore";
import { useCartStore } from "../store/cartStore";
import { toast } from "react-toastify";

interface ProductDetailsModalProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  product: Product | null;
}

export default function ProductDetailsModal({
  showModal,
  setShowModal,
  product,
}: ProductDetailsModalProps) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
  const images = product?.images || [];
  const [index, setIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCartStore();

  if (!product) return null;

  const srcFor = (url?: string) =>
    url
      ? url.startsWith("http")
        ? url
        : `${BACKEND_URL}${url.startsWith("/") ? "" : "/"}${url}`
      : "";

  const handleAddToCart = async () => {
    await addToCart(product._id, qty);
    toast.success("Item added to cart");
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 relative"
          >
            {/* Close Icon */}
            <button
              aria-label="Close Modal"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>

            {/* Images */}
            <div className="relative bg-gray-50 dark:bg-gray-800 p-4 md:p-6 flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                {images.length > 0 ? (
                  <div className="w-full max-w-lg h-[420px] md:h-[480px] flex items-center justify-center relative">
                    <img
                      src={srcFor(images[index].url)}
                      alt={product.name}
                      className="max-h-full object-contain rounded-lg"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:scale-105"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setIndex((i) => Math.min(i + 1, images.length - 1))
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:scale-105"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-[320px] md:h-[420px] rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    No image available
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col">
              <h3 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="mt-12 text-gray-700 dark:text-gray-300 flex-1">
                {product.description || "No description provided."}
              </p>
              <div className="flex gap-4 justify-start items-center">
              <div className="mt-4 text-3xl font-bold text-amber-400">
                ₹{product.sellingPrice}
              </div>
              <div className="mt-4 text-xl font-bold text-red-500 line-through">
                ₹{product.price}
              </div>
              </div>
              {product.discountPercentage && (
                <div className="text-sm text-green-500">
                  {product.discountPercentage}% OFF
                </div>
              )}

              {product.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.tags.slice(1, 5).map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2"
                  >
                    -
                  </button>
                  <div className="px-4 py-2 text-sm w-16 text-center">
                    {qty}
                  </div>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-amber-400 text-black font-medium hover:brightness-105 transition"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
