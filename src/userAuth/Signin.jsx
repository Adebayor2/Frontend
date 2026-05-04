import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().required('Password is required')
    }),
    onSubmit: (values) => {
        setApiError('');
        setIsSubmitting(true);
        axios.post('http://localhost:5255/api/login', values)
            .then(response => {
                if (response.data.message === "Login successful") {
                    localStorage.token = response.data.token 

                    localStorage.role = response.data.role
                    if(localStorage.role === 'admin'){
                      navigate("/admin/dashboard")
                    }
                    else{
                       navigate("/user/dashboard")
                    }
                }
                else{
                    setApiError(response.data.message || "Invalid credentials")
              
                }
              
            })
            .catch(error => {
                console.error('Error logging in:', error)
                setApiError(String(error.response?.data?.message || "Invalid email or password"))
            })
            .finally(() => {
                setIsSubmitting(false);
            })
    }
  })


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans text-gray-900 selection:bg-green-100  ">
      
      {/* Left Panel - Hero Branding */}
      <div className="w-full md:w-1/2 bg-[#092515] text-white p-8 md:p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden min-h-[40vh] md:min-h-screen hidden md:flex ">
        <div className="relative z-20 ">
        
          <Link to="/"
           className="flex items-center gap-2.5 text-white hover:opacity-80 transition cursor-pointer w-max ">
            <div className="w-8 h-8 rounded bg-white/10 border border-white/20 flex items-center justify-center mb-5">
              <svg className="w-4 h-4 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight mb-5">STOCK MANAGER</span>
          </Link>
        </div>

        <div className="relative z-20 mt-16 md:mt-0 max-w-xl ">
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight mb-8">
            Master your <br />
            inventory with <br />
            architectural <br />
            precision.
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-white"></div>
            <span className="text-[10px] font-bold tracking-[0.15em] text-white/70 uppercase">
              A New Standard in Asset Management
            </span>
          </div>
        </div>

        <div className="relative z-20 mt-16 md:mt-0 text-[13px] text-white/50 font-medium max-w-sm">
          Architect Ledger ensures institutional-grade security for your financial and physical assets.
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white flex flex-col pt-20  relative pb-8 px-6 md:px-12 lg:px-20 h-full min-h-[60vh] md:min-h-screen overflow-y-auto  ">
              <Link to="/" className="text-xl font-bold text-[#0A2E1A] tracking-tight hover:opacity-80 transition cursor-pointer mx-auto lg:hidden md:block" >
                    STOCK MANAGER
                  </Link>
        <div className="flex-1 flex flex-col justify-center max-w-md w-full ">
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-2 tracking-tight text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500 font-medium">Please enter your credentials to access the ledger.</p>
          </div>

          {apiError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-red-700 font-medium">{apiError}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6 mt-5" onSubmit={formik.handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-500 uppercase">
                EMAIL ADDRESS
              </label>
              <input 
                type="email" 
                name='email'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full bg-[#FAFAFA] py-3.5 px-4 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2E1A]/20 focus:bg-white transition-colors border border-transparent"
                placeholder="name@firm.com"
            
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>  

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-500 uppercase">
                  PASSWORD
                </label>
                <Link to="/forgot-password" className="text-[11px] font-semibold text-[#0A2E1A] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name='password'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="w-full bg-[#FAFAFA] py-3.5 pl-4 pr-12 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2E1A]/20 focus:bg-white transition-colors border border-transparent"
                  placeholder="Enter password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-sm">{formik.errors.password}</p>
                ) : null}
                <button 
                  type="button" 
                   onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                     </svg>
                  )}
                </button>
      
              </div>
            </div>

        
      

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#092515] text-white py-3.5 rounded-md font-bold text-[14px] hover:bg-[#061c0f] transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#092515] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink-0 mx-4 text-[9px] font-bold tracking-[0.15em] text-gray-400 uppercase">Or Continue With</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>

            <button 
              type="button"
              className="w-full bg-white border border-gray-200 text-gray-700 py-3.5 rounded-md font-bold text-[13px] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Single Sign On (Google)
            </button>
            
          </form>

          <div className="mt-5 flex flex-col space-y-3 text-center text-xs font-medium text-gray-500">
            <div>
              Don't have an account? <Link to="/signup" className="text-amber-600 font-bold ml-1 hover:underline underline-offset-2">Create Account</Link>
            </div>

          </div>
        </div>

      

        {/* Support Button */}
        <button className="hidden lg:flex absolute bottom-8 right-8 items-center gap-2 bg-gray-100/80 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full text-xs transition-colors border border-gray-200/60 shadow-sm backdrop-blur-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Support
        </button>

      </div>
    </div>
  );
};

export default Signin;
