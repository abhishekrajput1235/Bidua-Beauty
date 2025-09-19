// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

// const Footer = () => {
//   const { t } = useTranslation();
  
//   return (
//     <footer className="bg-black text-white py-16">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Brand */}
//           <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
//             <div className="text-2xl sm:text-3xl font-bold mb-4">
//               BIDUA Industries <span className="gradient-text">Private Limited</span>
//             </div>
//             <p className="text-gray-400 mb-6 max-w-md mx-auto sm:mx-0">{t('footer.description')}</p>
//             <div className="flex space-x-4 justify-center sm:justify-start">
//               <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors duration-300">
//                 <Facebook size={20} />
//               </a>
//               <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors duration-300">
//                 <Twitter size={20} />
//               </a>
//               <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors duration-300">
//                 <Instagram size={20} />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="text-center sm:text-left">
//             <h3 className="text-lg sm:text-xl font-bold mb-4 gradient-text">{t('footer.quickLinks')}</h3>
//             <ul className="space-y-3">
//               <li><a href="#hero" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">{t('navigation.home')}</a></li>
//               <li><a href="#benefits" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">{t('navigation.benefits')}</a></li>
//               <li><a href="#ingredients" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">{t('navigation.ingredients')}</a></li>
//               <li><a href="#product-details" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">{t('navigation.details')}</a></li>
//               <li><a href="#testimonials" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">{t('navigation.reviews')}</a></li>
//               <li><Link to="/cost-calculator" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">{t('navigation.costCalculator')}</Link></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="text-center sm:text-left">
//             <h3 className="text-lg sm:text-xl font-bold mb-4 gradient-text">{t('footer.contactUs')}</h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
//                 <Mail size={18} />
//                 <a 
//                   href="mailto:support@biduaindustries.com"
//                   className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300"
//                 >
//                   {t('footer.email')}
//                 </a>
//               </div>
//               <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
//                 <Phone size={18} />
//                 <a 
//                   href="tel:+918045678900"
//                   className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300"
//                 >
//                   {t('footer.phone')}
//                 </a>
//               </div>
//               <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
//                 <MapPin size={18} />
//                 <button 
//                   onClick={() => window.open('https://maps.google.com/?q=Plot+No.+456,+Industrial+Area,+Phase+2,+Electronic+City,+Bengaluru,+Karnataka+560100', '_blank')}
//                   className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 cursor-pointer"
//                 >
//                   {t('footer.address')}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-12 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
//               {t('footer.copyright')}
//             </p>
//             <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4 md:mt-0">
//               <button 
//                 onClick={() => alert(t('footer.privacyPolicyText'))}
//                 className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300 cursor-pointer"
//               >
//                 {t('footer.privacyPolicy')}
//               </button>
//               <button 
//                 onClick={() => alert(t('footer.termsText'))}
//                 className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300 cursor-pointer"
//               >
//                 {t('footer.termsOfService')}
//               </button>
//               <button 
//                 onClick={() => alert(t('footer.shippingText'))}
//                 className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300 cursor-pointer"
//               >
//                 {t('footer.shippingInfo')}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold mb-4">
              BIDUA Industries <span className="gradient-text">Private Limited</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md mx-auto sm:mx-0">Premium skincare crafted with the finest ingredients and cutting-edge technology. Experience the luxury of perfect skin.</p>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-4 gradient-text">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#hero" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">Home</a></li>
              <li><a href="#benefits" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">Benefits</a></li>
              <li><a href="#ingredients" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">Ingredients</a></li>
              <li><a href="#product-details" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">Details</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">Reviews</a></li>
              <li><Link to="/cost-calculator" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">Cost Calculator</Link></li>
              <li><Link to="/join-brpp" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base">Join BRPP</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-4 gradient-text">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <Mail size={18} />
                <a 
                  href="mailto:support@biduaindustries.com"
                  className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300"
                >
                  support@biduaindustries.com
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <Phone size={18} />
                <a 
                  href="tel:+918045678900"
                  className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300"
                >
                  +91 80 4567 8900
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <MapPin size={18} />
                <button 
                  onClick={() => window.open('https://maps.google.com/?q=Plot+No.+456,+Industrial+Area,+Phase+2,+Electronic+City,+Bengaluru,+Karnataka+560100', '_blank')}
                  className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 cursor-pointer"
                >
                  Plot No. 456, Industrial Area, Phase 2, Electronic City, Bengaluru, Karnataka 560100
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2024 BIDUA Beauty. All rights reserved. crafted with ❤️ in India
            </p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4 md:mt-0">
              <button 
                onClick={() => alert('Privacy Policy: We protect your personal information and never share it with third parties. Your data is encrypted and secure.')}
                className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300 cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => alert('Terms of Service: By purchasing BIDUA Beauty products, you agree to our quality guarantee and 30-day return policy. All sales are processed securely.')}
                className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300 cursor-pointer"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => alert('Shipping Information: Free shipping on orders over ₹2000. Standard delivery 3-5 business days. Express delivery available. International shipping to 50+ countries.')}
                className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300 cursor-pointer"
              >
                Shipping Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;