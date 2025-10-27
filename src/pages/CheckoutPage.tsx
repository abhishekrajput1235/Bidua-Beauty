import React, { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CreditCard, Shield, Truck, Landmark, Wallet } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const paymentMethods = [
  { id: "Credit Card", name: "Credit Card", icon: CreditCard },
  { id: "Debit Card", name: "Debit Card", icon: CreditCard },
  { id: "Net Banking", name: "Net Banking", icon: Landmark },
  { id: "UPI", name: "UPI", icon: Landmark },
  { id: "COD", name: "Cash on Delivery", icon: Truck },
  { id: "Other", name: "Other", icon: Wallet },
];

const ShippingAddressStep = ({ t, onNext, isB2B }) => {
  const shippingAddress = useCartStore((s) => s.shippingAddress);
  const setShippingAddress = useCartStore((s) => s.setShippingAddress);
  const deliveryOption = useCartStore((s) => s.deliveryOption);
  const setDeliveryOption = useCartStore((s) => s.setDeliveryOption);

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-4">{t("checkout.customerInformation")}</h2>
      {isB2B && (
          <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Delivery Option</h3>
              <div className="grid grid-cols-2 gap-4">
                  <label className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${deliveryOption === 'shipping' ? "border-amber-400 bg-amber-400/10" : "border-gray-600/50 hover:border-gray-500"}`}>
                      <input type="radio" name="deliveryOption" value="shipping" checked={deliveryOption === 'shipping'} onChange={(e) => setDeliveryOption(e.target.value)} className="sr-only" />
                      <Truck className={`w-8 h-8 mb-2 ${deliveryOption === 'shipping' ? "text-amber-400" : "text-gray-400"}`} />
                      <span className={`font-medium text-center ${deliveryOption === 'shipping' ? "text-white" : "text-gray-300"}`}>Ship to my address</span>
                  </label>
                  <label className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${deliveryOption === 'warehouse' ? "border-amber-400 bg-amber-400/10" : "border-gray-600/50 hover:border-gray-500"}`}>
                      <input type="radio" name="deliveryOption" value="warehouse" checked={deliveryOption === 'warehouse'} onChange={(e) => setDeliveryOption(e.target.value)} className="sr-only" />
                      <Wallet className={`w-8 h-8 mb-2 ${deliveryOption === 'warehouse' ? "text-amber-400" : "text-gray-400"}`} />
                      <span className={`font-medium text-center ${deliveryOption === 'warehouse' ? "text-white" : "text-gray-300"}`}>Store in our warehouses</span>
                  </label>
              </div>
          </div>
      )}
      {deliveryOption === 'shipping' && (
          <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <input type="text" name="fullName" value={shippingAddress?.fullName || ''} onChange={handleAddressChange} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Phone</label>
                  <input type="text" name="phone" value={shippingAddress?.phone || ''} onChange={handleAddressChange} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
                </div>
              </div>
              <div>
                  <label className="block text-white font-medium mb-2">Street Address</label>
                  <input type="text" name="street" value={shippingAddress?.street || ''} onChange={handleAddressChange} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">City</label>
                  <input type="text" name="city" value={shippingAddress?.city || ''} onChange={handleAddressChange} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">State</label>
                  <input type="text" name="state" value={shippingAddress?.state || ''} onChange={handleAddressChange} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Pincode</label>
                  <input type="text" name="postalCode" value={shippingAddress?.postalCode || ''} onChange={handleAddressChange} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
                </div>
              </div>
          </>
      )}
      <button onClick={onNext} className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-4 rounded-2xl font-bold text-lg">
        Next: Payment
      </button>
    </div>
  );
};

