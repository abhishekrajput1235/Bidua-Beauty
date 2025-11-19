// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   User as UserIcon,
//   Mail,
//   Phone,
//   Briefcase,
//   DollarSign,
//   LogOut,
//   ShoppingBag,
//   ListOrdered,
// } from "lucide-react";
// import { useAuthStore } from "../store/authStore";
// import ProfilePage from "@/components/ProfilePageComponents";

// const UserProfilePage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const user = useAuthStore((state) => state.user);
//   const logout = useAuthStore((state) => state.logout);

//   const fetchProfile = async () => {
//     setLoading(true);
//     try {
//       const res = await useAuthStore.getState().getProfile();
//       if (!res.success) {
//         navigate("/login");
//       }
//     } catch {
//       navigate("/login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         Loading profile...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
//         <div className="text-center max-w-sm sm:max-w-md">
//           <UserIcon className="w-24 h-24 text-gray-600 mx-auto mb-6 sm:mb-8" />
//           <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
//             Access Denied
//           </h1>
//           <p className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">
//             Please log in to view your user profile.
//           </p>
//           <Link
//             to="/login"
//             className="block sm:inline-block bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6 md:px-8 py-10 sm:py-16 relative">
//       {/* Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-white/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-full sm:max-w-3xl md:max-w-4xl mx-auto relative z-10">
//         {/* Back Link */}
//         <Link
//           to="/"
//           className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-8 sm:mb-12 group"
//         >
//           <ArrowLeft
//             size={20}
//             className="group-hover:-translate-x-1 transition-transform duration-300"
//           />
//           <span className="text-sm sm:text-base">Back to Home</span>
//         </Link>

//         {/* Header */}
//         <div className="text-center mb-8 sm:mb-12">
//           <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
//             <UserIcon className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
//           </div>
//           <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
//             User Profile
//           </h1>
//           <p className="text-gray-300 text-sm sm:text-lg max-w-lg mx-auto">
//             Manage your account and view your details.
//           </p>
//         </div>
//         <div className="mb-8">
//         <ProfilePage/>
//         </div>
//         {/* User Info */}
//         <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
//           <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
//             <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-amber-400" />
//             Personal Information
//           </h2>
//           <div className="space-y-3 sm:space-y-4 text-gray-300">
//             <p className="flex flex-col sm:flex-row sm:items-center">
//               <span className="flex items-center mb-1 sm:mb-0">
//                 <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
//                 <span className="font-medium text-white">Email:</span>
//               </span>
//               <span className="ml-0 sm:ml-2 break-words">{user.email}</span>
//             </p>
//             <p className="flex flex-col sm:flex-row sm:items-center">
//               <span className="flex items-center mb-1 sm:mb-0">
//                 <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
//                 <span className="font-medium text-white">Phone:</span>
//               </span>
//               <span className="ml-0 sm:ml-2">{user.phone || "N/A"}</span>
//             </p>
//             <p className="flex flex-col sm:flex-row sm:items-center">
//               <span className="flex items-center mb-1 sm:mb-0">
//                 <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-400" />
//                 <span className="font-medium text-white">Role:</span>
//                 <span
//                   className={`ml-0 sm:ml-2 px-2 py-1 rounded-full text-xs sm:text-sm font-bold ${
//                     user.role === "user"
//                       ? "bg-green-500/20 text-green-400"
//                       : user.role === "b2b"
//                       ? "bg-blue-500/20 text-blue-400"
//                       : user.role === "admin"
//                       ? "bg-red-500/20 text-red-400"
//                       : "bg-gray-500/20 text-gray-400"
//                   }`}
//                 >
//                   {user.role === "user"
//                     ? "User"
//                     : user.role === "b2b"
//                     ? "B2B User"
//                     : user.role === "admin"
//                     ? "Admin"
//                     : "Unknown"}
//                 </span>
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* Quick Actions */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
//           {[
//             {
//               to: "/partner-wallet",
//               icon: (
//                 <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 mb-2 sm:mb-4" />
//               ),
//               title: "My Wallet",
//               desc: "View your earnings and transactions",
//             },
//             {
//               to: "/my-orders",
//               icon: (
//                 <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-2 sm:mb-4" />
//               ),
//               title: "My Orders",
//               desc: "View all your past orders",
//             },
//             {
//               to: "/b2b-catalog",
//               icon: (
//                 <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-2 sm:mb-4" />
//               ),
//               title: "B2B Orders",
//               desc: "Place new B2B orders",
//             },
//             {
//               to: "/queue-tracker",
//               icon: (
//                 <ListOrdered className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-2 sm:mb-4" />
//               ),
//               title: "My Queue",
//               desc: "Track your queued orders",
//             },
//             {
//               to: "/join-brpp",
//               icon: (
//                 <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-2 sm:mb-4" />
//               ),
//               title: "BRPP Program",
//               desc: "Join or manage BRPP membership",
//             },
//             ...(user.role === "admin"
//               ? [
//                   {
//                     to: "/admin",
//                     icon: (
//                       <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 mb-2 sm:mb-4" />
//                     ),
//                     title: "Go to Admin Dashboard",
//                     desc: "Manage products, orders, customers and analytics",
//                     // newTab: true,
//                   },
//                 ]
//               : []),
//           ].map((item, idx) => {
//             const commonClasses =
//               "bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-4 sm:p-6 text-center flex flex-col items-center justify-center hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105";

