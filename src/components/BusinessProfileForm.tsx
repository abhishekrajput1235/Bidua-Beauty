import React from "react";
import {
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  FileText,
  CreditCard,
  Smartphone,
  Wallet,
  CheckCircle2,
  PartyPopper,
} from "lucide-react";
import { useBusinessProfileStore } from "../store/b2bProfile";

interface BusinessProfileFormProps {
  onSubmit: (data: any) => void;
}

export default function BusinessProfileForm({ onSubmit }: BusinessProfileFormProps) {
  const { step, formData, setFormData, nextStep, prevStep, goToStep, resetForm } =
    useBusinessProfileStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // phone validation - only 10 digits allowed
    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    setFormData({ [name]: value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    goToStep(4);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Step Header */}
      {step < 4 && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 1 && "Complete Your Business Profile"}
            {step === 2 && "Choose Payment Option"}
            {step === 3 && "Confirm Your Details"}
          </h2>
          <span className="text-sm text-gray-600">Step {step} of 3</span>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <InputField
              icon={<Building className="icon" />}
              label="Business Name *"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
            />

            {/* Owner Name */}
            <InputField
              icon={<User className="icon" />}
              label="Owner Name *"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />

            {/* Phone */}
            <InputField
              icon={<Phone className="icon" />}
              label="Phone Number *"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <InputField
              icon={<Mail className="icon" />}
              label="Email Address *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <TextAreaField
            icon={<MapPin className="icon" />}
            label="Business Address *"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          {/* GST */}
          <InputField
            icon={<FileText className="icon" />}
            label="GST Number (Optional)"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700"
          >
            Next: Payment Options
          </button>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={handleNext} className="space-y-6">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Select Payment Method *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RadioOption
              value="COD"
              label="Cash on Delivery"
              icon={<CreditCard className="w-6 h-6 mr-2 text-gray-500" />}
              checked={formData.paymentMethod === "COD"}
              onChange={() => setFormData({ paymentMethod: "COD", upiId: "" })}
            />
            <RadioOption
              value="UPI"
              label="Pay via UPI"
              icon={<Smartphone className="w-6 h-6 mr-2 text-gray-500" />}
              checked={formData.paymentMethod === "UPI"}
              onChange={() => setFormData({ paymentMethod: "UPI" })}
            />
          </div>

          {formData.paymentMethod === "UPI" && (
            <InputField
              icon={<Wallet className="icon" />}
              label="Enter UPI ID *"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              required
              placeholder="example@upi"
            />
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
            >
              Next: Confirm Details
            </button>
          </div>
        </form>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 border rounded-lg p-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
              Review Your Information
            </h3>
            <ReviewItem label="Business" value={formData.businessName} />
            <ReviewItem label="Owner" value={formData.ownerName} />
            <ReviewItem label="Phone" value={formData.phone} />
            <ReviewItem label="Email" value={formData.email} />
            <ReviewItem label="Address" value={formData.address} />
            {formData.gstNumber && <ReviewItem label="GST" value={formData.gstNumber} />}
            <ReviewItem
              label="Payment"
              value={
                formData.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : `UPI (${formData.upiId})`
              }
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Confirm & Submit
            </button>
          </div>
        </form>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="flex flex-col items-center text-center space-y-4 py-10">
          <PartyPopper className="w-16 h-16 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Registration Successful 🎉
          </h2>
          <p className="text-gray-600 max-w-md">
            Thank you, <strong>{formData.ownerName}</strong>! Your business profile has
            been successfully submitted. We’ll contact you shortly on{" "}
            <strong>{formData.email}</strong>.
          </p>
          <button
            onClick={resetForm}
            className="mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

/* 🔹 Reusable Input Components */
const InputField = ({
  icon,
  label,
  ...props
}: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
      />
    </div>
  </div>
);

const TextAreaField = ({ icon, label, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-3">{icon}</div>
      <textarea
        {...props}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500"
      />
    </div>
  </div>
);

const RadioOption = ({ value, label, icon, checked, onChange }: any) => (
  <label
    className={`flex items-center justify-center border rounded-lg p-4 cursor-pointer transition-all ${
      checked ? "border-rose-500 bg-rose-50" : "hover:border-rose-500"
    }`}
  >
    <input
      type="radio"
      name="paymentMethod"
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    {icon}
    {label}
  </label>
);

const ReviewItem = ({ label, value }: { label: string; value: string }) => (
  <p>
    <strong>{label}: </strong>
    {value}
  </p>
);
