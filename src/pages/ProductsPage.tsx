import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Info, ArrowLeft, Crown, ArrowRight } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useProductStore } from "../store/useProductStore";
import { toast } from "react-toastify";
import ProductDetailsModal from "../components/ProductDetailsModal";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProductsPage = () => {
  const { addToCart, error: addCartErr } = useCartStore();
  const { products, fetchProducts,error } = useProductStore();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

    useEffect(() => {
      if (error) toast.error(error, { position: "top-right", autoClose: 4000 });
    }, [error]);
        useEffect(() => {
      if (addCartErr) toast.error(addCartErr, { position: "top-right", autoClose: 4000 });
    }, [addCartErr]);

  const handleQtyChange = (productId: string, delta: number, availableUnits: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      let newQty = current + delta;
      if (newQty < 1) newQty = 1;
      if (newQty > availableUnits) newQty = availableUnits;
      return { ...prev, [productId]: newQty };
    });
  };

  // Add product to cart
  const handleAddToCart = async (product: any) => {
    try {
      const availableUnits = product.units.filter((unit) => !unit.isSold).length;
      const qty = quantities[product._id] || 1;

      if (availableUnits === 0) {
        toast.error("This product is out of stock.", { position: "top-right", autoClose: 3000 });
        return;
      }

      if (!product?.productId) throw new Error("Invalid product.");
      console.log("Add to cart:", product.productId, "Qty:", qty);

      const success = await addToCart(product.productId, qty);

      if (success) {
        alert("Item added to cart successfully.");
        toast.success("Item added successfully.", { position: "top-right", autoClose: 3000 });
      }
    } catch (error: any) {
      console.error("❌ addToCart error:", error);
      const message = error?.response?.data?.message || error?.message || "Failed to add item to cart.";
      toast.error(message, { position: "top-right", autoClose: 4000 });
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Links */}
        <div className="flex justify-between mb-12">
          <Link to="/" className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>

          <Link to="/cart" className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 group">
            <ShoppingCart size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go to Cart</span>
            <ArrowRight size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Become a BIDUA Beauty Retail Partner and unlock exclusive benefits
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <p className="text-center text-gray-400">No products available</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const availableUnits = product.units.filter((unit) => !unit.isSold).length;
              const qty = quantities[product._id] || 1;
              const isOutOfStock = availableUnits === 0;

              return (
                <div
                  key={product._id}
                  className="relative bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl lg:rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-amber-400/20 transition-all duration-300 flex flex-col group"
                >
                  {/* Product Image */}
                  <div className="w-full h-56 overflow-hidden relative">
                    {isOutOfStock && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">Sold Out</div>
                    )}
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0].url.startsWith("http") ? product.images[0].url : `${BACKEND_URL}${product.images[0].url.startsWith("/") ? "" : "/"}${product.images[0].url}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center text-white">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-6 flex flex-col flex-1 relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">{product.description}</p>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                      {availableUnits > 0 ? `Available in stock (${availableUnits})` : "Out of stock"}
                    </p>

                    {/* Price Info */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-amber-400">{formatPrice(product.sellingPrice)}</span>
                      <span className="text-md text-red-400 line-through">{formatPrice(product.price)}</span>
                      {product.discountPercentage && <span className="text-sm text-gray-500">{product.discountPercentage}% OFF</span>}
                    </div>

                    <div className="flex flex-col items-between justify-start position bottom-2 mt-auto">
                     {/* Quantity & Action Buttons */}
                    <div className={`flex items-center justify-between mb-4 ${isOutOfStock ? "opacity-50" : ""}`}>
                        <button
                          onClick={() => !isOutOfStock && handleQtyChange(product._id, -1, availableUnits)}
                          disabled={isOutOfStock}
                          className="flex justify-center items-center rounded-lg border border-yellow-300 px-4 py-1 bg-gray-700 text-white hover:bg-gray-600 transition"
                        >
                          -
                        </button>
                        <div className="flex justify-center items-center rounded-lg border border-yellow-300 px-8 py-1 text-sm w-12 text-center bg-gray-800 text-white">{qty}</div>
                        <button
                          onClick={() => !isOutOfStock && handleQtyChange(product._id, 1, availableUnits)}
                          disabled={isOutOfStock}
                          className="flex justify-center items-center rounded-lg border border-yellow-300 px-4 py-1 bg-gray-700 text-white hover:bg-gray-600 transition"
                        >
                          +
                        </button>
                    </div>
                    {/* Quantity & Action Buttons */}
                    <div className="mt-auto flex  items-center gap-2">
                      {/* Quantity Controls */}

                      {/* Add to Cart */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isOutOfStock}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition ${
                          isOutOfStock
                            ? "bg-gray-500 cursor-not-allowed text-black"
                            : "bg-gradient-to-r from-amber-400 to-yellow-500 hover:shadow-amber-400/30 hover:shadow-lg text-black"
                        }`}
                      >
                        <ShoppingCart size={18} /> {isOutOfStock ? "Add" : "Add"}
                      </button>

                      {/* Details */}
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowModal(true);
                        }}
                        className="flex-1 bg-gray-700/60 hover:bg-gray-600 text-white py-2 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                      >
                        <Info size={18} /> Details
                      </button>
                    </div>
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

<div className="mt-12 flex justify-center">
  <Link
    to="/cart"
    className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold text-xl lg:text-2xl px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
  >
    Proceed to Checkout
  </Link>
</div>



      {/* Product Details Modal */}
      <ProductDetailsModal showModal={showModal} setShowModal={setShowModal} product={selectedProduct} />
    </section>
  );
};

export default ProductsPage;
