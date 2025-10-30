import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import AddProductModal from "@/components/admin/AddProductModal";
import UpdateProductModal from "@/components/admin/EditProductModal";
import ViewProductModal from "@/components/admin/ViewProductModal";
import { useProductStore, Product } from "@/store/useProductStore";
import { toast } from "react-toastify";
import AddStockModal from "@/components/admin/AddStockModal";
import {useAuthStore} from "../../store/authStore"

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [stockProduct, setStockProduct] = useState<Product | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const {token} = useAuthStore();

  const { products, fetchProducts, deleteProduct, loading, error } =
    useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      // const token = localStorage.getItem("token");
      await deleteProduct(id, token);
      toast.success("Product deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error: any) {
      toast.error("Failed to delete product. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add Product</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white text-sm sm:text-base"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white text-sm sm:text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto">
        <div className="min-w-[600px] md:min-w-0 max-h-[500px] overflow-y-auto">
          {loading ? (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">
              Loading products...
            </p>
          ) : filteredProducts.length === 0 ? (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">
              No products found.
            </p>
          ) : (
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead className="bg-gray-50 dark:bg-gray-800/50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 py-2 text-left text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-2 whitespace-nowrap flex items-center gap-2 sm:gap-3">
                      {product.images?.slice(0, 1).map((imgObj) => (
                        <img
                          key={imgObj._id}
                          src={
                            imgObj.url.startsWith("http")
                              ? imgObj.url
                              : `${BACKEND_URL}${
                                  imgObj.url.startsWith("/") ? "" : "/"
                                }${imgObj.url}`
                          }
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ))}
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {product.name}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-300">
                      {product.category}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-white font-semibold">
                      ₹{product.price}
                    </td>
                    <td
                      className={`px-4 py-2 whitespace-nowrap ${
                        product.stock > 20
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {product.stock}
                    </td>
                    <td className="px-4 py-2 flex gap-1 sm:gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowViewModal(true);
                        }}
                        className="p-1 sm:p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1 sm:p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      {/* ✅ Add Stock button */}
                      <button
                        onClick={() => {
                          setStockProduct(product);
                          setShowAddStockModal(true);
                        }}
                        className="p-1 sm:p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-1 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        token={localStorage.getItem("token") || ""}
      />
      {selectedProduct && (
        <UpdateProductModal
          showModal={showUpdateModal}
          setShowModal={setShowUpdateModal}
          token={localStorage.getItem("token") || ""}
          product={selectedProduct}
        />
      )}
      {selectedProduct && (
        <ViewProductModal
          showModal={showViewModal}
          setShowModal={setShowViewModal}
          product={selectedProduct}
        />
      )}
      {stockProduct && (
        <AddStockModal
          showModal={showAddStockModal}
          setShowModal={setShowAddStockModal}
          product={stockProduct}
          token={localStorage.getItem("token") || ""}
        />
      )}
    </motion.div>
  );
}
