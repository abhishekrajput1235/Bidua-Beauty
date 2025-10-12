import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Truck, RotateCcw } from "lucide-react";

const ReturnAndShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <RotateCcw className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Return, Refund & Shipping Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Clear and fair policies to ensure a smooth experience with Biduabeauty.com
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-gray-300 space-y-10 shadow-2xl">
          {/* Return & Refund Policy */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">1. Return & Refund Policy</h2>
            <p className="leading-relaxed mb-3">
              At <span className="text-white font-semibold">Biduabeauty.com</span>, customer satisfaction is our top priority. However, due to the nature of our products (beauty and skincare items), we maintain strict hygiene standards. Please review the return and refund policy carefully:
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Returns are accepted only if the product is received damaged, defective, or incorrect.</li>
              <li>You must raise a return request within <span className="text-white font-semibold">48 hours of delivery</span>.</li>
              <li>Products must be unused, unopened, and in their original packaging to qualify for a return.</li>
              <li>Opened or used products cannot be returned due to hygiene reasons.</li>
              <li>Once your return is received and inspected, your refund will be processed within <span className="text-white font-semibold">7–10 business days</span>.</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To initiate a return or refund, contact our support team at: <br />
              <span className="text-white font-semibold">support@biduabeauty.com</span>
            </p>
          </section>

          {/* Shipping Policy */}
          <section>
            <div className="flex items-center mb-3 space-x-2">
              <Truck className="w-6 h-6 text-pink-400" />
              <h2 className="text-2xl font-bold text-pink-400">2. Shipping Policy</h2>
            </div>
            <p className="leading-relaxed mb-4">
              We strive to deliver your beauty products as quickly and safely as possible. Here’s how our shipping works:
            </p>

            <div className="bg-gradient-to-br from-pink-400/10 to-rose-500/5 rounded-2xl p-5 border border-pink-400/20 mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Shipping Information</h3>
              <ul className="list-disc list-inside space-y-2 leading-relaxed">
                <li>🎁 <span className="text-white font-semibold">Free Shipping</span> on orders over ₹2000 (India only).</li>
                <li>🚚 <span className="text-white font-semibold">Standard Delivery:</span> 3–5 business days.</li>
                <li>⚡ <span className="text-white font-semibold">Express Delivery:</span> Available at an additional charge for select locations.</li>
                <li>🌍 <span className="text-white font-semibold">International Shipping:</span> We deliver to 50+ countries with reliable global partners.</li>
              </ul>
            </div>

            <p className="leading-relaxed">
              Delivery timelines may vary depending on your location, public holidays, customs processes (for international orders), or unforeseen logistical issues. You will receive real-time tracking updates once your order is dispatched.
            </p>
          </section>

          {/* Footer */}
          <div className="text-sm text-gray-500 text-center pt-4 border-t border-white/10">
            Last updated: October 9, 2025
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnAndShippingPolicyPage;
