import React, { useState, useEffect } from 'react';
import AdminSidebar from '../component/AdminSidebar';
import UserSidebar from '../component/UserSidebar';
import { Menu, UserCircle, Mail, Phone, MapPin, Save, Shield, Lock, Eye, EyeOff, Settings as SettingsIcon } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role'));
  
  // Profile State
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (res.status === 200) {
          const userData = res.data.user;
          setProfileData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: userData.address || ''
          });
          setRole(userData.role);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/updateuser/profile`, profileData, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/changepassword`, {
        oldPassword: passwordData.oldPassword,
        password: passwordData.newPassword
      }, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      alert('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error.response?.data?.message || 'Error changing password');
    } finally {
      setIsSaving(false);
    }
  };

  const Sidebar = role === 'admin' ? AdminSidebar : UserSidebar;

  return (
    <div className="flex min-h-screen bg-[#E6EBE8] font-sans">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 w-full overflow-hidden">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-[#E6EBE8]/90 backdrop-blur-sm border-b border-gray-200/60 px-4 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-[#092A1A]"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3">
               <div className="w-9 h-9 rounded-full bg-[#092A1A] text-[#96D9C0] flex items-center justify-center font-bold shadow-sm uppercase">
                {profileData.firstName?.charAt(0) || role?.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A2E1A] tracking-tight flex items-center gap-3">
              <SettingsIcon size={28} className="text-[#5C8D73]" />
              Account Settings
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your profile information and security settings</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 bg-white/50 p-1 rounded-xl w-fit border border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'profile' 
                ? 'bg-[#092A1A] text-[#96D9C0] shadow-md' 
                : 'text-gray-500 hover:text-[#092A1A]'
              }`}
            >
              <UserCircle size={18} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'security' 
                ? 'bg-[#092A1A] text-[#96D9C0] shadow-md' 
                : 'text-gray-500 hover:text-[#092A1A]'
              }`}
            >
              <Lock size={18} />
              Security
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092A1A]"></div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {activeTab === 'profile' ? (
                <div className="p-8">
                  <form onSubmit={updateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                        <div className="relative">
                          <UserCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleProfileChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                        <div className="relative">
                          <UserCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            readOnly
                            className="w-full bg-gray-100 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-500 font-semibold outline-none cursor-not-allowed"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Address</label>
                        <div className="relative">
                          <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="address"
                            value={profileData.address}
                            onChange={handleProfileChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-[#092A1A] text-[#96D9C0] px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:bg-[#0d3d22] transition-all flex items-center gap-2"
                      >
                        {isSaving ? <div className="w-5 h-5 border-2 border-[#96D9C0]/30 border-t-[#96D9C0] rounded-full animate-spin"></div> : <><Save size={18} /> Save Profile</>}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-8">
                  <form onSubmit={changePassword} className="space-y-6 max-w-md">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showOldPassword ? "text" : "password"}
                          name="oldPassword"
                          value={passwordData.oldPassword}
                          onChange={handlePasswordChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#092A1A]"
                        >
                          {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                      <div className="relative">
                        <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#092A1A]"
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                      <div className="relative">
                        <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-sm text-[#092A1A] font-semibold outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#092A1A]"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-[#092A1A] text-[#96D9C0] px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:bg-[#0d3d22] transition-all flex items-center gap-2"
                      >
                        {isSaving ? <div className="w-5 h-5 border-2 border-[#96D9C0]/30 border-t-[#96D9C0] rounded-full animate-spin"></div> : <><Lock size={18} /> Update Password</>}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
