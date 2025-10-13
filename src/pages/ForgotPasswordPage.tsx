import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Mail } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "@/store/authStore";

const ForgotPasswordPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const { loading, forgotPassword } = useAuthStore();

  // ✅ Email & Phone Validation
  const validateEmailOrPhone = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmailOrPhone(emailOrPhone)) {
      toast.error("Enter a valid email or 10-digit phone number");
      return;
    }

    try {
      const res = await forgotPassword(emailOrPhone);
      if (res.success) {
        toast.success("Reset token sent! Check your email.");
      } else {
        toast.error(res.error || "Failed to send reset token");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-8 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-6 sm:mb-8 group text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
              Forgot Password
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Enter your email or phone to reset your password
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-1 sm:mb-2 text-sm">
                Email or Phone Number
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors text-sm sm:text-base"
                  placeholder="Enter your email or phone"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-[1.03] text-sm sm:text-base"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Remembered your password?{" "}
              <Link to="/login" className="text-amber-400 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
