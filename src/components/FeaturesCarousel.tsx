import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { Sparkles, Sun, Moon, Baby, Clock } from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Props {
  uniqueFeatures: Feature[];
}

const FeaturesCarousel: React.FC<Props> = ({ uniqueFeatures }) => {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    slidesToShow: 3, // Desktop: 3 cards
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } }, // Tablet: 2 cards
      { breakpoint: 640, settings: { slidesToShow: 1 } }, // Mobile: 1 card full width
    ],
  };

  return (
    <div className="w-screen bg-black py-16 lg:py-24">
    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold 
  text-white text-center mb-12 px-4 leading-tight">
  {t("productDetails.uniqueFeatures.title")}{" "}
  <span className="gradient-text">
    {t("productDetails.uniqueFeatures.unique")}
  </span>
</h3>


      <div className="w-full">
        <Slider {...settings}>
          {uniqueFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="px-2 flex h-full">
                <div
                  className="flex flex-col justify-between flex-1
                                bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm
                                border border-gray-700/50 rounded-xl p-4 sm:p-5
                                hover:border-amber-400/50 transition-all duration-300 group
                                min-h-[220px] sm:min-h-[250px] md:min-h-[280px]"
                >
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12
        bg-gradient-to-br from-amber-400 to-yellow-500
        rounded-xl flex items-center justify-center
        mb-3 sm:mb-4 group-hover:scale-105
        transition-transform duration-300"
                    >
                      <Icon size={18} className="sm:w-5 sm:h-5 text-black" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4
                    className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3
      text-center group-hover:text-amber-400 transition-colors duration-300"
                  >
                    {t(
                      `productDetails.uniqueFeatures.feature${index + 1}.title`
                    )}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-snug text-center">
                    {t(
                      `productDetails.uniqueFeatures.feature${
                        index + 1
                      }.description`
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Custom dots style */}
      <style jsx global>{`
        .slick-dots {
          bottom: -35px;
        }
        .slick-dots li button:before {
          font-size: 12px;
          color: #aaa;
        }
        .slick-dots li.slick-active button:before {
          color: #fbbf24; /* amber-400 */
        }
        .slick-slide > div {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default FeaturesCarousel;
