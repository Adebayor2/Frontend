import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { ArrowLeft, Mail, ShieldCheck, RefreshCcw } from 'lucide-react';
import API_BASE_URL from '../config/apiConfig';

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email format').required('Email is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setMessage('');
      setError('');

      try {
        // Placeholder for API call
        const response = await axios.post(`${API_BASE_URL}/forgotpassword`, values);
        setMessage(response.data.message || 'If an account exists with this email, you will receive a reset link shortly.');
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans text-gray-900 selection:bg-green-100">
      
      {/* Left Panel - Hero Branding */}
      <div className="w-full md:w-1/2 bg-[#092515] text-white p-8 md:p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden min-h-[40vh] md:min-h-screen hidden md:flex">
        <div className="relative z-20">
          <Link to="/" className="flex items-center gap-2.5 text-white hover:opacity-80 transition cursor-pointer w-max">
            <div className="w-8 h-8 rounded bg-white/10 border border-white/20 flex items-center justify-center mb-5">
              <svg className="w-4 h-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight mb-5 uppercase">STOCK MANAGER</span>
          </Link>
        </div>

        <div className="relative z-20 mt-16 md:mt-0 max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight mb-8">
            Recover <br />
            your access <br />
            with secure <br />
            verification.
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-white"></div>
            <span className="text-[10px] font-bold tracking-[0.15em] text-white/70 uppercase">
              Institutional-Grade Account Recovery
            </span>
          </div>
        </div>

        <div className="relative z-20 mt-16 md:mt-0 text-[13px] text-white/50 font-medium max-w-sm">
          Our automated recovery system ensures that only you can regain access to your architectural ledger.
        </div>

        {/* Decorative element */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col pt-20 relative pb-8 px-6 md:px-12 lg:px-20 h-full min-h-[60vh] md:min-h-screen overflow-y-auto">
        <Link to="/" className="text-xl font-bold text-[#0A2E1A] tracking-tight hover:opacity-80 transition cursor-pointer mx-auto lg:hidden md:block mb-10">
          STOCK MANAGER
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <div className="mb-10">
            <Link to="/signin" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#0A2E1A] transition-colors mb-6 uppercase tracking-widest">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
            <h2 className="text-3xl font-extrabold mb-3 tracking-tight text-gray-900">Forgot Password?</h2>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              No worries! Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
          </div>

          {message && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-lg flex items-center gap-3">
              <ShieldCheck className="text-green-500" size={20} />
              <p className="text-sm text-green-700 font-semibold">{message}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg flex items-center gap-3">
              <RefreshCcw className="text-red-500" size={20} />
              <p className="text-sm text-red-700 font-semibold">{error}</p>
            </div>
          )}

          <form className="space-y-8" onSubmit={formik.handleSubmit}>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase ml-1">
                REGISTERED EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="email" 
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={`w-full bg-[#FAFAFA] py-4 pl-12 pr-4 rounded-xl text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2E1A]/20 focus:bg-white transition-all border ${formik.touched.email && formik.errors.email ? 'border-red-200 ring-2 ring-red-50' : 'border-transparent'}`}
                  placeholder="e.g. architect@firm.com"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs font-bold mt-1 ml-1">{formik.errors.email}</p>
              )}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#092515] text-white py-4 rounded-xl font-bold text-[14px] hover:bg-[#061c0f] transition-all shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#092515] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Send Reset Instructions
                  <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs font-medium text-gray-400">
              Still having trouble? <Link to="/support" className="text-[#0A2E1A] font-bold hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-10 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">
            © 2026 STOCK MANAGER SYSTEM
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
