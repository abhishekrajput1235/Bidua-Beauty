
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Edit, Trash2, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function Customers() {
  const { user: authUser, loading, error, getAllUsers, updateUserRole, deleteUser } = useAuthStore();
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newRole, setNewRole] = useState('');

  const fetchUsers = async () => {
    const res = await getAllUsers();
    if (res.success && res.users) {
      setUsers(res.users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const roleCounts = useMemo(() => users.reduce(
    (acc: Record<string, number>, u: any) => {
      const role = (u.role || 'user').toLowerCase();
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  ), [users]);

  const roleKeys = ['all', ...Object.keys(roleCounts).sort()];

  const filteredCustomers = useMemo(() => users.filter((u) => {
    const matchesSearch =
      (u.name || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());

    const userRole = (u.role || 'user').toLowerCase();
    const matchesRole = roleFilter === 'all' || userRole === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  }), [users, searchTerm, roleFilter]);

  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setNewRole(user.role || 'user');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleRoleUpdate = async () => {
    if (selectedUser && newRole) {
      await updateUserRole(selectedUser._id, newRole);
      fetchUsers(); // Refresh users
      handleCloseModal();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Deleting user with ID:', userId);
      await deleteUser(userId);
      fetchUsers(); // Refresh users
    }
  };

  const getRoleClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'b2b':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your customer base and relationships</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{users.length}</span>
          <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Total Customers</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {roleKeys.map((rk) => (
            <button
              key={rk}
              onClick={() => setRoleFilter(rk)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                roleFilter === rk
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {rk.charAt(0).toUpperCase() + rk.slice(1)} ({rk === 'all' ? users.length : roleCounts[rk]})
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          <span className="font-medium text-sm">Export</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white font-semibold">
                        {customer.name ? customer.name.charAt(0) : (customer.email || 'U').charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{customer.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleClass(customer.role || 'user')}`}>
                      {customer.role || 'user'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenModal(customer)} className="p-2 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        <Edit className="w-4 h-4 text-emerald-600" />
                      </button>
                      <button onClick={() => handleDeleteUser(customer._id)} className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Edit Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Role</h2>
              <button onClick={handleCloseModal} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p>Change role for <span className="font-medium text-emerald-600 dark:text-emerald-400">{selectedUser.name || selectedUser.email}</span></p>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-800 dark:text-white"
              >
                <option value="user">User</option>
                <option value="b2b">B2B</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
              <button onClick={handleCloseModal} className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleRoleUpdate} disabled={loading} className="px-4 py-2 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 transition-colors">
                {loading ? 'Saving...' : 'Save Role'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
