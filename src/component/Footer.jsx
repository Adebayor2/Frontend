import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#E6EBE8] py-8 md:py-12 px-6 border-t border-gray-200/60 w-full">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
                <div className="flex flex-col items-center lg:items-start space-y-1.5">
                    <span className="text-[1.15rem] font-bold text-[#0A2E1A] tracking-tight">Stock Manager</span>
                    <span className="text-[13px] text-gray-500 font-medium">© 2026 stock manager. All rights reserved.</span>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-[13.5px] font-semibold text-gray-500">
                    <Link to="#" className="hover:text-gray-900 transition-colors no-underline">Privacy Policy</Link>
                    <Link to="#" className="hover:text-gray-900 transition-colors no-underline">Terms of Service</Link>
                    <Link to="#" className="hover:text-gray-900 transition-colors no-underline">Contact Support</Link>
                    <Link to="#" className="hover:text-gray-900 transition-colors no-underline">Security</Link>
                </div>

                <div className="flex items-center space-x-5 text-gray-500">
                    <Link to="#" className="hover:text-gray-900 transition-all hover:scale-110 no-underline">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Link>
                    <Link to="#" className="hover:text-gray-900 transition-all hover:scale-110 no-underline">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </Link>
                    <Link to="#" className="hover:text-gray-900 transition-all hover:scale-110 no-underline">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;