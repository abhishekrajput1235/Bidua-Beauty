// import React, { useState } from 'react';
// import { X, User, Mail, Phone, MapPin, Save, Plus, Trash2, Star } from 'lucide-react';

// interface Address {
//   _id?: string;
//   fullName: string;
//   phone: string;
//   street: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
//   isDefault: boolean;
// }

// interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   address: Address[];
// }

// interface EditProfileModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   user: UserProfile;
//   onSave: (updatedUser: UserProfile) => void;
// }

// const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, onSave }) => {
//   const [formData, setFormData] = useState<UserProfile>(user);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   if (!isOpen) return null;

//   const handleInputChange = (field: keyof UserProfile, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleAddressChange = (index: number, field: keyof Address, value: string | boolean) => {
//     const updatedAddresses = [...formData.address];
//     updatedAddresses[index] = {
//       ...updatedAddresses[index],
//       [field]: value
//     };
//     setFormData(prev => ({
//       ...prev,
//       address: updatedAddresses
//     }));
//   };

//   const handleAddAddress = () => {
//     const newAddress: Address = {
//       fullName: formData.name,
//       phone: formData.phone,
//       street: '',
//       city: '',
//       state: '',
//       postalCode: '',
//       country: 'India',
//       isDefault: formData.address.length === 0
//     };
//     setFormData(prev => ({
//       ...prev,
//       address: [...prev.address, newAddress]
//     }));
//   };

//   const handleRemoveAddress = (index: number) => {
//     const updatedAddresses = formData.address.filter((_, i) => i !== index);
//     if (updatedAddresses.length > 0 && formData.address[index].isDefault) {
//       updatedAddresses[0].isDefault = true;
//     }
//     setFormData(prev => ({
//       ...prev,
//       address: updatedAddresses
//     }));
//   };