//             return item.newTab ? (
//               <a
//                 key={idx}
//                 href={item.to}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={commonClasses}
//               >
//                 {item.icon}
//                 <h3 className="text-lg sm:text-xl font-bold text-white">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-300 text-xs sm:text-sm">{item.desc}</p>
//               </a>
//             ) : (
//               <Link key={idx} to={item.to} className={commonClasses}>
//                 {item.icon}
//                 <h3 className="text-lg sm:text-xl font-bold text-white">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-300 text-xs sm:text-sm">{item.desc}</p>
//               </Link>
//             );
//           })}
//         </div>

//         {/* Logout */}
//         <div className="text-center">
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto space-x-2"
//           >
//             <LogOut size={18} className="sm:w-5 sm:h-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;


import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User as UserIcon,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  LogOut,
  ShoppingBag,
  ListOrdered,
  Loader2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import ProfilePage from "@/components/ProfilePageComponents";

// Responsive, accessible redesign.
// Key fixes from previous version:
// - Correct Tailwind usage (no dynamic class names like `w-${...}`)
// - Proper responsive grid: stacks on small, 3-column layout on large
// - Avatar sizing via inline styles + consistent visuals
// - QuickAction cards collapse to full width on small screens
// - Reduced horizontal padding and improved gap control for small devices

const QuickActionCard = ({ to, icon, title, desc, newTab }) => {
  const base =
    "w-full bg-gradient-to-br from-gray-800/60 to-black/60 backdrop-blur-sm border border-gray-700/40 rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg hover:scale-[1.02] transition-transform duration-200";

  const content = (
    <>
      <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-amber-400/10 text-amber-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base font-semibold text-white truncate">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-300 truncate">{desc}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 hidden sm:block" />
    </>
  );

  return newTab ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={base}>
      {content}
    </a>
  ) : (
    <Link to={to} className={base}>
      {content}
    </Link>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
    <div className="flex items-center gap-2 min-w-[120px]">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      <span className="text-sm text-gray-300 font-medium">{label}</span>
    </div>
    <div className="text-sm text-white break-words">{value}</div>
  </div>
);

const Skeleton = () => (
  <div className="min-h-[240px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="animate-spin w-8 h-8 text-amber-400" />
      <div className="text-gray-400">Loading profile...</div>
    </div>
  </div>
);

