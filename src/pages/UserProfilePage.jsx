import React, { useState, useEffect } from 'react';
import UserSidebar from '../component/UserSidebar';
import { Menu, UserCircle, Mail, Phone, MapPin, Calendar, Shield, Edit3, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const UserProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: 'Not provided',
    address: 'Not provided',
    role: 'User',
    joinedDate: 'January 2024' // Placeholder
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
           let token = localStorage.getItem('token');
           
        let res = await axios.get(`${API_BASE_URL}/profile` ,{
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        if (res.status === 200) {
          console.log(res.data.user);
          const userData = res.data.user;
          setUser(prev => ({
            ...prev,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
             role: userData.role || '',
            phone: userData.phone || 'Not provided',
            address: userData.address || 'Not provided',
           
          }));
        }
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
              <button 
                onClick={() => navigate(-1)}
                className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#092A1A] transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#092A1A] text-[#96D9C0] flex items-center justify-center font-bold shadow-sm">
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-8 max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#092A1A] text-[#96D9C0] flex items-center justify-center text-3xl md:text-4xl font-bold shadow-xl">
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-[#0A2E1A] tracking-tight">
                  {user.firstName} {user.lastName}
                </h1>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#96D9C0]/30 text-[#092A1A] text-[11px] font-bold uppercase tracking-wider">
                    {user.role}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <Calendar size={14} /> Joined {user.joinedDate}
                  </span>
                </div>
              </div>
            </div>
            <Link 
              to="/user/editprofile"
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-[#092A1A] px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all hover:border-[#96D9C0] group"
            >
              <Edit3 size={18} className="text-gray-400 group-hover:text-[#5C8D73]" /> Edit Profile
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#092A1A]"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#0A2E1A] mb-6 flex items-center gap-2">
                    <UserCircle size={20} className="text-[#5C8D73]" /> Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                    <InfoItem label="First Name" value={user.firstName} />
                    <InfoItem label="Last Name" value={user.lastName} />
                    <InfoItem label="Email Address" value={user.email} icon={<Mail size={16} />} />
                    <InfoItem label="Phone Number" value={user.phone} icon={<Phone size={16} />} />
                      <InfoItem label="Role" value={user.role} />
                      <InfoItem label="Residential Address" value={user.address} icon={<MapPin size={16} />} />

                   
                  </div>

                </div>

                <div className="bg-[#092A1A] rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
                   <Shield size={120} className="absolute -right-8 -bottom-8 opacity-10" />
                   <div className="relative z-10">
                     <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-[#96D9C0]">
                       <Shield size={20} /> Security Status
                     </h3>
                     <p className="text-white/70 text-sm mb-6 max-w-md">Your account is currently protected with AES-256 institutional-grade encryption.</p>
                     <div className="flex flex-wrap gap-4">
                       <SecurityTag label="Account Verified" />
                       <SecurityTag label="Session Encrypted" />
                       <SecurityTag label="ISO 27001 Compliant" />
                     </div>
                   </div>
                </div>
              </div>
              </div>
              

              
           

              
        
        
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, icon }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
      {icon} {label}
    </label>
    <p className="text-[#092A1A] font-semibold text-base">{value || '---'}</p>
  </div>
);

const SecurityTag = ({ label }) => (
  <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#96D9C0]">
    {label}
  </div>
);

const StatItem = ({ label, value, color = "text-[#0A2E1A]" }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
    <span className="text-xs font-medium text-gray-500">{label}</span>
    <span className={`text-sm font-bold ${color}`}>{value}</span>
  </div>
);

const QuickLink = ({ to, label, className = "" }) => (
  <Link 
    to={to} 
    className={`px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 ${className}`}
  >
    {label}
  </Link>
);

export default UserProfilePage;
