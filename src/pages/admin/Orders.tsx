import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Eye, Loader2 } from 'lucide-react';
import { useOrderStore } from '@/store/orderStore';
import { useAuthStore } from '@/store/authStore';
import OrderModal from '../../components/admin/orderModal';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { token } = useAuthStore();
  const { allOrders, fetchAllOrders, loading, error } = useOrderStore();

  // ✅ Fetch all orders on mount (Admin only)
  useEffect(() => {
    if (token) {
      fetchAllOrders(token);
    }
  }, [token, fetchAllOrders]);

  // Modal handlers
  const openModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  // ✅ Filtered orders based on search & status
  const filteredOrders = allOrders.filter((order) => {
    const orderId = order._id || '';
    const customerName = order.user?.name || '';
    const matchesSearch =
      orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // ✅ Status color mapping
  const getStatusColor = (status: string) => {
    const colors = {
      delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      shipped: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      pending: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status.toLowerCase() as keyof typeof colors] || colors.pending;
  };

  // ✅ Count status summary
  const statusCounts = {
    all: allOrders.length,
    pending: allOrders.filter(o => o.status.toLowerCase() === 'pending').length,
    processing: allOrders.filter(o => o.status.toLowerCase() === 'processing').length,
    shipped: allOrders.filter(o => o.status.toLowerCase() === 'shipped').length,
    delivered: allOrders.filter(o => o.status.toLowerCase() === 'delivered').length,
    cancelled: allOrders.filter(o => o.status.toLowerCase() === 'cancelled').length,
  };

  // ✅ Loading or error states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <Loader2 className="animate-spin text-emerald-600 w-8 h-8" />
        <p className="ml-3 text-gray-700 dark:text-gray-300">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
      </div>
    );
  }

  // ✅ Main Render
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track all customer orders</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          <span className="font-medium">Export</span>
        </button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === status
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{order._id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{order.user?.name || 'Guest'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      ₹{order.totalAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order?.status || ''}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                      onClick={() => openModal(order)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No orders found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderModal order={selectedOrder} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </motion.div>
  );
}
