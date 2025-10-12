// import React from "react";
// import { useTranslation } from "react-i18next";
// import {
//   Droplets,
//   FlaskRound as Flask,
//   Flower,
//   Sun,
//   Nut,
//   Candy as Candle,
//   Leaf,
//   Sparkles,
// } from "lucide-react";

// import pic1 from "../assets/img/pic1.png";
// import pic2 from "../assets/img/newpic1.png";
// import pic4 from "../assets/img/newpic3.png";
// import pic6 from "../assets/img/pic6.png";
// import pic7 from '../assets/img/newpic2.png';

// const ingredients = [
//   { icon: Droplets, name: "Ionized Water", description: "Deeply hydrates and improves absorption of nutrients. Helps detoxify skin and maintain pH balance." },
//   { icon: Flask, name: "Vitamin A", description: "Boosts cell turnover, reduces wrinkles, and keeps skin smooth." },
//   { icon: Flask, name: "Vitamin B Complex", description: "Repairs damaged skin, reduces pigmentation, and maintains an even skin tone." },
//   { icon: Flask, name: "Vitamin B3 (Niacinamide)", description: "Brightens skin, reduces dark spots, and strengthens the skin barrier." },
//   { icon: Flask, name: "Vitamin C", description: "Powerful antioxidant that brightens skin tone and protects against free radicals." },
//   { icon: Flask, name: "Vitamin E", description: "Deep moisturizer, protects against sun damage, and reduces scars." },
//   { icon: Flower, name: "Alpha Arbutin", description: "A natural skin-brightening agent that reduces melanin production, helping fade dark spots and patches safely." },
//   { icon: Sun, name: "Zinc Oxide", description: "Provides natural sun protection, prevents UV damage, and soothes irritation." },
//   { icon: Nut, name: "Walnut Shell Powder", description: "A natural exfoliant that gently removes dead skin cells and promotes skin renewal." },
//   { icon: Nut, name: "Almond Powder", description: "Rich in Vitamin E & healthy fats, it nourishes, softens, and gives skin a healthy glow." },
//   { icon: Candle, name: "Natural Wax", description: "Forms a protective layer on the skin to lock in moisture without clogging pores." },
//   { icon: Flower, name: "Saffron Oil", description: "Premium saffron extract that helps reduce dark circles, promotes fairness, and provides natural glow." },
//   { icon: Leaf, name: "All-Purpose Essential Oil Blend", description: "Nourishes, calms inflammation, and prevents infections." },
//   { icon: Sparkles, name: "Saffron Fragrance", description: "Provides a luxurious, refreshing aroma that uplifts mood and adds a spa-like experience." },
// ];

// const productImages = [pic1, pic2, pic4, pic6 ,pic7];

// const Ingredients = () => {
//   const { t } = useTranslation();

//   return (
//     <section id="ingredients" className="py-24 bg-gray-950 relative overflow-hidden">
//       {/* Background Glow */}
//       <div className="absolute inset-0 opacity-25">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-500 rounded-full blur-[180px]"></div>
//         <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400 rounded-full blur-[180px]"></div>
//       </div>

//       <div className="container mx-auto px-6 lg:px-12 relative z-10">
//         {/* Heading */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
//             {t("ingredients.title")}{" "}
//             <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
//               {t("ingredients.premium")}
//             </span>
//           </h2>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4">
//             {t("ingredients.subtitle")}
//           </p>
//         </div>

//         {/* Sections */}
//         {Array.from({ length: Math.ceil(ingredients.length / 3) }).map((_, sectionIndex) => {
//           const start = sectionIndex * 3;
//           const group = ingredients.slice(start, start + 3);
//           const isEven = sectionIndex % 2 === 0;
//           const image = productImages[sectionIndex % productImages.length];

