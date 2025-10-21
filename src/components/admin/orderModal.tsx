// import { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import axios from "axios";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// interface ProductItem {
//   _id: string;
//   name: string;
//   quantity: number;
//   price: number;
//   status?: string;
//   images?: { url: string; _id: string }[];
// }

// interface OrderItem {
//   product: ProductItem;
//   quantity: number;
//   price: number;
//   serials: string[];
// }

// interface Order {
//   _id: string;
//   items: OrderItem[];
//   totalAmount: number;
//   status: string;
// }

// interface OrderModalProps {
//   order: Order | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const OrderModal = ({ order, isOpen, onClose }: OrderModalProps) => {
//   const [productStatuses, setProductStatuses] = useState<{
//     [key: string]: string;
//   }>({});

//   useEffect(() => {
//     if (order) {
//       const initialStatuses: { [key: string]: string } = {};
//       order.items.forEach((item) => {
//         initialStatuses[item.product._id] = item.product.status || "";
//       });
//       setProductStatuses(initialStatuses);
//     }
//   }, [order]);

//   if (!isOpen || !order) return null;

//   const handleStatusChange = (productId: string, value: string) => {
//     setProductStatuses((prev) => ({ ...prev, [productId]: value }));
//   };

//   const handleUpdate = async (productId: string) => {
//     const newStatus = productStatuses[productId];
//     if (!newStatus) return;

//     try {
//       const res = await axios.put(
//         `/api/orders/${order._id}/product/${productId}/status`,
//         { status: newStatus }
//       );
//       setProductStatuses((prev) => ({
//         ...prev,
//         [productId]: res.data.item.status,
//       }));
//       alert(`Status updated to ${res.data.item.status}`);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update status");
//     }
//   };

//   const statusColor = (status: string) => {
//     switch (status) {
//       case "Pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "Processing":
//         return "bg-blue-100 text-blue-800";
//       case "Shipped":
//         return "bg-purple-100 text-purple-800";
//       case "Delivered":
//         return "bg-green-100 text-green-800";
//       case "Cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition"
//         >
//           <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
//         </button>

//         {/* Header */}
//         <h2 className="text-2xl font-bold mb-2 dark:text-white break-all">
//           Order Details - #{order._id}
//         </h2>
//         <p className="mb-6 font-semibold text-gray-700 dark:text-gray-300">
//           Total Amount: ₹{order.totalAmount.toLocaleString()}
//         </p>

//         {/* Products List */}
//         <div className="space-y-4">
//           {order.items.map((item) => (
//             <div
//               key={item.product._id}
//               className="border dark:border-gray-700 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start bg-gray-50 dark:bg-gray-800"
//             >
//               {/* Product Image */}
//               <div className="flex justify-center md:justify-start">
//                 {item.product.images?.slice(0, 1).map((imgObj) => (
//                   <img
//                     src={
//                       imgObj.url.startsWith("http")
//                         ? imgObj.url
//                         : `${BACKEND_URL}${
//                             imgObj.url.startsWith("/") ? "" : "/"
//                           }${imgObj.url}`
//                     }
//                     alt={item.product.name}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 ))}
//               </div>

//               {/* Product Info */}
//               <div className="flex flex-col justify-between">
//                 <h3 className="font-semibold text-gray-800 dark:text-gray-200">
//                   {item.product.name}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Quantity: {item.quantity}
//                 </p>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Price: ₹{item.price}
//                 </p>
//                 <p className="text-gray-600 dark:text-gray-300 break-words">
//                   {item.serials.map((serial, index) => (
//                     <span key={index}>
//                       {serial}
//                       <br />
//                     </span>
//                   ))}
//                 </p>
//                 <span
//                   className={`inline-block px-2 py-1 mt-1 rounded text-sm font-medium ${statusColor(
//                     productStatuses[item.product._id]
//                   )}`}
//                 >
//                   {productStatuses[item.product._id] || "Not set"}
//                 </span>
//               </div>

