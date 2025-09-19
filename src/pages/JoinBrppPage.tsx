import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Crown, CheckCircle, DollarSign, Briefcase, Users, LogIn } from 'lucide-react';
import BusinessProfileForm from '../components/BusinessProfileForm';
import { useAuth } from '../context/AuthContext';

const JoinBrppPage = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleSubscribe = () => {
    // Static implementation: In a real app, this would initiate a payment process
    alert('Payment initiated! Please complete the payment to continue.');
    setShowProfileForm(true); // Show profile form after simulated payment
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <LogIn className="w-24 h-24 text-gray-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-gray-400 mb-8 text-lg">Please login to access the BRPP program</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Join BRPP Program
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Become a BIDUA Beauty Retail Partner and unlock exclusive benefits
          </p>
        </div>

        {/* BRPP Benefits */}
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

        {/* Annual Fee & Subscription */}
        <div className="bg-gradient-to-br from-amber-400/10 to-yellow-500/10 border border-amber-400/30 rounded-3xl p-6 lg:p-8 text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Annual Fee: <span className="gradient-text">₹4,999</span>
          </h2>
          <p className="text-amber-200 text-sm mb-6">One-time annual subscription fee for BRPP membership</p>
          <button
            onClick={handleSubscribe}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            Subscribe Now
          </button>
        </div>

        {/* Business Profile Form */}
        {showProfileForm && (
          <div className="mt-12">
            <BusinessProfileForm onSubmit={function (data: any): void {
              throw new Error('Function not implemented.');
            } } />
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinBrppPage;