import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Package, Truck, Mail, Home, Loader, AlertTriangle } from 'lucide-react';
import { useOrderStore, Order } from '../store/orderStore';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

const ConfirmationPage = () => {
  const { t } = useTranslation();
  const { orderId } = useParams<{ orderId: string }>();
  const token = useAuthStore((s) => s.token);
  const { confirmedOrder, clearCart } = useCartStore();
  const { selectedOrder, loading, error, fetchOrderById } = useOrderStore();
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (confirmedOrder && confirmedOrder._id === orderId) {
      setLatestOrder(confirmedOrder);
    } else if (token && orderId) {
      fetchOrderById(orderId, token);
    }
    clearCart();
  }, [orderId, confirmedOrder, token, fetchOrderById, clearCart]);

  useEffect(() => {
    if (selectedOrder) {
      setLatestOrder(selectedOrder);
    }
  }, [selectedOrder]);

  const getEstimatedDelivery = (orderDate: string) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const generatePrintContent = (order: Order) => {
    // This is a simplified receipt. You can expand this with more details.
    const address = order.shippingAddress?.street
      ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.postalCode}`
      : 'Address not provided';

    return `
      BIDUA Beauty - Order Receipt
      ==============================
      Order Number: #${order._id.slice(-6)}
      Order Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}
      
      Customer:
      - Name: ${order.shippingAddress?.fullName || 'N/A'}
      - Email: ${order.user.email}
      - Phone: ${order.shippingAddress?.phone || 'N/A'}

      Shipping Address:
      - ${address}

      Items:
      ${order.items.map(item => `- ${item.product ? item.product.name : 'Product not available'} (x ${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join('\n')}

      Subtotal: ${formatPrice(order.subTotal)}
      Shipping: ${formatPrice(order.shippingCharges)}
      GST: ${formatPrice(order.gstAmount)}
      ------------------------------
      Total: ${formatPrice(order.totalAmount)}
      Payment: ${order.payment.method} - ${order.payment.status}
      ==============================
      Thank you for your purchase!
    `;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <Loader className="w-12 h-12 text-amber-400 animate-spin" />
      </div>
    );
  }

  if (error || !latestOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Could not load order details</h1>
          <p className="text-gray-400 mb-8">{error || 'There was a problem fetching your latest order. Please try again later or contact support.'}</p>
          <Link
            to="/"
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-3 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const { _id, shippingAddress, user, createdAt, status } = latestOrder;
  const orderNumber = _id.slice(-6);
  const estimatedDelivery = getEstimatedDelivery(createdAt);

  const renderOrderStatus = () => {
    const statuses = ['Processing', 'Shipped', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(status);

    return (
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 sm:top-6 left-5 sm:left-6 right-5 sm:right-6 h-0.5 bg-gray-700">
          <div
            className="h-full bg-amber-400 transition-all duration-1000"
            style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between w-full relative z-10">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 ${currentStatusIndex >= 0 ? 'bg-amber-400' : 'bg-gray-700'}`}>
              <CheckCircle className={`w-5 h-5 sm:w-6 sm:h-6 ${currentStatusIndex >= 0 ? 'text-black' : 'text-gray-400'}`} />
            </div>
            <span className={`font-medium text-xs sm:text-sm text-center ${currentStatusIndex >= 0 ? 'text-amber-400' : 'text-gray-400'}`}>{t('confirmation.orderPlaced')}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 ${currentStatusIndex >= 1 ? 'bg-amber-400' : 'bg-gray-700'}`}>
              <Package className={`w-5 h-5 sm:w-6 sm:h-6 ${currentStatusIndex >= 1 ? 'text-black' : 'text-gray-400'}`} />
            </div>
            <span className={`font-medium text-xs sm:text-sm text-center ${currentStatusIndex >= 1 ? 'text-amber-400' : 'text-gray-400'}`}>{t('confirmation.processing')}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 ${currentStatusIndex >= 2 ? 'bg-amber-400' : 'bg-gray-700'}`}>
              <Truck className={`w-5 h-5 sm:w-6 sm:h-6 ${currentStatusIndex >= 2 ? 'text-black' : 'text-gray-400'}`} />
            </div>
            <span className={`font-medium text-xs sm:text-sm text-center ${currentStatusIndex >= 2 ? 'text-amber-400' : 'text-gray-400'}`}>{t('confirmation.shipped')}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 ${status === 'Delivered' ? 'bg-amber-400' : 'bg-gray-700'}`}>
              <Home className={`w-5 h-5 sm:w-6 sm:h-6 ${status === 'Delivered' ? 'text-black' : 'text-gray-400'}`} />
            </div>
            <span className={`font-medium text-xs sm:text-sm text-center ${status === 'Delivered' ? 'text-amber-400' : 'text-gray-400'}`}>{t('confirmation.delivered')}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" />
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          {t('confirmation.title')}
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 mb-8 px-4">{t('confirmation.subtitle')}</p>

        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-amber-400 font-bold text-base sm:text-lg mb-3">{t('confirmation.orderDetails')}</h3>
              <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                <p><span className="text-white font-medium">{t('confirmation.orderNumber')}</span> <span className="break-all">#{orderNumber}</span></p>
                <p><span className="text-white font-medium">{t('confirmation.customer')}</span> {shippingAddress?.fullName || 'N/A'}</p>
                <p><span className="text-white font-medium">{t('confirmation.email')}</span> <span className="break-all">{user.email}</span></p>
                <p><span className="text-white font-medium">{t('confirmation.phone')}</span> {shippingAddress?.phone || 'N/A'}</p>
                <p><span className="text-white font-medium">Payment Method:</span> {latestOrder.payment.method}</p>
                <p><span className="text-white font-medium">Payment Status:</span> {latestOrder.payment.status}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-amber-400 font-bold text-base sm:text-lg mb-3">{t('confirmation.deliveryInformation')}</h3>
              <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                <p><span className="text-white font-medium">{t('confirmation.address')}</span> {shippingAddress?.street ? `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}` : 'Address not provided'}</p>
                <p><span className="text-white font-medium">{t('confirmation.estimatedDelivery')}</span> {estimatedDelivery}</p>
                <p><span className="text-white font-medium">{t('confirmation.shipping')}</span> <span className="text-green-400">{formatPrice(latestOrder.shippingCharges)}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 mb-8">
          <h3 className="text-white font-bold text-lg sm:text-xl mb-6">Order Items</h3>
          <div className="space-y-4">
            {latestOrder.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-white font-medium">{item.product ? item.product.name : 'Product not available'}</p>
                  <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                </div>
                <p className="text-amber-400 font-bold">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{formatPrice(latestOrder.subTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>
              <span>{formatPrice(latestOrder.shippingCharges)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>GST</span>
              <span>{formatPrice(latestOrder.gstAmount)}</span>
            </div>
            <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between text-white font-bold text-lg">
              <p>Total Amount</p>
              <p className="text-amber-400">{formatPrice(latestOrder.totalAmount)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 mb-8">
          <h3 className="text-white font-bold text-lg sm:text-xl mb-6">{t('confirmation.orderStatus')}</h3>
          {renderOrderStatus()}
        </div>

        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-4 sm:p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="w-6 h-6 text-amber-400" />
            <h3 className="text-amber-400 font-bold text-base sm:text-lg">What's Next?</h3>
          </div>
          <div className="text-gray-300 text-xs sm:text-sm space-y-2 text-left">
            <p>✓ You'll receive an order confirmation email shortly</p>
            <p>✓ We'll send you tracking information once your order ships</p>
            <p>✓ Your BIDUA Radiance 15 will be carefully packaged and shipped within 24 hours</p>
            <p>✓ Enjoy free shipping and our 30-day money-back guarantee</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            {t('cart.continueShopping')}
          </Link>
          
          <button
            onClick={() => {
              const printContent = generatePrintContent(latestOrder);
              
              const printWindow = window.open('', '_blank');
              if (printWindow) {
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>BIDUA Beauty - Order Receipt</title>
                      <style>
                        body { 
                          font-family: 'Courier New', monospace; 
                          padding: 20px; 
                          line-height: 1.4;
                          max-width: 800px;
                          margin: 0 auto;
                          background: #fff;
                          color: #000;
                        }
                        pre {
                          white-space: pre-wrap;
                          word-wrap: break-word;
                        }
                        @media print {
                          body { margin: 0; padding: 15px; }
                        }
                      </style>
                    </head>
                    <body>
                      <pre>${printContent}</pre>
                    </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.print();
              }
            }}
            className="border-2 border-amber-400/50 text-amber-400 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300"
          >
            {t('confirmation.printReceipt')}
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-2 text-sm sm:text-base">{t('confirmation.support')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-amber-400 text-sm sm:text-base">
            <a 
              href={`mailto:support@biduabeauty.com?subject=Order Support - #${orderNumber}&body=Hi, I need help with my order #${orderNumber}. Please assist me.`}
              className="hover:text-amber-300 transition-colors duration-300 break-all"
            >
              support@biduabeauty.com
            </a>
            <a 
              href="tel:+915551234567" 
              className="hover:text-amber-300 transition-colors duration-300"
            >
              +91 555 123 4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
