import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CreditCard, Shield, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductImageSlider from '../components/ProductImageSlider';
import { PRODUCT_IMAGES, PRODUCT_ALT_TEXT } from '../data/productImages';

const CheckoutPage = () => {
  const { t } = useTranslation();
  const { cartItems, getTotalPrice, getSubtotal, getShippingCost, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Static customer details
  const [customerDetails, setCustomerDetails] = useState({
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    address: '123 MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    paymentMethod: 'card'
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and navigate to confirmation
    clearCart();
    navigate('/confirmation');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('checkout.noItems')}</h1>
          <p className="text-gray-400 mb-8">{t('cart.empty')}</p>
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Back to Cart Link */}
        <Link 
          to="/cart" 
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>{t('checkout.backToCart')}</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('checkout.title')}
          </h1>
          <p className="text-gray-300 text-lg">{t('checkout.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-6 lg:space-y-8">
            {/* Customer Information */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">{t('checkout.customerInformation')}</h2>
              
              <form onSubmit={handlePlaceOrder} className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm lg:text-base">{t('checkout.firstName')}</label>
                    <input
                      type="text"
                      value={customerDetails.firstName}
                      onChange={(e) => setCustomerDetails({...customerDetails, firstName: e.target.value})}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg lg:rounded-xl py-2 lg:py-3 px-3 lg:px-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm lg:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm lg:text-base">{t('checkout.lastName')}</label>
                    <input
                      type="text"
                      value={customerDetails.lastName}
                      onChange={(e) => setCustomerDetails({...customerDetails, lastName: e.target.value})}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg lg:rounded-xl py-2 lg:py-3 px-3 lg:px-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm lg:text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm lg:text-base">{t('checkout.email')}</label>
                  <input
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg lg:rounded-xl py-2 lg:py-3 px-3 lg:px-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm lg:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm lg:text-base">{t('checkout.phone')}</label>
                  <input
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg lg:rounded-xl py-2 lg:py-3 px-3 lg:px-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm lg:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm lg:text-base">{t('checkout.address')}</label>
                  <input
                    type="text"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg lg:rounded-xl py-2 lg:py-3 px-3 lg:px-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm lg:text-base"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm lg:text-base">{t('checkout.city')}</label>
                    <input
                      type="text"
                      value={customerDetails.city}
                      onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg lg:rounded-xl py-2 lg:py-3 px-3 lg:px-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm lg:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm lg:text-base">{t('checkout.state')}</label>
                    <input
                      type="text"
                      value={customerDetails.state}
                      onChange={(e) => setCustomerDetails({...customerDetails, state: e.target.value})}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg lg:rounded-xl py-2 lg:py-3 px-3 lg:px-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm lg:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm lg:text-base">{t('checkout.pincode')}</label>
                    <input
                      type="text"
                      value={customerDetails.pincode}
                      onChange={(e) => setCustomerDetails({...customerDetails, pincode: e.target.value})}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg lg:rounded-xl py-2 lg:py-3 px-3 lg:px-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300 text-sm lg:text-base"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Payment Method */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">{t('checkout.paymentMethod')}</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 lg:p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl lg:rounded-2xl">
                  <input
                    type="radio"
                    id="card"
                    name="payment"
                    value="card"
                    checked={customerDetails.paymentMethod === 'card'}
                    onChange={(e) => setCustomerDetails({...customerDetails, paymentMethod: e.target.value})}
                    className="text-amber-400"
                  />
                  <CreditCard className="w-6 h-6 text-amber-400" />
                  <label htmlFor="card" className="text-white font-medium flex-1 text-sm lg:text-base">{t('checkout.creditCard')}</label>
                  <span className="text-amber-400 text-xs lg:text-sm font-bold">{t('checkout.secure')}</span>
                </div>

                <div className="flex items-center space-x-3 p-3 lg:p-4 bg-gray-700/30 border border-gray-600/50 rounded-xl lg:rounded-2xl opacity-50">
                  <input
                    type="radio"
                    id="cod"
                    name="payment"
                    value="cod"
                    disabled
                    className="text-amber-400"
                  />
                  <Truck className="w-6 h-6 text-gray-400" />
                  <label htmlFor="cod" className="text-gray-400 font-medium flex-1 text-sm lg:text-base">{t('checkout.cashOnDelivery')}</label>
                  <span className="text-gray-400 text-xs lg:text-sm">{t('checkout.comingSoon')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6 lg:space-y-8">
            {/* Order Items */}
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">{t('cart.orderSummary')}</h2>
              
              <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 lg:p-4 bg-black/30 rounded-xl lg:rounded-2xl">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg lg:rounded-xl overflow-hidden flex-shrink-0">
                      <ProductImageSlider
                        images={PRODUCT_IMAGES}
                        alt={PRODUCT_ALT_TEXT}
                        className="w-full h-full"
                        showDots={false}
                        autoPlay={false}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-xs sm:text-sm lg:text-base">{item.name}</h3>
                      <p className="text-gray-400 text-xs">{t('cart.quantity')} {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 font-bold text-xs sm:text-sm lg:text-base">{formatPrice(item.price * item.quantity)}</p>
                      <p className="text-gray-400 text-xs line-through">{formatPrice(item.originalPrice * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 lg:pt-6 space-y-2 lg:space-y-3">
                <div className="flex justify-between text-gray-300 text-xs sm:text-sm lg:text-base">
                  <span>{t('cart.subtotal')}</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-xs sm:text-sm lg:text-base">
                  <span>{t('cart.shipping')}</span>
                  <span className="text-green-400">{t('confirmation.free')}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-xs sm:text-sm lg:text-base">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                <div className="border-t border-gray-700 pt-2 lg:pt-3">
                  <div className="flex justify-between text-base sm:text-lg lg:text-2xl font-bold text-white">
                    <span>{t('cart.total')}</span>
                    <span className="text-amber-400">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-sm sm:text-base lg:text-xl hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2 lg:space-x-3">
                  <div className="w-4 h-4 lg:w-6 lg:h-6 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>{t('checkout.processingPayment')}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 lg:space-x-3">
                  <Shield className="w-4 h-4 lg:w-6 lg:h-6" />
                  <span>{t('checkout.placeOrder')}</span>
                </div>
              )}
            </button>

            {/* Security Features */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 lg:space-x-3 mb-3 lg:mb-4">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
                <h3 className="text-green-400 font-bold text-sm sm:text-base lg:text-lg">{t('checkout.securityFeatures.title')}</h3>
              </div>
              <div className="space-y-1 lg:space-y-2 text-green-300 text-xs">
                <p>{t('checkout.securityFeatures.ssl')}</p>
                <p>{t('checkout.securityFeatures.protection')}</p>
                <p>{t('checkout.securityFeatures.guarantee')}</p>
                <p>{t('checkout.securityFeatures.delivery')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;