// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { 
//   Sparkles, Sun, Clock, EyeOff, Shield, Baby, 
//   Droplets, Award, Leaf, Moon, Heart, Flower 
// } from 'lucide-react';


// const benefits = [
//   {
//     icon: Sparkles,
//     title: "Reduces Dark Spots & Pigmentation",
//     description: "Powered by Alpha Arbutin, Saffron Oil & Vitamin B3 to fade marks and even skin tone."
//   },
//   {
//     icon: Sun,
//     title: "Brightens Skin Tone",
//     description: "Restores natural color to match the nose-tip tone (the true skin tone)."
//   },
//   {
//     icon: Clock,
//     title: "Anti-Aging Care",
//     description: "Vitamins A, C, and E reduce fine lines & wrinkles while promoting youthful skin."
//   },
//   {
//     icon: EyeOff,
//     title: "Under-Eye Dark Circles",
//     description: "Night repair action targets dullness and puffiness around the eyes."
//   },
//   {
//     icon: Shield,
//     title: "Sun Protection & Damage Repair",
//     description: "With Zinc Oxide + Vitamin E to protect and heal sun-damaged skin."
//   },
//   {
//     icon: Baby,
//     title: "Baby Rash Relief",
//     description: "Gentle formulation to soothe and heal diaper rashes safely."
//   },
//   {
//     icon: Droplets,
//     title: "Hydration & Softness",
//     description: "Natural wax, glycerin, and almond nourish deeply for lasting moisture."
//   },
//   {
//     icon: Award,
//     title: "Visible Results",
//     description: "Within 15 days at night and 30 days with daily use - guaranteed improvement."
//   },
//   {
//     icon: Leaf,
//     title: "Natural & Safe",
//     description: "Made with natural ingredients, free from parabens, sulfates, and harsh chemicals."
//   },
//   {
//     icon: Moon,
//     title: "Day & Night Care",
//     description: "Protects during the day and repairs at night for comprehensive skincare."
//   },
//   {
//     icon: Heart,
//     title: "Multi-Purpose Formula",
//     description: "Anti-Aging + Brightening + Rash Relief in one cream for the whole family."
//   },
//   {
//     icon: Flower,
//     title: "Luxurious Saffron Fragrance",
//     description: "Enjoy a spa-like experience with our premium saffron-scented formula."
//   }
// ];

// // 🎨 Neon Gradient Palette (rotates per card)
// const gradients = [
//   "from-amber-400 to-pink-500",
//   "from-purple-400 to-indigo-500",
//   "from-green-400 to-emerald-500",
//   "from-cyan-400 to-sky-500",
//   "from-rose-400 to-pink-600",
//   "from-yellow-400 to-orange-500",
// ];

// const Benefits = () => {
//   const { t } = useTranslation();

//   return (
//     <section 
//       id="benefits" 
//       className="py-24 bg-gradient-to-b from-black to-gray-900 relative"
//     >
//       {/* Background glow shapes */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/3 left-1/5 w-60 h-60 bg-indigo-500/20 rounded-full blur-2xl"></div>
//       </div>
      
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="text-center mb-12 lg:mb-16">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">
//             {t('benefits.title')}{" "}
//             <span className="bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
//               {t('benefits.brandName')}
//             </span>
//           </h2>
//           <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
//             {t('benefits.subtitle')}
//           </p>
//         </div>

//         {/* Benefit Cards */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
//           {benefits.map((benefit, index) => {
//             const Icon = benefit.icon;
//             const gradient = gradients[index % gradients.length];

//             return (
//               <div
//                 key={index}
//                 className="
//                   group relative 
//                   rounded-2xl p-6 lg:p-8 
//                   border border-transparent 
//                   bg-gradient-to-br from-gray-900 via-black to-gray-900
//                   shadow-lg shadow-black/40
//                   transition-all duration-300
//                   overflow-hidden
//                   hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
//                 "
//               >
//                 {/* Neon Glow Border */}
//                 <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-${gradient.split(" ")[1]}/70 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition duration-500`}></div>

//                 {/* Floating Background Glow */}
//                 <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 bg-gradient-to-r ${gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-all duration-500`}></div>

