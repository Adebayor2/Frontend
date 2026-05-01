import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-green-100 overflow-x-hidden relative">
      <Navbar />


      <main className="max-w-7xl mx-auto px-6 py-10 md:pt-12 md:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-stretch">
        <div className="space-y-8 z-10 relative">
          <h1 className="text-[3.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-extrabold tracking-tight text-gray-900">
            Inventory & Stock<br />
            <span className="italic text-[#0A2E1A] pr-2">Management</span><br />
            Solution
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-normal">
            Treat your inventory as high-end content. A premium management ecosystem designed for architectural precision and executive clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link to="/signup" className="w-full sm:w-auto flex items-center justify-center bg-[#0A2E1A] text-white px-8 py-3.5 rounded-md font-semibold hover:bg-[#072112] transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#0A2E1A]">
              Begin Onboarding
            </Link>
            <button className="w-full sm:w-auto bg-[#E6EBE8] text-[#33463B] px-8 py-3.5 rounded-md font-semibold hover:bg-[#D5DCD8] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
              Request Demo
            </button>
          </div>

          <div className="pt-8 flex items-center gap-5">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#FAFAFA] bg-black flex items-center justify-center overflow-hidden z-30 shadow-sm">
                <img src="https://api.dicebear.com/8.x/notionists/svg?seed=James&backgroundColor=1c1917" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#FAFAFA] bg-black flex items-center justify-center overflow-hidden z-20 shadow-sm">
                <img src="https://api.dicebear.com/8.x/notionists/svg?seed=Emma&backgroundColor=0f172a" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#FAFAFA] bg-black flex items-center justify-center overflow-hidden z-10 shadow-sm">
                <img src="https://api.dicebear.com/8.x/notionists/svg?seed=Olivia&backgroundColor=171717" alt="avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-[13px] font-semibold text-gray-600 tracking-wide">Trusted by 2,000+ Luxury Brands</span>
          </div>
        </div>

        {/* Right Column - Graphic */}
        <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg transition-transform duration-500 hover:scale-[1.02]">
          
          <img
            src="/hero-jar.png"
            alt="Glass Jar with Dollar Sign Insight"
            className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity"
          />

          {/* Floating Card */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/40 w-72 transform translate-y-2 hover:translate-y-0 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3 bg-gray-50/50 w-fit px-2 py-1 rounded-full border border-gray-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5C8D73] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5C8D73]"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#5C8D73] uppercase">Live Insights</span>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">$142,850.00</div>
            <div className="text-[13px] text-gray-500 font-medium">Revenue projected for Q4 2024</div>
          </div>
        </div>
      </main>

      {/* Info Configuration Section */}
      <section className="py-12 md:py-16 w-full">
        {/* Stats Div */}
        <div className="max-w-6xl mx-auto px-6 mb-16 md:mb-20 mt-4 md:mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
            <div className="pl-5 border-l-2 border-[#0A2E1A] flex flex-col justify-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">14k</div>
              <div className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Brands Owners</div>
            </div>
            <div className="pl-5 border-l-2 border-[#0A2E1A] flex flex-col justify-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">12M+</div>
              <div className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">Active Users</div>
            </div>
            <div className="pl-5 border-l-2 border-[#0A2E1A] flex flex-col justify-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">GLOBAL SUPPORT</div>
            </div>
            <div className="pl-5 border-l-2 border-[#0A2E1A] flex flex-col justify-center">
              <div className="text-4xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">partner</div>
            </div>
          </div>
        </div>

        {/* Complexity Div */}
        <div className="text-center px-6 w-full max-w-4xl mx-auto pb-6 md:pb-10">
          <h2 className="text-4xl md:text-[2.75rem] font-bold text-gray-900 tracking-tight mb-5">
            Engineered for Complexity
          </h2>
          <p className="text-base md:text-[1.1rem] text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Rejecting standard spreadsheets for a sophisticated, data-rich experience that scales with your ambition.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="max-w-6xl mx-auto px-6 mt-4 md:mt-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Left Card - Multi Warehouse */}
            <div className="md:col-span-1 bg-white rounded-[1.25rem] p-8 flex flex-col items-start justify-between min-h-[320px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-transform hover:-translate-y-1 duration-300">
              <div className="space-y-6 w-full">
                <div className="w-12 h-12 bg-[#1A1F1C] rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Multi-Warehouse Support</h3>
                  <p className="text-[15px] leading-relaxed text-gray-600 pr-2">
                    Synchronize disparate locations into a single, unified ledger. Global visibility with local precision.
                  </p>
                </div>
              </div>
              <Link to="#" className="mt-10 flex items-center gap-2 text-[#0A2E1A] font-bold text-sm tracking-wide hover:opacity-75 transition-opacity no-underline">
                Explore Network Mapping
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Right Card - Bank Grade Security */}
            <div className="md:col-span-2 bg-white rounded-[1.25rem] p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center gap-10 md:gap-14 transition-transform hover:-translate-y-1 duration-300">
              <div className="flex-1 space-y-6 w-full">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Bank-Grade Security Ledger</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">
                  Every transaction is hashed and immutable. We provide the structural integrity required by the world's most demanding firms.
                </p>
                <div className="flex flex-wrap gap-3 pt-3">
                  <span className="px-3.5 py-1.5 bg-[#E2E6E3] text-[#1E2E25] text-[10px] font-bold tracking-widest uppercase rounded">AES-256</span>
                  <span className="px-3.5 py-1.5 bg-[#E2E6E3] text-[#1E2E25] text-[10px] font-bold tracking-widest uppercase rounded">ISO 27001</span>
                </div>
              </div>

              <div className="w-full md:w-56 h-56 rounded-xl overflow-hidden flex-shrink-0 bg-black shadow-lg">
                <img src="/security-vault.png" alt="Bank Vault Security" className="w-full h-full object-cover opacity-95 hover:opacity-100 hover:scale-105 transition-all duration-500" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-28 px-6 max-w-5xl mx-auto w-full relative">
        <div className="flex flex-col items-start relative z-10 md:ml-12">
          <span className="text-[#0A2E1A] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase mb-8">
            Institutional Voices
          </span>
          <div className="relative">
            <span className="absolute -top-6 -left-6 sm:-top-10 sm:-left-14 text-[6rem] sm:text-[10rem] text-gray-200/80 font-serif leading-none font-bold z-0 select-none pointer-events-none text-opacity-50">
              "
            </span>
            <h3 className="relative z-10 text-[1.75rem] sm:text-3xl md:text-[2.5rem] font-bold italic text-[#1A1F1C] leading-[1.3] tracking-tight max-w-4xl">
              "Stock Manager transformed our inventory from a chaotic liability into our most valuable strategic asset. The clarity is unparalleled."
            </h3>
          </div>
          <div className="mt-10 md:mt-12 flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden shadow-sm bg-gray-900">
              <img src="https://api.dicebear.com/8.x/notionists/svg?seed=Julian&backgroundColor=1e293b" alt="Julian" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-sm md:text-base">Adebayo Adeniran</span>
              <span className="text-[13px] md:text-[15px] text-gray-500 font-medium">Director of Logistics, Thorne & Co.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-2 pb-12 md:pt-4 md:pb-16 px-6 max-w-7xl mx-auto w-full mb-8">
        <div className="bg-[#092A1A] rounded-[2rem] px-4 py-8 md:px-8 md:py-12 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-[3.25rem] font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              Ready to architect your success?
            </h2>
            <p className="text-[#8ba394] text-lg md:text-[1.15rem] leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
              Join the ranks of high-performance enterprises managing billions in assets with the Ledger.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-white text-[#0A2E1A] px-8 py-3.5 rounded-md font-semibold hover:bg-gray-50 transition-colors shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#0A2E1A]">
                Start Free Trial
              </button>
              <button className="w-full sm:w-auto bg-transparent text-white px-8 py-3.5 rounded-md font-semibold border border-white hover:bg-white/10 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Speak with an Expert
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
