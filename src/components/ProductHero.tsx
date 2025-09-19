import React from "react";
import BiduaBg3 from "../assets/img/BiduaBg3.png";
import { useTranslation } from "react-i18next";

const ProductHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Right background image */}
      <div
        className="absolute inset-0 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${BiduaBg3})` }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32 flex flex-col lg:flex-row items-start lg:items-center gap-10">
        {/* Left: Text */}
        <div className="lg:w-1/2 text-left text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-700">
            {t("productDetails.naturalGlowCream.natural")}{" "}
            <span className="chroma-text">
              {t("productDetails.naturalGlowCream.glow")}
            </span>{" "}
            {t("productDetails.naturalGlowCream.cream")}
          </h2>

          <p className="text-lg sm:text-xl text-black max-w-xl leading-relaxed mb-4 text-justify">
            {t("productDetails.introduction.description")}
          </p>
          <p className="text-base sm:text-lg text-black max-w-lg text-justify">
            {t("productDetails.introduction.benefits")}
          </p>
        </div>

        {/* Right: Optional empty placeholder for spacing if needed */}
        <div className="lg:w-1/2 hidden lg:block"></div>
      </div>
    </section>
  );
};

export default ProductHero;
