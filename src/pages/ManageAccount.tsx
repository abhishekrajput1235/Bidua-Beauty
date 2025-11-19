// src/pages/ManageAccount.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  CreditCard,
  MapPin,
  MonitorSmartphone,
  Camera,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

/**
 * Ecommerce-style Manage Account page
 * - compact layout
 * - bold labels, tight cards
 * - clear dividers and CTA emphasis
 * - keeps existing authStore usage
 */

const ManageAccount = () => {
  const { user, updateProfile, logout } = useAuthStore(); // adapt based on your store
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [avatar, setAvatar] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loginLogs, setLoginLogs] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
    }
    // demo data for compact view (replace with API)
    setAddresses([
      { id: 1, name: "Home", short: "123 MG Road, Jaipur, Rajasthan" },
    ]);
    setPayments([
      { id: 1, type: "Card", label: "Visa •••• 4242" },
    ]);
    setLoginLogs([
      { id: 1, device: "Chrome — Windows", ip: "103.22.121.44", location: "Delhi, IN", time: "3:15 PM" },
      { id: 2, device: "Safari — iPhone", ip: "102.11.92.21", location: "Jaipur, IN", time: "Yesterday, 10:10 AM" },
    ]);
  }, [user]);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSaveInfo = () => {
    // replace with real update call
    console.log("Save profile", form);
    if (updateProfile) updateProfile(form);
    alert("Profile saved (demo). Hook up API to persist.");
  };

  const handleUploadAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
    // TODO: upload to server & persist
  };

  const handleAddAddress = () => {
    const id = Date.now();
    setAddresses((a) => [{ id, name: "New", short: "New address..." }, ...a]);
  };

  const handleAddPayment = () => {
    const id = Date.now();
    setPayments((p) => [{ id, type: "UPI", label: "UPI • myupi@bank" }, ...p]);
  };

  const handleDeleteAccount = () => {
    // wire backend delete
    console.log("DELETE ACCOUNT");
    setConfirmDelete(false);
    alert("Account deleted (demo). Replace with real API call.");
    logout?.();
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Top row */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/user-profile" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Back to Profile</span>
          </Link>

          <div className="text-right">
            <div className="text-xs text-gray-400">Signed in as</div>
            <div className="text-sm font-semibold">{user?.email ?? "—"}</div>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-2">Manage Account</h1>
        <p className="text-sm text-gray-400 mb-6">Update details, security, addresses and payments.</p>

        {/* Compact two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Left column - avatar + quick */}
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-lg bg-gray-800 overflow-hidden flex items-center justify-center">
                  {avatar ? (
                    <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">{form.name || user?.name || "User"}</div>
                  <div className="text-xs text-gray-400">{form.email || user?.email}</div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <label className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-amber-400 text-black rounded-full text-sm font-semibold cursor-pointer hover:bg-amber-500 transition">
                  <Camera className="w-4 h-4" /> Change
                  <input type="file" className="hidden" onChange={handleUploadAvatar} />
                </label>
                <button
                  onClick={() => setAvatar(null)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 hover:bg-gray-800/60"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-2">Security</div>
              <div className="flex flex-col gap-2">
                <button onClick={() => setShowPwd((s) => !s)} className="text-sm text-gray-200 text-left">
                  {showPwd ? "Hide password fields" : "Show password fields"}
                </button>
                <button onClick={() => setConfirmDelete(true)} className="text-sm text-red-500 text-left">
                  Delete account
                </button>
              </div>
            </div>
          </div>

          {/* Middle column - main form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Personal Info Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-400">Profile</div>
                  <div className="text-lg font-bold text-white">Personal Information</div>
                </div>
                <div className="text-xs text-gray-400">Compact</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="bg-gray-800/60 border border-gray-700 rounded-md px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-amber-400/30"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="bg-gray-800/60 border border-gray-700 rounded-md px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-amber-400/30"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="bg-gray-800/60 border border-gray-700 rounded-md px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-amber-400/30"
                />
              </div>

              <div className="flex items-center gap-2 mt-3">
                <button onClick={handleSaveInfo} className="px-4 py-2 bg-amber-400 text-black rounded-full text-sm font-semibold hover:bg-amber-500">
                  Save
                </button>
                <button onClick={() => setForm({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" })} className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300">
                  Reset
                </button>
              </div>
            </div>

            {/* Password Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-400">Security</div>
                  <div className="text-lg font-bold text-white">Change Password</div>
                </div>
                <div className="text-xs text-gray-400">Last changed: —</div>
              </div>

              {showPwd ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <PasswordField placeholder="Current password" show={showPwd} toggle={() => setShowPwd(false)} />
                  <PasswordField placeholder="New password" show={showPwd} toggle={() => setShowPwd(false)} />
                  <PasswordField placeholder="Confirm password" show={showPwd} toggle={() => setShowPwd(false)} />
                </div>
              ) : (
                <div className="text-sm text-gray-400">Password is hidden. Click "Show password fields" to change it.</div>
              )}

              <div className="flex items-center gap-2 mt-3">
                <button className="px-4 py-2 bg-amber-400 text-black rounded-full text-sm font-semibold hover:bg-amber-500">Update</button>
              </div>
            </div>

            {/* Addresses + Payments small cards row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Addresses */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-white">Saved Addresses</div>
                  <button onClick={handleAddAddress} className="text-sm text-amber-400 flex items-center gap-1">
                    <Plus className="w-4 h-4"/> Add
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="text-sm text-gray-400">No saved addresses</div>
                ) : (
                  addresses.map((a) => (
                    <div key={a.id} className="flex items-start justify-between py-2 border-t border-gray-800">
                      <div>
                        <div className="text-sm font-medium text-white">{a.name}</div>
                        <div className="text-xs text-gray-400">{a.short}</div>
                      </div>
                      <button className="text-xs text-red-400">Remove</button>
                    </div>
                  ))
                )}
              </div>

              {/* Payments */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-white">Payment Methods</div>
                  <button onClick={handleAddPayment} className="text-sm text-amber-400 flex items-center gap-1">
                    <Plus className="w-4 h-4"/> Add
                  </button>
                </div>

                {payments.length === 0 ? (
                  <div className="text-sm text-gray-400">No saved payment methods</div>
                ) : (
                  payments.map((p) => (
                    <div key={p.id} className="flex items-start justify-between py-2 border-t border-gray-800">
                      <div>
                        <div className="text-sm font-medium text-white">{p.type}</div>
                        <div className="text-xs text-gray-400">{p.label}</div>
                      </div>
                      <button className="text-xs text-red-400">Remove</button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Login Activity compact */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-white">Recent Logins</div>
                <div className="text-xs text-gray-400">Showing last 5</div>
              </div>

              <div className="space-y-2">
                {loginLogs.map((l) => (
                  <div key={l.id} className="flex items-center gap-3 py-2 border-t border-gray-800">
                    <MonitorSmartphone className="w-5 h-5 text-amber-400" />
                    <div className="flex-1 text-sm">
                      <div className="text-white font-medium">{l.device}</div>
                      <div className="text-xs text-gray-400">IP: {l.ip} • {l.location}</div>
                    </div>
                    <div className="text-xs text-gray-400">{l.time}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Danger / delete */}
        <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-red-400 flex items-center gap-2"><Trash2 className="w-4 h-4"/> Delete Account</div>
              <div className="text-xs text-gray-400">Permanent removal of your account and data.</div>
            </div>
            <div>
              <button onClick={() => setConfirmDelete(true)} className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>

        {/* Confirm Delete Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={() => setConfirmDelete(false)} />
            <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold text-white mb-2">Confirm Delete</h3>
              <p className="text-sm text-gray-400 mb-4">This will permanently delete your account. This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setConfirmDelete(false)} className="px-3 py-2 rounded-md text-sm text-gray-300 bg-gray-800">Cancel</button>
                <button onClick={handleDeleteAccount} className="px-3 py-2 rounded-md text-sm bg-red-600 text-white">Delete</button>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center text-xs text-gray-500 mt-6">© {new Date().getFullYear()} Your Company</footer>
      </div>
    </div>
  );
};

/* small helper component */
const PasswordField = ({ placeholder = "Password", show = false, toggle = () => {} }) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      placeholder={placeholder}
      className="w-full bg-gray-800/60 border border-gray-700 rounded-md px-3 py-2 text-sm text-white outline-none"
    />
    <button onClick={toggle} className="absolute right-2 top-2 text-gray-400">
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  </div>
);

export default ManageAccount;
