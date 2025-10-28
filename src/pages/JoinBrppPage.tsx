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

const JoinBrppPage: React.FC = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { user, token, updateUserRole } = useAuthStore();

  const {
    createProfile,
    verifyPayment,
    getMyProfile,
    myProfile,
    loading,
    error,
    successMessage,
    resetStatus,
    razorpayOrder,
    businessData,
    setBusinessData,
  } = useBusinessProfileStore();

  // 🧠 Fetch profile once logged in
  useEffect(() => {
    if (token) getMyProfile();
  }, [getMyProfile, token]);

  // 💳 Razorpay Payment Flow
  const handleFinalSubmission = async () => {
    if (!businessData) return toast.error("Please fill business details first.");

    try {
      await createProfile(businessData);

      if (!razorpayOrder) {
        toast.error("Unable to generate payment order.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "BIDUA BRPP Program",
        description: "Annual BRPP Membership",
        order_id: razorpayOrder.id,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: businessData.phone,
        },
        theme: { color: "#fbbf24" },
        handler: async (response: any) => {
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            businessProfileId: myProfile?._id,
          };

          await verifyPayment(verifyData);
          await updateUserRole(user._id, "b2b");
          toast.success("🎉 Payment successful! Welcome to BRPP.");
          setShowProfileForm(false);
          getMyProfile();
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      console.error("Error during subscription:", err);
      toast.error(err?.message || "Something went wrong.");
    }
  };

  // 🔁 Error & success handling
  useEffect(() => {
    if (error) {
      toast.error(error);
      resetStatus();
    }
    if (successMessage) {
      toast.success(successMessage);
      resetStatus();
    }
  }, [error, successMessage, resetStatus]);

  // 🧍‍♂️ Login gate
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-6">
        <LogIn className="w-20 h-20 text-gray-600 mb-8" />
        <h1 className="text-3xl font-bold text-white mb-3">Login Required</h1>
        <p className="text-gray-400 mb-8">Please log in to access BRPP Program.</p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-amber-400 text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="border-2 border-amber-400 text-amber-400 px-6 py-3 rounded-full font-bold hover:bg-amber-400/10 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  const isSubscribed = myProfile?.subscriptionStatus === "active";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16 relative">
      {/* 🟡 Header */}
      <div className="container mx-auto max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 mb-12"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Join BRPP Program</h1>
          <p className="text-gray-400">Become a BIDUA Beauty Retail Partner</p>
        </div>

        {/* 💼 Benefits */}
        <div className="bg-gray-800/60 p-6 rounded-2xl mb-12 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            BRPP Benefits
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-amber-400" /> Exclusive wholesale pricing
            </li>
            <li className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-amber-400" /> Commission on every referral
            </li>
            <li className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-amber-400" /> Dedicated business support
            </li>
          </ul>
        </div>

        {/* 💰 Subscription */}
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Annual Fee: ₹4,999
          </h2>
          <p className="text-amber-200 mb-6">
            One-time yearly subscription for BRPP membership.
          </p>
          {isSubscribed ? (
            <button
              disabled
              className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold cursor-not-allowed opacity-80"
            >
              ✅ Subscribed
            </button>
          ) : (
            <button
              onClick={() => setShowProfileForm(true)}
              disabled={loading}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              {loading ? "Processing..." : "Subscribe Now"}
            </button>
          )}
        </div>

        {/* 🧾 Business Form */}
        {showProfileForm && (
          <div className="mt-12">
            <BusinessProfileForm
              onSubmit={(data) => setBusinessData(data)}
              onPaymentSubmit={handleFinalSubmission}
            />
          </div>
        )}
      </div>

      {/* ⏳ Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg animate-pulse">
            Processing your registration...
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinBrppPage;