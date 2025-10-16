// import React, { useState } from 'react';
// import { User, Building, Phone, Mail, MapPin, FileText } from 'lucide-react';

// interface BusinessProfileFormProps {
//   onSubmit: (data: any) => void;
// }

// export default function BusinessProfileForm({ onSubmit }: BusinessProfileFormProps) {
//   const [formData, setFormData] = useState({
//     businessName: '',
//     ownerName: '',
//     phone: '',
//     email: '',
//     address: '',
//     gstNumber: ''
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Complete Your Business Profile
//         </h2>
//         <p className="text-gray-600">
//           Please provide your business details to join the BRPP program
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
//               Business Name *
//             </label>
//             <div className="relative">
//               <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 id="businessName"
//                 name="businessName"
//                 value={formData.businessName}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                 placeholder="Enter your business name"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-2">
//               Owner Name *
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 id="ownerName"
//                 name="ownerName"
//                 value={formData.ownerName}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                 placeholder="Enter owner's full name"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number *
//             </label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                 placeholder="Enter your phone number"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address *
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//                 placeholder="Enter your email address"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <div>
//           <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
//             Business Address *
//           </label>
//           <div className="relative">
//             <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//             <textarea
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//               placeholder="Enter your complete business address"
//               rows={3}
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-2">
//             GST Number (Optional)
//           </label>
//           <div className="relative">
//             <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               id="gstNumber"
//               name="gstNumber"
//               value={formData.gstNumber}
//               onChange={handleChange}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
//               placeholder="Enter your GST number if available"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-colors font-medium"
//         >
//           Complete Registration
//         </button>
//       </form>
//     </div>
//   );
// }




import React, { useState } from "react";
import { User, Building, Phone, Mail, MapPin, FileText, CreditCard, Wallet } from "lucide-react";

interface BusinessProfileFormProps {
  onSubmit: (data: any) => void;
  onPaymentSubmit: (paymentData: any) => void;
}

export default function BusinessProfileForm({ onSubmit, onPaymentSubmit }: BusinessProfileFormProps) {
  const [step, setStep] = useState(1);

  const [businessData, setBusinessData] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    gstNumber: "",
  });

  const [paymentData, setPaymentData] = useState({
    amount: 4999,
    paymentMethod: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  /** Handle business input change */
  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));
  };

  /** Handle payment input change */
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  /** Go to next step */
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  /** Submit business form */
  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(businessData);
    nextStep();
  };

  /** Submit payment form */
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPaymentSubmit(paymentData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {step === 1 && (
        <form onSubmit={handleBusinessSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Business Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={businessData.businessName}
                  onChange={handleBusinessChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your business name"
                  required
                />
              </div>
            </div>

            {/* Owner Name */}
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-2">
                Owner Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  value={businessData.ownerName}
                  onChange={handleBusinessChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter owner's full name"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={businessData.phone}
                  onChange={handleBusinessChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={businessData.email}
                  onChange={handleBusinessChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Business Address *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                id="address"
                name="address"
                value={businessData.address}
                onChange={handleBusinessChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Enter your complete business address"
                rows={3}
                required
              />
            </div>
          </div>

          {/* GST Number */}
          <div>
            <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-2">
              GST Number (Optional)
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={businessData.gstNumber}
                onChange={handleBusinessChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Enter your GST number if available"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-rose-600 text-white py-3 px-6 rounded-lg hover:bg-rose-700 transition-colors font-medium"
            >
              Next: Payment
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Payment</h2>

          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method *
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentData.paymentMethod}
              onChange={handlePaymentChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              required
            >
              <option value="">Select payment method</option>
              <option value="card">Credit / Debit Card</option>
              <option value="upi">UPI</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>

          {paymentData.paymentMethod === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry *
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={paymentData.expiry}
                  onChange={handlePaymentChange}
                  placeholder="MM/YY"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handlePaymentChange}
                  placeholder="123"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Complete Registration & Pay ₹{paymentData.amount}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
