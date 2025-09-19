import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            BIDUA <span className="gradient-text">Beauty</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.home')}</a>
            <a href="#benefits" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.benefits')}</a>
            <a href="#ingredients" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.ingredients')}</a>
            <a href="#product-details" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.details')}</a>
            <a href="#testimonials" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.reviews')}</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Link 
              to="/cart" 
              className="relative text-white hover:text-amber-400 transition-colors duration-300"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-700 bg-black/95 backdrop-blur-lg rounded-lg mx-4">
            <div className="flex flex-col space-y-4 px-4">
              <div className="pb-4 border-b border-gray-700">
                <LanguageSwitcher />
              </div>
              <a href="#hero" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.home')}</a>
              <a href="#benefits" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.benefits')}</a>
              <a href="#ingredients" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.ingredients')}</a>
              <a href="#product-details" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.details')}</a>
              <a href="#testimonials" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.reviews')}</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;