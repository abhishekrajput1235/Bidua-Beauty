import { X } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Payment {
  _id: string;
  user: User;
  amount: number;
  paymentStatus: string;
  paymentId: string;
  order: string;
  createdAt: string;
}

interface PaymentModalProps {
  payment: Payment | null;
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ payment, isOpen, onClose }: PaymentModalProps) => {
  if (!isOpen || !payment) return null;

  const statusColor = (status: string) => {
    switch ((status || " " ).toLocaleLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition"
        >
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-2 dark:text-white break-all">
          Payment Details - #{payment._id}
        </h2>
        <p className="mb-6 font-semibold text-gray-700 dark:text-gray-300">
          Total Amount: ₹{payment.amount.toLocaleString()}
        </p>

        {/* Payment Info */}
        <div className="space-y-4">
          <div className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Payment ID</h3>
                <p className="text-gray-600 dark:text-gray-300">{payment._id}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Order ID</h3>
                <p className="text-gray-600 dark:text-gray-300">{payment.order}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Amount</h3>
                <p className="text-gray-600 dark:text-gray-300">₹{payment.amount.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Status</h3>
                <span
                  className={`inline-block px-2 py-1 mt-1 rounded text-sm font-medium ${statusColor(
                    payment?.paymentStatus
                  )}`}
                >
                  {payment.paymentStatus}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Date</h3>
                <p className="text-gray-600 dark:text-gray-300">{new Date(payment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">User Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Name</h4>
                <p className="text-gray-600 dark:text-gray-300">{payment.user.name}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                <p className="text-gray-600 dark:text-gray-300">{payment.user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

