import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Crown,
  CheckCircle,
  DollarSign,
  Briefcase,
  Users,
  LogIn,
} from "lucide-react";
import BusinessProfileForm from "../components/BusinessProfileForm";
import { useAuth } from "../context/AuthContext";
import { useBusinessProfileStore } from "../store/b2bProfile";
import { useAuthStore } from "../store/authStore";

const JoinBrppPage = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { isLoggedIn } = useAuth();
  const {
    user,
    getProfile,
    loading: authLoading,
    error: authError,
  } = useAuthStore();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      if (!res.success) {
        console.error("Failed to fetch profile:", res.error);
      }
    };
    fetchProfile();
  }, [getProfile]);

  const { createProfile, loading, error, message, clearMessages } =
    useBusinessProfileStore();

  // ✅ Handle subscribe click (simulated payment)
  const handleSubscribe = () => {
    alert("Payment initiated! Please complete the payment to continue.");
    setShowProfileForm(true);
  };

  // ✅ Handle profile form submission
  const handleProfileSubmit = async (formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to submit a profile.");
      return;
    }
    await createProfile(formData, token);
  };

  // ✅ Auto-clear message/error after few seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => clearMessages(), 4000);
      return () => clearTimeout(timer);
    }
  }, [message, error, clearMessages]);

  // ✅ Show login screen if user not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="text-center max-w-sm sm:max-w-md">
          <LogIn className="w-16 h-16 sm:w-24 sm:h-24 text-gray-600 mx-auto mb-6 sm:mb-8" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Login Required
          </h1>
          <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">
            Please login to access the BRPP program
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border-2 border-amber-400/50 text-amber-400 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Main content
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6 md:px-8 py-10 sm:py-16">
      {/* Background gradient circles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-8 sm:mb-12 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span className="text-sm sm:text-base">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Join BRPP Program
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Become a BIDUA Beauty Retail Partner and unlock exclusive benefits
          </p>
        </div>

        {/* BRPP Benefits */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 mb-10 sm:mb-12">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-5 sm:mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            BRPP Benefits
          </h2>
          <ul className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base lg:text-lg">
            <li className="flex items-start">
              <Briefcase className="w-5 h-5 mr-3 text-amber-400 mt-1" />
              <span>Access to exclusive B2B pricing and wholesale rates</span>
            </li>
            <li className="flex items-start">
              <DollarSign className="w-5 h-5 mr-3 text-amber-400 mt-1" />
              <span>Earn commissions on every sale and referral</span>
            </li>
            <li className="flex items-start">
              <Users className="w-5 h-5 mr-3 text-amber-400 mt-1" />
              <span>Priority customer support and business guidance</span>
            </li>
          </ul>
        </div>

        {/* Annual Fee */}
        <div className="bg-gradient-to-br from-amber-400/10 to-yellow-500/10 border border-amber-400/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Annual Fee: <span className="text-amber-400">₹4,999</span>
          </h2>
          <p className="text-amber-200 text-xs sm:text-sm mb-5 sm:mb-6">
            One-time annual subscription fee for BRPP membership
          </p>
          <button
            onClick={handleSubscribe}
            disabled={authLoading || user?.role === "b2b"}
            // disable if loading OR user is b2b
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold sm:font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {authLoading
              ? "Processing..."
              : user?.role === "b2b"
              ? "Subscribed"
              : "Subscribe Now"}
          </button>
        </div>

        {/* Messages */}
        {(message || error) && (
          <div
            className={`text-center mb-6 font-semibold ${
              message ? "text-green-400" : "text-red-400"
            }`}
          >
            {message || error}
          </div>
        )}

        {/* Business Profile Form */}
        {showProfileForm && (
          <div className="mt-10 sm:mt-12">
            <BusinessProfileForm onSubmit={handleProfileSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinBrppPage;
