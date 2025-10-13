// import React, { useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { Lock, ArrowLeft } from "lucide-react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuthStore } from "@/store/authStore";

// const ResetPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { resetPassword } = useAuthStore();
//   const navigate = useNavigate();
//   const { token } = useParams<{ token: string }>();

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters long.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await resetPassword(token!, password);
//       if (res.success) {
//         toast.success("Password reset successfully! You can now login.");
//         navigate("/login");
//       } else {
//         toast.error(res.error || "Failed to reset password");
//       }
//     } catch (err) {
//       toast.error("Something went wrong. Try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-8 sm:py-16 relative overflow-hidden">
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 w-full max-w-sm sm:max-w-md">
//         <Link
//           to="/login"
//           className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-6 sm:mb-8 group text-sm sm:text-base"
//         >
//           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
//           <span>Back to Login</span>
//         </Link>

//         <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
//           <div className="text-center mb-6 sm:mb-8">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
//               <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
//             </div>
//             <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
//               Reset Your Password
//             </h1>
//             <p className="text-gray-400 text-xs sm:text-sm">
//               Enter your new password below
//             </p>
//           </div>

//           <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-6">
//             <div>
//               <label className="block text-gray-300 font-medium mb-1 sm:mb-2 text-sm">New Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-black/50 border border-gray-600 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors text-sm sm:text-base"
//                   placeholder="Enter new password"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-gray-300 font-medium mb-1 sm:mb-2 text-sm">Confirm Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
//                 <input
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full bg-black/50 border border-gray-600 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors text-sm sm:text-base"
//                   placeholder="Confirm new password"
//                   required
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-[1.03] text-sm sm:text-base"
//             >
//               {loading ? "Resetting..." : "Reset Password"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordPage;


import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "@/store/authStore";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuthStore();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await resetPassword(token!, password);
      if (res.success) {
        toast.success("Password reset successfully! You can now login.");
        navigate("/login");
      } else {
        toast.error(res.error || "Failed to reset password");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-8 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <Link
          to="/login"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-6 sm:mb-8 group text-sm sm:text-base"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Login</span>
        </Link>

        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
              Reset Your Password
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-6">
            {/* New Password */}
            <div className="relative">
              <label className="block text-gray-300 font-medium mb-1 sm:mb-2 text-sm">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors text-sm sm:text-base"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-gray-300 font-medium mb-1 sm:mb-2 text-sm">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors text-sm sm:text-base"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-[1.03] text-sm sm:text-base"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

