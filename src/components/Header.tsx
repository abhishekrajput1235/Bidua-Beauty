// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { ShoppingCart, Menu, X } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import LanguageSwitcher from './LanguageSwitcher';

// const Header = () => {
//   const { t } = useTranslation();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { getTotalItems } = useCart();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//       isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-2xl' : 'bg-transparent'
//     }`}>
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           <div className="text-2xl font-bold text-white">
//             BIDUA <span className="gradient-text">Beauty</span>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <a href="#hero" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.home')}</a>
//             <a href="#benefits" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.benefits')}</a>
//             <a href="#ingredients" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.ingredients')}</a>
//             <a href="#product-details" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.details')}</a>
//             <a href="#testimonials" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-xl lg:text-extrabold">{t('navigation.reviews')}</a>
//           </nav>

//           <div className="flex items-center space-x-4">
//             <div className="hidden md:block">
//               <LanguageSwitcher />
//             </div>
//             <Link 
//               to="/cart" 
//               className="relative text-white hover:text-amber-400 transition-colors duration-300"
//             >
//               <ShoppingCart size={24} />
//               {getTotalItems() > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                   {getTotalItems()}
//                 </span>
//               )}
//             </Link>
//             <button 
//               className="md:hidden text-white"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMobileMenuOpen && (
//           <nav className="md:hidden mt-4 py-4 border-t border-gray-700 bg-black/95 backdrop-blur-lg rounded-lg mx-4">
//             <div className="flex flex-col space-y-4 px-4">
//               <div className="pb-4 border-b border-gray-700">
//                 <LanguageSwitcher />
//               </div>
//               <a href="#hero" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.home')}</a>
//               <a href="#benefits" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.benefits')}</a>
//               <a href="#ingredients" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.ingredients')}</a>
//               <a href="#product-details" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.details')}</a>
//               <a href="#testimonials" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>{t('navigation.reviews')}</a>
//             </div>
//           </nav>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;





import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            <Link to="/" className="text-white hover:text-amber-400 transition-colors duration-300">
              BIDUA <span className="gradient-text">Beauty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base">Home</a>
            <a href="#benefits" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base">Benefits</a>
            <a href="#ingredients" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base">Ingredients</a>
            <a href="#product-details" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base">Details</a>
            <a href="#testimonials" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base">Reviews</a>
            {isLoggedIn && (
              <>
                <Link to="/join-brpp" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base">Join BRPP</Link>
                <Link to="/b2b-catalog" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base">B2B Catalog</Link>
                <Link to="/partner-wallet" className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base">Partner Wallet</Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/user-profile" 
                  className="relative text-white hover:text-amber-400 transition-colors duration-300"
                  title="User Profile"
                >
                  <User size={24} />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="relative text-white hover:text-amber-400 transition-colors duration-300"
                  title="Logout"
                >
                  <LogOut size={24} />
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="relative text-white hover:text-amber-400 transition-colors duration-300"
                title="Login"
              >
                <User size={24} />
              </Link>
            )}
            <Link 
              to="/cart" 
              className="relative text-white hover:text-amber-400 transition-colors duration-300"
              title="Shopping Cart"
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
              <a href="#hero" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#benefits" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Benefits</a>
              <a href="#ingredients" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Ingredients</a>
              <a href="#product-details" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Details</a>
              <a href="#testimonials" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a>
              {isLoggedIn && (
                <>
                  <Link to="/join-brpp" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Join BRPP</Link>
                  <Link to="/b2b-catalog" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>B2B Catalog</Link>
                  <Link to="/partner-wallet" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Partner Wallet</Link>
                </>
              )}
              {isLoggedIn ? (
                <>
                  <Link to="/user-profile" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>User Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;