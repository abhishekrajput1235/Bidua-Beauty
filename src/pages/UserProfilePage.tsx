import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Briefcase, DollarSign, LogOut, Package, ShoppingBag } from 'lucide-react';
import { ListOrdered } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserProfilePage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Redirect to home or login page after logout
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <User className="w-24 h-24 text-gray-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8 text-lg">Please log in to view your user profile.</p>
          <Link 
            to="/login" 
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Link>
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
            <User className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            User Profile
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Manage your account and view your details.
          </p>
        </div>

        {/* User Details */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 lg:p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-amber-400" />
            Personal Information
          </h2>
          <div className="space-y-4 text-gray-300">
            <p className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium text-white">Email:</span> 
              <span className="ml-2">{user.email}</span>
            </p>
            <p className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium text-white">Phone:</span> 
              <span className="ml-2">+91 98765 43210 (Static)</span>
            </p>
            <p className="flex items-center">
              <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
              <span className="font-medium text-white">Member Status:</span> 
              {user.isBrppMember ? (
                <span className="ml-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">BRPP Member</span>
              ) : (
                <span className="ml-2 bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm font-bold">Standard User</span>
              )}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link 
            to="/partner-wallet" 
            className="bg-gradient-to-br from-amber-400/10 to-yellow-500/10 border border-amber-400/30 rounded-3xl p-6 text-center flex flex-col items-center justify-center hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            <DollarSign className="w-10 h-10 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-white">My Wallet</h3>
            <p className="text-gray-300 text-sm">View your earnings and transactions</p>
          </Link>
          <Link 
            to="/b2b-catalog" 
            className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 text-center flex flex-col items-center justify-center hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl font-bold text-white">B2B Orders</h3>
            <p className="text-gray-300 text-sm">Place new B2B orders</p>
          </Link>
          <Link 
            to="/queue-tracker"
            className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 text-center flex flex-col items-center justify-center hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            <ListOrdered className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl font-bold text-white">My Queue</h3>
            <p className="text-gray-300 text-sm">Track your queued orders</p>
          </Link>
          <Link 
            to="/join-brpp" 
            className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 text-center flex flex-col items-center justify-center hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            <Briefcase className="w-10 h-10 text-white mb-4" />
            <h3 className="text-xl font-bold text-white">BRPP Program</h3>
            <p className="text-gray-300 text-sm">Join or manage BRPP membership</p>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto space-x-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;