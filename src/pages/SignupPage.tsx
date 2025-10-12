import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User, Eye, EyeOff, Mail, Phone } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const signup = useAuthStore((state) => state.signup);
  const login = useAuthStore((state) => state.login);
  const authError = useAuthStore((state) => state.error);

useEffect(() => {
  if (authError) {
    setError(authError);
    toast.error(authError);
  }
}, [authError]);

  const navigate = useNavigate();

  const validatePhone = (value: string) => /^[0-9]{10}$/.test(value);

  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (!email) {
    toast.error('Email is required');
    setError('Email is required');
    return;
  }

  if (phone && !validatePhone(phone)) {
    toast.error('Please enter a valid 10-digit phone number');
    setError('Please enter a valid 10-digit phone number');
    return;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    setError('Passwords do not match');
    return;
  }
  if(password.length < 6)
  {
    setError('Password should be 6 digit.');
  }

  const result = await signup(email, phone, password);

  if (result.success) {
    await login(email, password);
    toast.success('Signup successful! 🎉');
    navigate('/');
  } else {
    setError(result.message);
    toast.error(result.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-3 py-8 sm:py-12">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-80 sm:h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-4 sm:mb-6 text-sm sm:text-base transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="ml-1">Back to Home</span>
        </Link>

        {/* Signup Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-5 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-white mb-1">
              Create Account
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Join BIDUA Beauty and start your glow journey
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500/30 rounded-lg p-2.5 text-red-300 text-xs sm:text-sm text-center">
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 font-medium mb-1.5 sm:mb-2 text-sm">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-gray-300 font-medium mb-1.5 sm:mb-2 text-sm">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) setPhone(value);
                  }}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className="w-full bg-black/50 border border-gray-600 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="10-digit phone number"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 font-medium mb-1.5 sm:mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="Create password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-300 font-medium mb-1.5 sm:mb-2 text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-amber-400 hover:underline">
                Login In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
