import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useProductStore } from "../store/useProductStore";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const { selectedProduct, fetchProductById, loading } = useProductStore();

  useEffect(() => {
    if (id) fetchProductById(id);
  }, [id, fetchProductById]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading product...
      </div>
    );

  if (!selectedProduct)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Product not found
      </div>
    );

  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span>Back to Products</span>
        </Link>

        {/* Product Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div
            className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm 
                          border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4"
          >
            <img
              src={selectedProduct.images?.[0]?.url || "/placeholder.jpg"}
              alt={selectedProduct.name}
              className="w-full h-[400px] object-cover rounded-xl lg:rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {selectedProduct.name}
            </h1>

            <p className="text-gray-300 text-lg">
              {selectedProduct.description}
            </p>

            <div className="flex items-center space-x-3">
              <span className="text-3xl sm:text-3xl font-bold text-amber-400">
                {formatPrice(selectedProduct.sellingPrice)}
              </span>
              <span className="text-red-500 line-through text-lg">
                {formatPrice(selectedProduct.price)}
              </span>
              {selectedProduct.discountPercentage && (
                <span className="text-gray-500 text-xl">
                  {selectedProduct.discountPercentage}% OFF
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(selectedProduct._id, 1)}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-3 rounded-xl 
                         text-lg font-bold hover:shadow-amber-400/30 hover:shadow-xl 
                         transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={22} />
              <span>Add to Cart</span>
            </button>
            <Link
              to="/cart"
              className="bg-gradient-to-r from-green-400 to-green-500 text-black px-8 py-3 rounded-xl 
                         text-lg font-bold hover:shadow-amber-400/30 hover:shadow-xl 
                         transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={22} />
              <span>Go to Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
