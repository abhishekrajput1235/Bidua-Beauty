import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Sun,
  Moon,
  Baby,
  Clock,
  Shield,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { PRODUCT_IMAGES } from "../data/productImages";
import ProductHero from "./ProductHero";
import FeaturesCarousel from "./FeaturesCarousel";
import HowToUseSection from "./HowToUseSection";
import pic4 from '../assets/img/pic4.png';

const ProductDetails = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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

  const uniqueFeatures = [
    {
      icon: Sparkles,
      title: "Daily Repair & Glow",
      description: "Keeps skin hydrated, nourished, and naturally bright.",
    },
    {
      icon: Sun,
      title: "Dark Spot & Pigmentation Solution",
      description: "Works deeply to fade marks and restore even skin tone.",
    },
    {
      icon: Moon,
      title: "Day & Night Care",
      description: "Protects in the day, repairs at night for 24/7 skincare.",
    },
    {
      icon: Baby,
      title: "Multi-Purpose Formula",
      description: "Safe for adults and babies - gentle yet effective.",
    },
    {
      icon: Clock,
      title: "Visible Results",
      description:
        "Noticeable improvements within 15–30 days of consistent use.",
    },
  ];

  const usageSteps = [
    {
      icon: Sun,
      title: "For Daytime Use",
      steps: [
        "Wash your face with a mild cleanser",
        "Apply a thin layer of cream evenly on face, under-eye, and neck",
        "Massage gently until absorbed",
        "Acts as a moisturizer + natural protector",
      ],
    },
    {
      icon: Moon,
      title: "For Nighttime Use (Special Repair)",
      steps: [
        "Cleanse your skin before bedtime",
        "Apply a slightly thick layer on dark circles and affected areas",
        "Leave overnight for deep repair",
        "Within 15 days, reduces dark circles and restores natural glow",
      ],
    },
    {
      icon: Baby,
      title: "For Baby Rashes",
      steps: [
        "Apply a thin layer on clean, dry skin",
        "Gently massage to soothe diaper rashes",
        "Prevents redness and promotes healing",
      ],
    },
  ];

  const whyItWorks = [
    "Boosting collagen production for firmer skin",
    "Neutralizing free radicals that cause aging",
    "Fading dark spots & pigmentation naturally",
    "Maintaining hydration & barrier protection",
  ];

  const whoCanUse = [
    "Men & women of all ages",
    "All skin types (dry, oily, sensitive, combination)",
    "Safe for babies (for diaper rashes)",
    "Suitable for daily, long-term use",
  ];

  const faqs = [
    {
      question: "How soon will I see results?",
      answer:
        "Night use (thick layer): Dark spots & circles reduce within 15 days. Daily use (thin layer): Skin becomes brighter & smoother in 30 days.",
    },
    {
      question: "Is it safe for sensitive skin?",
      answer:
        "⚠️ MANDATORY PATCH TEST REQUIRED: While made with natural ingredients and free from parabens, sulfates, and harsh chemicals, we STRICTLY recommend a patch test before use, especially for sensitive skin. Test on your inner wrist or behind your ear and wait 24-48 hours. Even natural ingredients can cause reactions in sensitive individuals. Never apply directly to face without patch testing first.",
    },
    {
      question: "Can men use it?",
      answer:
        "Absolutely. Our cream works for both men and women of all ages. Skincare has no gender boundaries!",
    },
    {
      question: "Does it protect from the sun?",
      answer:
        "Yes, Zinc Oxide acts as a natural sunscreen, providing protection against harmful UV rays while nourishing your skin.",
    },
    {
      question: "Will it really restore natural skin color?",
      answer:
        "Yes — with consistent use, skin tone naturally returns to its true color tone (nose-tip shade). Results are visible and lasting.",
    },
    {
      question:
        "Should I do a patch test before using? What about after waxing or other treatments?",
      answer:
        "⚠️ MANDATORY PATCH TEST: Always test on your inner wrist or behind your ear first. Wait 24-48 hours to check for any allergic reactions. IMPORTANT FOR SENSITIVE SKIN: If you've had facial waxing, threading, chemical peels, or laser treatments, wait 48-72 hours before applying. Never apply a thick layer on freshly treated or sensitive skin with open pores as it may cause burning or irritation. Start with a very thin layer and gradually increase if no adverse reactions occur.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <ProductHero />
      <div className="bg-black py-16 lg:py-8">
        <FeaturesCarousel uniqueFeatures={uniqueFeatures} />
      </div>
      <HowToUseSection
        usageSteps={usageSteps}
        imageSrc={pic4}
        imageAlt="Using the product"
      />

      <section
        id="product-details"
        className="py-24 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
     

          {/* Why It Works */}
          <div className="mb-16 lg:mb-20">
            <div className="bg-gradient-to-br from-amber-400/10 to-yellow-500/10 border border-amber-400/30 rounded-3xl p-8 lg:p-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
                {t("productDetails.whyItWorks.title")}{" "}
                <span className="gradient-text">
                  {t("productDetails.whyItWorks.works")}
                </span>
              </h3>
              <p className="text-lg sm:text-xl text-gray-300 text-center mb-8 max-w-3xl mx-auto">
                {t("productDetails.whyItWorks.description")}
              </p>
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
                {t("productDetails.whyItWorks.reasons", {
                  returnObjects: true,
                }).map((reason, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base">
                      {reason}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-amber-400 font-bold text-lg sm:text-xl">
                {t("productDetails.whyItWorks.conclusion")}
              </p>
            </div>
          </div>

          {/* Who Can Use It */}
          <div className="mb-16 lg:mb-20">
            <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
              {t("productDetails.whoCanUse.title")}{" "}
              <span className="gradient-text">
                {t("productDetails.whoCanUse.use")}
              </span>
            </h3>
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 lg:p-12">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {t("productDetails.whoCanUse.users", {
                  returnObjects: true,
                }).map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm sm:text-base font-medium">
                      {user}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

{/* FAQs */}
<div className="mb-16 lg:mb-20">
  <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
    {t("productDetails.faqs.title")}{" "}
    <span className="gradient-text">{t("productDetails.faqs.questions")}</span>
  </h3>

  <div className="max-w-2xl mx-auto divide-y divide-gray-700">
    {t("productDetails.faqs.items", { returnObjects: true }).map(
      (faq, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center bg-amber-500/20 rounded-full">
                <HelpCircle className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="text-white font-medium text-lg">{faq.question}</h4>
            </div>
            <div className="transition-transform duration-300">
              {openFAQ === index ? (
                <ChevronUp className="w-5 h-5 text-amber-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-amber-400" />
              )}
            </div>
          </button>

          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
              openFAQ === index ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <p className="pl-14 text-gray-300 text-sm sm:text-base leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      )
    )}
  </div>
</div>



{/* Final Call-to-Action */}
<div className="text-center">
  <div
    className="relative max-w-4xl mx-auto p-8 lg:p-12 rounded-3xl border"
    style={{
      background: "rgba(255, 255, 255, 0.05)", // Transparent glossy
      border: "1px solid rgba(255, 184, 28, 0.3)", // RGB amber border
      backdropFilter: "blur(15px)", // Glass effect
      WebkitBackdropFilter: "blur(15px)",
    }}
  >
    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
      {t("productDetails.finalCTA.title")}{" "}
      <span className="gradient-text">
        {t("productDetails.finalCTA.journey")}
      </span>{" "}
      {t("productDetails.finalCTA.today")}
    </h3>
    <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      {t("productDetails.finalCTA.description")}
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
      <button
        onClick={handleAddToCart}
        className="flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl font-bold text-lg text-black bg-gradient-to-r from-amber-400 to-yellow-500
          hover:shadow-[0_10px_30px_rgba(255,184,28,0.5)] transition-all duration-300 transform hover:scale-105"
      >
        <ShoppingCart size={20} />
        <span>{t("productDetails.finalCTA.orderButton")}</span>
      </button>

      <button
        onClick={() => {
          const ingredientsSection =
            document.getElementById("ingredients");
          ingredientsSection?.scrollIntoView({ behavior: "smooth" });
        }}
        className="px-8 py-4 rounded-2xl font-bold text-lg border-2 border-rgb(255,184,28,0.5) text-amber-400
          hover:border-rgba(255,184,28,1) hover:bg-amber-400/10 transition-all duration-300"
      >
        {t("productDetails.finalCTA.learnMore")}
      </button>
    </div>
  </div>
</div>


        </div>
      </section>
    </>
  );
};

export default ProductDetails;
