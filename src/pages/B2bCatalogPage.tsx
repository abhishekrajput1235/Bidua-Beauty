import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Package, DollarSign, LogIn } from 'lucide-react';
import ProductImageSlider from '../components/ProductImageSlider';
import { PRODUCT_IMAGES } from '../data/productImages';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const b2bProducts = [
  {
    id: 'bidua-radiance-15',
    name: 'BIDUA Radiance 15 Cream',
    b2bPrice: 1150,
    mrp: 4999,
    minOrderQty: 10,
    image: PRODUCT_IMAGES[0],
    description: 'Premium skincare cream for dark spots, sun damage, and natural glow.',
  },
  {
    id: 'bidua-radiance-15-bundle',
    name: 'BIDUA Radiance 15 (Pack of 3)',
    b2bPrice: 2800,
    mrp: 14997, // 4999 * 3
    minOrderQty: 5,
    image: PRODUCT_IMAGES[1],
    description: 'Value pack of 3 BIDUA Radiance 15 creams for extended use.',
  },
  {
    id: 'bidua-radiance-15-pro',
    name: 'BIDUA Radiance 15 Pro (Large)',
    b2bPrice: 1800,
    mrp: 7999,
    minOrderQty: 8,
    image: PRODUCT_IMAGES[2],
    description: 'Larger size of BIDUA Radiance 15 for professional use.',
  },
];

const B2bCatalogPage = () => {
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <LogIn className="w-24 h-24 text-gray-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-gray-400 mb-8 text-lg">Please login to access the B2B catalog</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="border-2 border-amber-400/50 text-amber-400 px-8 py-4 rounded-full font-bold text-lg hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            B2B Catalog
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Exclusive wholesale pricing for business partners
          </p>
        </div>

        {/* Minimum Order Info */}
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-4 text-center mb-12">
          <p className="text-amber-200 text-base font-medium">
            Minimum order value: <span className="font-bold">₹20,000</span>
          </p>
        </div>

        {/* Product List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {b2bProducts.map((product) => (
            <div key={product.id} className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 shadow-2xl flex flex-col">
              <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-700">
                <ProductImageSlider
                  images={[product.image]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  showDots={false}
                  autoPlay={false}
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4 flex-grow">{product.description}</p>
              
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <p className="text-gray-400 text-sm line-through">MRP: {formatPrice(product.mrp)}</p>
                  <p className="text-amber-400 text-2xl font-bold">B2B Price: {formatPrice(product.b2bPrice)}</p>
                </div>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                  {Math.round((1 - product.b2bPrice / product.mrp) * 100)}% OFF
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4">
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
                    type: 'b2b' as const,
                  };
                  addToCart(itemToAdd);
                  navigate('/cart');
                }}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Package className="w-5 h-5" />
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