import React, { useState, useEffect } from 'react';
import UserSidebar from '../component/UserSidebar';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import { Menu, Wallet, TrendingUp, Calendar, DollarSign, Activity } from 'lucide-react';

const UserRevenue = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    monthlyRevenue: 0,
    totalSales: 0,
    averageOrderValue: 0,
    recentSales: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/sales/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching revenue stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
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
            </div>
            <div className="w-9 h-9 rounded-full bg-[#092A1A] text-[#96D9C0] flex items-center justify-center font-bold shadow-sm">
              U
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-6">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0A2E1A] tracking-tight flex items-center gap-3">
              <Wallet size={26} className="text-[#5C8D73]" />
              Revenue Overview
            </h1>
            <p className="text-gray-500 text-sm mt-1">Track your sales performance and earnings</p>
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
                <h2 className="text-3xl font-extrabold text-white">${stats.monthlyRevenue.toLocaleString()}</h2>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <TrendingUp size={20} className="text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Total Sales</p>
                <h2 className="text-3xl font-extrabold text-[#092A1A]">{stats.totalSales}</h2>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                   <Activity size={20} className="text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">Average Order Value</p>
                <h2 className="text-3xl font-extrabold text-[#092A1A]">
                  ${stats.averageOrderValue.toLocaleString()}
                </h2>
              </div>
            </div>
          </div>

          {/* Recent Sales Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#092A1A]">Recent Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
                  ) : stats.recentSales.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-500 text-sm">
                        No transactions recorded yet.
                      </td>
                    </tr>
                  ) : (
                    stats.recentSales.map((sale) => (
                      <tr key={sale._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                          {new Date(sale.date).toLocaleDateString()} {new Date(sale.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-[#092A1A]">
                          {sale.productName}
                        </td>
                        <td className="px-6 py-4 text-sm font-extrabold text-[#092A1A] text-right">
                          ${sale.price.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRevenue;
