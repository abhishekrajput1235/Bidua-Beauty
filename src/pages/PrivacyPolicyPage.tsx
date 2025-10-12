import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const PrivacyPolicyPage = () => {
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
            <ShieldCheck className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your privacy matters to us. Learn how Biduabeauty.com collects, uses, and protects your information.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-gray-300 space-y-8 shadow-2xl">
          {/* Intro */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to <span className="text-white font-semibold">Biduabeauty.com</span>. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website, products, or services. By accessing our site, you agree to the terms outlined below.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li><span className="text-white font-medium">Personal Information:</span> Name, email, phone number, address (collected during order placement or account creation).</li>
              <li><span className="text-white font-medium">Payment Information:</span> Securely processed through trusted payment gateways; we do not store your card details.</li>
              <li><span className="text-white font-medium">Website Usage Data:</span> Cookies, IP addresses, browser type, and device information for improving user experience.</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send order updates, promotional offers, and newsletters (with your consent)</li>
              <li>Enhance website functionality and security</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">4. Cookies & Tracking</h2>
            <p className="leading-relaxed">
              We use cookies and similar technologies to improve your browsing experience, remember your preferences, and analyze website performance. You can control cookie preferences through your browser settings.
            </p>
          </section>

          {/* Sharing Info */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">5. Information Sharing</h2>
            <p className="leading-relaxed">
              We do not sell or rent your personal information. We may share your data only with trusted third parties such as delivery partners, payment gateways, or legal authorities (if required by law), strictly to facilitate our services.
            </p>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">6. Data Security</h2>
            <p className="leading-relaxed">
              Your personal data is protected through encryption, secure servers, and strict access controls. However, no online platform can guarantee 100% security. We encourage you to use strong passwords and protect your credentials.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">7. Your Rights</h2>
            <p className="leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of marketing communications at any time</li>
              <li>Request details on how your data is processed</li>
            </ul>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">8. Updates to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated “Last Modified” date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-pink-400 mb-3">9. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions or concerns regarding this Privacy Policy, feel free to contact us at: <br />
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

export default PrivacyPolicyPage;
