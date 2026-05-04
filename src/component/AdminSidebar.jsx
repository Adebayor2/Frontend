import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Shapes, 
  FileText, 
  Users, 
  UserCircle,
  X,
  LogOut
} from 'lucide-react';



const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

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
          <li>
            <Link to='/admin/dashboard' className={`flex items-center px-6 py-3 rounded-r-full mr-4 border-l-4 transition-colors ${isActive('/admin/dashboard') ? 'bg-[#2c3344] border-gray-400 text-white' : 'text-gray-400 border-transparent hover:bg-[#2c3344] hover:text-white'}`}>
              <LayoutDashboard size={18} className={`mr-4 ${isActive('/admin/dashboard') ? 'text-gray-300' : ''}`} />
              <span className="text-xs font-bold tracking-wider">DASHBOARD</span>
            </Link>
          </li>
          <li>
            <Link to='/admin/products' className={`flex items-center px-6 py-3 rounded-r-full mr-4 border-l-4 transition-colors ${isActive('/admin/products') ? 'bg-[#2c3344] border-gray-400 text-white' : 'text-gray-400 border-transparent hover:bg-[#2c3344] hover:text-white'}`}>
              <Package size={18} className={`mr-4 ${isActive('/admin/products') ? 'text-gray-300' : ''}`} />
              <span className="text-xs font-bold tracking-wider">PRODUCTS</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/categories"  className={`flex items-center px-6 py-3 rounded-r-full mr-4 border-l-4 transition-colors ${isActive('/admin/categories') ? 'bg-[#2c3344] border-gray-400 text-white' : 'text-gray-400 border-transparent hover:bg-[#2c3344] hover:text-white'}`}>
              <Shapes size={18} className={`mr-4 ${isActive('/admin/categories') ? 'text-gray-300' : ''}`} />
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
            <Link to="/admin/profilePage"  className={`flex items-center px-6 py-3 rounded-r-full mr-4 border-l-4 transition-colors ${isActive('/admin/profilePage') || isActive('/admin/editprofile') ? 'bg-[#2c3344] border-gray-400 text-white' : 'text-gray-400 border-transparent hover:bg-[#2c3344] hover:text-white'}`}>
               <UserCircle size={20} className={`mr-4 ${isActive('/admin/profilePage') || isActive('/admin/editprofile') ? 'text-gray-300' : ''}`} />
              <span className="text-xs font-bold tracking-wider">PROFILE</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users"  className={`flex items-center px-6 py-3 rounded-r-full mr-4 border-l-4 transition-colors ${isActive('/admin/users') ? 'bg-[#2c3344] border-gray-400 text-white' : 'text-gray-400 border-transparent hover:bg-[#2c3344] hover:text-white'}`}>
              <Users size={18} className={`mr-4 ${isActive('/admin/users') ? 'text-gray-300' : ''}`} />
              <span className="text-xs font-bold tracking-wider">USERS</span>
            </Link>
          </li>
        </ul>
      </nav>

      
      <div className="p-6 pb-8 border-t border-gray-700/50">
        <button onClick={handleLogout}
          className="flex items-center text-red-400 hover:text-red-300 transition-colors w-full"
        >
          <LogOut size={20} className="mr-4" />
          <span className="text-xs font-bold tracking-wider">LOGOUT</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
