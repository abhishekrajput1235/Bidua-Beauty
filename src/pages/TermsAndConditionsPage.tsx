import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

const TermsAndConditionsPage = () => {
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
            <FileText className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Please read these Terms & Conditions carefully before using Biduabeauty.com
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-gray-300 space-y-8 shadow-2xl">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to <span className="text-white font-semibold">Biduabeauty.com</span>. By accessing or using our website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please discontinue use of our services immediately.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">2. Eligibility</h2>
            <p className="leading-relaxed">
              You must be at least 18 years old to make purchases on this site. By placing an order, you confirm that all information provided is accurate and complete.
            </p>
          </section>

          {/* Products & Orders */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">3. Products & Orders</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>All products are subject to availability.</li>
              <li>Product images are for representation only; actual products may slightly vary.</li>
              <li>We reserve the right to cancel or refuse any order for any reason, including pricing or stock errors.</li>
            </ul>
          </section>

          {/* Pricing & Payments */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">4. Pricing & Payments</h2>
            <p className="leading-relaxed mb-3">
              All prices are listed in INR and inclusive of applicable taxes unless stated otherwise.
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Payments must be made through the approved payment gateways on our site.</li>
              <li>We do not store any credit/debit card details.</li>
              <li>In case of failed transactions, please contact your bank or payment provider.</li>
            </ul>
          </section>

          {/* Shipping & Delivery */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">5. Shipping & Delivery</h2>
            <p className="leading-relaxed">
              We aim to dispatch all orders promptly. Estimated delivery times are provided at checkout but may vary due to external factors such as logistics delays, natural events, or public holidays.
            </p>
          </section>

          {/* Returns & Refunds */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">6. Returns & Refunds</h2>
            <p className="leading-relaxed">
              For hygiene and safety reasons, opened or used beauty cream products cannot be returned. If you receive a damaged or incorrect product, please contact us within 48 hours of delivery for assistance.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">7. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on Biduabeauty.com — including text, graphics, logos, product names, and images — is the property of Bidua Beauty and is protected by intellectual property laws. Unauthorized use is strictly prohibited.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">8. Limitation of Liability</h2>
            <p className="leading-relaxed">
              Bidua Beauty shall not be held liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products or services.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">9. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms & Conditions at any time without prior notice. Any updates will be effective immediately upon posting on this page.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">10. Contact Us</h2>
            <p className="leading-relaxed">
              For any questions regarding these Terms & Conditions, please contact us at: <br />
              <span className="text-white font-semibold">support@biduabeauty.com</span>
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

export default TermsAndConditionsPage;
