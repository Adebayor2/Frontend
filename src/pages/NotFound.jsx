import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#E6EBE8] font-sans flex flex-col items-center justify-center relative overflow-hidden px-6">
      
    
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#092A1A]/5"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#092A1A]/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#092A1A]/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#092A1A]/5"></div>
      </div>

  
      <div className="absolute top-0 left-0 right-0 flex items-center px-8 py-5 border-b border-[#092A1A]/10">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-red-500/20 border border-red-500/40 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-bold text-[#092A1A] tracking-wide">STOCK MANAGER</span>
            
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        
  
        <div className="w-20 h-20 rounded-2xl bg-[#092A1A] flex items-center justify-center mb-8 shadow-lg shadow-[#092A1A]/20">
          <AlertTriangle size={36} className="text-red-400" />
        </div>

      
        <div className="relative mb-2">
          <h1 className="text-[120px] font-black leading-none text-[#092A1A]/10 select-none tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[80px] font-black text-[#092A1A] leading-none tracking-tighter">
              4<span className="text-red-500">0</span>4
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#092A1A] mt-4 mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border-2 border-[#092A1A] text-[#092A1A] text-sm font-bold rounded-lg hover:bg-[#092A1A] hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#092A1A] text-white text-sm font-bold rounded-lg hover:bg-[#0d3d22] transition-all duration-200 shadow-md shadow-[#092A1A]/30"
          >
            <Home size={16} />
            Back to Home
          </button>
        </div>

    
        <p className="mt-12 text-[11px] text-gray-400 tracking-wider uppercase">
          Error Code: 404 &nbsp;·&nbsp; Stock Manager System
        </p>
      </div>
    </div>
  );
};

export default NotFound;
