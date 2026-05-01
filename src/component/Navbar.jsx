import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                <div className="text-xl font-bold text-[#0A2E1A] tracking-tight hover:opacity-80 transition cursor-pointer">
                    STOCK MANAGER
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
<Link to="#" style={{ textDecoration: 'none' }} className="text-gray-900 border-b-2 border-transparent hover:border-[#0A2E1A] pb-1 transition-all no-underline">Features</Link>
<Link to="#" style={{ textDecoration: 'none' }} className="text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-[#0A2E1A] pb-1 transition-all no-underline">Solutions</Link>
<Link to="#" style={{ textDecoration: 'none' }} className="text-gray-500 hover:text-gray-900 border-b-2 border-transparent hover:border-[#0A2E1A] pb-1 transition-all no-underline">Pricing</Link>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link to="/signin" className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</Link>
                    <Link to="/signup" className="bg-[#0A2E1A] text-white px-6 py-2.5 rounded-md hover:bg-[#072112] transition-colors shadow-sm">Sign Up</Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-600 focus:outline-none hover:text-gray-900 transition"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute w-full z-50 left-0 top-[84px] border-t border-gray-100 flex flex-col pt-2 pb-6 px-6 space-y-4">
<Link to="#" style={{ textDecoration: 'none' }} className="block text-gray-900 font-medium py-2 border-b border-gray-100 no-underline">Features</Link>
<Link to="#" style={{ textDecoration: 'none' }} className="block text-gray-600 hover:text-gray-900 font-medium py-2 border-b border-gray-100 transition-colors no-underline">Solutions</Link>
<Link to="#" style={{ textDecoration: 'none' }} className="block text-gray-600 hover:text-gray-900 font-medium py-2 mb-2 border-b border-gray-100 transition-colors no-underline">Pricing</Link>

                    <div className="flex flex-col space-y-3 pt-4">
                        <Link to="/signin" className="text-gray-600 hover:text-gray-900 font-medium text-center py-2.5 rounded-md border border-gray-200 transition-colors">Sign In</Link>
                        <Link to="/signup" className="bg-[#0A2E1A] text-white px-6 py-2.5 rounded-md text-center font-medium hover:bg-[#072112] transition-colors shadow-sm">Sign Up</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;