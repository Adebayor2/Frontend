import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Shapes, 
  FileText, 
  Truck, 
  Users, 
  UserCircle,
  X
} from 'lucide-react';



const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 w-64 h-full bg-[#092A1A] flex flex-col text-white z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:transition-none`}>
      
      {/* Mobile Close Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white lg:hidden"
      >
        <X size={20} />
      </button>

      {/* Logo Area */}
      <div className="p-6 pt-8">
         <div className="w-8 h-8 rounded bg-red-500/20 border border-red-500/40 flex items-center justify-center">
              <svg className="w-4 h-4 opacity-90 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
        
        <h1 className="text-l font-bold tracking-wide">STOCK MANAGER <span className="text-red-500 ">ADMIN</span> </h1>
      
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-1">
          <Link to='/admin/dashboard'>
          <li>
            <div className="flex items-center px-6 py-3 bg-[#2c3344] border-l-4 border-gray-400 text-white rounded-r-full mr-4">
              <LayoutDashboard size={18} className="mr-4 text-gray-300" />
              <span className="text-xs font-bold tracking-wider">DASHBOARD</span>
            </div>
          </li>
          </Link>
           <Link to='/admin/products'>
          <li>
            <div className="flex items-center px-6 py-3 text-gray-400 hover:bg-[#2c3344] hover:text-white transition-colors rounded-r-full mr-4 border-l-4 border-transparent">
              <Package size={18} className="mr-4" />
             <span className="text-xs font-bold tracking-wider">PRODUCTS</span>
            </div>
          </li>
          </Link>
          <li>
            <Link to="#"  className=" flex items-center px-6 py-3 text-gray-400 hover:bg-[#2c3344] hover:text-white transition-colors rounded-r-full mr-4 border-l-4 border-transparent">
              <Shapes size={18} className="mr-4" />
              <span className="text-xs font-bold tracking-wider">CATEGORIES</span>
            </Link>
          </li>
          <li>
            <Link to="#"  className="flex items-center px-6 py-3 text-gray-400 hover:bg-[#2c3344] hover:text-white transition-colors rounded-r-full mr-4 border-l-4 border-transparent">
              <FileText size={18} className="mr-4" />
              <span className="text-xs font-bold tracking-wider">ORDERS</span>
            </Link>
          </li>
          <li>
            <Link to="#"  className="flex items-center px-6 py-3 text-gray-400 hover:bg-[#2c3344] hover:text-white transition-colors rounded-r-full mr-4 border-l-4 border-transparent">
              <Truck size={18} className="mr-4" />
              <span className="text-xs font-bold tracking-wider">SUPPLIERS</span>
            </Link>
          </li>
          <li>
            <Link to="#"  className="flex items-center px-6 py-3 text-gray-400 hover:bg-[#2c3344] hover:text-white transition-colors rounded-r-full mr-4 border-l-4 border-transparent">
              <Users size={18} className="mr-4" />
              <span className="text-xs font-bold tracking-wider">USERS</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Profile Info */}
      <div className="p-6 pb-8 border-t border-gray-700/50">
        <Link to="#" className="flex items-center text-gray-400 hover:text-white transition-colors">
          <UserCircle size={20} className="mr-4" />
          <span className="text-xs font-bold tracking-wider">PROFILE</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
