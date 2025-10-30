import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useOrderStore } from '@/store/orderStore';
import { useAuthStore } from '@/store/authStore';
import { useProductStore } from '@/store/useProductStore';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const { allOrders, fetchAllOrders, loading: ordersLoading } = useOrderStore();
  const { getAllUsers, user } = useAuthStore();
  const { products, fetchProducts, loading: productsLoading } = useProductStore();
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    fetchAllOrders(user?.token);
    fetchProducts();
    const fetchUsers = async () => {
      const { users } = await getAllUsers();
      if (users) {
        setUsersList(users);
      }
    };
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [fetchAllOrders, fetchProducts, getAllUsers, user,]);

  const totalRevenue = useMemo(() => allOrders.reduce((sum, order) => sum + order.totalAmount, 0), [allOrders]);
  const totalOrders = allOrders.length;
  const totalProducts = products.length;
  const totalCustomers = usersList.length;

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      change: '+12.5%', // Placeholder
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      change: '+8.2%', // Placeholder
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      trend: 'up'
    },
    {
      title: 'Products',
      value: totalProducts,
      change: '+3.1%', // Placeholder
      icon: Package,
      color: 'from-amber-500 to-orange-600',
      trend: 'up'
    },
    {
      title: 'Customers',
      value: totalCustomers,
      change: '-2.4%', // Placeholder
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      trend: 'down'
    },
  ];

  const salesData = useMemo(() => {
    const salesByMonth = allOrders.reduce((acc, order) => {
      const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + order.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return monthOrder.map(month => ({
      month,
      revenue: salesByMonth[month] || 0
    })).filter(d => d.revenue > 0);

  }, [allOrders]);

  const recentOrders = useMemo(() => 
    [...allOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
    [allOrders]
  );

  const getStatusColor = (status: string) => {
    const colors = {
      Delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      Processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      Shipped: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      Pending: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status as keyof typeof colors] || colors.Pending;
  };

  if (ordersLoading || productsLoading) {
    return <div>Loading...</div>
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.title}</p>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={item} className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sales Overview</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Monthly sales performance</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">+15.3%</span>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div variants={item} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Latest customer orders</p>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">#{order._id.slice(-6)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{order.user?.name || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}