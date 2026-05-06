import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { ArrowLeft, Lock, ShieldCheck, RefreshCcw, Eye, EyeOff } from 'lucide-react';
import API_BASE_URL from '../config/apiConfig';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setMessage('');
      setError('');

      try {
        const response = await axios.put(`${API_BASE_URL}/resetpassword/${resetToken}`, {
          password: values.password
        });
        setMessage(response.data.message || 'Password reset successful!');
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong or the link expired.');
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
            Set your <br />
            new secure <br />
            credentials.
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-white"></div>
            <span className="text-[10px] font-bold tracking-[0.15em] text-white/70 uppercase">
              Secure Endpoint Encryption
            </span>
          </div>
        </div>

        <div className="relative z-20 mt-16 md:mt-0 text-[13px] text-white/50 font-medium max-w-sm">
          Your security is our priority. Please choose a strong password that you haven't used before.
        </div>

        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col pt-20 relative pb-8 px-6 md:px-12 lg:px-20 h-full min-h-[60vh] md:min-h-screen overflow-y-auto">
        <Link to="/" className="text-xl font-bold text-[#0A2E1A] tracking-tight hover:opacity-80 transition cursor-pointer mx-auto lg:hidden md:block mb-10">
          STOCK MANAGER
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold mb-3 tracking-tight text-gray-900">Reset Password</h2>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Create a new password for your account to regain full access.
            </p>
          </div>

          {message && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-lg flex items-center gap-3">
              <ShieldCheck className="text-green-500" size={20} />
              <p className="text-sm text-green-700 font-semibold">{message} Redirecting to sign in...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg flex items-center gap-3">
              <RefreshCcw className="text-red-500" size={20} />
              <p className="text-sm text-red-700 font-semibold">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase ml-1">
                NEW PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className={`w-full bg-[#FAFAFA] py-4 pl-12 pr-12 rounded-xl text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2E1A]/20 focus:bg-white transition-all border ${formik.touched.password && formik.errors.password ? 'border-red-200 ring-2 ring-red-50' : 'border-transparent'}`}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs font-bold mt-1 ml-1">{formik.errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase ml-1">
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className={`w-full bg-[#FAFAFA] py-4 pl-12 pr-12 rounded-xl text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2E1A]/20 focus:bg-white transition-all border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-200 ring-2 ring-red-50' : 'border-transparent'}`}
                  placeholder="••••••••"
                />
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs font-bold mt-1 ml-1">{formik.errors.confirmPassword}</p>
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
                  Update Password
                  <ShieldCheck size={16} className="group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-auto pt-10 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase">
            © 2026 STOCK MANAGER SYSTEM
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
