import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import type { Product } from "@/store/useProductStore";
import UpdateProductModal from "@/components/admin/EditProductModal";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { useProductStore } from "@/store/useProductStore";

interface AdminProductModalProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  product: Product | null;
}

export default function AdminProductModal({
  showModal,
  setShowModal,
  product,
}: AdminProductModalProps) {
  const { token } = useAuthStore();
  const { deleteProduct } = useProductStore();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

  const [index, setIndex] = useState(0);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [product?._id]);

  if (!product) return null;

  const srcFor = (url?: string) =>
    url ? (url.startsWith("http") ? url : `${BACKEND_URL}${url.startsWith("/") ? "" : "/"}${url}`) : "";

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id, token);
      toast.success("Product deleted successfully!", { position: "top-right", autoClose: 3000 });
      setShowModal(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Images */}
            <div className="relative bg-gray-50 dark:bg-gray-800 p-4 md:p-6 flex flex-col">
              <button
                aria-label="Close"
                className="absolute top-4 right-4 md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setShowModal(false)}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              <div className="flex-1 flex items-center justify-center">
                {product.images?.length ? (
                  <div className="w-full max-w-lg h-[420px] md:h-[480px] flex items-center justify-center relative">
                    <img
                      src={srcFor(product.images[index].url)}
                      alt={`${product.name} ${index + 1}`}
                      className="max-h-full object-contain rounded-lg shadow-inner"
                      loading="lazy"
                    />
                    {product.images.length > 1 && (
                      <>
                        <button
                          aria-label="Previous image"
                          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur hover:scale-105 shadow"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          aria-label="Next image"
                          onClick={() => setIndex((i) => Math.min(i + 1, product.images.length - 1))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur hover:scale-105 shadow"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-[320px] md:h-[420px] rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-300">No image available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div className="p-6 flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">SKU: {product.sku ?? "—"}</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">Category: {product.category}</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">Brand: {product.brand}</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">Price: ${product.price}</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">Stock: {product.stock}</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">B2B Price: ${product.b2bPrice}</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">Featured: {product.isFeatured ? "Yes" : "No"}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowUpdateModal(true)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>

              <p className="mt-4 text-gray-700 dark:text-gray-300 flex-1">
                {product.description || "No description provided."}
              </p>

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                <div>Created At: {product.createdAt ? new Date(product.createdAt).toLocaleString() : "—"}</div>
                <div className="mt-1">Last Updated: {product.updatedAt ? new Date(product.updatedAt).toLocaleString() : "—"}</div>
              </div>
            </div>
          </motion.div>

          <div className="fixed inset-0 bg-black/40 z-[-1]" aria-hidden />
        </motion.div>
      )}

      {/* Update Modal */}
      {product && (
        <UpdateProductModal showModal={showUpdateModal} setShowModal={setShowUpdateModal} token={token} product={product} />
      )}
    </AnimatePresence>
  );
}
