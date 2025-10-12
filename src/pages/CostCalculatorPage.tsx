import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Lock, User, Eye, EyeOff } from 'lucide-react';
import CreamCalculator from '../components/CreamCalculator';

const CostCalculatorPage = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (username === '1234' && password === '1234') {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 800);
  };

  if (isAuthenticated) {
    return <CreamCalculator />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 md:px-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 sm:w-56 md:w-72 h-36 sm:h-56 md:h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-6 sm:mb-8 group text-sm sm:text-base"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>{t('costCalculator.backToHome')}</span>
        </Link>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 px-2 sm:px-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
              {t('costCalculator.title')}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">{t('costCalculator.subtitle')}</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            {/* Username */}
            <div>
              <label className="block text-gray-300 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                {t('costCalculator.userId')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  placeholder={t('costCalculator.enterUserId')}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                {t('costCalculator.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-xl py-2.5 sm:py-3 pl-10 pr-10 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  placeholder={t('costCalculator.enterPassword')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-2 sm:p-3 text-red-300 text-xs sm:text-sm text-center">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>{t('costCalculator.authenticating')}</span>
                </div>
              ) : (
                t('costCalculator.accessCalculator')
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-400">
            {t('costCalculator.authorizedPersonnel')}
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-4 sm:mt-6 bg-amber-400/10 border border-amber-400/20 rounded-2xl p-3 sm:p-4 text-center text-xs sm:text-sm">
          <p className="text-amber-400 font-medium mb-1">{t('costCalculator.demoCredentials')}</p>
          <p className="text-gray-300">
            User ID: <span className="font-mono bg-black/30 px-1 py-0.5 rounded">1234</span>
            <br />
            Password: <span className="font-mono bg-black/30 px-1 py-0.5 rounded">1234</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostCalculatorPage;
