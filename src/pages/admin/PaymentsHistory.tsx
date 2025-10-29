import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, Copy } from "lucide-react";
import { usePaymentHistoryStore } from "@/store/paymentHistoryStore"; // Changed store
import { useAuthStore } from "@/store/authStore";
import PaymentModal from "../../components/admin/paymentModal"; // Changed modal

export default function PaymentsHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // show only 6 items per page (as requested)

  const { token } = useAuthStore();
  const { payments, fetchPayments, loading, error } = usePaymentHistoryStore();

  // Fetch payments on mount
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // Ensure newest payments appear on top. If payments update, show first page.
  const sortedPayments = useMemo(() => {
    return [...(payments || [])].sort((a, b) => {
      // Defensive checks for createdAt
      const ta = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return tb - ta; // newest first
    });
  }, [payments]);

  // Reset to first page when filters/search or the underlying payments change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, payments.length]);

  // Filtered list (search + status) — memoized for performance
  const filteredPayments = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return sortedPayments.filter((payment) => {
      const paymentId = (payment._id || "").toString();
      const customerName = (payment.user?.name || "").toString();

      const matchesSearch =
        !term ||
        paymentId.toLowerCase().includes(term) ||
        customerName.toLowerCase().includes(term);

      const status = (payment.paymentStatus || "").toString();
      const matchesStatus =
        statusFilter === "all" || status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [sortedPayments, searchTerm, statusFilter]);

  // Pagination calculations
  const totalItems = filteredPayments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Clamp currentPage in case totalPages shrink
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedPayments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPayments.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPayments, currentPage]);

  const openModal = (payment: any) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };
  const handleCopy = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy ID:", err);
    }
  };

  const closeModal = () => {
    setSelectedPayment(null);
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      pending:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    } as Record<string, string>;
    return (
      colors[status.toLowerCase()] ||
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  const statusCounts = useMemo(() => {
    return {
      all: payments.length,
      completed: payments.filter((p) => (p.paymentStatus || "").toLowerCase() === "completed").length,
      pending: payments.filter((p) => (p.paymentStatus || "").toLowerCase() === "pending").length,
      failed: payments.filter((p) => (p.paymentStatus || "").toLowerCase() === "failed").length,
    };
  }, [payments]);

  // helpers for pagination UI
  const goToPage = (page: number) => setCurrentPage(Math.min(Math.max(1, page), totalPages));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  // Render a compact page list (show first, last, current +/- 2)
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showRange = 2; // numbers around current

    const left = Math.max(1, currentPage - showRange);
    const right = Math.min(totalPages, currentPage + showRange);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((p, idx) => {
      if (p === "...")
        return (
          <span key={`dots-${idx}`} className="px-2 py-1 text-sm text-gray-500">
            ...
          </span>
        );

      const pageNum = p as number;
      const isActive = pageNum === currentPage;
      return (
        <button
          key={pageNum}
          onClick={() => goToPage(pageNum)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            isActive
              ? "bg-emerald-600 text-white"
              : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          {pageNum}
        </button>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments History</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage all customer payments</p>
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
                placeholder="Search by payment ID or customer name..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {paginatedPayments.map((payment, index) => (
                <motion.tr
                  key={payment._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">#{payment._id.slice(-5)}</span>
                      <button
                        onClick={() => handleCopy(payment._id)}
                        className="p-1 text-gray-500 hover:text-emerald-600 transition-colors"
                        title="Copy Payment ID"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      {copiedId === payment._id && (
                        <motion.span
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs text-emerald-500 font-medium"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{payment.user?.name || "Guest"}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{Number(payment.amount || 0).toLocaleString()}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{payment.createdAt ? new Date(payment.createdAt).toLocaleString() : "-"}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.paymentStatus || "")}`}>
                      {payment.paymentStatus ? payment.paymentStatus.charAt(0).toUpperCase() + payment.paymentStatus.slice(1) : "N/A"}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                      onClick={() => openModal(payment)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No payments found matching your criteria.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredPayments.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> - <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}</span> of <span className="font-medium">{totalItems}</span>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={goPrev} disabled={currentPage === 1} className={`px-3 py-1 rounded-md text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Prev
              </button>

              <div className="flex items-center gap-2">
                {renderPageNumbers()}
              </div>

              <button onClick={goNext} disabled={currentPage === totalPages} className={`px-3 py-1 rounded-md text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPayment && (
        <PaymentModal payment={selectedPayment} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </motion.div>
  );
}

/*
 NOTES & SUGGESTIONS:
 - This component implements client-side pagination showing 6 items per page.
 - New payments are sorted to the top (sortedPayments) and the UI resets to page 1 when payments change.
 - Serial number (S.No) column shows the overall index across the filtered list (not just page index).
 - For extremely large datasets (thousands+ rows), consider implementing server-side pagination (API that accepts page & limit params) to avoid loading all rows into the client.
 - If you want page size selection (6/10/25/50), make ITEMS_PER_PAGE a state variable and wire a select input.
*/