const PaymentStep = ({ t, onBack, handlePlaceOrder, isProcessing, cartLoading }) => {
  const paymentMethod = useCartStore((s) => s.paymentMethod);
  const setPaymentMethod = useCartStore((s) => s.setPaymentMethod);
  const deliveryOption = useCartStore((s) => s.deliveryOption);
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", expiryDate: "", cvc: "", upiId: "" });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-4">{t("checkout.paymentMethod")}</h2>
      <div className="grid grid-cols-2 gap-4">
        {paymentMethods.map((method) => {
          const isCodDisabled = deliveryOption === 'warehouse' && method.id === 'COD';
          return (
              <label
              key={method.id}
              className={`flex flex-col items-center justify-center space-y-2 p-4 rounded-2xl border-2 transition-all duration-300 ${isCodDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${paymentMethod === method.id ? "border-amber-400 bg-amber-400/10" : "border-gray-600/50 hover:border-gray-500"}`}>
              <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="sr-only" disabled={isCodDisabled} />
              <method.icon className={`w-8 h-8 mb-2 ${paymentMethod === method.id ? "text-amber-400" : "text-gray-400"}`} />
              <span className={`font-medium text-center ${paymentMethod === method.id ? "text-white" : "text-gray-300"}`}>
                  {t(`checkout.${method.id.toLowerCase().replace(/ /g, "")}`)}
              </span>
              </label>
          );
          })}
      </div>

      {paymentMethod === "Credit Card" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Card Details</h3>
          <div>
            <label className="block text-white font-medium mb-2">Card Number</label>
            <input type="text" value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Expiry Date</label>
              <input type="text" value={paymentDetails.expiryDate} onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})} placeholder="MM/YY" className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">CVC</label>
              <input type="text" value={paymentDetails.cvc} onChange={(e) => setPaymentDetails({...paymentDetails, cvc: e.target.value})} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "UPI" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">UPI Details</h3>
          <div>
            <label className="block text-white font-medium mb-2">UPI ID</label>
            <input type="text" value={paymentDetails.upiId} onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})} placeholder="yourname@bank" className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white" required />
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4">
          <button onClick={onBack} className="w-full bg-gray-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-700">
              Back
          </button>
          <button onClick={handlePlaceOrder} disabled={isProcessing || cartLoading} className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-4 rounded-2xl font-bold text-lg disabled:opacity-50">
              {isProcessing ? (
              <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>{t("checkout.processingPayment")}</span>
              </div>
              ) : (
              <div className="flex items-center justify-center space-x-3">
                  <Shield className="w-6 h-6" />
                  <span>{t("checkout.placeOrder")}</span>
              </div>
              )}
          </button>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cart = useCartStore((s) => s.cart);
  const cartLoading = useCartStore((s) => s.loading);
  const createOrderAndProcessPayment = useCartStore((s) => s.createOrderAndProcessPayment);
  const setShippingAddress = useCartStore((s) => s.setShippingAddress);

  const user = useAuthStore((s) => s.user);
  const getProfile = useAuthStore((s) => s.getProfile);
  const userLoading = useAuthStore((s) => s.loading);

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const isB2B = user?.role === 'b2b';

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (user) {
      setShippingAddress({
        fullName: user.name || "",
        phone: user.phone || "",
        street: user.address?.[0]?.street || "",
        city: user.address?.[0]?.city || "",
        state: user.address?.[0]?.state || "",
        postalCode: user.address?.[0]?.postalCode || "",
        country: "India",
      });
    }
  }, [user, setShippingAddress]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(price);

  const getSubtotal = () => cart.reduce((sum, item) => sum + (isB2B ? item.b2bPrice : item.sellingPrice || 0) * item.quantity, 0);
  const getShippingCost = () => cart.reduce((sum, item) => sum + (item.shippingCharge || 0) * item.quantity, 0);
  const getGstAmount = () => cart.reduce((sum, item) => sum + (((isB2B ? item.b2bPrice : item.sellingPrice) || 0) * item.quantity * (item.gstPercentage || 0)) / 100, 0);
  const getTotalPrice = () => getSubtotal() + getShippingCost() + getGstAmount();

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const order = await createOrderAndProcessPayment();
      if (order) {
        navigate(`/confirmation/${order._id}`);
      } else {
        console.error("Checkout failed");
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartLoading || userLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">{t("checkout.loadingCart") || "Loading..."}</div>;
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t("checkout.noItems")}</h1>
          <p className="text-gray-400 mb-8">{t("cart.empty")}</p>
          <Link to="/" className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg">
            {t("cart.continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <Link to="/cart" className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 mb-12">
          <ArrowLeft size={20} />
          <span>{t("checkout.backToCart")}</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t("checkout.title")}</h1>
          <p className="text-gray-300 text-lg">{t("checkout.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8 bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
            {currentStep === 1 && <ShippingAddressStep t={t} onNext={() => setCurrentStep(2)} isB2B={isB2B} />}
            {currentStep === 2 && <PaymentStep t={t} onBack={() => setCurrentStep(1)} handlePlaceOrder={handlePlaceOrder} isProcessing={isProcessing} cartLoading={cartLoading} />}
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">{t("cart.orderSummary")}</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 p-4 bg-black/30 rounded-2xl">
                    <div className="w-16 h-16 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.images?.[0]?.url ? (item.images[0].url.startsWith("http") ? item.images[0].url : `${BACKEND_URL}${item.images[0].url.startsWith("/") ? "" : "/"}${item.images[0].url}`) : "/placeholder.png"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{t("cart.quantity")} {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 font-bold">{formatPrice((isB2B ? item.b2bPrice : item.sellingPrice) * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>{t("cart.subtotal")}</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{t("cart.shipping")}</span>
                  <span>{formatPrice(getShippingCost())}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{t("cart.gst")}</span>
                  <span>{formatPrice(getGstAmount())}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between text-2xl font-bold text-white">
                    <span>{t("cart.total")}</span>
                    <span className="text-amber-400">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;