//               {/* Status Controls */}
//               <div className="flex flex-col gap-2 w-full md:w-auto">
//                 <select
//                   className="border rounded p-2 dark:bg-gray-700 dark:text-white"
//                   value={productStatuses[item.product._id]}
//                   onChange={(e) =>
//                     handleStatusChange(item.product._id, e.target.value)
//                   }
//                   disabled={["Delivered", "Cancelled"].includes(
//                     productStatuses[item.product._id]
//                   )}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Processing">Processing</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Delivered">Delivered</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>
//                 <button
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-4 py-2 font-medium transition disabled:bg-gray-400"
//                   onClick={() => handleUpdate(item.product._id)}
//                   disabled={["Delivered", "Cancelled"].includes(
//                     productStatuses[item.product._id]
//                   )}
//                 >
//                   Update Status
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderModal;

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface ProductItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  status?: string;
  images?: { url: string; _id: string }[];
}

interface OrderItem {
  product: ProductItem;
  quantity: number;
  price: number;
  serials: string[];
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
}

interface OrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal = ({ order, isOpen, onClose }: OrderModalProps) => {
  const [productStatuses, setProductStatuses] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (order) {
      const initialStatuses: { [key: string]: string } = {};
      order.items.forEach((item) => {
        initialStatuses[item.product._id] = item.product.status || "";
      });
      setProductStatuses(initialStatuses);
    }
  }, [order]);

  if (!isOpen || !order) return null;

  const handleStatusChange = (productId: string, value: string) => {
    setProductStatuses((prev) => ({ ...prev, [productId]: value }));
  };

  const handleUpdate = async (productId: string) => {
    const newStatus = productStatuses[productId];
    if (!newStatus) return;

    try {
      const res = await axios.put(
        `/api/orders/${order._id}/product/${productId}/status`,
        { status: newStatus }
      );
      setProductStatuses((prev) => ({
        ...prev,
        [productId]: res.data.item.status,
      }));
      alert(`Status updated to ${res.data.item.status}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 m-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition"
        >
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold dark:text-white break-all">
            Order Details - #{order._id}
          </h2>
          <p className="mt-1 text-gray-700 dark:text-gray-300 font-semibold">
            Total Amount: ₹{order.totalAmount.toLocaleString()}
          </p>
        </div>

        {/* Products List */}
        <div className="space-y-6">
          {order.items.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col md:flex-row border dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800 shadow-sm"
            >
              {/* Product Image */}
              <div className="md:w-1/4 flex justify-center items-center p-4 bg-gray-100 dark:bg-gray-700">
                {item.product.images?.[0] && (
                  <img
                    src={
                      item.product.images[0].url.startsWith("http")
                        ? item.product.images[0].url
                        : `${BACKEND_URL}${
                            item.product.images[0].url.startsWith("/")
                              ? ""
                              : "/"
                          }${item.product.images[0].url}`
                    }
                    alt={item.product.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Product Info */}
              <div className="md:w-2/4 flex flex-col justify-between p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                  {item.product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Quantity: {item.quantity}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Price: ₹{item.price}
                </p>

                {/* Serials */}
                <div className="text-gray-600 dark:text-gray-300 mt-2">
                  <span className="font-medium">Serials:</span>
                  <div className="ml-2 mt-1 max-h-32 overflow-y-auto space-y-1 break-words p-2 border border-gray-200 dark:border-gray-700 rounded">
                    {item.serials.map((serial, idx) => (
                      <div key={idx}> {idx + 1} - {serial}</div>
                    ))}
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`inline-block px-2 py-1 mt-3 rounded text-sm font-medium ${statusColor(
                    productStatuses[item.product._id]
                  )}`}
                >
                  {productStatuses[item.product._id] || "Not set"}
                </span>
              </div>

              {/* Status Controls */}
              <div className="md:w-1/4 flex flex-col justify-center items-start gap-3 p-4 bg-gray-100 dark:bg-gray-700">
                <select
                  className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
                  value={productStatuses[item.product._id]}
                  onChange={(e) =>
                    handleStatusChange(item.product._id, e.target.value)
                  }
                  disabled={["Delivered", "Cancelled"].includes(
                    productStatuses[item.product._id]
                  )}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded px-4 py-2 font-medium transition disabled:bg-gray-400"
                  onClick={() => handleUpdate(item.product._id)}
                  disabled={["Delivered", "Cancelled"].includes(
                    productStatuses[item.product._id]
                  )}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
