import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/apiConfig';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues:{
      firstName: '',
      lastName: '',
      email:'',
      password: ''
    },
    onSubmit: (values) =>{
      console.log(values);
      setApiError('');
      setIsSubmitting(true);
      axios.post(`${API_BASE_URL}/register`, values)
      .then((response) => {
        console.log('signup success',response);
        navigate('/signin')
      })
      .catch((error) => {
        console.log('error signing up ' , error);
        setApiError(error.response?.data?.message || "An error occurred during signup. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      })
    },
             validationSchema: yup.object({
            firstName: yup.string().required("First name is required"),
            lastName: yup.string().required('last name is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
            password: yup.string().min(6, 'password must be at least 6 characters').required('Password is required')
        })


  })

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans selection:bg-green-100 flex flex-col pt-8">
      
      
      <nav className="w-full px-8 md:px-16 flex items-center justify-between mb-8 md:mb-10">
        <Link to="/" className="text-xl font-bold text-[#0A2E1A] tracking-tight hover:opacity-80 transition cursor-pointer">
          STOCK MANAGER
        </Link>
        <Link to="/" className="text-[11px] font-bold tracking-widest text-gray-500 uppercase hover:text-gray-900 transition-colors">
          BACK TO HOME
        </Link>
      </nav>

      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        
        <div className="space-y- flex flex-col justify-center max-w-xl mx-auto lg:mx-0 w-full mb-12 lg:mb-0  hidden md:block">
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
              INSTITUTIONAL GRADE
            </h4>
            <h1 className="text-5xl md:text-[4rem] leading-[1.05] font-extrabold tracking-tight text-gray-900">
              The bedrock of <br />
              your <span className="text-[#0A2E1A]">financial</span><br />
              <span className="text-[#0A2E1A]">architecture.</span>
            </h1>
          </div>
          
          <div className="pl-5 border-l-[3px] border-[#0A2E1A]">
            <p className="text-[15px] text-gray-600 max-w-[22rem] leading-relaxed font-normal">
              Join over 1,200 firms managing luxury inventory with precision that rivals their own blueprints.
            </p>
          </div>

          <div className="w-full max-w-[28rem] h-64 md:h-72 mt-8 rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-br from-[#E2E6E3] to-[#cfd8d3]">
  
             <div className="absolute -bottom-10 -right-10 w-64 h-32 bg-white/40 transform -rotate-12 blur-[1px]"></div>
             <div className="absolute bottom-10 right-20 w-32 h-64 bg-white/30 transform rotate-45 blur-[1px]"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-gray-400/20 to-transparent mix-blend-multiply"></div>
          </div>
        </div>

      
        <div className="w-full flex justify-center lg:justify-end">
          <div className="bg-white w-full max-w-[440px] rounded-[1.5rem] p-8 md:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col">
            <h2 className="text-[1.75rem] font-bold text-gray-900 mb-2 tracking-tight">Create Account</h2>
            <p className="text-[13px] text-gray-500 mb-8 font-medium">Begin your journey to architectural precision.</p>

            {apiError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
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

            <form className="space-y-3" onSubmit={formik.handleSubmit}>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase">
                  FIRST NAME
                </label>
                <input 
                  type="text" 
                  name='firstName'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-[#f6f7f6] py-3.5 px-4 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2E1A]/20 focus:bg-white transition-colors border border-transparent"
                  placeholder="First Name"
                />
                 {formik.touched.firstName ? <p className='text-red-500 text-sm'>
                        {formik.errors.firstName}</p> : ''}
              </div>
                    <div className="space-y-1.5">
                <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase">
                  LAST NAME
                </label>
                <input 
                  type="text" 
                  name='lastName'
                   value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-[#f6f7f6] py-3.5 px-4 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2E1A]/20 focus:bg-white transition-colors border border-transparent"
                  placeholder="Last Name"
                /> {formik.touched.lastName ? <p className='text-red-500 text-sm '>
                        {formik.errors.lastName}</p> : ''}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase">
                   EMAIL
                </label>
                <input 
                  type="email" 
                  name='email'
                   value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-[#f6f7f6] py-3.5 px-4 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2E1A]/20 focus:bg-white transition-colors border border-transparent"
                  placeholder="j.wright@studio.com"
                /> {formik.touched.email ? <p className='text-red-500 text-sm '>
                        {formik.errors.email}</p> : ''}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase">
                  SECURE PASSWORD
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-[#f6f7f6] py-3.5 pl-4 pr-12 rounded-lg text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A2E1A]/20 focus:bg-white transition-colors border border-transparent"
                    placeholder="Enter password"
                  /> {formik.touched.password ? <p className='text-red-500 text-sm  '>
                        {formik.errors.password}</p> : ''}
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
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                       </svg>
                    )}
                  </button>
                </div>
              </div>
               

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A2E1A] cursor-pointer text-white py-4 rounded-md font-bold text-sm tracking-wide hover:bg-[#072112] transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A2E1A] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Establishing...' : 'Establish Ledger Account'}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-between mt-10 text-[9px] font-bold tracking-[0.1em] text-gray-400 uppercase">
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                AES-256 ENCRYPTION
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                ISO 27001
              </div>
            </div>

            <div className="mt-8 flex flex-col space-y-3 text-center text-xs font-medium text-gray-500">
              <div>
                Already have an account? <Link to="/signin" className="text-[#0A2E1A] font-bold ml-1 hover:underline underline-offset-2 border-[#0A2E1A]">Sign In</Link>
              </div>
             
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f4f5f4] py-8 px-6 mt-16 md:mt-24 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">
            © 2026 STOCK MANAGER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 lg:gap-10 text-[10px] font-bold tracking-[0.1em] text-gray-400 uppercase">
            <Link to="#" className="hover:text-gray-900 transition-colors no-underline">PRIVACY POLICY</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors no-underline">TERMS OF SERVICE</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors no-underline">SECURITY</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Signup;