const Avatar = ({ name, size = 64 }) => {
  const initials = useMemo(() => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return (
      (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "")
    ).toUpperCase();
  }, [name]);

  return (
    <div
      aria-hidden
      className="rounded-2xl flex items-center justify-center font-bold"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
        color: "#000",
      }}
    >
      <span style={{ fontSize: Math.max(14, Math.floor(size / 3)) }}>{initials}</span>
    </div>
  );
};

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await useAuthStore.getState().getProfile();
        if (!mounted) return;
        if (!res?.success) {
          navigate("/login");
        }
      } catch (err) {
        if (!mounted) return;
        navigate("/login");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const actions = [
    {
      to: "/partner-wallet",
      icon: <DollarSign className="w-6 h-6" />,
      title: "My Wallet",
      desc: "View earnings & transactions",
    },
    {
      to: "/my-orders",
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "My Orders",
      desc: "All your purchases in one place",
    },
    {
      to: "/b2b-catalog",
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "B2B Orders",
      desc: "Place & manage B2B orders",
    },
    {
      to: "/queue-tracker",
      icon: <ListOrdered className="w-6 h-6" />,
      title: "My Queue",
      desc: "Track queued orders",
    },
    {
      to: "/join-brpp",
      icon: <Briefcase className="w-6 h-6" />,
      title: "BRPP Program",
      desc: "Manage membership",
    },
  ];

  if (user?.role === "admin") {
    actions.push({
      to: "/admin",
      icon: <Briefcase className="w-6 h-6 text-red-400" />,
      title: "Admin Dashboard",
      desc: "Manage products, users & analytics",
    });
  }

  if (loading) return <Skeleton />;

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6">
        <section className="max-w-md w-full text-center bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
          <UserIcon className="mx-auto w-16 h-16 text-gray-500 mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">You must sign in to view your profile.</p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/login"
              className="px-5 py-2 rounded-full font-semibold bg-amber-400 text-black hover:opacity-95"
            >
              Login
            </Link>
            <Link
              to="/"
              className="px-5 py-2 rounded-full font-semibold border border-gray-700 text-gray-200"
            >
              Back Home
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300">
            <ArrowLeft />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-full text-white font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Grid: left profile / right main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile card */}
          <section className="lg:col-span-1 bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-700/40 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <Avatar name={user.name || user.email} size={72} />
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">{user.name || user.email}</h1>
                <p className="text-sm text-gray-300 truncate">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1">Role: <span className="font-medium text-white">{(user.role || "user").toUpperCase()}</span></p>
              </div>
            </div>

            <hr className="my-4 border-gray-700" />

            <div className="space-y-3 mb-6">
              <InfoRow icon={Mail} label="Email" value={user.email} />
              <InfoRow icon={Phone} label="Phone" value={user.phone || "N/A"} />
              <InfoRow icon={Briefcase} label="Member since" value={new Date(user.created_at || Date.now()).toLocaleDateString()} />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                {actions.map((a, i) => (
                  <QuickActionCard key={i} {...a} />
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link to="/account/settings" className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-amber-400 text-black font-semibold">
                Manage Account
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button onClick={handleLogout} className="px-3 py-2 rounded-md border border-gray-700 text-white bg-red-500">
                Logout
              </button>
            </div>
          </section>

          {/* Main content: profile form + quick actions */}
          <section className="lg:col-span-2 bg-gradient-to-br from-gray-800/50 to-black/50 border border-gray-700/40 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-2xl font-bold text-white">Profile & Settings</h2>
              <div className="text-sm text-gray-400">Update your details</div>
            </div>

            <div className="mb-6">
              <ProfilePage />
            </div>


          </section>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">Need help? Visit the support center or contact us.</div>
          <div className="flex gap-3">
            <Link to="/support" className="px-4 py-2 border border-gray-700 rounded-md text-gray-200">Support</Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded-md text-white">Logout</button>
          </div>
        </div>
      </div>
    </main>
  );
}
