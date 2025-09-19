import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

import { PRODUCT_IMAGES } from "../data/productImages";
import LiquidEther from "./LiquidEther";
import pic3 from "../assets/img/pic3.png";

const Hero = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const product = {
      id: "luxeglow-face-cream",
      name: "BIDUA Radiance 15",
      price: 1499,
      originalPrice: 4999,
      image: PRODUCT_IMAGES[0],
    };
    addToCart(product);
    navigate("/cart");
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <div className="absolute inset-0">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-amber-400/5 to-yellow-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="text-white space-y-4 sm:space-y-6 lg:space-y-2 order-2 lg:order-1 text-center lg:text-left px-4 sm:px-6 lg:px-0">
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-amber-400">
              <Sparkles size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">
                {t("hero.premiumSkincare")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              {t("hero.brandName")}
              <span className="block gradient-text">
                {t("hero.productName")}
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-300">
                {t("hero.tagline")}
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {t("hero.description")}
            </p>

            <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-4 text-amber-400">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-white text-sm sm:text-base">
                {t("hero.rating")}
              </span>
            </div>

<div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto lg:mx-0 mt-10">
  {/* Add to Cart Button */}
  <button
    onClick={handleAddToCart}
    className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black 
               px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold 
               text-sm sm:text-base hover:shadow-xl hover:shadow-amber-400/30 
               transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
  >
    <div className="flex flex-col items-center leading-tight">
      <span className="text-[11px] sm:text-xs line-through opacity-70">
        {t("hero.originalPrice")}
      </span>
      <span className="text-sm sm:text-base font-semibold">
        {t("hero.orderButton")}
      </span>
    </div>
  </button>

  {/* Learn More Button */}
  <button
    onClick={() => {
      const benefitsSection = document.getElementById("benefits");
      benefitsSection?.scrollIntoView({ behavior: "smooth" });
    }}
    className="border border-white/30 text-white 
               px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold 
               text-sm sm:text-base hover:border-amber-400 hover:text-amber-400 
               transition-all duration-300 w-full sm:w-auto"
  >
    {t("hero.learnMore")}
  </button>
</div>


          </div>

         
          {/* Right Content - Product Image */}
          <div className="relative flex justify-center order-2 lg:order-2 px-4 sm:px-6 lg:px-0 py-4 sm:py-6 lg:py-0">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Glow Effect */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-white/20 rounded-full blur-2xl"></div> */}

              <img
                src={pic3}
                alt="hero-img"
                className="w-full h-auto object-contain relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-amber-400 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
