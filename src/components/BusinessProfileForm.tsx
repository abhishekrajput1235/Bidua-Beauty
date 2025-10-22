import React, { useState } from "react";
import { User, Building, Phone, Mail, MapPin, FileText, CreditCard, Landmark, Truck, Wallet } from "lucide-react";

interface BusinessProfileFormProps {
  onSubmit: (data: any) => void;
  onPaymentSubmit: (paymentData: any) => void;
}

const paymentMethods = [
    { id: "Credit Card", name: "Credit Card", icon: CreditCard },
    { id: "Debit Card", name: "Debit Card", icon: CreditCard },
    { id: "Net Banking", name: "Net Banking", icon: Landmark },
    { id: "UPI", name: "UPI", icon: Landmark },
    { id: "Other", name: "Other", icon: Wallet },
];

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
    paymentMethod: "Credit Card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(businessData);
    nextStep();
  };

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

          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
                <label
                key={method.id}
                className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    paymentData.paymentMethod === method.id
                    ? "border-rose-500 bg-rose-500/10"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                >
                <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentData.paymentMethod === method.id}
                    onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                    className="sr-only"
                />
                <method.icon className={`w-8 h-8 mb-2 ${paymentData.paymentMethod === method.id ? "text-rose-500" : "text-gray-400"}`} />
                <span className={`font-medium text-center ${paymentData.paymentMethod === method.id ? "text-gray-900" : "text-gray-500"}`}>
                    {method.name}
                </span>
                </label>
            ))}
            </div>

            {(paymentData.paymentMethod === "Credit Card" || paymentData.paymentMethod === "Debit Card") && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Card Details</h3>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input type="text" value={paymentData.cardNumber} onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input type="text" value={paymentData.expiry} onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})} placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input type="text" value={paymentData.cvv} onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500" required />
                    </div>
                    </div>
                </div>
            )}

            {paymentData.paymentMethod === "UPI" && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">UPI Details</h3>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                    <input type="text" value={paymentData.upiId} onChange={(e) => setPaymentData({...paymentData, upiId: e.target.value})} placeholder="yourname@bank" className="w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500" required />
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