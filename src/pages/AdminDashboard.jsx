import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';
import AdminSidebar from '../component/AdminSidebar';
import { 
  Menu,
  Search, 
  Package, 
  ClipboardCheck, 
  ShoppingCart, 
  Banknote,
  TrendingUp,
  ShieldCheck,
  Zap,
  AlertCircle,
  AlertTriangle,
  Keyboard,
  Mouse,
  Headphones,
  Sparkles
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    productCount: 0,
    categoryCount: 0,
    totalStock: 0,
    lowStockProducts: []
  });
  const [revenueStats, setRevenueStats] = useState({
    monthlyRevenue: 0,
    totalSales: 0,
    totalRevenue: 0,
    revenuePerUser: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [dashRes, revRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/admin/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_BASE_URL}/sales/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (dashRes.data.stats) setStats(dashRes.data.stats);
        setRevenueStats(revRes.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-[#E6EBE8] font-sans">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8 w-full overflow-hidden">
        
        {/* Top Navigation / Search */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="mr-3 lg:hidden p-2 bg-white rounded-md shadow-sm text-gray-700 border border-gray-200"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center bg-gray-100/80 rounded-lg px-4 py-2 w-full max-w-lg shadow-sm border border-gray-200/50">
            <Search size={18} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search inventory, orders, or suppliers..." 
              className="bg-transparent border-none outline-none text-sm text-gray-700 w-full placeholder-gray-400"
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#0A2E1A] tracking-tight"><span className='text-red-500'>Admin</span> Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm">Real-time overview of your digital gallery.</p>
          </div>
          {stats.lowStockProducts.length > 0 && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-lg flex items-center animate-pulse">
              <AlertCircle size={18} className="mr-2" />
              <span className="text-sm font-bold uppercase tracking-tight">Warning: Low Stock Detected</span>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Card 1: Total Products */}
          <div className="relative overflow-hidden rounded-xl bg-[#96D9C0] text-white p-6 shadow-sm flex flex-col justify-between">
            <Package size={80} className="absolute -bottom-2 -right-2 opacity-20 text-black" />
            <div>
              <div className="inline-flex bg-white/20 p-2 rounded-lg mb-4">
                <Package size={20} className="text-black" />
              </div>
              <p className="text-[10px] font-bold tracking-wider text-black mb-1">TOTAL PRODUCTS</p>
              <h2 className="text-3xl font-bold text-black">{stats.productCount}</h2>
            </div>
            <div className="inline-flex items-center bg-black/20 rounded px-2 py-1 mt-4 max-w-fit">
              <Sparkles size={12} className="mr-1 text-black" />
              <span className="text-xs font-medium text-black">Active inventory</span>
            </div>
          </div>

          {/* Card 2: Total Stock */}
          <div className="relative overflow-hidden rounded-xl bg-[#0A2E1A] text-white p-6 shadow-sm flex flex-col justify-between">
            <ClipboardCheck size={80} className="absolute -bottom-2 -right-2 opacity-20 text-white" />
            <div>
              <div className="inline-flex bg-white/20 p-2 rounded-lg mb-4">
                <ClipboardCheck size={20} className="text-white" />
              </div>
              <p className="text-[10px] font-bold tracking-wider text-green-100 mb-1">TOTAL STOCK</p>
              <h2 className="text-3xl font-bold">{stats.totalStock}</h2>
            </div>
            <div className="inline-flex items-center bg-white/20 rounded px-2 py-1 mt-4 max-w-fit">
              <ShieldCheck size={12} className="mr-1" />
              <span className="text-xs font-medium">Cumulative units</span>
            </div>
          </div>

          {/* Card 3: Monthly Revenue */}
          <div className="relative overflow-hidden rounded-xl bg-[#0A2E1A] text-white p-6 shadow-sm flex flex-col justify-between">
            <Banknote size={80} className="absolute -bottom-2 -right-2 opacity-20 text-white" />
            <div>
              <div className="inline-flex bg-white/20 p-2 rounded-lg mb-4">
                <Banknote size={20} className="text-[#96D9C0]" />
              </div>
              <p className="text-[10px] font-bold tracking-wider text-green-100 mb-1 uppercase">Monthly Revenue</p>
              <h2 className="text-3xl font-bold">${revenueStats.monthlyRevenue.toLocaleString()}</h2>
            </div>
            <div className="inline-flex items-center bg-white/20 rounded px-2 py-1 mt-4 max-w-fit">
              <TrendingUp size={12} className="mr-1 text-[#96D9C0]" />
              <span className="text-xs font-medium">Total earnings</span>
            </div>
          </div>

          {/* Card 4: Low Stock Warning */}
          <div className={`relative overflow-hidden rounded-xl ${stats.lowStockProducts.length > 0 ? 'bg-red-500' : 'bg-[#0A2E1A]'} text-white p-6 shadow-sm flex flex-col justify-between transition-colors duration-500`}>
            <AlertTriangle size={80} className="absolute -bottom-2 -right-2 opacity-20 text-white" />
            <div>
              <div className="inline-flex bg-white/20 p-2 rounded-lg mb-4">
                <AlertTriangle size={20} className="text-white" />
              </div>
              <p className="text-[10px] font-bold tracking-wider text-white mb-1 uppercase">Low Stock</p>
              <h2 className="text-3xl font-bold">{stats.lowStockProducts.length}</h2>
            </div>
            <div className="inline-flex items-center bg-white/20 rounded px-2 py-1 mt-4 max-w-fit">
              <AlertCircle size={12} className="mr-1" />
              <span className="text-xs font-medium">{stats.lowStockProducts.length > 0 ? 'Urgent attention needed' : 'All stock levels healthy'}</span>
            </div>
          </div>

        </div>

        {/* Lower Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Out of Stock Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-gray-800">Critical Items</h3>
                <AlertCircle size={18} className="text-red-500" />
              </div>
              
              <div className="space-y-5">
                {stats.lowStockProducts.filter(p => p.stock === 0).length > 0 ? (
                  stats.lowStockProducts.filter(p => p.stock === 0).map((product, index) => (
                    <div key={index} className="flex items-center">
                      <div className="p-3 bg-red-50 rounded-lg text-red-400 mr-4">
                        <Package size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{product.name}</h4>
                        <p className="text-xs text-red-500 mt-0.5">0 units remaining</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <ShieldCheck size={40} className="mx-auto text-green-200 mb-2" />
                    <p className="text-sm text-gray-400">No items completely out of stock.</p>
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/admin/products')}
              className="w-full text-center cursor-pointer text-blue-600 font-bold text-xs tracking-wider pt-6 mt-4 hover:text-blue-700 uppercase"
            >
              RESTOCK NOW
            </button>
          </div>

          {/* User Performance Breakdown */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-gray-800">Sales Personnel Performance</h3>
              <Users size={18} className="text-blue-500" />
            </div>
            
            <div className="space-y-4">
              {revenueStats.revenuePerUser.length > 0 ? (
                revenueStats.revenuePerUser.sort((a,b) => b.revenue - a.revenue).slice(0, 5).map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E6EBE8] flex items-center justify-center text-[10px] font-bold text-[#092A1A]">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#092A1A]">{user.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{user.salesCount} sales</p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-[#092A1A]">${user.revenue.toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-xs text-gray-400">No sales records found.</p>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => navigate('/admin/revenue')}
              className="w-full text-center cursor-pointer text-blue-600 font-bold text-xs tracking-wider pt-6 mt-4 hover:text-blue-700 uppercase flex items-center justify-center gap-2"
            >
              VIEW FULL FINANCIAL REPORT
              <Sparkles size={12} />
            </button>
          </div>

          {/* Low Stock Alerts Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-gray-800">Low Stock Alerts</h3>
              <AlertTriangle size={18} className="text-amber-500" />
            </div>

            <div className="space-y-4">
              {stats.lowStockProducts.length > 0 ? (
                stats.lowStockProducts.map((product, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold text-gray-700">{product.name}</span>
                      <span className={`text-xs ${product.stock < 5 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>{product.stock} left</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${product.stock < 5 ? 'bg-red-600' : 'bg-amber-400'} rounded-full`} 
                        style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <ShieldCheck size={40} className="mx-auto text-blue-100 mb-2" />
                  <p className="text-sm text-gray-400">All inventory levels are optimal.</p>
                </div>
              )}
            </div>

            {/* Insight Box */}
            {stats.lowStockProducts.length > 0 && (
              <div className="mt-6 bg-[#f4f7fb] border border-blue-100/50 rounded-lg p-4 flex items-start">
                <Sparkles size={16} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  <span className="text-blue-600 font-bold uppercase tracking-wider text-[10px] block mb-1">Inventory Insight</span>
                  Consider re-ordering <span className="font-bold text-gray-800">{stats.lowStockProducts[0].name}</span> today to maintain availability.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
