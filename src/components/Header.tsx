


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "react-i18next";
import logo from '../assets/img/beauty-logo.png'

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const cart = useCartStore((state) => state.cart);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch cart data
  useEffect(() => {
    const fetchData = async () => {
      await fetchCart();
    };
    fetchData();
  }, [fetchCart]);

  // Update total items count
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setTotalItems(total);
  }, [cart]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast.success(t("navigation.logout") + " ✅");
    navigate("/");
  };

  const navLinks = [
    { to: "#hero", label: t("navigation.home") },
    { to: "#benefits", label: t("navigation.benefits") },
    { to: "#ingredients", label: t("navigation.ingredients") },
    { to: "#product-details", label: t("navigation.details") },
    { to: "#testimonials", label: t("navigation.reviews") },
  ];

  const privateLinks = [
    { to: "/join-brpp", label: t("navigation.joinBrpp") },
    { to: "/b2b-catalog", label: t("navigation.b2bCatalog") },
    { to: "/partner-wallet", label: t("navigation.partnerWallet") },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-lg shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-white">
              <Link
                to="/"
                className="text-white hover:text-amber-400 transition-colors duration-300"
              >
{/*    {t("hero.brandName")}{" "}
                <span className="gradient-text">Beauty</span>*/}
                <img src={logo} alt="logo" className="h-16 "/>
              </Link> 

            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base"
                >
                  {link.label}
                </a>
              ))}

              {isLoggedIn &&
                privateLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-white hover:text-amber-400 transition-colors duration-300 text-sm lg:text-base"
                  >
                    {link.label}
                  </Link>
                ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* 🔥 Language Selector hidden on desktop */}
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="hidden md:block bg-black text-white px-2 py-1 rounded border border-gray-500 text-sm"
              >
                <option value="en">EN</option>
                <option value="hi">हिन्दी</option>
                <option value="bn">বাংলা</option>
                <option value="mr">मराठी</option>
                <option value="ta">தமிழ்</option>
              </select>

              {/* Auth & Cart */}
              {isLoggedIn ? (
                <>
                  <Link
                    to="/user-profile"
                    className="relative text-green-500 hover:text-amber-400 transition-colors duration-300"
                    title={t("navigation.profile")}
                  >
                    <User size={24} />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="relative text-red-500 hover:text-amber-400 transition-colors duration-300"
                    title={t("navigation.logout")}
                  >
                    <LogOut size={24} />
                  </button>
                </>
              ) : (
                <Link
                  to="/signup"
                  className="relative text-white hover:text-amber-400 transition-colors duration-300"
                  title={t("navigation.signup")}
                >
                  <User size={24} />
                </Link>
              )}

              <Link
                to="/cart"
                className="relative text-white hover:text-amber-400 transition-colors duration-300"
                title={t("navigation.cart")}
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* ✅ Mobile Menu */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t border-gray-700 bg-black/95 backdrop-blur-lg rounded-lg mx-4">
              <div className="flex flex-col space-y-4 px-4">
                {navLinks.map((link) => (
                  <a
                    key={link.to}
                    href={link.to}
                    className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg"
                  >
                    {link.label}
                  </a>
                ))}

                {isLoggedIn &&
                  privateLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg"
                    >
                      {link.label}
                    </Link>
                  ))}

                {/* 🔥 Language Selector inside mobile menu only */}
                <div className="mt-2">
                  <label className="text-gray-400 text-sm mb-1 block">
                    {t("Select Language")}
                  </label>
                  <select
                    onChange={(e) => changeLanguage(e.target.value)}
                    value={i18n.language}
                    className="w-full bg-black text-white px-2 py-2 rounded border border-gray-500"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="bn">বাংলা</option>
                    <option value="mr">मराठी</option>
                    <option value="ta">தமிழ்</option>
                  </select>
                </div>

                {/* Auth Options */}
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/user-profile"
                      className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg"
                    >
                      {t("navigation.profile")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg"
                    >
                      {t("navigation.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg"
                    >
                      {t("navigation.signup")}
                    </Link>
                    <Link
                      to="/login"
                      className="text-white hover:text-amber-400 transition-colors duration-300 py-2 text-lg"
                    >
                      {t("navigation.login")}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <ToastContainer />
    </>
  );
};

export default Header;
