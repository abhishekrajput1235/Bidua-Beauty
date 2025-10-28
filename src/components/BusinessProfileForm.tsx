import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Save, CreditCard, X } from "lucide-react";
import { useBusinessProfileStore, BusinessProfile } from "../store/b2bProfile";

type Props = {
  initialData?: BusinessProfile;
  onCancel?: () => void;
  onSubmit: (data: Partial<BusinessProfile>) => void;
  onPaymentSubmit: () => void;
  submitLabel?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

const BusinessProfileForm: React.FC<Props> = ({
  initialData = {} as BusinessProfile,
  onCancel,
  onSubmit,
  onPaymentSubmit,
  submitLabel = "Save Profile",
}) => {
  const {
    loading,
    error,
    successMessage,
    resetStatus,
  } = useBusinessProfileStore();

  const [form, setForm] = useState<Partial<BusinessProfile>>({
    businessName: initialData.businessName ?? "",
    ownerName: initialData.ownerName ?? "",
    phone: initialData.phone ?? "",
    email: initialData.email ?? "",
    address: initialData.address ?? "",
    gstNumber: initialData.gstNumber ?? "",
  });

  useEffect(() => {
    if (initialData._id) {
      setForm({
        businessName: initialData.businessName ?? "",
        ownerName: initialData.ownerName ?? "",
        phone: initialData.phone ?? "",
        email: initialData.email ?? "",
        address: initialData.address ?? "",
        gstNumber: initialData.gstNumber ?? "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      resetStatus();
    }
    if (error) {
      toast.error(error);
      resetStatus();
    }
  }, [successMessage, error, resetStatus]);

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
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    onSubmit(form);
  };

  const handlePayment = async () => {
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }
    onSubmit(form);
    onPaymentSubmit();
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-gradient-to-br from-gray-900/30 to-black/40 border border-gray-700/40 rounded-2xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Business Profile</h3>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Input fields remain the same, just ensure they use the local `form` state */}
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
        {!initialData._id && (
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black rounded-full px-5 py-2 font-semibold shadow-md"
          >
            <Save className="w-4 h-4" /> {loading ? "Saving..." : submitLabel}
          </button>
        )}

        {initialData._id ? (
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black rounded-full px-5 py-2 font-semibold shadow-md"
          >
            <Save className="w-4 h-4" /> {loading ? "Updating..." : "Update Profile"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className="inline-flex items-center gap-2 border border-amber-400 text-amber-400 rounded-full px-5 py-2 font-semibold hover:bg-amber-400/10"
          >
            <CreditCard className="w-4 h-4" />
            {loading ? "Processing..." : "Join & Pay ₹4,999"}
          </button>
        )}
      </div>
    </form>
  );
};

export default BusinessProfileForm;

// Add Razorpay script to your index.html head:
// <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

// Also, declare Razorpay on the window object in a .d.ts file (e.g., vite-env.d.ts)
// interface Window {
//   Razorpay: any;
// }