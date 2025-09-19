import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Package, Truck, Mail, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ConfirmationPage = () => {
  const { t } = useTranslation();
  const { cartItems, getSubtotal, getShippingCost, getTotalPrice } = useCart();
  const orderNumber = `LG${Date.now().toString().slice(-6)}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          {t('confirmation.title')}
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 mb-8 px-4">{t('confirmation.subtitle')}</p>

        {/* Order Details Card */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-amber-400 font-bold text-base sm:text-lg mb-3">{t('confirmation.orderDetails')}</h3>
              <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                <p><span className="text-white font-medium">{t('confirmation.orderNumber')}</span> <span className="break-all">#{orderNumber}</span></p>
                <p><span className="text-white font-medium">{t('confirmation.customer')}</span> Rajesh Kumar</p>
                <p><span className="text-white font-medium">{t('confirmation.email')}</span> <span className="break-all">rajesh.kumar@email.com</span></p>
                <p><span className="text-white font-medium">{t('confirmation.phone')}</span> +91 98765 43210</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-amber-400 font-bold text-base sm:text-lg mb-3">{t('confirmation.deliveryInformation')}</h3>
              <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                <p><span className="text-white font-medium">{t('confirmation.address')}</span> 123 MG Road, Mumbai, Maharashtra 400001</p>
                <p><span className="text-white font-medium">{t('confirmation.estimatedDelivery')}</span> {estimatedDelivery}</p>
                <p><span className="text-white font-medium">{t('confirmation.shipping')}</span> <span className="text-green-400">{t('confirmation.free')}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 mb-8">
          <h3 className="text-white font-bold text-lg sm:text-xl mb-6">{t('confirmation.orderStatus')}</h3>
          
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 sm:top-6 left-5 sm:left-6 right-5 sm:right-6 h-0.5 bg-gray-700">
              <div className="h-full bg-amber-400 w-1/4 transition-all duration-1000"></div>
            </div>
            
            {/* Status Steps */}
            <div className="flex items-center justify-between w-full relative z-10">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-400 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <span className="text-amber-400 font-medium text-xs sm:text-sm text-center">{t('confirmation.orderPlaced')}</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </div>
                <span className="text-gray-400 font-medium text-xs sm:text-sm text-center">{t('confirmation.processing')}</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </div>
                <span className="text-gray-400 font-medium text-xs sm:text-sm text-center">{t('confirmation.shipped')}</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                </div>
                <span className="text-gray-400 font-medium text-xs sm:text-sm text-center">{t('confirmation.delivered')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-300 transform hover:scale-105"
          >
            {t('cart.continueShopping')}
          </Link>
          
          <button
            onClick={() => {
              // Create a complete bill format for printing
              const printContent = `
═══════════════════════════════════════════════════════════════
                  BIDUA Industries Private Limited
                      ORDER RECEIPT
═══════════════════════════════════════════════════════════════

COMPANY DETAILS
───────────────────────────────────────────────────────────────
BIDUA Industries Private Limited
GST No: 29ABCDE1234F1Z5
Address: Plot No. 456, Industrial Area, Phase 2
         Electronic City, Bengaluru, Karnataka 560100
Phone: +91 80 4567 8900
Email: orders@biduaindustries.com

═══════════════════════════════════════════════════════════════

Order Number: ${orderNumber}
Date: ${new Date().toLocaleDateString('en-IN')}
Time: ${new Date().toLocaleTimeString('en-IN')}

───────────────────────────────────────────────────────────────
CUSTOMER DETAILS
───────────────────────────────────────────────────────────────
Name: Rajesh Kumar
Email: rajesh.kumar@email.com
Phone: +91 98765 43210
Address: 123 MG Road, Mumbai, Maharashtra 400001

───────────────────────────────────────────────────────────────
ORDER DETAILS
───────────────────────────────────────────────────────────────
${cartItems.length > 0 ? cartItems.map(item => `
${item.name}
Quantity: ${item.quantity}
Unit Price: ${formatPrice(item.price)}
Original Price: ${formatPrice(item.originalPrice)}
Discount: ${Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
Total: ${formatPrice(item.price * item.quantity)}
`).join('\n') : 'BIDUA Radiance 15\nQuantity: 1\nUnit Price: ₹1,499\nOriginal Price: ₹4,999\nDiscount: 70% OFF\nTotal: ₹1,499\n'}
───────────────────────────────────────────────────────────────
BILLING SUMMARY
───────────────────────────────────────────────────────────────
Subtotal: ${cartItems.length > 0 ? formatPrice(getSubtotal()) : '₹1,499'}
Shipping: ${cartItems.length > 0 ? (getShippingCost() > 0 ? formatPrice(getShippingCost()) : 'FREE') : 'FREE'}
Tax: Included

TOTAL AMOUNT: ${cartItems.length > 0 ? formatPrice(getTotalPrice()) : '₹1,499'}

───────────────────────────────────────────────────────────────
DELIVERY INFORMATION
───────────────────────────────────────────────────────────────
Estimated Delivery: ${estimatedDelivery}
Shipping Method: Standard Delivery
Tracking: Will be provided via email once shipped

───────────────────────────────────────────────────────────────
PAYMENT INFORMATION
───────────────────────────────────────────────────────────────
Payment Method: Credit/Debit Card
Payment Status: PAID
Transaction ID: TXN${Date.now().toString().slice(-8)}

───────────────────────────────────────────────────────────────
TERMS & CONDITIONS
───────────────────────────────────────────────────────────────
• 30-Day Money Back Guarantee
• Free Returns & Exchanges
• Products are non-refundable after use
• For support, contact: support@biduabeauty.com

───────────────────────────────────────────────────────────────
CONTACT INFORMATION
───────────────────────────────────────────────────────────────
BIDUA Industries Private Limited - Customer Support
Email: support@biduaindustries.com
Phone: +91 80 4567 8900
Website: www.biduaindustries.com
GST Helpline: +91 80 4567 8901

═══════════════════════════════════════════════════════════════
        Thank you for choosing BIDUA Industries Private Limited!
        Your satisfaction is our top priority.
═══════════════════════════════════════════════════════════════
                
              `;
              
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

        {/* Customer Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-2 text-sm sm:text-base">{t('confirmation.support')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-amber-400 text-sm sm:text-base">
            <a 
              href="mailto:support@biduabeauty.com?subject=Order Support - #{orderNumber}&body=Hi, I need help with my order #{orderNumber}. Please assist me."
              className="hover:text-amber-300 transition-colors duration-300 break-all"
            >
              {t('confirmation.email')}
            </a>
            <a 
              href="tel:+915551234567" 
              className="hover:text-amber-300 transition-colors duration-300"
            >
              {t('confirmation.phone')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;