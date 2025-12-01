


// import React, { useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { ArrowLeft, ListOrdered, Package, User, LogIn } from "lucide-react";
// import { useAuthStore } from "../store/authStore";
// import { useOrderStore } from "../store/orderStore";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const QueueTrackerPage = () => {
//   const { user, token, loading: userLoading } = useAuthStore();
//   const { orders, fetchUserOrders, loading: ordersLoading } = useOrderStore();

//   useEffect(() => {
//     if (token) {
//       fetchUserOrders(token);
//     }
//   }, [token, fetchUserOrders]);

//   const isB2B = user?.role === "b2b";

//   const queuedItems = useMemo(() => {
//     if (!orders) return [];
//     return orders.flatMap((order) =>
//       order.items.filter((item) => item.serials && item.serials.length > 0)
//     );
//   }, [orders]);

//   // helper inside component
//   function getUnitForSerial(product, serial) {
//     if (!product || !product.units) return null;
//     return product.units.find((u) => u.serial === serial) || null;
//   }

//   if (userLoading || ordersLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
//         <div className="text-center">
//           <ListOrdered className="w-24 h-24 text-gray-600 mx-auto mb-8 animate-pulse" />
//           <h1 className="text-4xl font-bold text-white mb-4">Loading Queue...</h1>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
//         <div className="text-center max-w-md">
//           <LogIn className="w-24 h-24 text-gray-600 mx-auto mb-8" />
//           <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
//           <p className="text-gray-400 mb-8 text-lg">
//             Please log in or sign up to view the Queue Tracker.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link
//               to="/login"
//               className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="border-2 border-amber-400/50 text-amber-400 px-8 py-4 rounded-full font-bold text-lg hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isB2B) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
//         <div className="text-center max-w-md">
//           <User className="w-24 h-24 text-gray-600 mx-auto mb-8" />
//           <h1 className="text-4xl font-bold text-white mb-4">B2B Access Only</h1>
//           <p className="text-gray-400 mb-8 text-lg">
//             This page is exclusively for B2B users.
//           </p>
//           <Link
//             to="/"
//             className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
//           >
//             <ArrowLeft
//               size={20}
//               className="group-hover:-translate-x-1 transition-transform duration-300"
//             />
//             <span>Back to Home</span>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16">
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="container mx-auto max-w-6xl relative z-10">
//         <Link
//           to="/"
//           className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-12 group"
//         >
//           <ArrowLeft
//             size={20}
//             className="group-hover:-translate-x-1 transition-transform duration-300"
//           />
//           <span>Back to Home</span>
//         </Link>

//         <div className="text-center mb-12">
//           <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
//             <ListOrdered className="w-10 h-10 text-black" />
//           </div>
//           <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
//             Product Serial Number Queue
//           </h1>
//           <p className="text-gray-300 text-lg max-w-2xl mx-auto">
//             Here are the serial numbers for your purchased products.
//           </p>
//         </div>

//         <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 lg:p-8 mb-12">
//           <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
//             <Package className="w-6 h-6 mr-3 text-amber-400" />
//             Your Queued Items ({queuedItems.length})
//           </h2>

//           {queuedItems.length > 0 ? (
//             <div className="max-h-96 overflow-y-auto overflow-x-hidden pr-2">
//               <ul className="space-y-4 text-gray-300">
//                 {queuedItems.map((item, index) => (
//                   <li
//                     key={index}
//                     className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={
//                           item.product.images[0].url.startsWith("http")
//                             ? item.product.images[0].url
//                             : `${BACKEND_URL}${item.product.images[0].url}`
//                         }
//                         alt={item.product.images[0].name}
//                         className="w-16 h-16 rounded-md object-cover"
//                       />

//                       <div className="w-full">
//                         <p className="font-bold text-white">
//                           {item.product.name}
//                         </p>

//                         {/* ⭐ SERIAL CHIP ROW (shows SOLD / IN QUEUE) ⭐ */}
//                         <div className="mt-2">
//                           <div className="flex items-center gap-2 overflow-x-auto extra-thin scrollbar-thumb-amber-500 scrollbar-track-transparent py-1 max-w-[90%]">
//                             {item.serials.map((serial) => {
//                               const unit = getUnitForSerial(item.product, serial);
//                               const isSold = !!unit?.isSold;

//                               return (
//                                 <div
//                                   key={serial}
//                                   className={`min-w-[230px] px-3 py-1 rounded-lg text-xs font-mono flex items-center justify-between whitespace-nowrap shadow-sm ${
//                                     isSold
//                                       ? "bg-amber-400 border border-gray-700 text-black"
//                                       : "bg-[#ffff] border border-amber-500/40 text-amber-300"
//                                   }`}
//                                 >
//                                   <span className="mr-3 select-all">{serial}</span>

//                                   <span
//                                     className={`ml-2 inline-flex items-center text-[10px] px-2 py-0.5 rounded-full font-semibold ${
//                                       isSold
//                                         ? "bg-green-700 text-gray-200"
//                                         : "bg-amber-500/12 text-amber-300"
//                                     }`}
//                                   >
//                                     {isSold ? "SOLD" : "IN QUEUE"}
//                                   </span>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                         {/* END SERIAL BLOCK */}
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//               <p className="text-gray-400 text-lg">
//                 You have no products in the queue.
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 lg:p-8">
//           <h3 className="text-xl font-bold text-white mb-4">
//             How the Queue System Works
//           </h3>
//           <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
//             <p>
//               <strong className="text-amber-400">FIFO System:</strong> Stock is allocated based on order time.
//             </p>
//             <p>
//               <strong className="text-amber-400">Serial Allocation:</strong> You receive unique serial batches.
//             </p>
//             <p>
//               <strong className="text-amber-400">B2C Sales Impact:</strong> When your serials are sold, you earn profit share.
//             </p>
//             <p>
//               <strong className="text-amber-400">Profit Sharing:</strong> 60% profit + cost reimbursement.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QueueTrackerPage;



// import React, { useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { 
//   ArrowLeft, 
//   ListOrdered, 
//   Package, 
//   User, 
//   LogIn, 
//   CheckCircle2, 
//   Clock, 
//   TrendingUp 
// } from "lucide-react";
// import { useAuthStore } from "../store/authStore";
// import { useOrderStore } from "../store/orderStore";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const QueueTrackerPage = () => {
//   const { user, token, loading: userLoading } = useAuthStore();
//   const { orders, fetchUserOrders, loading: ordersLoading } = useOrderStore();

//   useEffect(() => {
//     if (token) {
//       fetchUserOrders(token);
//     }
//   }, [token, fetchUserOrders]);

//   const isB2B = user?.role === "b2b";

//   // Helper to get unit details
//   function getUnitForSerial(product, serial) {
//     if (!product || !product.units) return null;
//     return product.units.find((u) => u.serial === serial) || null;
//   }

//   // Calculate queued items and statistics
//   const { queuedItems, stats } = useMemo(() => {
//     if (!orders) return { queuedItems: [], stats: { total: 0, sold: 0, pending: 0 } };
    
//     const items = orders.flatMap((order) =>
//       order.items.filter((item) => item.serials && item.serials.length > 0)
//     );

//     let total = 0;
//     let sold = 0;

//     items.forEach(item => {
//         item.serials.forEach(serial => {
//             total++;
//             const unit = getUnitForSerial(item.product, serial);
//             if (unit?.isSold) sold++;
//         });
//     });

//     return { 
//         queuedItems: items, 
//         stats: { total, sold, pending: total - sold } 
//     };
//   }, [orders]);


//   // Loading State
//   if (userLoading || ordersLoading) {
//     return (
//       <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
//         <ListOrdered className="w-16 h-16 text-amber-500 mb-6 animate-pulse" />
//         <h1 className="text-2xl font-bold text-white text-center">Syncing Queue...</h1>
//       </div>
//     );
//   }

//   // Auth Guard
//   if (!user) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center p-6">
//         <div className="text-center w-full max-w-md bg-gray-900/50 p-8 rounded-3xl border border-gray-800">
//           <LogIn className="w-16 h-16 text-amber-500 mx-auto mb-6" />
//           <h1 className="text-3xl font-bold text-white mb-2">Access Restricted</h1>
//           <p className="text-gray-400 mb-8">Please log in to view your product queue.</p>
//           <div className="grid grid-cols-2 gap-4">
//             <Link to="/login" className="bg-amber-500 text-black py-3 rounded-xl font-bold hover:bg-amber-400 transition">Login</Link>
//             <Link to="/signup" className="border border-amber-500/50 text-amber-500 py-3 rounded-xl font-bold hover:bg-amber-500/10 transition">Sign Up</Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Role Guard
//   if (!isB2B) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center p-6">
//         <div className="text-center max-w-md">
//           <User className="w-20 h-20 text-gray-700 mx-auto mb-6" />
//           <h1 className="text-3xl font-bold text-white mb-4">B2B Only</h1>
//           <p className="text-gray-500 mb-8">This dashboard is reserved for B2B partners.</p>
//           <Link to="/" className="text-amber-500 hover:text-amber-400 flex items-center justify-center gap-2">
//             <ArrowLeft size={18} /> Back Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white pb-20">
//       {/* Background Ambience */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
//         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
//       </div>

//       <div className="relative z-10 max-w-5xl mx-auto px-4 pt-8 md:pt-12">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//           <div>
//             <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors">
//               <ArrowLeft size={16} className="mr-2" /> Back
//             </Link>
//             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
//               Queue Tracker
//             </h1>
//             <p className="text-gray-500 mt-1">Monitor your serial allocations and sales.</p>
//           </div>
//         </div>

//         {/* Quick Stats Grid - Mobile Optimized */}
//         <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
//           <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
//              <Package className="w-6 h-6 text-blue-400 mb-2" />
//              <span className="text-2xl font-bold text-white">{stats.total}</span>
//              <span className="text-xs text-gray-500 uppercase tracking-wider">Total</span>
//           </div>
//           <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
//              <div className="absolute inset-0 bg-amber-500/5"></div>
//              <TrendingUp className="w-6 h-6 text-amber-400 mb-2" />
//              <span className="text-2xl font-bold text-amber-400">{stats.sold}</span>
//              <span className="text-xs text-amber-500/80 uppercase tracking-wider font-semibold">Sold</span>
//           </div>
//           <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
//              <Clock className="w-6 h-6 text-gray-400 mb-2" />
//              <span className="text-2xl font-bold text-gray-300">{stats.pending}</span>
//              <span className="text-xs text-gray-500 uppercase tracking-wider">Queue</span>
//           </div>
//         </div>

//         {/* List of Products */}
//         <div className="space-y-6">
//           {queuedItems.length > 0 ? (
//             queuedItems.map((item, index) => (
//               <div 
//                 key={index} 
//                 className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-700 transition-all duration-300"
//               >
//                 {/* Card Header */}
//                 <div className="p-5 border-b border-gray-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//                   <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-700">
//                     <img
//                       src={
//                         item.product.images[0].url.startsWith("http")
//                           ? item.product.images[0].url
//                           : `${BACKEND_URL}${item.product.images[0].url}`
//                       }
//                       alt={item.product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg text-white leading-tight">{item.product.name}</h3>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Allocated Serials: <span className="text-gray-300">{item.serials.length}</span>
//                     </p>
//                   </div>
//                 </div>

//                 {/* Serials Grid - Replaces Horizontal Scroll */}
//                 <div className="p-5 bg-black/20">
//                     {/* MOBILE FIX: 
//                        Used grid-cols-1 for small screens (full width cards).
//                        grid-cols-2 for tablets.
//                        grid-cols-3 for desktops.
//                     */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                       {item.serials.map((serial) => {
//                         const unit = getUnitForSerial(item.product, serial);
//                         const isSold = !!unit?.isSold;

//                         return (
//                           <div
//                             key={serial}
//                             className={`
//                               relative flex items-center justify-between p-3 rounded-xl border text-sm transition-all duration-200
//                               ${isSold 
//                                 ? "bg-amber-500/10 border-amber-500/50 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]" 
//                                 : "bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800"
//                               }
//                             `}
//                           >
//                             {/* Serial Number */}
//                             <div className="flex flex-col min-w-0">
//                                 <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-0.5">Serial No</span>
//                                 <span className={`font-mono truncate select-all ${isSold ? 'text-amber-100' : 'text-gray-300'}`}>
//                                     {serial}
//                                 </span>
//                             </div>

//                             {/* Status Indicator */}
//                             {isSold ? (
//                                 <div className="flex flex-col items-end">
//                                     <CheckCircle2 size={18} className="text-amber-400 mb-1" />
//                                     <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">SOLD</span>
//                                 </div>
//                             ) : (
//                                 <div className="flex flex-col items-end">
//                                     <div className="w-2 h-2 rounded-full bg-gray-600 mb-2 mr-1"></div>
//                                     <span className="text-[10px] font-medium text-gray-500 bg-gray-700/50 px-2 py-0.5 rounded-full">QUEUE</span>
//                                 </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-gray-800 border-dashed">
//               <Package className="w-16 h-16 text-gray-700 mx-auto mb-4" />
//               <p className="text-gray-400 text-lg">No active queue items found.</p>
//             </div>
//           )}
//         </div>

//         {/* Legend / Info Footer */}
//         <div className="mt-12 mb-8 p-6 bg-gray-900/40 rounded-2xl border border-gray-800">
//           <h3 className="text-white font-bold mb-4 flex items-center gap-2">
//             <ListOrdered className="w-5 h-5 text-amber-500" />
//             System Guide
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
//             <div className="flex items-start gap-3">
//                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
//                <p><span className="text-amber-400 font-semibold">FIFO System:</span> Stock is sold in the order it was purchased.</p>
//             </div>
//             <div className="flex items-start gap-3">
//                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
//                <p><span className="text-amber-400 font-semibold">Profit Share:</span> You earn 60% profit automatically when status changes to SOLD.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QueueTrackerPage;



import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ListOrdered, 
  Package, 
  User, 
  LogIn, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  LayoutDashboard
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useOrderStore } from "../store/orderStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const QueueTrackerPage = () => {
  const { user, token, loading: userLoading } = useAuthStore();
  const { orders, fetchUserOrders, loading: ordersLoading } = useOrderStore();

  useEffect(() => {
    if (token) {
      fetchUserOrders(token);
    }
  }, [token, fetchUserOrders]);

  const isB2B = user?.role === "b2b";

  // Helper to get unit details
  function getUnitForSerial(product, serial) {
    if (!product || !product.units) return null;
    return product.units.find((u) => u.serial === serial) || null;
  }

  // Calculate Stats and List
  const { queuedItems, stats } = useMemo(() => {
    if (!orders) return { queuedItems: [], stats: { total: 0, sold: 0, pending: 0 } };
    
    const items = orders.flatMap((order) =>
      order.items.filter((item) => item.serials && item.serials.length > 0)
    );

    let total = 0;
    let sold = 0;

    items.forEach(item => {
        item.serials.forEach(serial => {
            total++;
            const unit = getUnitForSerial(item.product, serial);
            if (unit?.isSold) sold++;
        });
    });

    return { 
        queuedItems: items, 
        stats: { total, sold, pending: total - sold } 
    };
  }, [orders]);

  // Loading State
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

  // Login Required
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <LogIn className="w-24 h-24 text-gray-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">Login Required</h1>
          <p className="text-gray-400 mb-8 text-lg">Please log in to view the Queue.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login" className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-transform hover:scale-105">Login</Link>
            <Link to="/signup" className="border-2 border-amber-400/50 text-amber-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400/10 transition-colors">Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }

  // B2B Only
  if (!isB2B) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <User className="w-24 h-24 text-gray-600 mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">B2B Access Only</h1>
          <Link to="/" className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 mt-4 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 mb-8 lg:mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">
            Queue Tracker
          </h1>
          <p className="text-gray-400">Monitor your serial numbers and sales status.</p>
        </div>

        {/* ⭐ STATS CARDS SECTION ⭐ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Total Card */}
            <div className="bg-gray-900/60 border border-gray-700/50 p-6 rounded-2xl flex items-center space-x-4 shadow-lg">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                    <Package size={28} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm font-medium">Total Allocations</p>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
            </div>

            {/* Sold Card */}
            <div className="bg-gray-900/60 border border-amber-500/30 p-6 rounded-2xl flex items-center space-x-4 shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-amber-400/5 group-hover:bg-amber-400/10 transition-colors"></div>
                <div className="p-3 bg-amber-400/10 rounded-xl text-amber-400 relative z-10">
                    <TrendingUp size={28} />
                </div>
                <div className="relative z-10">
                    <p className="text-amber-200/70 text-sm font-medium">Sold Units</p>
                    <p className="text-2xl font-bold text-amber-400">{stats.sold}</p>
                </div>
            </div>

            {/* Queue Card */}
            <div className="bg-gray-900/60 border border-gray-700/50 p-6 rounded-2xl flex items-center space-x-4 shadow-lg">
                <div className="p-3 bg-gray-700/30 rounded-xl text-gray-300">
                    <Clock size={28} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm font-medium">In Queue</p>
                    <p className="text-2xl font-bold text-gray-200">{stats.pending}</p>
                </div>
            </div>
        </div>


        {/* Main List Container */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-4 lg:p-8 mb-12">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center">
                <LayoutDashboard className="w-6 h-6 mr-3 text-amber-400" />
                Active Products ({queuedItems.length})
            </h2>
            <span className="text-xs text-gray-500 bg-black/40 px-3 py-1 rounded-full border border-gray-700">
                Scroll to view more
            </span>
          </div>

          {queuedItems.length > 0 ? (
            /* ⭐ SCROLLABLE CONTAINER (Approx 5 items height) ⭐ */
            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(251, 191, 36, 0.4); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(251, 191, 36, 0.8); }
              `}</style>
              
              {queuedItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-900/60 p-4 lg:p-6 rounded-2xl border border-gray-700/50 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                        <img
                        src={
                            item.product.images[0].url.startsWith("http")
                            ? item.product.images[0].url
                            : `${BACKEND_URL}${item.product.images[0].url}`
                        }
                        alt={item.product.images[0].name}
                        className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl object-cover border border-gray-700"
                        />
                    </div>

                    <div className="w-full">
                      <p className="font-bold text-xl text-white mb-3">
                        {item.product.name}
                      </p>

                      {/* Responsive Serial Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {item.serials.map((serial) => {
                          const unit = getUnitForSerial(item.product, serial);
                          const isSold = !!unit?.isSold;

                          return (
                            <div
                              key={serial}
                              className={`
                                flex items-center justify-between p-3 rounded-lg border 
                                transition-all duration-300
                                ${
                                  isSold
                                    ? "bg-amber-400/10 border-amber-500/50"
                                    : "bg-black/40 border-gray-700 hover:bg-gray-800"
                                }
                              `}
                            >
                              <div className="flex flex-col">
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                                    Serial #
                                </span>
                                <span className={`font-mono text-sm ${isSold ? 'text-amber-100' : 'text-amber-300'} select-all`}>
                                    {serial}
                                </span>
                              </div>

                              <div className={`
                                flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border
                                ${isSold 
                                    ? "bg-green-500/20 border-green-500/30 text-green-400" 
                                    : "bg-gray-800 border-gray-600 text-gray-400"
                                }
                              `}>
                                {isSold ? (
                                    <>
                                        <CheckCircle2 size={12} />
                                        <span>SOLD</span>
                                    </>
                                ) : (
                                    <>
                                        <Clock size={12} />
                                        <span>QUEUE</span>
                                    </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                You have no products in the queue.
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 lg:p-8">
          <h3 className="text-xl font-bold text-white mb-4">
            How the Queue System Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm leading-relaxed">
            <div className="bg-black/20 p-4 rounded-xl border border-gray-700/30">
                <p><strong className="text-amber-400 block mb-1">FIFO System</strong> Stock is allocated based on order time. First in, first out.</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-gray-700/30">
                <p><strong className="text-amber-400 block mb-1">Profit Sharing</strong> 60% profit + cost reimbursement credited to your wallet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueTrackerPage;