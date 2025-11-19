import React, { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  HelpCircle,
  Headphones,
  Send,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-800 rounded-lg bg-gray-900">
      <button
        className="w-full flex justify-between items-center p-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-medium">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-300 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 text-gray-400 text-sm">{answer}</div>
      )}
    </div>
  );
};

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">

        {/* BACK BUTTON */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Help & Support
          </h1>
          <p className="text-gray-400 mt-2">
            We’re here to assist you with anything you need.
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-amber-400/40 transition">
            <Headphones className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">Customer Support</h3>
            <p className="text-gray-400 text-sm">
              Need help with orders, account or payments? We're here.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-amber-400/40 transition">
            <Mail className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-gray-400 text-sm">
              Email us at <span className="text-amber-400">support@example.com</span>
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl text-center hover:border-amber-400/40 transition">
            <Phone className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-gray-400 text-sm">
              +91 <span className="text-amber-400">98765 43210</span>
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-400" /> Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <FAQItem
              question="How can I track my order?"
              answer="You can track your order in the 'My Orders' section after logging into your account."
            />
            <FAQItem
              question="How do I reset my password?"
              answer="Click the 'Forgot Password' option on the login page and follow the instructions."
            />
            <FAQItem
              question="I got the wrong product. What should I do?"
              answer="Contact support with your order ID and we will resolve it immediately."
            />
            <FAQItem
              question="How long do refunds take?"
              answer="Refunds generally take 5–7 business days depending on your bank."
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl">
          <h2 className="text-2xl text-white font-semibold mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-5">
            <div>
              <label className="text-gray-300 text-sm">Your Name</label>
              <input
                type="text"
                className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400/50 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Email Address</label>
              <input
                type="email"
                className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-amber-400/50 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Message</label>
              <textarea
                className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white h-28 focus:ring-2 focus:ring-amber-400/50 outline-none"
                placeholder="Type your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-amber-400 text-black px-6 py-3 rounded-full font-bold hover:bg-amber-500 transition"
            >
              <Send className="w-4 h-4" />
              Submit
            </button>
          </form>
        </div>

        <footer className="text-center text-xs text-gray-500 mt-10">
          © {new Date().getFullYear()} Your Company — All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default SupportPage;
