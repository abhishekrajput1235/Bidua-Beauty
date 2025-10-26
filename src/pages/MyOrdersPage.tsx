import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  MapPin,
  CreditCard,
  Calendar,
  Search,
  Filter,
  ArrowRight,
  Crown,
  ShoppingCart,
  Download,
} from "lucide-react";
import { useOrderStore, Order } from "@/store/orderStore";
import { useAuthStore } from "../store/authStore";
import html2pdf from 'html2pdf.js';
import Invoice from '../components/Invoice';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

const MyOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const orders = useOrderStore((s) => s.orders);
  const fetchUserOrders = useOrderStore((s) => s.fetchUserOrders);
  const loading = useOrderStore((s) => s.loading);
  const error = useOrderStore((s) => s.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [visibleOrders, setVisibleOrders] = useState(5);
  const [orderToPrint, setOrderToPrint] = useState<Order | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (token) {
      fetchUserOrders(token);
    }
  }, [user, token, navigate, fetchUserOrders]);

  useEffect(() => {
    if (orderToPrint && invoiceRef.current) {
      const opt = {
        margin: 0.5,
        filename: `invoice-${orderToPrint._id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf().from(invoiceRef.current).set(opt).save().then(() => {
        setOrderToPrint(null);
      });
    }
  }, [orderToPrint]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Processing":
        return <Package className="w-4 h-4" />;
      case "Shipped":
        return <Truck className="w-4 h-4" />;
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Processing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Shipped":
        return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
      case "Delivered":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const filteredOrders = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return (orders || [])
      .slice()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter((order) => {
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        if (!matchesStatus) return false;
        if (!q) return true;
        if (order._id.toLowerCase().includes(q)) return true;
        for (const item of order.items) {
          if (item.product && item.product.name?.toLowerCase().includes(q)) return true;
          if (item.serials && item.serials.some((s) => s.toLowerCase().includes(q)))
            return true;
        }
        return false;
      });
  }, [orders, searchTerm, statusFilter]);

  const paginatedOrders = useMemo(() => {
    return filteredOrders.slice(0, visibleOrders);
  }, [filteredOrders, visibleOrders]);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p);

  const handleDownloadInvoice = (order: Order) => {
    setOrderToPrint(order);
  };

  if (!loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-10">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-amber-500/30">
                <Package className="w-16 h-16 text-amber-500" strokeWidth={1.5} />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50">
                <span className="text-2xl">📦</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">No Orders Yet</h2>
            <p className="text-gray-400 text-center max-w-md mb-8">
              Start shopping to see your orders here. Your purchase history will appear once you complete your first order.
            </p>

            <Link to="/products" className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-400">
        <p className="text-lg font-semibold">Error loading orders.</p>
        <p className="text-sm text-gray-400 mt-2">{String(error)}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div style={{ position: 'absolute', left: '-9999px' }}>
        {orderToPrint && <div ref={invoiceRef}><Invoice order={orderToPrint} /></div>}
      </div>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Links */}
        <div className="flex justify-between mb-12">
          <Link to="/" className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>

          <Link to="/cart" className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-300 group">
            <ShoppingCart size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go to Cart</span>
            <ArrowRight size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">My Orders</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Become a BIDUA Beauty Retail Partner and unlock exclusive benefits
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">My Orders History</h1>
          <p className="text-gray-400">Track and manage your order history</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by order ID, product name or serial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all"
            />
          </div>

          <div className="relative min-w-[180px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* DETAILS MODAL */}
        {selectedOrder && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="w-full max-w-3xl bg-gray-800 rounded-2xl overflow-hidden border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p className="text-white font-mono font-semibold">#{selectedOrder._id.slice(-12).toUpperCase()}</p>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="font-medium">{selectedOrder.status}</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="text-xs text-gray-400">Order Date</p>
                        <p className="text-white">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-xs text-gray-400">Payment</p>
                        <p className="text-white">{selectedOrder.payment?.method || "N/A"}</p>
                        <p className="text-xs text-emerald-400">{selectedOrder.payment?.status}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Shipping Address</p>
                      <p className="text-white font-medium">{selectedOrder.shippingAddress?.fullName || "N/A"}</p>
                      <p className="text-gray-300 text-sm mt-1 whitespace-pre-line">
                        {selectedOrder.shippingAddress
                          ? `${selectedOrder.shippingAddress.street || ""}\n${selectedOrder.shippingAddress.city || ""}, ${selectedOrder.shippingAddress.state || ""} ${selectedOrder.shippingAddress.postalCode || ""}`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex gap-4 bg-gray-900/40 rounded-xl p-3 border border-gray-700 items-center">
                        {item.product && Array.isArray(item.product.images) && item.product.images.length > 0 ? (
                          <img
                            src={item.product.images[0].url.startsWith("http") ? item.product.images[0].url : `${BASE_URL}${item.product.images[0].url}`}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-500" />
                          </div>
                        )}

                        <div className="flex-1">
                          <h5 className="text-white font-medium">{item.product?.name || item.serials?.[0] || "Unknown item"}</h5>
                          <p className="text-sm text-gray-400">Qty: {item.quantity}</p>

                          {item.serials && item.serials.length > 0 && (
                            <p className="text-xs text-gray-300 mt-1">Serials: {item.serials.slice(0, 6).join(", ")}{item.serials.length > 6 ? " ..." : ""}</p>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-white font-semibold">{formatPrice(item.price * item.quantity)}</p>
                          <p className="text-xs text-gray-400">₹{item.price} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total Amount</span>
                    <span className="text-2xl font-bold text-amber-500">{formatPrice(selectedOrder.totalAmount)}</span>
                  </div>
                  <button
                    onClick={() => handleDownloadInvoice(selectedOrder)}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Invoice</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders list */}
        <div className="space-y-4">
          {paginatedOrders.map((order) => (
            <div
              key={order._id}
              onClick={() => setSelectedOrder(order)}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition-transform">
                      <Package className="w-6 h-6 text-amber-500" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Order ID</p>
                      <p className="text-white font-mono font-semibold">#{order._id.slice(-12).toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-auto">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium">{order.status}</span>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-xl font-bold text-amber-500">{formatPrice(order.totalAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {order.items.slice(0, 6).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-900/40 rounded-xl px-3 py-2 border border-gray-700">
                      {item.product && Array.isArray(item.product.images) && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0].url.startsWith("http") ? item.product.images[0].url : `${BASE_URL}${item.product.images[0].url}`}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-500" />
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="text-sm text-white font-medium truncate max-w-[180px]">
                          {item.product?.name || (item.serials && item.serials[0]) || "Unknown item"}
                        </p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}

                  {order.items.length > 6 && (
                    <div className="flex items-center justify-center bg-gray-900/40 rounded-xl px-4 py-2 border border-gray-700">
                      <p className="text-sm text-gray-400">+{order.items.length - 6} more</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500/6 to-orange-500/6 border-t border-amber-500/20 px-6 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {order.shippingAddress?.city || "—"}, {order.shippingAddress?.state || "—"}
                    </span>
                  </div>
                  <span className="text-amber-500 text-sm font-medium group-hover:translate-x-1 transition-transform">View Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleOrders < filteredOrders.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleOrders((prev) => prev + 5)}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
            >
              Load More
            </button>
          </div>
        )}

        {filteredOrders.length === 0 && orders.length > 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
