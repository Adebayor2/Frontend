import React, { useState, useEffect } from 'react';
import AdminSidebar from '../component/AdminSidebar';
import { Menu, UserCircle, Mail, Phone, MapPin, Save, Shield, ArrowLeft, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEditProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    role: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem('token');
        let res = await axios.get('http://localhost:5255/api/profile', {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        if (res.status === 200) {
          const userData = res.data.user;
          setProfileData(prev => ({
            ...prev,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: userData.address || '',
            role: userData.role || ''
          }));
        }
      } catch (error) {
        console.error("Failed to fetch admin profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let token = localStorage.getItem('token');
      const response = await axios.patch('http://localhost:5255/api/updateuser/profile', profileData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });
      if (response.status === 200) {
        alert('Admin profile updated successfully!');
        navigate('/admin/profilePage');
      }
    } catch (error) {
      console.error('Error updating admin profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#E6EBE8] font-sans">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 w-full overflow-hidden">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-[#E6EBE8]/90 backdrop-blur-sm border-b border-gray-200/60 px-4 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-[#092A1A]"
              >
                <Menu size={20} />
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#092A1A] transition-colors"
              >
                <ArrowLeft size={16} /> Back to Profile
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#092A1A] text-[#96D9C0] flex items-center justify-center font-bold shadow-sm">
                {profileData.firstName ? profileData.firstName.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A2E1A] tracking-tight flex items-center gap-3">
              <Shield size={28} className="text-[#5C8D73]" />
              Edit Admin Profile
            </h1>
            <p className="text-gray-500 text-sm mt-1">Update your administrative credentials and personal details</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092A1A]"></div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Profile Cover & Avatar */}
              <div className="bg-gradient-to-r from-[#092A1A] to-[#1a4d35] h-32 relative">
                <div className="absolute -bottom-12 left-8 group">
                  <div className="w-24 h-24 rounded-2xl border-4 border-white bg-[#96D9C0] flex items-center justify-center text-4xl font-bold text-[#092A1A] shadow-lg relative overflow-hidden">
                    {profileData.firstName ? profileData.firstName.charAt(0).toUpperCase() : 'A'}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Camera size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-16 px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Form Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-bold text-[#092A1A] uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">Personal Information</h3>
                    </div>

                    {/* First Name */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                      <div className="relative">
                        <UserCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                      <div className="relative">
                        <UserCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 mt-4">
                      <h3 className="text-sm font-bold text-[#092A1A] uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">Contact & Role</h3>
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="email" 
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          placeholder="admin@example.com"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          placeholder="+234"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Role (Read Only for safety, or selectable if super admin) */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Administrative Role</label>
                      <div className="relative">
                        <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          name="role"
                          value={profileData.role}
                          readOnly
                          className="w-full bg-gray-100 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-bold outline-none cursor-not-allowed"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 uppercase">System Lock</span>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Residential Address</label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          name="address"
                          value={profileData.address}
                          onChange={handleChange}
                          placeholder="Enter Address"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs font-semibold text-gray-400">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      Secure Admin Environment
                    </div>
                    
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <button 
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isSaving}
                        className={`flex-1 sm:flex-none bg-[#092A1A] text-[#96D9C0] px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:bg-[#0d3d22] transition-all flex items-center justify-center gap-2 min-w-[160px] ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 active:translate-y-0'}`}
                      >
                        {isSaving ? (
                          <div className="w-5 h-5 border-2 border-[#96D9C0]/30 border-t-[#96D9C0] rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Save size={18} /> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEditProfile;
