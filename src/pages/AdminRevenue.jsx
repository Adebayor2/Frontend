import React, { useState, useEffect } from 'react';
import AdminSidebar from '../component/AdminSidebar';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { Menu, Wallet, TrendingUp, Calendar, DollarSign, Activity, Users, ArrowUpRight } from 'lucide-react';

const AdminRevenue = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    monthlyRevenue: 0,
    totalSales: 0,
    totalRevenue: 0,
    revenuePerUser: [],
    recentSales: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/sales/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching admin revenue stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#E6EBE8] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#092A1A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#092A1A] font-bold animate-pulse uppercase tracking-widest text-xs">Generating Financial Report...</p>
        </div>
      </div>
    );
  }

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
            </div>
            <div className="w-9 h-9 rounded-full bg-[#092A1A] text-[#96D9C0] flex items-center justify-center font-bold shadow-sm">
              A
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-6">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A2E1A] tracking-tight flex items-center gap-3">
              <Wallet size={26} className="text-[#5C8D73]" />
              Global Revenue Overview
            </h1>
            <p className="text-gray-500 text-sm mt-1">Institutional-grade financial analytics across all sales personnel</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#092A1A] rounded-2xl p-6 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                   <DollarSign size={20} className="text-[#96D9C0]" />
                </div>
                <span className="text-xs font-bold text-[#96D9C0] bg-white/10 px-2 py-1 rounded-full flex items-center gap-1">
                  <Calendar size={12} /> This Month
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-300 mb-1">Monthly Revenue</p>
                <h2 className="text-3xl font-extrabold text-white">${(stats?.monthlyRevenue || 0).toLocaleString()}</h2>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp size={20} className="text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Total Lifetime Revenue</p>
                <h2 className="text-3xl font-extrabold text-[#092A1A]">${(stats?.totalRevenue || 0).toLocaleString()}</h2>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                   <Activity size={20} className="text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Total Sales Count</p>
                <h2 className="text-3xl font-extrabold text-[#092A1A]">
                  {(stats?.totalSales || 0).toLocaleString()}
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Breakdown */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-[#092A1A] flex items-center gap-2">
                    <Users size={18} className="text-[#5C8D73]" />
                    Revenue by User
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Sales</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {(stats?.revenuePerUser || []).length === 0 ? (
                        <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No user data available.</td></tr>
                      ) : (
                        [...(stats?.revenuePerUser || [])].sort((a, b) => b.revenue - a.revenue).map((user, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-[#092A1A]">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm font-bold text-[#092A1A]">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                              {user?.salesCount || 0} transactions
                            </td>
                            <td className="px-6 py-4 text-sm font-extrabold text-[#092A1A] text-right">
                              ${(user?.revenue || 0).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Global Activity */}
            <div className="space-y-6">
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="text-sm font-bold text-[#092A1A] uppercase tracking-wider">Recent Activity</h3>
                </div>
                <div className="p-6 space-y-6">
                  {(stats?.recentSales || []).length === 0 ? (
                    <p className="text-xs text-gray-400 text-center">No recent activity.</p>
                  ) : (
                    (stats?.recentSales || []).map((sale, idx) => (
                      <div key={idx} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="p-2 bg-[#E6EBE8] rounded-lg">
                          <ArrowUpRight size={14} className="text-[#5C8D73]" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-[#092A1A]">
                            {sale?.user?.firstName || 'User'} sold {sale?.productName || 'Product'}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                            {sale?.date ? new Date(sale.date).toLocaleDateString() : 'Unknown Date'} • ${(sale?.price || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;
