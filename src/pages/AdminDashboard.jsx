import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

     let navigate = useNavigate()
      useEffect(() => {
          let token = localStorage.token
          
          let url = "https://backend-uma6.onrender.com/api/admin/dashboard"
          axios.get(url,{
              headers:{
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              }
          })
          .then((res)=>{
              console.log(res.data);
          })
          .catch((err)=>{
              if(err.response && err.response.status === 401){
                  localStorage.removeItem('token')
                  navigate("/signin")
              }
              console.error("Error:",err.response?err.response.data:err);
          })
      }, [navigate])

   



  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#E6EBE8] font-sans">
      {/* Mobile Overlay */}
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#0A2E1A] tracking-tight"><span className='text-red-500'>Admin</span> Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">Real-time overview of your digital gallery.</p>
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
              <h2 className="text-3xl font-bold text-black">1,482</h2>
            </div>
            <div className="inline-flex items-center bg-black/20 rounded px-2 py-1 mt-4 max-w-fit">
              <TrendingUp size={12} className="mr-1" />
              <span className="text-xs font-medium text-black"  >+12% this month</span>
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
              <h2 className="text-3xl font-bold">8,294</h2>
            </div>
            <div className="inline-flex items-center bg-white/20 rounded px-2 py-1 mt-4 max-w-fit">
              <ShieldCheck size={12} className="mr-1" />
              <span className="text-xs font-medium">Stable availability</span>
            </div>
          </div>

          {/* Card 3: Orders Today */}
          <div className="relative overflow-hidden rounded-xl bg-[#96D9C0] text-white-900 p-6 shadow-sm flex flex-col justify-between">
            <ShoppingCart size={80} className="absolute -bottom-2 -right-2 opacity-10 text-white-900" />
            <div>
              <div className="inline-flex bg-gray-900/10 p-2 rounded-lg mb-4">
                <ShoppingCart size={20} className="text-white-900" />
              </div>
              <p className="text-[10px] font-bold tracking-wider text-white-700 mb-1">ORDERS TODAY</p>
              <h2 className="text-3xl font-bold text-white-900">142</h2>
            </div>
            <div className="inline-flex items-center bg-gray-900/10 rounded px-2 py-1 mt-4 max-w-fit">
              <Zap size={12} className="mr-1" />
              <span className="text-xs font-medium">High traffic peak</span>
            </div>
          </div>

          {/* Card 4: Revenue */}
          <div className="relative overflow-hidden rounded-xl bg-[#0A2E1A] text-white p-6 shadow-sm flex flex-col justify-between">
            <Banknote size={80} className="absolute -bottom-2 -right-2 opacity-20 text-white" />
            <div>
              <div className="inline-flex bg-white/20 p-2 rounded-lg mb-4">
                <Banknote size={20} className="text-white" />
              </div>
              <p className="text-[10px] font-bold tracking-wider text-purple-100 mb-1">REVENUE</p>
              <h2 className="text-3xl font-bold">$42,910</h2>
            </div>
            <div className="inline-flex items-center bg-white/20 rounded px-2 py-1 mt-4 max-w-fit">
              <TrendingUp size={12} className="mr-1" />
              <span className="text-xs font-medium">+8.4% growth</span>
            </div>
          </div>

        </div>

        {/* Lower Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Out of Stock Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-bold text-gray-800">Out of Stock</h3>
                <AlertCircle size={18} className="text-red-500" />
              </div>
              
              <div className="space-y-5">
                {/* Item 1 */}
                <div className="flex items-center">
                  <div className="p-3 bg-indigo-50/50 rounded-lg text-indigo-400 mr-4">
                    <Keyboard size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">Mechanical Keyboard</h4>
                    <p className="text-xs text-red-500 mt-0.5">0 units remaining</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center">
                  <div className="p-3 bg-indigo-50/50 rounded-lg text-indigo-400 mr-4">
                    <Mouse size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">Wireless Mouse G-Pro</h4>
                    <p className="text-xs text-red-500 mt-0.5">0 units remaining</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center">
                  <div className="p-3 bg-indigo-50/50 rounded-lg text-indigo-400 mr-4">
                    <Headphones size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">Noise Cancelling Pods</h4>
                    <p className="text-xs text-red-500 mt-0.5">0 units remaining</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full text-center text-blue-600 font-bold text-xs tracking-wider pt-6 mt-4 hover:text-blue-700 uppercase">
              VIEW ALL CRITICAL
            </button>
          </div>

          {/* Top Performance Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6">
            <h3 className="text-sm font-bold text-gray-800">Top Performance</h3>
            <p className="text-xs text-gray-500 mt-1">Highest velocity asset this month</p>
            
            {/* Monitor Image Placeholder */}
            <div className="w-full h-36 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-lg mt-5 shadow-inner relative overflow-hidden flex items-center justify-center">
              {/* Decorative inner elements to simulate screen */}
              <div className="w-[95%] h-[90%] bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm border-2 border-gray-900 shadow-2xl relative">
                  <div className="absolute inset-0 bg-white/5 bg-gradient-to-tr from-transparent to-white/10"></div>
              </div>
            </div>

            <div className="flex justify-between items-start mt-4">
              <div>
                <h4 className="text-sm font-bold text-gray-800">Curved Pro Monitor</h4>
                <p className="text-xs text-gray-500 mt-0.5">Electronics / Visuals</p>
              </div>
              <span className="bg-green-100 text-green-600 px-2.5 py-1 rounded-md text-[10px] font-bold">#1 Best Seller</span>
            </div>

            <div className="flex gap-4 mt-5">
              <div className="flex-1 bg-[#f4f7fb] p-3.5 rounded-lg">
                <p className="text-[10px] font-bold tracking-wider text-gray-500 mb-1 uppercase">Units Sold</p>
                <p className="text-xl font-bold text-gray-800">842</p>
              </div>
              <div className="flex-1 bg-[#f4f7fb] p-3.5 rounded-lg">
                <p className="text-[10px] font-bold tracking-wider text-gray-500 mb-1 uppercase">Growth</p>
                <p className="text-xl font-bold text-[#0f8245]">+24%</p>
              </div>
            </div>
          </div>

          {/* Low Stock Alerts Card */}
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-gray-800">Low Stock Alerts</h3>
              <AlertTriangle size={18} className="text-amber-500" />
            </div>

            <div className="space-y-4">
              {/* Alert 1 */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-gray-700">UltraWide Monitor</span>
                  <span className="text-xs text-gray-500">12 left</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-200 rounded-full w-[25%]"></div>
                </div>
              </div>

              {/* Alert 2 */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-gray-700">Workstation PC-8</span>
                  <span className="text-xs text-gray-500">8 left</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full w-[15%]"></div>
                </div>
              </div>

              {/* Alert 3 */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-gray-700">DDR5 RAM (16GB)</span>
                  <span className="text-xs text-gray-500">24 left</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-200 rounded-full w-[45%]"></div>
                </div>
              </div>

              {/* Alert 4 */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-gray-700">Graphics Card v3</span>
                  <span className="text-xs text-gray-500">5 left</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full w-[10%]"></div>
                </div>
              </div>
            </div>

            {/* Insight Box */}
            <div className="mt-6 bg-[#f4f7fb] border border-blue-100/50 rounded-lg p-4 flex items-start">
              <Sparkles size={16} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                <span className="text-blue-600 font-bold uppercase tracking-wider text-[10px] block mb-1">Curator Insight</span>
                Consider re-ordering <span className="font-bold text-gray-800">Workstation PC-8</span> today to avoid stockout by Tuesday.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
