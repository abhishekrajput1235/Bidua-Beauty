import React from 'react';

interface OrderItem {
  product: {
    name?: string;
  } | null;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  createdAt: string;
  payment: {
    method?: string;
    status?: string;
    transactionId?: string;
  };
  shippingAddress?: {
    fullName?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  totalAmount: number;
}

interface InvoiceProps {
  order: Order;
}

const Invoice: React.FC<InvoiceProps> = ({ order }) => {
  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(p);

  return (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold">Invoice</h1>
        <div className="text-right">
          <p className="text-lg font-semibold">Bidua</p>
          <p className="text-sm">Your Company Address</p>
          <p className="text-sm">your-email@example.com</p>
        </div>
      </div>
      <div className="flex justify-between mb-8">
        <div>
          <p className="font-bold">Billed to:</p>
          <p>{order.shippingAddress?.fullName}</p>
          <p>{order.shippingAddress?.street}</p>
          <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
          <p>{order.shippingAddress?.country}</p>
        </div>
        <div className="text-right">
          <p><span className="font-bold">Invoice #:</span> {order._id.slice(-12).toUpperCase()}</p>
          <p><span className="font-bold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mb-8">
        <p className="font-bold">Payment Details:</p>
        <p><span className="font-semibold">Method:</span> {order.payment?.method}</p>
        <p><span className="font-semibold">Status:</span> {order.payment?.status}</p>
        {order.payment?.transactionId && <p><span className="font-semibold">Transaction ID:</span> {order.payment.transactionId}</p>}
      </div>
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-2">Item</th>
            <th className="text-right p-2">Quantity</th>
            <th className="text-right p-2">Price</th>
            <th className="text-right p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.product?.name}</td>
              <td className="text-right p-2">{item.quantity}</td>
              <td className="text-right p-2">{formatPrice(item.price)}</td>
              <td className="text-right p-2">{formatPrice(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <div className="w-1/3">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>{formatPrice(order.totalAmount)}</p>
          </div>
          <div className="flex justify-between font-bold text-xl mt-2">
            <p>Total:</p>
            <p>{formatPrice(order.totalAmount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;