//           return (
//             <div
//               key={sectionIndex}
//               className={`flex flex-col lg:flex-row items-center gap-12 mb-20 ${
//                 isEven ? "lg:flex-row" : "lg:flex-row-reverse"
//               }`}
//             >
//               {/* Cards */}
//               <div className="flex-1 grid gap-6">
//                 {group.map((ingredient, idx) => {
//                   const Icon = ingredient.icon;
//                   return (
//                     <div
//                       key={idx}
//                       className="relative group rounded-2xl p-6 bg-gray-900/60 backdrop-blur-md text-white shadow-lg overflow-hidden"
//                     >
//                       {/* RGB Border Animation */}
//                       <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 animate-[spin_6s_linear_infinite] opacity-80 group-hover:opacity-100"></div>
//                       <div className="relative rounded-2xl p-6 bg-gray-950/90">
//                         <div className="flex items-center space-x-4 mb-3">
//                           <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500">
//                             <Icon className="text-white w-6 h-6" />
//                           </div>
//                           <h3 className="text-xl font-bold">{ingredient.name}</h3>
//                         </div>
//                         <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
//                           {ingredient.description}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Product Image */}
//               <div className="flex-1 relative group">
//                 <div className="overflow-hidden rounded-3xl shadow-[0_0_30px_rgba(255,0,150,0.3)] border border-white/20">
//                   <img
//                     src={image}
//                     alt={`Product showcase ${sectionIndex + 1}`}
//                     className="w-full h-[60%] object-cover transform group-hover:scale-105 transition duration-500"
//                   />
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 to-purple-500/20 rounded-3xl blur-2xl -z-10"></div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default Ingredients;






import React from "react";
import { useTranslation } from "react-i18next";
import {
  Droplets,
  FlaskRound as Flask,
  Flower,
  Sun,
  Nut,
  Candy as Candle,
  Leaf,
  Sparkles,
} from "lucide-react";

import pic1 from "../assets/img/pic1.png";
import pic2 from "../assets/img/newpic1.png";
import pic4 from "../assets/img/newpic3.png";
import pic6 from "../assets/img/pic6.png";
import pic7 from "../assets/img/newpic2.png";

// Map icons to ingredient keys
const ingredientIcons = [
  Droplets, Flask, Flask, Flask, Flask, Flask,
  Flower, Sun, Nut, Nut, Candle, Flower, Leaf, Sparkles
];

const productImages = [pic1, pic2, pic4, pic6 ,pic7];

const Ingredients = () => {
  const { t } = useTranslation();

  // Dynamically get all ingredients from JSON
  const ingredients = Array.from({ length: 14 }).map((_, i) => ({
    icon: ingredientIcons[i],
    name: t(`ingredients.ingredient${i + 1}.name`),
    description: t(`ingredients.ingredient${i + 1}.description`),
  }));

  return (
    <section id="ingredients" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-500 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400 rounded-full blur-[180px]"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
            {t("ingredients.title")}{" "}
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              {t("ingredients.premium")}
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4">
            {t("ingredients.subtitle")}
          </p>
        </div>

        {/* Sections */}
        {Array.from({ length: Math.ceil(ingredients.length / 3) }).map((_, sectionIndex) => {
          const start = sectionIndex * 3;
          const group = ingredients.slice(start, start + 3);
          const isEven = sectionIndex % 2 === 0;
          const image = productImages[sectionIndex % productImages.length];

          return (
            <div
              key={sectionIndex}
              className={`flex flex-col lg:flex-row items-center gap-12 mb-20 ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Cards */}
              <div className="flex-1 grid gap-6">
                {group.map((ingredient, idx) => {
                  const Icon = ingredient.icon;
                  return (
                    <div
                      key={idx}
                      className="relative group rounded-2xl p-6 bg-gray-900/60 backdrop-blur-md text-white shadow-lg overflow-hidden"
                    >
                      {/* RGB Border Animation */}
                      <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-cyan-400 to-purple-500 animate-[spin_6s_linear_infinite] opacity-80 group-hover:opacity-100"></div>
                      <div className="relative rounded-2xl p-6 bg-gray-950/90">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500">
                            <Icon className="text-white w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold">{ingredient.name}</h3>
                        </div>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          {ingredient.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Product Image */}
              <div className="flex-1 relative group">
                <div className="overflow-hidden rounded-3xl shadow-[0_0_30px_rgba(255,0,150,0.3)] border border-white/20">
                  <img
                    src={image}
                    alt={`Product showcase ${sectionIndex + 1}`}
                    className="w-full h-[60%] object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-400/20 to-purple-500/20 rounded-3xl blur-2xl -z-10"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Ingredients;