//   const handleSetDefaultAddress = (index: number) => {
//     const updatedAddresses = formData.address.map((addr, i) => ({
//       ...addr,
//       isDefault: i === index
//     }));
//     setFormData(prev => ({
//       ...prev,
//       address: updatedAddresses
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await onSave(formData);
//       onClose();
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
//       <div
//         className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700 shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-6 flex items-center justify-between backdrop-blur-sm z-10">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
//               <User className="w-6 h-6 text-amber-500" />
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
//               <p className="text-sm text-gray-400">Update your personal information</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-400" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)]">
//           <div className="p-6 space-y-6">
//             <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
//               <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//                 <User className="w-5 h-5 text-amber-500" />
//                 Personal Information
//               </h4>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => handleInputChange('name', e.target.value)}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Email Address <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => handleInputChange('email', e.target.value)}
//                       className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                       placeholder="Enter your email"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Phone Number <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//                     <input
//                       type="tel"
//                       value={formData.phone}
//                       onChange={(e) => handleInputChange('phone', e.target.value)}
//                       className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                       placeholder="Enter your phone number"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Role
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.role}
//                     className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-400 cursor-not-allowed"
//                     disabled
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
//               <div className="flex items-center justify-between mb-4">
//                 <h4 className="text-lg font-semibold text-white flex items-center gap-2">
//                   <MapPin className="w-5 h-5 text-amber-500" />
//                   Addresses
//                 </h4>
//                 <button
//                   type="button"
//                   onClick={handleAddAddress}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors text-sm"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Address
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 {formData.address.map((address, index) => (
//                   <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 relative">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm font-medium text-gray-400">Address {index + 1}</span>
//                         {address.isDefault && (
//                           <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs font-medium border border-amber-500/30">
//                             <Star className="w-3 h-3 fill-amber-500" />
//                             Default
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {!address.isDefault && (
//                           <button
//                             type="button"
//                             onClick={() => handleSetDefaultAddress(index)}
//                             className="text-xs text-amber-500 hover:text-amber-400 transition-colors"
//                           >
//                             Set as default
//                           </button>
//                         )}
//                         {formData.address.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveAddress(index)}
//                             className="p-1 hover:bg-red-500/20 rounded-lg transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4 text-red-500" />
//                           </button>
//                         )}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
//                         <input
//                           type="text"
//                           value={address.fullName}
//                           onChange={(e) => handleAddressChange(index, 'fullName', e.target.value)}
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                           placeholder="Full name"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-xs font-medium text-gray-400 mb-1">Phone</label>
//                         <input
//                           type="tel"
//                           value={address.phone}
//                           onChange={(e) => handleAddressChange(index, 'phone', e.target.value)}
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                           placeholder="Phone number"
//                           required
//                         />
//                       </div>

//                       <div className="md:col-span-2">
//                         <label className="block text-xs font-medium text-gray-400 mb-1">Street Address</label>
//                         <input
//                           type="text"
//                           value={address.street}
//                           onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                           placeholder="Street address"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-xs font-medium text-gray-400 mb-1">City</label>
//                         <input
//                           type="text"
//                           value={address.city}
//                           onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                           placeholder="City"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-xs font-medium text-gray-400 mb-1">State</label>
//                         <input
//                           type="text"
//                           value={address.state}
//                           onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                           placeholder="State"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-xs font-medium text-gray-400 mb-1">Postal Code</label>
//                         <input
//                           type="text"
//                           value={address.postalCode}
//                           onChange={(e) => handleAddressChange(index, 'postalCode', e.target.value)}
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                           placeholder="Postal code"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-xs font-medium text-gray-400 mb-1">Country</label>
//                         <input
//                           type="text"
//                           value={address.country}
//                           onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
//                           placeholder="Country"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {formData.address.length === 0 && (
//                   <div className="text-center py-8 text-gray-400">
//                     <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                     <p>No addresses added yet</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="sticky bottom-0 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 p-6 flex items-center justify-end gap-3 backdrop-blur-sm">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-500/50"
//             >
//               <Save className="w-5 h-5" />
//               {isSubmitting ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;


import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Save, Plus, Trash2, Star } from 'lucide-react';

interface Address {
  _id?: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
  address: Address[];
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  // NOTE: accept Partial<UserProfile> because we'll intentionally omit role when saving
  onSave: (updatedUser: Partial<UserProfile>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user, onSave }) => {
  // initialize formData from user prop; keep role in state for display but will not be sent
  const [formData, setFormData] = useState<UserProfile>({
    ...user,
  } as UserProfile);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // keep local state in sync if prop user changes
  useEffect(() => {
    setFormData({ ...user } as UserProfile);
  }, [user]);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (index: number, field: keyof Address, value: string | boolean) => {
    const updatedAddresses = [...formData.address];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      address: updatedAddresses
    }));
  };

  const handleAddAddress = () => {
    const newAddress: Address = {
      fullName: formData.name,
      phone: formData.phone,
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: formData.address.length === 0
    };
    setFormData(prev => ({
      ...prev,
      address: [...prev.address, newAddress]
    }));
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = formData.address.filter((_, i) => i !== index);
    // if removed address was default, make first one default
    if (updatedAddresses.length > 0 && formData.address[index]?.isDefault) {
      updatedAddresses[0].isDefault = true;
    }
    setFormData(prev => ({
      ...prev,
      address: updatedAddresses
    }));
  };

  const handleSetDefaultAddress = (index: number) => {
    const updatedAddresses = formData.address.map((addr, i) => ({
      ...addr,
      isDefault: i === index
    }));
    setFormData(prev => ({
      ...prev,
      address: updatedAddresses
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Create payload but explicitly exclude role so it never gets sent to backend
      const { role, ...rest } = formData as any;
      const payload: Partial<UserProfile> = { ...rest };
      // If you want to ensure id is not sent either, delete payload.id
      // delete payload.id;

      await onSave(payload);
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-6 flex items-center justify-between backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
              <User className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
              <p className="text-sm text-gray-400">Update your personal information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-6">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-500" />
                Personal Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  {/* role is visible but disabled so user cannot change it */}
                  <input
                    type="text"
                    value={formData.role || ''}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-400 cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  Addresses
                </h4>
                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Address
                </button>
              </div>

              <div className="space-y-4">
                {formData.address.map((address, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-400">Address {index + 1}</span>
                        {address.isDefault && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs font-medium border border-amber-500/30">
                            <Star className="w-3 h-3 fill-amber-500" />
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {!address.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultAddress(index)}
                            className="text-xs text-amber-500 hover:text-amber-400 transition-colors"
                          >
                            Set as default
                          </button>
                        )}
                        {formData.address.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveAddress(index)}
                            className="p-1 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={address.fullName}
                          onChange={(e) => handleAddressChange(index, 'fullName', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                          placeholder="Full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={address.phone}
                          onChange={(e) => handleAddressChange(index, 'phone', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                          placeholder="Phone number"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-400 mb-1">Street Address</label>
                        <input
                          type="text"
                          value={address.street}
                          onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                          placeholder="Street address"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">City</label>
                        <input
                          type="text"
                          value={address.city}
                          onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                          placeholder="City"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">State</label>
                        <input
                          type="text"
                          value={address.state}
                          onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                          placeholder="State"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Postal Code</label>
                        <input
                          type="text"
                          value={address.postalCode}
                          onChange={(e) => handleAddressChange(index, 'postalCode', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                          placeholder="Postal code"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Country</label>
                        <input
                          type="text"
                          value={address.country}
                          onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                          placeholder="Country"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.address.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No addresses added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 p-6 flex items-center justify-end gap-3 backdrop-blur-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-500/50"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
