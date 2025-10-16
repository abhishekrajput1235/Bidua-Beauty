import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useProductStore } from "../../store/useProductStore";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

interface AddProductModalProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  token: string;
}

export default function AddProductModal({ showModal, setShowModal}: AddProductModalProps) {
  const addProduct = useProductStore((state) => state.addProduct);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const {token } = useAuthStore()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [b2bPrice, setB2bPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [stock, setStock] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);

  // Handle image selection (limit to 5)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const totalFiles = files.length + selectedFiles.length;

      if (totalFiles > 5) {
        toast.warning("You can only upload a maximum of 5 images.");
        return;
      }

      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  // Remove selected image
  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit new product
  const handleSubmit = async () => {
    if (!token) return toast.error("You must be logged in!");
    if (!name || !price || !stock) return toast.warning("Name, Price, and Stock are required!");
    if (files.length === 0) return toast.warning("Please upload at least one image!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("b2bPrice", b2bPrice);
    formData.append("sellingPrice", sellingPrice);
    formData.append("stock", stock);
    formData.append("isFeatured", String(isFeatured));

    tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((tag) => formData.append("tags[]", tag));

    files.forEach((file) => formData.append("images", file));

    await addProduct(formData, token);

    if (!error) {
      toast.success("Product added successfully!");
      setName("");
      setDescription("");
      setCategory("");
      setBrand("");
      setPrice("");
      setB2bPrice("");
      setSellingPrice("");
      setStock("");
      setTags("");
      setFiles([]);
      setIsFeatured(false);
      setShowModal(false);
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Product</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              {error && <p className="text-red-500">{error}</p>}

              <input
                type="text"
                placeholder="Product Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Price *"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="B2B Price"
                  value={b2bPrice}
                  onChange={(e) => setB2bPrice(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Selling Price"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <input
                type="number"
                placeholder="Stock *"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />

              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />

              {/* Image Upload */}
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  Upload Images (Max 5)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
                  disabled={files.length >= 5}
                />
                {files.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="relative w-20 h-20">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${idx}`}
                          className="w-full h-full object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
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
                  disabled={loading || !name || !price || !stock}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
