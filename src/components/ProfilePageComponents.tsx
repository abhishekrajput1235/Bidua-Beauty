

import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, Edit, Star } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import { useAuthStore } from "@/store/authStore";

/**
 * ProfilePage — stable Zustand selectors, no render-loop
 *
 * Notes:
 * - Use one selector call per store property to keep snapshots stable.
 * - getProfile() is called only when the component mounts (and only if user isn't already loaded).
 * - localUser is used only as an optimistic/local copy; it's updated when store user changes.
 */

interface Address {
  _id?: string;
  fullName?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  isDefault?: boolean;
}

interface UserProfile {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  address?: Address[];
  b2bOptions?: {
    warehouseStorage?: boolean;
    queueAddress?: string;
    shippingAddress?: string;
  };
}

const ProfilePage: React.FC = () => {
  // --- ✅ Stable selectors: one selector per store value/function ---
  const user = useAuthStore((s) => s.user as UserProfile | null);
  const getProfile = useAuthStore((s) => s.getProfile);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // local optimistic copy — updated only when the store's user changes
  const [localUser, setLocalUser] = useState<UserProfile | null>(user ?? null);

  // Load profile on mount if not loaded.
  // Important: this effect runs once on mount (getProfile stable), and will not create a loop.
  useEffect(() => {
    if (!user && typeof getProfile === "function") {
      // call but do not include `user` in deps to avoid repeated calls; getProfile reference is stable
      getProfile().catch((e: any) => {
        // optional: store should set error, but log for debugging
        // console.error("getProfile error:", e);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProfile]); // <-- only depends on getProfile reference (stable)

  // keep local optimistic user in sync when the store user changes
  useEffect(() => {
    setLocalUser(user ?? null);
  }, [user]);

  const handleSaveProfile = async (updated: UserProfile) => {
    // If store exposes updateProfile, prefer that so store stays source of truth.
    if (typeof updateProfile === "function") {
      try {
        await updateProfile(updated); // assume store will update user
        setIsModalOpen(false);
        return;
      } catch (err) {
        // fallback to optimistic local update if store update fails
        // console.error("updateProfile failed:", err);
        setLocalUser(updated);
        setIsModalOpen(false);
        return;
      }
    }

    // fallback: update local state only
    setLocalUser(updated);
    setIsModalOpen(false);
  };

  const addressList = useMemo(() => localUser?.address ?? [], [localUser]);
  const isWarehouseStorageEnabled = !!localUser?.b2bOptions?.warehouseStorage;

  // Loading / Error / Empty states rendered from store + local state
  if (loading && !localUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (error && !localUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="max-w-lg text-center">
          <p className="text-red-400 mb-4">Failed to load profile</p>
          <pre className="text-xs text-gray-400 whitespace-pre-wrap">{String(error)}</pre>
        </div>
      </div>
    );
  }

  if (!localUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">No profile found</h2>
          <p className="text-gray-400">Please login or create an account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" to-black px-4">
      <div className="container mx-auto max-w-4xl">
    

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden shadow-sm">
          {/* header */}
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-amber-500/30 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-amber-500/30">
                  {localUser.name?.charAt(0)?.toUpperCase() ?? "U"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{localUser.name || "Unnamed"}</h2>
                  <p className="text-amber-400 text-sm font-medium capitalize">{localUser.role || "user"}</p>

                  {/* B2B options */}
                  {/* <div className="mt-2 flex items-center gap-3 text-xs text-gray-200">
                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-gray-900/40 rounded-md border border-gray-700 text-sm">
                      <span className="font-semibold">B2B</span>
                      <span className="text-gray-400 text-xs">Warehouse:</span>
                      <span className={`ml-1 font-medium ${isWarehouseStorageEnabled ? "text-emerald-400" : "text-gray-400"}`}>
                        {isWarehouseStorageEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    {localUser.b2bOptions?.queueAddress && (
                      <div className="inline-flex items-center gap-2 px-2 py-1 bg-gray-900/40 rounded-md border border-gray-700 text-sm text-gray-300">
                        Queue: <span className="font-medium ml-1">{localUser.b2bOptions.queueAddress}</span>
                      </div>
                    )}
                  </div> */}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all hover:shadow-lg"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* body */}
          <div className="p-6">
            {/* Personal Info */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Email Address</p>
                      <p className="text-white font-medium">{localUser.email || "—"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Phone Number</p>
                      <p className="text-white font-medium">{localUser.phone || "—"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                Saved Addresses
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addressList.length === 0 && <div className="text-gray-400">No saved addresses yet.</div>}

                {addressList.map((addr) => (
                  <div
                    key={addr._id ?? `${addr.fullName}-${addr.postalCode}`}
                    className="bg-gray-900/40 rounded-xl p-4 border border-gray-700 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-white">{addr.fullName || "Unnamed"}</h4>
                      {addr.isDefault && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium border border-amber-500/30">
                          <Star className="w-3 h-3" />
                          Default
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-sm text-gray-300">
                      <p>{addr.street || "—"}</p>
                      <p>{addr.city || "—"}, {addr.state || "—"} {addr.postalCode || ""}</p>
                      <p>{addr.country || "—"}</p>
                      {addr.phone && (
                        <p className="flex items-center gap-2 mt-2 text-gray-300">
                          <Phone className="w-4 h-4" />
                          {addr.phone}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit modal */}
        <EditProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={localUser}
          onSave={handleSaveProfile}
        />
      </div>
    </div>
  );
};

export default ProfilePage;


