import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ListOrdered, Package, User, LogIn } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useOrderStore } from '../store/orderStore';

const QueueTrackerPage = () => {
  const { user, loading: userLoading } = useAuthStore();
  const { userOrders, fetchUserOrders, loading: ordersLoading } = useOrderStore();

  useEffect(() => {
    if (user) {
      fetchUserOrders(user._id);
    }
  }, [user, fetchUserOrders]);

  const isB2B = user?.role === 'b2b';

  const queuedSerials = useMemo(() => {
    if (!userOrders) return [];
    return userOrders.flatMap(order => order.items.flatMap(item => item.serials || []));
  }, [userOrders]);

  if (userLoading || ordersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <ListOrdered className="w-24 h-24 text-gray-600 mx-auto mb-8 animate-pulse" />
          <h1 className="text-4xl font-bold text-white mb-4">Loading Queue...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <LogIn className="w-24 h-24 text-gray-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-gray-400 mb-8 text-lg">Please log in or sign up to view the Queue Tracker.</p>
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

  if (!isB2B) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
            <div className="text-center max-w-md">
                <User className="w-24 h-24 text-gray-600 mx-auto mb-8" />
                <h1 className="text-4xl font-bold text-white mb-4">B2B Access Only</h1>
                <p className="text-gray-400 mb-8 text-lg">This page is exclusively for B2B users.</p>
                <Link 
                    to="/"
                    className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ListOrdered className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Product Serial Number Queue
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Here are the serial numbers for your purchased products.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 lg:p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-amber-400" />
            Your Queued Serial Numbers ({queuedSerials.length})
          </h2>
          {queuedSerials.length > 0 ? (
            <div className="max-h-96 overflow-y-auto pr-2">
              <ul className="space-y-2 text-gray-300">
                {queuedSerials.map((serial, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                    <span className="font-mono text-amber-400">{serial}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">You have no products in the queue.</p>
            </div>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 lg:p-8">
          <h3 className="text-xl font-bold text-white mb-4">How the Queue System Works</h3>
          <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
            <p><strong className="text-amber-400">FIFO System:</strong> Stock is allocated on a First-In-First-Out basis. Earlier orders get priority.</p>
            <p><strong className="text-amber-400">Serial Allocation:</strong> Each product has a unique serial number. Your order is assigned specific serial ranges.</p>
            <p><strong className="text-amber-400">B2C Sales Impact:</strong> When B2C customers buy products with your allocated serials, you earn profit share.</p>
            <p><strong className="text-amber-400">Profit Sharing:</strong> You receive 60% of profit + full cost reimbursement when your serials are sold.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueTrackerPage;
