// import React from "react";
// import { useTranslation } from "react-i18next";

// interface UsageStep {
//   icon: React.ElementType;
//   title: string;
//   steps: string[];
// }

// interface Props {
//   usageSteps: UsageStep[];
//   imageSrc: string;
//   imageAlt?: string;
// }

// const HowToUseSection: React.FC<Props> = ({ usageSteps, imageSrc, imageAlt = "How to use" }) => {
//   const { t } = useTranslation();

//   return (
//     <div className="mb-16 lg:mb-24 px-4">
//       <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
//         {t("productDetails.howToUse.title")}{" "}
//         <span className="gradient-text">{t("productDetails.howToUse.use")}</span>
//       </h3>

//       <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto gap-10">
//         {/* Left Side: Steps */}
//         <div className="relative flex-1">
//           {/* Vertical timeline line */}
//           <div className="absolute top-6 left-5 sm:left-6 h-full border-l border-gray-700/50"></div>

//           {usageSteps.map((usage, index) => {
//             const Icon = usage.icon;
//             return (
//               <div key={index} className="flex items-start mb-10 relative pl-12 sm:pl-16">
//                 {/* Step Icon */}
//                 <div className="absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
//                   <Icon size={20} className="text-black" />
//                 </div>

//                 <div>
//                   <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
//                     {t(`productDetails.howToUse.usage${index + 1}.title`)}
//                   </h4>
//                   <ol className="space-y-2">
//                     {t(`productDetails.howToUse.usage${index + 1}.steps`, {
//                       returnObjects: true,
//                     }).map((step, stepIndex) => (
//                       <li key={stepIndex} className="flex items-start">
//                         <span className="bg-amber-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
//                           {stepIndex + 1}
//                         </span>
//                         <span className="text-gray-300 text-sm sm:text-base">{step}</span>
//                       </li>
//                     ))}
//                   </ol>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Right Side: Image */}
//         <div className="flex-1 flex justify-center lg:justify-end">
//           <img
//             src={imageSrc}
//             alt={imageAlt}
//             className="w-full max-w-md rounded-3xl shadow-2xl object-cover"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HowToUseSection;



import React from "react";
import { useTranslation } from "react-i18next";

interface UsageStep {
  icon: React.ElementType;
  title: string;
  steps: string[];
}

interface Props {
  usageSteps: UsageStep[];
  imageSrc: string;
  imageAlt?: string;
}

const HowToUseSection: React.FC<Props> = ({ usageSteps, imageSrc, imageAlt = "How to use" }) => {
  const { t } = useTranslation();

  return (
    <div className="relative  px-4 bg-black/90 py-16 lg:py-24">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-black to-gray-800 opacity-70 -z-10"></div>

 <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold 
  text-white text-center mb-14 leading-tight">
  {t("productDetails.howToUse.title")}{" "}
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">
    {t("productDetails.howToUse.use")}
  </span>
</h3>


      <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto gap-10">
        {/* Left Side: Steps */}
        <div className="relative flex-1">
          {/* Gradient vertical timeline line */}
          <div className="absolute top-6 left-5 sm:left-6 h-full w-1 bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-400 rounded-full"></div>

          {usageSteps.map((usage, index) => {
            const Icon = usage.icon;
            return (
              <div
                key={index}
                className="flex items-start mb-10 relative pl-12 sm:pl-16 group transition-transform duration-300 hover:translate-x-2"
              >
                {/* Step Icon */}
                <div className="absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon size={20} className="text-black" />
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                    {t(`productDetails.howToUse.usage${index + 1}.title`)}
                  </h4>
                  <ol className="space-y-2">
                    {t(`productDetails.howToUse.usage${index + 1}.steps`, {
                      returnObjects: true,
                    }).map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <span className="bg-amber-400 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                          {stepIndex + 1}
                        </span>
                        <span className="text-gray-300 text-sm sm:text-base">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-md rounded-lg shadow-2xl object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default HowToUseSection;