//                 <div className="relative z-10">
//                   {/* Icon */}
//                   <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr ${gradient} rounded-xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                     <Icon size={22} className="sm:w-7 sm:h-7 text-black" />
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 lg:mb-4 group-hover:text-amber-300 transition-colors duration-300">
//                     {t(`benefits.benefit${index + 1}.title`)}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
//                     {t(`benefits.benefit${index + 1}.description`)}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* CTA Button */}
//         <div className="text-center mt-12 lg:mt-16 px-4">
//           <button
//             onClick={() => {
//               const ctaSection = document.getElementById('cta') || document.querySelector('section:last-of-type');
//               ctaSection?.scrollIntoView({ behavior: 'smooth' });
//             }}
//             className="bg-gradient-to-r from-amber-400 to-pink-500 text-black px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
//           >
//             {t('benefits.experienceButton')}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Benefits;



import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, Sun, Clock, EyeOff, Shield, Baby, 
  Droplets, Award, Leaf, Moon, Heart, Flower 
} from 'lucide-react';
import Squares from './Squares';

const benefits = [
  {
    icon: Sparkles,
    title: "Reduces Dark Spots & Pigmentation",
    description: "Powered by Alpha Arbutin, Saffron Oil & Vitamin B3 to fade marks and even skin tone."
  },
  {
    icon: Sun,
    title: "Brightens Skin Tone",
    description: "Restores natural color to match the nose-tip tone (the true skin tone)."
  },
  {
    icon: Clock,
    title: "Anti-Aging Care",
    description: "Vitamins A, C, and E reduce fine lines & wrinkles while promoting youthful skin."
  },
  {
    icon: EyeOff,
    title: "Under-Eye Dark Circles",
    description: "Night repair action targets dullness and puffiness around the eyes."
  },
  {
    icon: Shield,
    title: "Sun Protection & Damage Repair",
    description: "With Zinc Oxide + Vitamin E to protect and heal sun-damaged skin."
  },
  {
    icon: Baby,
    title: "Baby Rash Relief",
    description: "Gentle formulation to soothe and heal diaper rashes safely."
  },
  {
    icon: Droplets,
    title: "Hydration & Softness",
    description: "Natural wax, glycerin, and almond nourish deeply for lasting moisture."
  },
  {
    icon: Award,
    title: "Visible Results",
    description: "Within 15 days at night and 30 days with daily use - guaranteed improvement."
  },
  {
    icon: Leaf,
    title: "Natural & Safe",
    description: "Made with natural ingredients, free from parabens, sulfates, and harsh chemicals."
  },
  {
    icon: Moon,
    title: "Day & Night Care",
    description: "Protects during the day and repairs at night for comprehensive skincare."
  },
  {
    icon: Heart,
    title: "Multi-Purpose Formula",
    description: "Anti-Aging + Brightening + Rash Relief in one cream for the whole family."
  },
  {
    icon: Flower,
    title: "Luxurious Saffron Fragrance",
    description: "Enjoy a spa-like experience with our premium saffron-scented formula."
  }
];

// 🎨 Neon Gradient Palette (rotates per card)
const gradients = [
  "from-amber-400 to-pink-500",
  "from-purple-400 to-indigo-500",
  "from-green-400 to-emerald-500",
  "from-cyan-400 to-sky-500",
  "from-rose-400 to-pink-600",
  "from-yellow-400 to-orange-500",
];

const Benefits = () => {
  const { t } = useTranslation();

  return (
    <section 
      id="benefits" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-gray-900"
    >
      {/* Squares background at the very back */}
      <div className="absolute inset-0 -z-20">
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction="diagonal"
          borderColor="#fff"
          hoverFillColor="#222"
        />
      </div>

      {/* Glow shapes above Squares */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/5 w-60 h-60 bg-indigo-500/20 rounded-full blur-2xl"></div>
      </div>
      
      {/* Content above everything */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">
            {t('benefits.title')}{" "}
            <span className="bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
              {t('benefits.brandName')}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={index}
                className="
                  group relative 
                  rounded-2xl p-6 lg:p-8 
                  border border-transparent 
                  bg-gradient-to-br from-gray-900 via-black to-gray-900
                  shadow-lg shadow-black/40
                  transition-all duration-300
                  overflow-hidden
                  hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
                "
              >
                {/* Neon Glow Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition duration-500"></div>

                {/* Floating Background Glow */}
                <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 bg-gradient-to-r ${gradient} rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-all duration-500`}></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr ${gradient} rounded-xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className="sm:w-7 sm:h-7 text-black" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3 lg:mb-4 group-hover:text-amber-300 transition-colors duration-300">
                    {t(`benefits.benefit${index + 1}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {t(`benefits.benefit${index + 1}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 lg:mt-16 px-4">
          <button
            onClick={() => {
              const ctaSection = document.getElementById('cta') || document.querySelector('section:last-of-type');
              ctaSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-amber-400 to-pink-500 text-black px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105"
          >
            {t('benefits.experienceButton')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;


