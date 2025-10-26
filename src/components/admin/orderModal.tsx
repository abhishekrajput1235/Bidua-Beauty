import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Order } from "@/store/orderStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface OrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal = ({ order, isOpen, onClose }: OrderModalProps) => {
  if (!isOpen || !order) return null;

  const statusColor = (status: string) => {
    const map: Record<string, string> = {
      Pending: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      Processing: "bg-blue-200 text-blue-800 dark:bg-blue-800/40 dark:text-blue-300",
      Shipped: "bg-purple-200 text-purple-800 dark:bg-purple-800/40 dark:text-purple-300",
      Delivered: "bg-emerald-200 text-emerald-800 dark:bg-emerald-800/40 dark:text-emerald-300",
      Cancelled: "bg-red-200 text-red-800 dark:bg-red-800/40 dark:text-red-300",
    };
    return map[status] || map.Pending;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition"
            >
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Header */}
            <div className="mb-6 space-y-1">
              <h2 className="text-2xl font-bold dark:text-white break-all">
                Order Details - #{order._id}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                Total Amount: ₹{order.totalAmount.toLocaleString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                Status: {order.status}
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                Created At: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            {/* User Info */}
            <div className="mb-6 border-b pb-4 dark:border-gray-700">
              <h3 className="font-semibold text-lg dark:text-white">User Information</h3>
              <p className="text-gray-700 dark:text-gray-300">Name: {order.user.name}</p>
              <p className="text-gray-700 dark:text-gray-300">Email: {order.user.email}</p>
              <p className="text-gray-700 dark:text-gray-300">Phone: {order.user.phone}</p>
              {order.user.address?.length > 0 && (
                <div className="mt-1 text-gray-700 dark:text-gray-300">
                  <p>Address:</p>
                  <p className="break-words">
                    {order.user.address[0].street}, {order.user.address[0].city},{" "}
                    {order.user.address[0].state} - {order.user.address[0].postalCode},{" "}
                    {order.user.address[0].country}
                  </p>
                </div>
              )}
            </div>

            {/* Payment Info */}
            <div className="mb-6 border-b pb-4 dark:border-gray-700">
              <h3 className="font-semibold text-lg dark:text-white">Payment Information</h3>
              <p className="text-gray-700 dark:text-gray-300">Method: {order.payment.method}</p>
              <p className="text-gray-700 dark:text-gray-300">Status: {order.payment.status}</p>
              {order.payment.transactionId && (
                <p className="text-gray-700 dark:text-gray-300">
                  Transaction ID: {order.payment.transactionId}
                </p>
              )}
            </div>

            {/* Product List */}
            <div className="space-y-6">
              {order.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm"
                >
                  {/* Image */}
                  <div className="sm:w-1/4 flex justify-center items-center p-4 bg-gray-100 dark:bg-gray-700">
                    {item.product.images?.[0] ? (
                      <img
                        src={
                          item.product.images[0].url.startsWith("http")
                            ? item.product.images[0].url
                            : `${BACKEND_URL}${item.product.images[0].url.startsWith("/") ? "" : "/"}${item.product.images[0].url}`
                        }
                        alt={item.product.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center text-gray-400 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="sm:w-3/4 p-4 space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">Qty: {item.quantity}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Price: ₹{item.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      GST: ₹{item.gstAmount.toLocaleString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Shipping: ₹{item.shippingCharge.toLocaleString()}
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                    {item.serials?.length > 0 && (
                      <div className="mt-2">
                        <p className="font-medium text-gray-700 dark:text-gray-300">Serials:</p>
                        <div className="ml-2 mt-1 max-h-32 overflow-y-auto text-sm border border-gray-200 dark:border-gray-700 rounded p-2 space-y-1">
                          {item.serials.map((serial, idx) => (
                            <div key={idx} className="text-gray-600 dark:text-gray-300 break-words">
                              {idx + 1}. {serial}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 border-t pt-4 dark:border-gray-700 space-y-1">
              <p className="text-gray-700 dark:text-gray-300">
                Subtotal: ₹{order.subTotal.toLocaleString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Shipping Charges: ₹{order.shippingCharges.toLocaleString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                GST: ₹{order.gstAmount.toLocaleString()}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                Total: ₹{order.totalAmount.toLocaleString()}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
