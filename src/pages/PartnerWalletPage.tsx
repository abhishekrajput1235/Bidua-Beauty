import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Wallet,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  LogIn,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useWalletStore from "../store/walletStore";

const PartnerWalletPage = () => {
  const { isLoggedIn } = useAuth();
  const {
    wallet,
    transactions,
    loading,
    error,
    getWallet,
    requestWithdrawal,
  } = useWalletStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      getWallet();
    }
  }, [isLoggedIn, getWallet]);

  // ✅ Ensure transactions is always an array
  const txns = Array.isArray(transactions) ? transactions : [];

  const availableBalance = wallet?.balance || 0;
  const totalRealized = txns
    .filter((t) => t.type === "credit")
    .reduce((acc, t) => acc + (t.amount || 0), 0);
  const escrowPending = txns
    .filter((t) => t.status === "pending")
    .reduce((acc, t) => acc + (t.amount || 0), 0);

  const realizations = txns;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleWithdrawal = async () => {
    if (amount > 0) {
      await requestWithdrawal(amount);
      setIsModalOpen(false);
      setAmount(0);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="text-center max-w-sm sm:max-w-md">
          <LogIn className="w-16 h-16 sm:w-24 sm:h-24 text-gray-600 mx-auto mb-6 sm:mb-8" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Login Required
          </h1>
          <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">
            Please log in to access your partner wallet
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold sm:font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border-2 border-amber-400/50 text-amber-400 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold sm:font-bold text-base sm:text-lg hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6 md:px-8 py-10 sm:py-16">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
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
            <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Partner Wallet
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Track your earnings and manage your partner account
          </p>
        </div>

        {/* Wallet Balances */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 sm:mb-12">
          {/* Available Balance */}
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center">
            <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-300 text-sm sm:text-base">Available Balance</p>
            <p className="text-white text-2xl sm:text-3xl font-bold">
              {formatPrice(availableBalance)}
            </p>
          </div>

          {/* Escrow Pending */}
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center">
            <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-300 text-sm sm:text-base">Escrow Pending</p>
            <p className="text-white text-2xl sm:text-3xl font-bold">
              {formatPrice(escrowPending)}
            </p>
          </div>

          {/* Total Realized */}
          <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-center">
            <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-300 text-sm sm:text-base">Total Realized</p>
            <p className="text-white text-2xl sm:text-3xl font-bold">
              {formatPrice(totalRealized)}
            </p>
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="bg-gradient-to-br from-amber-400/10 to-yellow-500/10 border border-amber-400/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 text-center mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            Withdraw Funds
          </h2>
          <p className="text-amber-200 text-xs sm:text-sm mb-5 sm:mb-6">
            Request withdrawal of your available balance to your registered bank
            account
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold sm:font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            Request Withdrawal
          </button>
        </div>

        {/* Transaction History */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-amber-400" />
            Transaction History
          </h2>

          {loading && <p className="text-gray-400">Loading transactions...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && txns.length === 0 && (
            <p className="text-gray-400">No transactions found.</p>
          )}
          {!loading && !error && txns.length > 0 && (
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              <table className="min-w-full divide-y divide-gray-700 text-sm sm:text-base">
                <thead>
                  <tr>
                    {["Description", "Amount", "Type", "Status", "Date"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {txns.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-gray-200">
                        {transaction.description}
                      </td>
                      <td
                        className={`px-3 sm:px-4 py-3 text-${
                          transaction.type === "credit" ? "green" : "red"
                        }-400`}
                      >
                        {formatPrice(transaction.amount)}
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-gray-300">
                        {transaction.type}
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === "success" || transaction.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-gray-300">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Request Withdrawal</h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-gray-700 text-white p-2 rounded mb-4"
              placeholder="Amount"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdrawal}
                className="bg-amber-500 text-black px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerWalletPage;

