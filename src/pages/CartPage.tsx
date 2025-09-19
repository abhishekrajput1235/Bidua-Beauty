import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductImageSlider from '../components/ProductImageSlider';
import { PRODUCT_IMAGES, PRODUCT_ALT_TEXT } from '../data/productImages';

const CartPage = () => {
  const { t } = useTranslation();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getSubtotal, getShippingCost } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">{t('cart.empty')}</h1>
          <p className="text-gray-400 mb-8 text-lg">{t('cart.emptySubtitle')}</p>
          <Link 
            to="/" 
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>{t('cart.continueShopping')}</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('cart.title')}
          </h1>
          <p className="text-gray-300 text-lg">{t('cart.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4 lg:p-6">
                <div className="flex items-start lg:items-center space-x-4 lg:space-x-6">
                  {/* Product Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl lg:rounded-2xl overflow-hidden flex-shrink-0">
                    <ProductImageSlider
                      images={PRODUCT_IMAGES}
                      alt={PRODUCT_ALT_TEXT}
                      className="w-full h-full"
                      showDots={false}
                      autoPlay={false}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 lg:mb-3">{item.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mb-3 lg:mb-4">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-400">{formatPrice(item.price)}</span>
                      <span className="text-sm sm:text-base text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-bold w-fit">
                        {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-3 lg:space-y-0">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-sm sm:text-base text-gray-300 font-medium">{t('cart.quantity')}</span>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                          >
                            <Minus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-8 sm:w-12 text-center text-white font-bold text-base sm:text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                          >
                            <Plus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors duration-300 p-1 sm:p-2 hover:bg-red-400/10 rounded-lg"
                      >
                        <Trash2 size={16} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 sticky top-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">{t('cart.orderSummary')}</h2>
              
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-300 text-xs sm:text-sm lg:text-base">
                    <span className="flex-1 pr-2">{item.name} × {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-3 lg:pt-4 mb-4 lg:mb-6">
                <div className="flex justify-between text-gray-300 mb-2 text-xs sm:text-sm lg:text-base">
                  <span>{t('cart.subtotal')}</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-gray-300 mb-2 text-xs sm:text-sm lg:text-base">
                  <span>{t('cart.shipping')}</span>
                  <span>{formatPrice(getShippingCost())}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg lg:text-xl font-bold text-white">
                  <span>{t('cart.total')}</span>
                  <span className="text-amber-400">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105 text-center block"
              >
                {t('cart.proceedToCheckout')}
              </Link>

              <div className="mt-4 lg:mt-6 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 text-gray-400 text-xs">
                  <span>{t('cart.secureCheckout')}</span>
                  <span>{t('cart.fastDelivery')}</span>
                  <span>{t('cart.returns')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;