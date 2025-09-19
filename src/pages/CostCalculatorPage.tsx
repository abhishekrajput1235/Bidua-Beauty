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

    // Simulate loading delay for better UX
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>{t('costCalculator.backToHome')}</span>
        </Link>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {t('costCalculator.title')}
            </h1>
            <p className="text-gray-400 text-sm">
              {t('costCalculator.subtitle')}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                {t('costCalculator.userId')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  placeholder={t('costCalculator.enterUserId')}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                {t('costCalculator.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors duration-300"
                  placeholder={t('costCalculator.enterPassword')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              {t('costCalculator.authorizedPersonnel')}
            </p>
          </div>
        </div>

        {/* Demo Credentials Note */}
        <div className="mt-6 bg-amber-400/10 border border-amber-400/20 rounded-2xl p-4 text-center">
          <p className="text-amber-400 text-sm font-medium mb-2">{t('costCalculator.demoCredentials')}</p>
          <p className="text-gray-300 text-xs">
            User ID: <span className="font-mono bg-black/30 px-2 py-1 rounded">1234</span>
            <br />
            Password: <span className="font-mono bg-black/30 px-2 py-1 rounded">1234</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostCalculatorPage;