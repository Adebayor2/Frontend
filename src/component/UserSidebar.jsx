import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet,
  UserCircle,
  X,
  LogOut,
  Settings
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UserSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/signin');
    }, 2000);
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
         <div className="w-8 h-8 rounded bg-[#96D9C0]/20 border border-[#96D9C0]/40 flex items-center justify-center mb-4">
            <svg className="w-4 h-4 opacity-90 text-[#96D9C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        
        <h1 className="text-l font-bold tracking-wide">STOCK MANAGER</h1>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-1">
          <Link to='/user/dashboard'>
            <li>
              <div className={`flex items-center px-6 py-3 transition-colors rounded-r-full mr-4 border-l-4 ${isActive('/user/dashboard') ? 'bg-[#2c3344] border-gray-400 text-white' : 'text-gray-400 border-transparent hover:bg-[#2c3344] hover:text-white'}`}>
                <LayoutDashboard size={18} className={`mr-4 ${isActive('/user/dashboard') ? 'text-gray-300' : ''}`} />
                <span className="text-xs font-bold tracking-wider">DASHBOARD</span>
              </div>
            </li>
          </Link>
          <Link to='/user/revenue'>
            <li>
              <div className={`flex items-center px-6 py-3 transition-colors rounded-r-full mr-4 border-l-4 ${isActive('/user/revenue') ? 'bg-[#2c3344] border-gray-400 text-white' : 'text-gray-400 border-transparent hover:bg-[#2c3344] hover:text-white'}`}>
                <Wallet size={18} className="mr-4" />
                <span className="text-xs font-bold tracking-wider">MONTHLY REVENUE</span>
              </div>
            </li>
          </Link>
          <Link to='/user/settings'>
            <li>
              <div className={`flex items-center px-6 py-3 transition-colors rounded-r-full mr-4 border-l-4 ${isActive('/user/settings') ? 'bg-[#2c3344] border-gray-400 text-white' : 'text-gray-400 border-transparent hover:bg-[#2c3344] hover:text-white'}`}>
                <Settings size={18} className="mr-4" />
                <span className="text-xs font-bold tracking-wider">SETTINGS</span>
              </div>
            </li>
          </Link>
        </ul>
      </nav>

      {/* Profile Info & Logout */}
      <div className="p-6 pb-8 border-t border-gray-700/50 flex flex-col gap-4">
        <Link to='/user/profilePage' className={`flex items-center transition-colors ${isActive('/user/profilePage') ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
          <UserCircle size={20} className="mr-4" />
          <span className="text-xs font-bold tracking-wider cursor-pointer">PROFILE</span>
        </Link>
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`flex items-center transition-colors mt-2 w-full ${isLoggingOut ? 'text-gray-400 cursor-not-allowed' : 'text-red-400 hover:text-red-300'}`}
        >
          {isLoggingOut ? (
            <>
              <svg className="animate-spin mr-4 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-bold tracking-wider">LOGGING OUT...</span>
            </>
          ) : (
            <>
              <LogOut size={20} className="mr-4" />
              <span className="text-xs font-bold tracking-wider cursor-pointer">LOGOUT</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
