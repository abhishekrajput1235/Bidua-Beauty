import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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
import { useAuthStore } from "../store/authStore";
import { useBusinessProfileStore } from "../store/b2bProfile";

const JoinBrppPage = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { user, token, updateUserRole } = useAuthStore();
  const {
    createProfile,
    loading,
    error,
    clearMessages,
    fetchMyProfile,
    profile,
  } = useBusinessProfileStore();

  const [businessData, setBusinessData] = useState<any>(null);

  useEffect(() => {
    if (token) fetchMyProfile();
  }, [fetchMyProfile, token]);

  const storeBusinessData = (data: any) => {
    setBusinessData(data);
  };

  const handleFinalSubmission = async (paymentData: any) => {
    if (!businessData || !user) {
      toast.error("Business data is missing or user not authenticated.");
      return;
    }

    // Here you would integrate a real payment gateway.
    // For now, we'll simulate a successful payment.
    console.log("Simulating payment with data:", paymentData);
    const isPaymentSuccessful = true;

    if (isPaymentSuccessful) {
      const profileData = {
        ...businessData,
        subscriptionStatus: 'active',
      };
      const profileCreated = await createProfile(profileData);

      if (profileCreated) {
        await updateUserRole(user._id, 'b2b');
        toast.success("Welcome to BRPP! Your business profile is created.");
        setShowProfileForm(false);
        fetchMyProfile(); // Refresh profile data
      } 
    } else {
      toast.error("Payment failed. Please try again.");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearMessages();
    }
  }, [error, clearMessages]);

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <LogIn className="w-24 h-24 text-gray-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-gray-400 mb-8 text-lg">
            Please login to access the BRPP program
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border-2 border-amber-400/50 text-amber-400 px-8 py-4 rounded-full font-bold text-lg hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isSubscribed = profile?.subscriptionStatus === "active";

  const handleSubscribe = () => {
    if (isSubscribed) return;
    setShowProfileForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span>Back to Home</span>
        </Link>

        <div className="text-center mb-12 px-4 sm:px-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Join BRPP Program
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Become a BIDUA Beauty Retail Partner and unlock exclusive benefits
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 lg:p-8 mb-12">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            BRPP Benefits
          </h2>
          <ul className="space-y-3 text-gray-300 text-base lg:text-lg">
            <li className="flex items-start">
              <Briefcase className="w-5 h-5 mr-3 text-amber-400 flex-shrink-0 mt-1" />
              <span>Access to exclusive B2B pricing and wholesale rates</span>
            </li>
            <li className="flex items-start">
              <DollarSign className="w-5 h-5 mr-3 text-amber-400 flex-shrink-0 mt-1" />
              <span>Earn commissions on every sale and referral</span>
            </li>
            <li className="flex items-start">
              <Users className="w-5 h-5 mr-3 text-amber-400 flex-shrink-0 mt-1" />
              <span>Priority customer support and business guidance</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-amber-400/10 to-yellow-500/10 border border-amber-400/30 rounded-3xl p-6 lg:p-8 text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Annual Fee: <span className="gradient-text">₹4,999</span>
          </h2>
          <p className="text-amber-200 text-sm sm:text-base mb-6">
            One-time annual subscription fee for BRPP membership
          </p>

          {isSubscribed ? (
            <button
              disabled
              className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg cursor-not-allowed opacity-80"
            >
              ✅ Subscribed
            </button>
          ) : (
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-70"
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          )}
        </div>

        {showProfileForm && (
          <div className="mt-12">
            <BusinessProfileForm 
              onSubmit={storeBusinessData} 
              onPaymentSubmit={handleFinalSubmission} 
            />
          </div>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg animate-pulse">
            Processing registration...
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinBrppPage;