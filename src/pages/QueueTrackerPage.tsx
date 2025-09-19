import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ListOrdered, Package, CheckCircle, Clock, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// --- Static Data Simulation ---
// Simulate global stock status (some sold, some available)
const globalStockStatus = [
  { serial: 'SN-001', sku: 'BIDUA Radiance 15', status: 'sold', buyer: 'User A', date: '2025-01-01' },
  { serial: 'SN-002', sku: 'BIDUA Radiance 15', status: 'sold', buyer: 'User B', date: '2025-01-02' },
  { serial: 'SN-003', sku: 'BIDUA Radiance 15', status: 'sold', buyer: 'User C', date: '2025-01-03' },
  { serial: 'SN-004', sku: 'BIDUA Radiance 15', status: 'sold', buyer: 'User D', date: '2025-01-04' },
  { serial: 'SN-005', sku: 'BIDUA Radiance 15', status: 'sold', buyer: 'User E', date: '2025-01-05' },
  { serial: 'SN-006', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-007', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-008', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-009', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-010', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-011', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-012', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-013', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-014', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-015', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-016', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-017', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-018', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-019', sku: 'BIDUA Radiance 15', status: 'available' },
  { serial: 'SN-020', sku: 'BIDUA Radiance 15', status: 'available' },
];

// Simulate queued orders for different users
const simulatedQueuedOrders = [
  { orderId: 'Q-001', userId: 'user-1234', sku: 'BIDUA Radiance 15', quantity: 2, status: 'pending', position: 1, estimatedDelivery: '2025-01-25', serialRange: 'SN-006 to SN-007' },
  { orderId: 'Q-002', userId: 'user-5678', sku: 'BIDUA Radiance 15', quantity: 1, status: 'pending', position: 2, estimatedDelivery: '2025-01-26', serialRange: 'SN-008' },
  { orderId: 'Q-003', userId: 'user-1234', sku: 'BIDUA Radiance 15', quantity: 3, status: 'pending', position: 3, estimatedDelivery: '2025-01-28', serialRange: 'SN-009 to SN-011' },
  { orderId: 'Q-004', userId: 'user-9012', sku: 'BIDUA Radiance 15', quantity: 1, status: 'pending', position: 4, estimatedDelivery: '2025-01-29', serialRange: 'SN-012' },
  { orderId: 'Q-005', userId: 'user-1234', sku: 'BIDUA Radiance 15', quantity: 1, status: 'pending', position: 5, estimatedDelivery: '2025-01-30', serialRange: 'SN-013' },
];

const QueueTrackerPage = () => {
  const { isLoggedIn, user } = useAuth();

  // Filter queued orders for the current logged-in user
  const userQueuedOrders = isLoggedIn && user
    ? simulatedQueuedOrders.filter(order => order.userId === user.id)
    : [];

  const soldStock = globalStockStatus.filter(item => item.status === 'sold');
  const availableStock = globalStockStatus.filter(item => item.status === 'available');

  if (!isLoggedIn) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-16">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
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
            <ListOrdered className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Stock & Queue Tracker
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Monitor global stock movement and your position in the allocation queue.
          </p>
        </div>

        {/* Global Stock Status */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 lg:p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Package className="w-6 h-6 mr-3 text-amber-400" />
            Global Stock Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Recently Sold Stock ({soldStock.length})
              </h3>
              <div className="max-h-60 overflow-y-auto pr-2">
                {soldStock.length > 0 ? (
                  <ul className="space-y-2 text-gray-300">
                    {soldStock.map((item, index) => (
                      <li key={index} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                        <span>{item.sku} - <span className="font-bold text-white">{item.serial}</span></span>
                        <span className="text-sm text-gray-400">{item.date}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No stock sold recently.</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Available Stock for Allocation ({availableStock.length})
              </h3>
              <div className="max-h-60 overflow-y-auto pr-2">
                {availableStock.length > 0 ? (
                  <ul className="space-y-2 text-gray-300">
                    {availableStock.map((item, index) => (
                      <li key={index} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                        <span>{item.sku} - <span className="font-bold text-white">{item.serial}</span></span>
                        <span className="text-sm text-blue-400">Ready for Allocation</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No stock currently available for allocation.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Your Queued Orders */}
        <div className="bg-gradient-to-br from-amber-400/10 to-yellow-500/10 border border-amber-400/30 rounded-3xl p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-amber-400" />
            Your Queued Orders
          </h2>
          {userQueuedOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product SKU</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Serial Range</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Your Position</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Est. Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {userQueuedOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{order.orderId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{order.sku}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{order.quantity}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-amber-400 font-medium">{order.serialRange}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                          order.status === 'allocated' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status === 'pending' ? 'Pending' : order.status === 'allocated' ? 'Allocated' : 'Shipped'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-white font-bold">#{order.position}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{order.estimatedDelivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">You currently have no queued orders.</p>
              <Link 
                to="/b2b-catalog" 
                className="inline-block mt-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 transform hover:scale-105"
              >
                Browse B2B Catalog
              </Link>
            </div>
          )}
        </div>

        {/* Queue Information */}
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