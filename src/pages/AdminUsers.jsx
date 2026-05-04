import React, { useState, useEffect } from 'react';
import AdminSidebar from '../component/AdminSidebar';
import { Menu, Users, Search, Mail, Shield, MoreVertical, Trash2, Edit, ChevronRight, UserCircle } from 'lucide-react';
import axios from 'axios';

const AdminUsers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend-uma6.onrender.com/api/admin/allusers', {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please ensure you have administrative privileges.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    (user.firstName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.lastName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h2 className="text-sm font-bold text-[#092A1A] hidden md:block uppercase tracking-wider">User Management</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white border border-gray-200 rounded-full pl-10 pr-4 py-1.5 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-[#96D9C0] transition-all"
                />
              </div>
              <div className="w-9 h-9 rounded-full bg-[#092A1A] text-[#96D9C0] flex items-center justify-center font-bold shadow-sm">
                A
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-8 max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A2E1A] tracking-tight flex items-center gap-3">
                <Users size={28} className="text-[#5C8D73]" />
                User Directory
              </h1>
              <p className="text-gray-500 text-sm mt-1">Manage and monitor all registered accounts in the system.</p>
            </div>
            <button className="bg-[#092A1A] text-[#96D9C0] px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#0d3d22] transition-all flex items-center justify-center gap-2">
              <Users size={18} /> Export Users
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-xl">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#092A1A]"></div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading  Users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">User</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Role</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Contact</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#092A1A] text-[#96D9C0] flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                                {(user.firstName || 'U').charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-[#092A1A]">{user.firstName} {user.lastName}</div>
                                <div className="text-[11px] text-gray-400 font-medium">ID: {user._id.substring(user._id.length - 8)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                              user.role === 'admin' 
                              ? 'bg-red-50 text-red-600 border-red-100' 
                              : 'bg-green-50 text-green-600 border-green-100'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                <Mail size={12} className="text-gray-400" /> {user.email}
                              </div>
                              {user.phone && (
                                <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                                  <Shield size={12} className="text-gray-400" /> {user.phone}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                              <span className="text-xs font-semibold text-gray-600">Active</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-gray-400 hover:text-[#092A1A] hover:bg-white rounded-lg shadow-none hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                                <Edit size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg shadow-none hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                                <Trash2 size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600">
                                <ChevronRight size={18} />
                              </button>
                            </div>
                            <button className="p-2 text-gray-400 lg:group-hover:hidden">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <UserCircle size={48} className="text-gray-200" />
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No users found</p>
                            <p className="text-xs text-gray-400">Try adjusting your search criteria.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Showing {filteredUsers.length} of {users.length} total members
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 disabled:opacity-50" disabled>Previous</button>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
