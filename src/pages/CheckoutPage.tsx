import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Landmark, 
  Wallet, 
  MapPin, 
  CheckCircle2, 
  Lock,
  Building2
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const paymentMethods = [
  { id: "Credit Card", name: "Card", icon: CreditCard },
  { id: "UPI", name: "UPI", icon: Landmark },
  { id: "Net Banking", name: "Net Banking", icon: Building2 },
  { id: "COD", name: "Cash on Delivery", icon: Truck },
];

// --- Sub-Component: Progress Stepper ---
const CheckoutSteps = ({ currentStep }) => {
  const steps = [
    { num: 1, label: "Shipping" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Confirm" }
  ];

  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <React.Fragment key={step.num}>
          <div className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 
              ${currentStep >= step.num 
                ? "bg-amber-400 border-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.5)]" 
                : "bg-black border-gray-700 text-gray-500"}`}
            >
              {currentStep > step.num ? <CheckCircle2 size={20} /> : step.num}
            </div>
            <span className={`text-xs mt-2 font-medium ${currentStep >= step.num ? "text-amber-400" : "text-gray-600"}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-1 mx-2 rounded-full transition-colors duration-300 ${currentStep > step.num ? "bg-amber-400" : "bg-gray-800"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- Sub-Component: Shipping Form ---
const ShippingAddressStep = ({ t, onNext, isB2B }) => {
  const shippingAddress = useCartStore((s) => s.shippingAddress);
  const setShippingAddress = useCartStore((s) => s.setShippingAddress);
  const deliveryOption = useCartStore((s) => s.deliveryOption);
  const setDeliveryOption = useCartStore((s) => s.setDeliveryOption);

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const InputField = ({ label, name, placeholder, className = "" }) => (
    <div className={className}>
      <label className="block text-xs uppercase text-gray-500 font-bold mb-1.5 ml-1 tracking-wider">{label}</label>
      <input
        type="text"
        name={name}
        value={shippingAddress?.[name] || ''}
        onChange={handleAddressChange}
        placeholder={placeholder}
        className="w-full bg-black/40 border border-gray-700 focus:border-amber-400/50 rounded-xl py-3 px-4 text-white placeholder-gray-600 outline-none transition-all focus:bg-gray-900/80"
        required
      />
    </div>
  );

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <MapPin className="mr-3 text-amber-400" /> Customer Information
      </h2>

      {isB2B && (
          <div className="mb-8 p-6 bg-gray-900/40 rounded-2xl border border-gray-700/50">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-wider">Select Delivery Mode</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { val: 'shipping', icon: Truck, label: 'Ship to Address', desc: 'Standard delivery' },
                    { val: 'warehouse', icon: Wallet, label: 'Store in Warehouse', desc: 'Keep stock virtually' }
                  ].map((opt) => (
                    <label 
                      key={opt.val}
                      className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group
                      ${deliveryOption === opt.val 
                        ? "border-amber-400 bg-amber-400/5 shadow-lg shadow-amber-900/20" 
                        : "border-gray-700 bg-black/20 hover:border-gray-600"}`}
                    >
                      <input type="radio" name="deliveryOption" value={opt.val} checked={deliveryOption === opt.val} onChange={(e) => setDeliveryOption(e.target.value)} className="sr-only" />
                      <div className={`p-3 rounded-full mr-4 ${deliveryOption === opt.val ? "bg-amber-400 text-black" : "bg-gray-800 text-gray-400"}`}>
                        <opt.icon size={20} />
                      </div>
                      <div>
                        <span className={`block font-bold ${deliveryOption === opt.val ? "text-white" : "text-gray-300"}`}>{opt.label}</span>
                        <span className="text-xs text-gray-500">{opt.desc}</span>
                      </div>
                      {deliveryOption === opt.val && <div className="absolute top-4 right-4 text-amber-400"><CheckCircle2 size={16} /></div>}
                    </label>
                  ))}
              </div>
          </div>
      )}

      {deliveryOption === 'shipping' && (
          <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Full Name" name="fullName" placeholder="John Doe" />
                <InputField label="Phone Number" name="phone" placeholder="+91 98765 43210" />
              </div>
              <InputField label="Street Address" name="street" placeholder="123 Main St, Apt 4B" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField label="City" name="city" placeholder="Mumbai" />
                <InputField label="State" name="state" placeholder="Maharashtra" />
                <InputField label="Pincode" name="postalCode" placeholder="400001" />
              </div>
          </div>
      )}

      <button onClick={onNext} className="w-full mt-8 bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-amber-400/20 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2">
        Continue to Payment <ArrowLeft className="rotate-180" size={20} />
      </button>
    </div>
  );
};

// --- Sub-Component: Payment Form ---
const PaymentStep = ({ t, onBack, handlePlaceOrder, isProcessing, cartLoading }) => {
  const paymentMethod = useCartStore((s) => s.paymentMethod);
  const setPaymentMethod = useCartStore((s) => s.setPaymentMethod);
  const deliveryOption = useCartStore((s) => s.deliveryOption);
  const [details, setDetails] = useState({ cardNumber: "", expiryDate: "", cvc: "", upiId: "" });

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <CreditCard className="mr-3 text-amber-400" /> Payment Method
      </h2>
      
      <div className="grid grid-cols-2 gap-3 mb-8">
        {paymentMethods.map((method) => {
          const isCodDisabled = deliveryOption === 'warehouse' && method.id === 'COD';
          const isSelected = paymentMethod === method.id;
          return (
              <button
              key={method.id}
              onClick={() => !isCodDisabled && setPaymentMethod(method.id)}
              disabled={isCodDisabled}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 relative
              ${isCodDisabled ? "opacity-30 cursor-not-allowed border-gray-800 bg-gray-900" : "cursor-pointer"} 
              ${isSelected ? "border-amber-400 bg-amber-400/5 text-white" : "border-gray-700 bg-black/20 text-gray-400 hover:border-gray-600 hover:bg-gray-800/50"}`}
              >
                <method.icon className={`w-8 h-8 mb-2 ${isSelected ? "text-amber-400" : "text-gray-500"}`} />
                <span className="font-medium text-sm text-center">{method.name}</span>
                {isSelected && <div className="absolute top-2 right-2 text-amber-400"><CheckCircle2 size={14} /></div>}
              </button>
          );
        })}
      </div>

      <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-6 mb-8">
          {paymentMethod === "Credit Card" && (
            <div className="space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2"><Lock size={16} className="text-amber-400"/> Secure Card Payment</h3>
              <input type="text" placeholder="Card Number" value={details.cardNumber} onChange={(e) => setDetails({...details, cardNumber: e.target.value})} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white focus:border-amber-400/50 outline-none transition-colors" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" value={details.expiryDate} onChange={(e) => setDetails({...details, expiryDate: e.target.value})} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white focus:border-amber-400/50 outline-none transition-colors" />
                <input type="text" placeholder="CVC" value={details.cvc} onChange={(e) => setDetails({...details, cvc: e.target.value})} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white focus:border-amber-400/50 outline-none transition-colors" />
              </div>
            </div>
          )}

          {paymentMethod === "UPI" && (
            <div className="space-y-4">
               <h3 className="text-white font-semibold flex items-center gap-2"><Lock size={16} className="text-amber-400"/> UPI Verification</h3>
              <input type="text" placeholder="username@bank" value={details.upiId} onChange={(e) => setDetails({...details, upiId: e.target.value})} className="w-full bg-black/50 border border-gray-600 rounded-xl py-3 px-4 text-white focus:border-amber-400/50 outline-none transition-colors" />
              <p className="text-xs text-gray-500">A verification request will be sent to your UPI app.</p>
            </div>
          )}
          
          {(paymentMethod === "COD" || paymentMethod === "Net Banking") && (
              <div className="text-center py-4">
                  <p className="text-gray-300">Proceed to complete your order via {paymentMethod}.</p>
              </div>
          )}
      </div>

      <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-1/3 bg-gray-800 text-white py-4 rounded-xl font-bold hover:bg-gray-700 transition-colors">
              Back
          </button>
          <button onClick={handlePlaceOrder} disabled={isProcessing || cartLoading} className="w-2/3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed">
              {isProcessing ? (
                <>
                 <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"/>
                 <span>Processing...</span>
                </>
              ) : (
                <>
                 <ShieldCheck size={20} />
                 <span>Pay Now</span>
                </>
              )}
          </button>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const cart = useCartStore((s) => s.cart);
  const cartLoading = useCartStore((s) => s.loading);
  const createOrderAndProcessPayment = useCartStore((s) => s.createOrderAndProcessPayment);
  const setShippingAddress = useCartStore((s) => s.setShippingAddress);
  const deliveryOption = useCartStore((s) => s.deliveryOption);
  const user = useAuthStore((s) => s.user);
  const getProfile = useAuthStore((s) => s.getProfile);
  const userLoading = useAuthStore((s) => s.loading);

  const [currentStep, setCurrentStep] = useState(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const isB2B = user?.role === 'b2b';

  useEffect(() => { getProfile(); }, [getProfile]);

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

  const formatPrice = (price) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(price);
  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.isB2b && item.b2bPrice ? item.b2bPrice : item.sellingPrice || 0) * item.quantity, 0);
  const getShippingCost = () => (isB2B && deliveryOption === 'warehouse') ? 0 : cart.reduce((sum, item) => sum + (item.shippingCharge || 0) * item.quantity, 0);
  const getGstAmount = () => cart.reduce((sum, item) => sum + (((item.isB2b && item.b2bPrice ? item.b2bPrice : item.sellingPrice) || 0) * item.quantity * (item.gstPercentage || 0)) / 100, 0);
  const getTotalPrice = () => getSubtotal() + getShippingCost() + getGstAmount();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    try {
      const order = await createOrderAndProcessPayment();
      if (order) navigate(`/confirmation/${order._id}`);
      else console.error("Checkout failed");
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cartLoading || userLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div></div>;

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
          <Link to="/" className="inline-flex items-center text-amber-400 hover:text-amber-300 gap-2"><ArrowLeft size={18} /> Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 relative">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <Link to="/cart" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Cart
            </Link>
            <div className="flex items-center text-green-400 text-xs font-bold bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                <Lock size={12} className="mr-1.5" /> SECURE CHECKOUT
            </div>
        </div>

        <CheckoutSteps currentStep={currentStep} />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN: FORMS */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl">
              {currentStep === 1 && <ShippingAddressStep t={t} onNext={() => setCurrentStep(2)} isB2B={isB2B} />}
              {currentStep === 2 && <PaymentStep t={t} onBack={() => setCurrentStep(1)} handlePlaceOrder={handlePlaceOrder} isProcessing={isPlacingOrder} cartLoading={cartLoading} />}
            </div>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-8 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.productId} className="flex gap-4 p-3 bg-black/20 rounded-xl border border-gray-800/50">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700">
                      <img
                        src={item.images?.[0]?.url ? (item.images[0].url.startsWith("http") ? item.images[0].url : `${BACKEND_URL}${item.images[0].url}`) : "/placeholder.png"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-amber-400">
                        {formatPrice((item.isB2b && item.b2bPrice ? item.b2bPrice : item.sellingPrice) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>GST (Tax)</span>
                  <span>{formatPrice(getGstAmount())}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Shipping</span>
                  <span className={getShippingCost() === 0 ? "text-green-400" : ""}>
                    {getShippingCost() === 0 ? "Free / Warehouse" : formatPrice(getShippingCost())}
                  </span>
                </div>
                
                <div className="pt-4 mt-2 border-t border-gray-700 flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-amber-400">{formatPrice(getTotalPrice())}</span>
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
