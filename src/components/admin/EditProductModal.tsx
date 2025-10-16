import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useProductStore, Product } from "../../store/useProductStore";
import { useAuthStore } from "../../store/authStore";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface UpdateProductModalProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  product: Product | null;
}

interface ExistingImage {
  url: string;
  alt?: string;
  _id?: string;
}

export default function UpdateProductModal({
  showModal,
  setShowModal,
  product,
}: UpdateProductModalProps) {
  const { updateProduct, loading, error } = useProductStore();
  const { token } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    b2bPrice: "",
    sellingPrice: "",
    stock: "",
    tags: "",
    isFeatured: false,
  });

  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const MAX_IMAGES = 5;

  // Prefill form when modal opens
  useEffect(() => {
    if (product) {
      console.log("product is", product);
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        brand: product.brand || "",
        price: product.price?.toString() || "",
        b2bPrice: product.b2bPrice?.toString() || "",
        sellingPrice: product.sellingPrice?.toString() || "",
        stock: product.stock?.toString() || "",
        tags: product.tags?.join(", ") || "",
        isFeatured: product.isFeatured || false,
      });

      // Set existing images as objects
      setExistingImages(product.images || []);
      setNewImages([]);
    }
  }, [product]);

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle new image uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    const currentCount = existingImages.length + newImages.length;
    const slotsLeft = MAX_IMAGES - currentCount;

    if (slotsLeft <= 0) {
      toast.error(`You can upload maximum ${MAX_IMAGES} images.`);
      return;
    }

    if (filesArray.length > slotsLeft) {
      // Add only allowed number and show error for the rest
      const allowedFiles = filesArray.slice(0, slotsLeft);
      setNewImages((prev) => [...prev, ...allowedFiles]);
      toast.error(
        `Only ${slotsLeft} image(s) added. Maximum ${MAX_IMAGES} images allowed.`
      );
    } else {
      setNewImages((prev) => [...prev, ...filesArray]);
    }

    // clear the input value so same files can be selected again if needed
    e.currentTarget.value = "";
  };

  // Remove images
  const handleRemoveImage = (index: number, type: "existing" | "new") => {
    if (type === "existing") {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // revoke object URL if previously created somewhere (we create on render), optional
      // Note: we are not storing URLs separately here, so just remove the file
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!token) {
      toast.error("You must be logged in!");
      return;
    }

    const totalImages = existingImages.length + newImages.length;
    if (totalImages > MAX_IMAGES) {
      toast.error(
        `Maximum ${MAX_IMAGES} images allowed. You currently have ${totalImages}.`
      );
      return;
    }

    try {
      const form = new FormData();

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value.toString());
      });

      // Split user input, trim spaces, remove empty strings
      const inputTags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      // Use inputTags as the final tags
      const finalTags = inputTags.join(","); // "tag1" or "tag2,tag3"

      console.log("final appneded tags are", finalTags);

      // Append existing image URLs only
      existingImages.forEach((img) => form.append("existingImages", img.url));

      // Append new files
      newImages.forEach((file) => form.append("images", file));

      await updateProduct(product!._id, form, token);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Product updated successfully!");
        setShowModal(false);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to update product!");
    }
  };

  const currentCount = existingImages.length + newImages.length;

  return (
    <AnimatePresence>
      {showModal && product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full overflow-y-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Update Product
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name *"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {["price", "b2bPrice", "sellingPrice"].map((key) => (
                  <input
                    key={key}
                    name={key}
                    value={(formData as any)[key]}
                    onChange={handleChange}
                    placeholder={key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                    type="number"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                ))}
              </div>

              <input
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock *"
                type="number"
                disabled // <-- this disables the input
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              />

              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                className="w-full px-4 py-2 border rounded-lg"
              />

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="font-medium text-gray-700 dark:text-gray-300 flex items-center justify-between">
                  <span>Upload Images</span>
                  <span className="text-sm text-gray-500">
                    {currentCount} / {MAX_IMAGES}
                  </span>
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              {/* Image Previews */}
              <div className="flex flex-wrap gap-3 mt-3">
                {/* Existing Images */}
                {existingImages.map((img, i) => (
                  <div key={`existing-${i}`} className="relative w-20 h-20">
                    <img
                      src={`${BACKEND_URL}${img.url}`}
                      alt={img.alt || `pic ${i + 1}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />

                    <button
                      onClick={() => handleRemoveImage(i, "existing")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {/* New Images */}
                {newImages.map((file, i) => (
                  <div key={`new-${i}`} className="relative w-20 h-20">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New ${i}`}
                      className="w-full h-full object-cover rounded-lg border"
                    />
                    <button
                      onClick={() => handleRemoveImage(i, "new")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />
                <span>Featured Product</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    loading ||
                    !formData.name ||
                    !formData.price ||
                    !formData.stock
                  }
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Product"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
