// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingCart, Info, ArrowLeft, Crown,  } from "lucide-react";
// import { useCartStore } from "../store/cartStore"; // Zustand cart store
// import { useProductStore } from "../store/useProductStore"; // Zustand product store
// import { toast } from "react-toastify";

// const ProductsPage = () => {
//   const navigate = useNavigate();
//   // const { addToCart } = useCartStore();
// const { addToCart } = useCartStore();
// const { products, fetchProducts, loading } = useProductStore();

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

// const handleAddToCart = async (product: any) => {
//   await addToCart(product.productId, 1); // quantity = 1
//   toast.success("Item Add successfully.")

// };



//   const formatPrice = (price: number) =>
//     new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-400">
//         Loading products...
//       </div>
//     );

//   return (
//     <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between">
//         <Link
//           to="/"
//           className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
//         >
//           <ArrowLeft
//             size={20}
//             className="group-hover:-translate-x-1 transition-transform duration-300"
//           />
//           <span>Back to Home</span>
//         </Link>
//             <Link
//           to="/cart"
//           className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
//         >
          
//           <span>Go to Cart</span>
//           <ShoppingCart
//             size={20}
//             className="group-hover:-translate-x-1 transition-transform duration-300"
//           />
//         </Link>
//         </div>

//         {/* Page Header */}
//         <div className="text-center mb-12">
//           <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
//             <Crown className="w-10 h-10 text-black" />
//           </div>
//           <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
//             Our Products
//           </h1>
//           <p className="text-gray-300 text-lg max-w-2xl mx-auto">
//             Become a BIDUA Beauty Retail Partner and unlock exclusive benefits
//           </p>
//         </div>
//         {/* Header */}

//         {products.length === 0 ? (
//           <p className="text-center text-gray-400">No products available</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 
//                            rounded-2xl lg:rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-amber-400/20 
//                            transition-all duration-300 group flex flex-col"
//               >
//                 {/* Product Image */}
//                 <div className="w-full h-56 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
//                   <img
//                     src={product.images?.[0]?.url || "/placeholder.jpg"}
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-4 sm:p-6 flex flex-col flex-1">
//                   <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
//                     {product.name}
//                   </h3>
//                   <p className="text-sm text-gray-400 line-clamp-2 mb-4">
//                     {product.description}
//                   </p>

//                   {/* Price */}
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-xl font-bold text-amber-400">
//                       {formatPrice(product.sellingPrice)}
//                     </span>
//                      <span className="text-md text-red-400 line-through">
//                       {formatPrice(product.price)}
//                     </span>
//                     {product.discountPercentage && (
//                       <span className="text-sm text-gray-500">
//                         {product.discountPercentage}% OFF
//                       </span>
//                     )}
//                   </div>

//                   {/* Buttons */}
//                   <div className="flex space-x-2 mt-auto">
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-2 rounded-xl 
//                                  font-semibold hover:shadow-amber-400/30 hover:shadow-lg transition-all 
//                                  duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
//                     >
//                       <ShoppingCart size={18} />
//                       <span>Add</span>
//                     </button>
//                     <button
//                       onClick={() => navigate(`/products/${product._id}`)}
//                       className="flex-1 bg-gray-700/60 hover:bg-gray-600 text-white py-2 rounded-xl 
//                                  font-semibold transition-colors flex items-center justify-center space-x-2"
//                     >
//                       <Info size={18} />
//                       <span>Details</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductsPage;



import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Info, ArrowLeft, Crown } from "lucide-react";
import { useCartStore } from "../store/cartStore"; // Zustand cart store
import { useProductStore } from "../store/useProductStore"; // Zustand product store
import { toast } from "react-toastify";

const ProductsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = async (product: any) => {
    await addToCart(product.productId, 1); // quantity = 1
    toast.success("Item added successfully.");
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading products...
      </div>
    );

  return (
    <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Links */}
        <div className="flex justify-between mb-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 group"
          >
            <span>Go to Cart</span>
            <ShoppingCart
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Become a BIDUA Beauty Retail Partner and unlock exclusive benefits
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <p className="text-center text-gray-400">No products available</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="relative bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 
                           rounded-2xl lg:rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-amber-400/20 
                           transition-all duration-300 flex flex-col group"
              >
                {/* Product Image */}
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6 flex flex-col flex-1 relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-amber-400">
                      {formatPrice(product.sellingPrice)}
                    </span>
                    <span className="text-md text-red-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    {product.discountPercentage && (
                      <span className="text-sm text-gray-500">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-2 mt-auto">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="relative z-10 flex-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-2 rounded-xl 
                                 font-semibold hover:shadow-amber-400/30 hover:shadow-lg transition-all 
                                 duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart size={18} />
                      <span>Add</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="relative z-10 flex-1 bg-gray-700/60 hover:bg-gray-600 text-white py-2 rounded-xl 
                                 font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Info size={18} />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
