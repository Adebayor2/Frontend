import React, { useState, useEffect } from 'react';
import UserSidebar from '../component/UserSidebar';
import { Menu, UserCircle, Mail, MapPin, Phone, Save, Shield } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const UserEditProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem('token');
        let res = await axios.get(`${API_BASE_URL}/profile`, {
          headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        if (res.status === 200) {
          setProfileData(prev => ({
            ...prev,
            firstName: res.data.user.firstName,
            lastName: res.data.user.lastName,
            email: res.data.user.email,
            role: res.data.user.role
          }));
        }
      } catch (error) {
        console.error("Failed to fetch profile from backend ", error);
        setProfileData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: ''
        });
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

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
        let token = localStorage.getItem('token');
    axios.patch(`${API_BASE_URL}/updateuser/profile`, profileData, { 
      headers:{
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      } })
    .then(response => {
      console.log('Profile updated successfully:', response);
      alert('Profile updated successfully!');
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    });


  };

  return (
    <div className="flex min-h-screen bg-[#E6EBE8] font-sans">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <UserSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

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
            </div>
            <div className="w-9 h-9 rounded-full bg-[#092A1A] text-[#96D9C0] flex items-center justify-center font-bold shadow-sm">
              {profileData.firstName ? profileData.firstName.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A2E1A] tracking-tight flex items-center gap-3">
              <UserCircle size={28} className="text-[#5C8D73]" />
              My Profile
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your personal information and account settings</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#092A1A]"></div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#092A1A] h-32 relative">
                <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-full border-4 border-white bg-[#96D9C0] flex items-center justify-center text-4xl font-bold text-[#092A1A] shadow-md">
                  {profileData.firstName.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="pt-16 px-8 pb-8">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* First Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#092A1A] font-medium outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#092A1A] font-medium outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Mail size={14} /> Email Address
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#092A1A] font-medium outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Phone size={14} /> Phone Number
                      </label>
                      <input 
                        type="text" 
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#092A1A] font-medium outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <MapPin size={14} /> Address
                      </label>
                      <input 
                        type="text" 
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#092A1A] font-medium outline-none focus:ring-2 focus:ring-[#96D9C0] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                      <Shield size={16} className="text-green-500" /> Your connection is secure
                    </div>
                    <button 
                      type="submit"
                      className="bg-[#092A1A] text-[#96D9C0] px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-[#0d3d22] transition-colors flex items-center gap-2"
                    >
                      <Save size={18} /> Save Changes
                    </button>
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

export default UserEditProfile;
