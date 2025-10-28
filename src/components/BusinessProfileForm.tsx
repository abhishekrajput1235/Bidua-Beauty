import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Save, CreditCard, X } from "lucide-react";

type BusinessProfile = {
  _id?: string;
  businessName?: string;
  ownerName?: string;
  phone?: string;
  email?: string;
  address?: string;
  gstNumber?: string | null;
  [key: string]: any;
};

type Props = {
  initialData?: BusinessProfile;
  onSubmit: (data: BusinessProfile) => Promise<any> | any;
  onPaymentSubmit?: (paymentResult: any) => Promise<any> | any;
  onCancel?: () => void;
  submitLabel?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

const BusinessProfileForm: React.FC<Props> = ({
  initialData = {},
  onSubmit,
  onPaymentSubmit,
  onCancel,
  submitLabel = "Save & Continue",
}) => {
  // Initialize form once, or when editing a different profile (based on _id)
  const [form, setForm] = useState<BusinessProfile>(() => ({
    businessName: initialData?.businessName ?? "",
    ownerName: initialData?.ownerName ?? "",
    phone: initialData?.phone ?? "",
    email: initialData?.email ?? "",
    address: initialData?.address ?? "",
    gstNumber: initialData?.gstNumber ?? "",
  }));

  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Only reset form if the profile _id changes (safe guard against parent re-creating initialData object)
  useEffect(() => {
    const id = initialData?._id ?? null;
    if (id) {
      setForm({
        businessName: initialData.businessName ?? "",
        ownerName: initialData.ownerName ?? "",
        phone: initialData.phone ?? "",
        email: initialData.email ?? "",
        address: initialData.address ?? "",
        gstNumber: initialData.gstNumber ?? "",
      });
    }
    // If you want to prefill on first mount when initialData has values but no _id,
    // you can uncomment the block below:
    // else if (!id && Object.keys(initialData || {}).length) {
    //   setForm({...});
    // }
  }, [initialData?._id]); // <<-- depends only on _id, not whole object

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.businessName?.trim()) return "Business name is required.";
    if (!form.ownerName?.trim()) return "Owner name is required.";
    if (!form.phone?.trim()) return "Phone number is required.";
    if (!phoneRegex.test(String(form.phone).trim())) return "Phone number must be exactly 10 digits.";
    if (!form.email?.trim()) return "Email is required.";
    if (!emailRegex.test(String(form.email).trim())) return "Invalid email format.";
    if (!form.address?.trim()) return "Address is required.";
    return null;
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return null;
    }

    try {
      setLoading(true);
      const result = await onSubmit({ ...form });
      setLoading(false);
      return result;
    } catch (error: any) {
      setLoading(false);
      console.error("BusinessProfileForm submit error:", error);
      toast.error(error?.message || "Failed to save profile.");
      throw error;
    }
  };

  /**
   * Simulated payment flow:
   * - Save profile first (calls onSubmit)
   * - Simulate payment result and call onPaymentSubmit if provided
   *
   * Replace with real Razorpay flow when ready.
   */
  const handleSimulatedPayment = async () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    try {
      setPaymentProcessing(true);

      // Ensure profile saved first
      const saved = await handleSave();
      // small delay to simulate checkout
      await new Promise((r) => setTimeout(r, 700));

      const simulatedPayment = {
        razorpay_order_id: `order_${Date.now()}`,
        razorpay_payment_id: `pay_${Math.random().toString(36).slice(2, 10)}`,
        razorpay_signature: "simulated_signature_hash",
        businessProfileId: saved?.data?._id ?? saved?._id ?? initialData?._id ?? null,
        raw: { amount: 4999, currency: "INR" },
      };

      if (typeof onPaymentSubmit === "function") {
        try {
          await onPaymentSubmit(simulatedPayment);
          toast.success("Payment simulated & submitted successfully.");
        } catch (err: any) {
          console.error("onPaymentSubmit error:", err);
          toast.error(err?.message || "Payment verification failed.");
        }
      } else {
        toast.info("Payment simulated locally (no onPaymentSubmit provided).");
      }
    } catch (err: any) {
      console.error("Simulated payment failed:", err);
      toast.error(err?.message || "Payment failed.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="bg-gradient-to-br from-gray-900/30 to-black/40 border border-gray-700/40 rounded-2xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Business Profile</h3>
        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-gray-300">Business Name *</span>
          <input
            type="text"
            value={form.businessName ?? ""}
            onChange={(e) => handleChange("businessName", e.target.value)}
            className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="e.g. ABC Traders"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Owner / Contact Person *</span>
          <input
            type="text"
            value={form.ownerName ?? ""}
            onChange={(e) => handleChange("ownerName", e.target.value)}
            className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Owner name"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Phone *</span>
          <input
            type="tel"
            value={form.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="10 digit phone"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Email *</span>
          <input
            type="email"
            value={form.email ?? ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="contact@example.com"
            required
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm text-gray-300">Address *</span>
          <textarea
            value={form.address ?? ""}
            onChange={(e) => handleChange("address", e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Full business address"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">GST Number (optional)</span>
          <input
            type="text"
            value={form.gstNumber ?? ""}
            onChange={(e) => handleChange("gstNumber", e.target.value)}
            className="mt-1 w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="GSTIN"
          />
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading || paymentProcessing}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black rounded-full px-5 py-2 font-semibold shadow-md"
        >
          <Save className="w-4 h-4" /> {loading ? "Saving..." : submitLabel}
        </button>

        <button
          type="button"
          onClick={handleSimulatedPayment}
          disabled={paymentProcessing || loading}
          className="inline-flex items-center gap-2 border border-amber-400 text-amber-400 rounded-full px-5 py-2 font-semibold hover:bg-amber-400/10"
          title="Simulate payment (replace with real checkout)"
        >
          <CreditCard className="w-4 h-4" />
          {paymentProcessing ? "Processing..." : "Pay ₹4,999 (Simulate)"}
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Note: This form currently simulates payment. Replace the simulated payment handler with your Razorpay flow:
        1) call server to create order, 2) open Razorpay checkout, 3) call verification endpoint with signature.
      </p>
    </form>
  );
};

export default BusinessProfileForm;
