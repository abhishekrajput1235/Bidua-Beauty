import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCT_IMAGES } from '../data/productImages';
import BiduaBg4 from '../assets/img/BiduaBg4.png';

const features = [
  { icon: Shield, text: "30-Day Money Back Guarantee" },
  { icon: Truck, text: "Fast Worldwide Delivery" },
  { icon: RotateCcw, text: "Easy Returns & Exchanges" }
];

const CTA = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const product = {
      id: 'luxeglow-face-cream',
      name: 'BIDUA Radiance 15',
      price: 1499,
      originalPrice: 4999,
      image: PRODUCT_IMAGES[0]
    };
    addToCart(product);
    navigate('/cart');
  };
  return (
<section 
  id="cta" 
  className="py-24 relative overflow-hidden"
  style={{
    backgroundImage: `url(${BiduaBg4})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 
               bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 
               bg-clip-text text-transparent">
  {t('cta.title')}
</h2>

      <p className="text-lg sm:text-xl text-gray-900 mb-6 lg:mb-8 max-w-2xl mx-auto px-4">{t('cta.subtitle')}</p>

      {/* Pricing */}
      <div className="bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 lg:p-8 mb-6 lg:mb-8 max-w-sm sm:max-w-md mx-auto">
        <div className="text-center">
          <span className="text-gray-400 text-base sm:text-lg line-through">{t('cta.originalPrice')}</span>
          <div className="text-4xl sm:text-5xl font-bold text-white mb-2">{t('cta.currentPrice')}</div>
          <p className="text-sm sm:text-base text-gray-300">{t('cta.specialOffer')}</p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleAddToCart}
        className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105 shadow-2xl mb-6 lg:mb-8 flex items-center space-x-2 sm:space-x-3 mx-auto"
      >
        <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
        <span>{t('cta.orderButton')}</span>
      </button>

      {/* Features */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 lg:mt-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index} 
              className="flex items-center justify-center space-x-2 sm:space-x-3 text-gray-300 p-2 hover:text-amber-400 transition-colors duration-300"
            >
              <Icon size={20} className="sm:w-6 sm:h-6 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base text-center">
                {t(`cta.feature${index + 1}`)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

  );
};

export default CTA;