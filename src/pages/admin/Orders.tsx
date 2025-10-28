import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, Loader2 } from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import { useAuthStore } from "@/store/authStore";
import OrderModal from "@/components/admin/orderModal";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state: show 20 rows at a time as requested
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);

  const { token } = useAuthStore();
  const { allOrders = [], fetchAllOrders, loading, error } = useOrderStore();

  // Fetch all orders on mount (Admin only)
  useEffect(() => {
    if (token) {
      fetchAllOrders(token);
    }
  }, [token, fetchAllOrders]);

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  // Normalize incoming orders so UI can safely assume fields exist
  const normalizedOrders = (allOrders || []).map((o: any) => ({
    _id: o?._id ?? "",
    user: { name: o?.user?.name ?? "Guest", ...(o?.user ?? {}) },
    totalAmount: typeof o?.totalAmount === "number" ? o.totalAmount : 0,
    createdAt: o?.createdAt ?? null,
    status: (o?.status ?? "pending").toString(),
    items: o?.items ?? [],
    raw: o,
  }));

  // safe helpers
  const safeToLower = (v?: any) => (v === undefined || v === null ? "" : String(v).toLowerCase());

  // Filtered orders based on search & status (defensive)
  const filteredOrders = normalizedOrders.filter((order: any) => {
    const search = searchTerm.trim().toLowerCase();
    const orderId = order._id || "";
    const customerName = order.user?.name || "";
    const orderStatus = safeToLower(order.status);

    const matchesSearch =
      (orderId && orderId.toLowerCase().includes(search)) ||
      (customerName && customerName.toLowerCase().includes(search)) ||
      (search === ""); // if search empty, match everything

    const matchesStatus = statusFilter === "all" || orderStatus === safeToLower(statusFilter);

    return matchesSearch && matchesStatus;
  });

  // If filters/search change, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, allOrders.length]);

  // Ensure currentPage is within bounds whenever filteredOrders changes
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ordersPerPage));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  // Pagination slicing
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);

  // Status color mapping (safe)
  const getStatusColor = (status?: string) => {
    const s = safeToLower(status);
    const colors: Record<string, string> = {
      delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      shipped: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      pending: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return colors[s] ?? colors.pending;
  };

  // Count status summary (use normalizedOrders to avoid crashes)
  const statusCounts = {
    all: normalizedOrders.length,
    pending: normalizedOrders.filter((o) => safeToLower(o.status) === "pending").length,
    processing: normalizedOrders.filter((o) => safeToLower(o.status) === "processing").length,
    shipped: normalizedOrders.filter((o) => safeToLower(o.status) === "shipped").length,
    delivered: normalizedOrders.filter((o) => safeToLower(o.status) === "delivered").length,
    cancelled: normalizedOrders.filter((o) => safeToLower(o.status) === "cancelled").length,
  };

  // ---------- Truncated pager helpers ----------
  const PAGINATOR_MAX = 7; // total button slots (including first & last)

  function createPageList(total: number, current: number, maxButtons = PAGINATOR_MAX) {
    if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | "LEFT_ELLIPSIS" | "RIGHT_ELLIPSIS")[] = [];
    const sideWidth = 1; // always show page 1 and page `total`
    const innerMax = maxButtons - (sideWidth * 2) - 2; // space for first, last and two ellipses

    // compute sliding window
    let left = Math.max(2, current - Math.floor(innerMax / 2));
    let right = Math.min(total - 1, current + Math.floor(innerMax / 2));

    // adjust if window is too close to edges
    const needed = innerMax - (right - left + 1) + 1;
    if (left === 2 && right < total - 1 && right - left + 1 < innerMax) {
      right = Math.min(total - 1, right + needed);
    } else if (right === total - 1 && left > 2 && right - left + 1 < innerMax) {
      left = Math.max(2, left - needed);
    }

    pages.push(1);

    if (left > 2) {
      pages.push("LEFT_ELLIPSIS");
    } else {
      for (let p = 2; p < left; p++) pages.push(p);
    }

    for (let p = left; p <= right; p++) pages.push(p);

    if (right < total - 1) {
      pages.push("RIGHT_ELLIPSIS");
    } else {
      for (let p = right + 1; p < total; p++) pages.push(p);
    }

    pages.push(total);
    return pages;
  }

  function jumpFromEllipsis(current: number, total: number, direction: "left" | "right", maxButtons = PAGINATOR_MAX) {
    const chunk = Math.max(1, Math.floor((maxButtons - 2) / 2)); // how many pages to jump
    if (direction === "left") return Math.max(1, current - chunk);
    return Math.min(total, current + chunk);
  }
  // ---------- end pager helpers ----------

  // Loading or error states
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
                ? "bg-emerald-600 text-white"
                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
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
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        #
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Order ID
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Customer
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Amount
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Date
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Status
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>

  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
    {currentOrders.map((order, index) => (
      <motion.tr
        key={order._id || Math.random()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        {/* ✅ Serial number column */}
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
          {indexOfFirst + index + 1}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-900 dark:text-white">{order._id || "—"}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-700 dark:text-gray-300">{order.user?.name || "Guest"}</span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            ₹{order.totalAmount ? order.totalAmount.toLocaleString() : "—"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status || ""}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
            onClick={() => openModal(order.raw ?? order)}
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

      {/* Pagination (truncated pager) */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredOrders.length === 0 ? (
            <>Showing 0 of 0 orders</>
          ) : (
            <>Showing {indexOfFirst + 1} - {Math.min(indexOfLast, filteredOrders.length)} of {filteredOrders.length} orders</>
          )}
        </div>

        <nav className="flex items-center gap-2" aria-label="Pagination">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-50"
            title="First"
          >
            {"<<"}
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          <div className="flex gap-1 items-center">
            {createPageList(totalPages, currentPage).map((item, i) => {
              if (item === "LEFT_ELLIPSIS")
                return (
                  <button
                    key={`le-${i}`}
                    onClick={() => setCurrentPage(jumpFromEllipsis(currentPage, totalPages, "left"))}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800"
                    title="Jump back"
                  >
                    ...
                  </button>
                );
              if (item === "RIGHT_ELLIPSIS")
                return (
                  <button
                    key={`re-${i}`}
                    onClick={() => setCurrentPage(jumpFromEllipsis(currentPage, totalPages, "right"))}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800"
                    title="Jump forward"
                  >
                    ...
                  </button>
                );

              const num = item as number;
              return (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPage === num
                      ? "bg-emerald-600 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800"
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-50"
          >
            Next
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 disabled:opacity-50"
            title="Last"
          >
            {">>"}
          </button>
        </nav>
      </div>

      {/* Modal */}
      {selectedOrder && <OrderModal order={selectedOrder} isOpen={isModalOpen} onClose={closeModal} />}
    </motion.div>
  );
}
