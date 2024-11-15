import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import logo from './assets/Prisere-logo-transparent.png';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
//         <div className="text-center">
//           <div className="mb-6">
//             <img src={logo} alt="Prisere Logo" className="mx-auto" />
//           </div>
//           <p className="mt-3 text-sm text-gray-600">
//             Become part of our resilient business community
//           </p>
//          </div>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div className="space-y-5">
//             <div>
//               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <div className="relative mt-1">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <User className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   className="block w-full rounded-md border border-gray-300 pl-10 py-3 shadow-sm focus:border-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-700"
//                   placeholder="John Doe"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="relative mt-1">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="block w-full rounded-md border border-gray-300 pl-10 py-3 shadow-sm focus:border-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-700"
//                   placeholder="you@example.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="relative mt-1">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword.password ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="block w-full rounded-md border border-gray-300 pl-10 pr-10 py-3 shadow-sm focus:border-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-700"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword({
//                     ...showPassword,
//                     password: !showPassword.password
//                   })}
//                   className="absolute inset-y-0 right-0 flex items-center pr-3"
//                 >
//                   {showPassword.password ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <div className="relative mt-1">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showPassword.confirmPassword ? 'text' : 'password'}
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className="block w-full rounded-md border border-gray-300 pl-10 pr-10 py-3 shadow-sm focus:border-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-700"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword({
//                     ...showPassword,
//                     confirmPassword: !showPassword.confirmPassword
//                   })}
//                   className="absolute inset-y-0 right-0 flex items-center pr-3"
//                 >
//                   {showPassword.confirmPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full rounded-md bg-rose-700 py-3 px-4 text-sm font-semibold text-white shadow-sm hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2 transition-colors duration-200"
//             >
//               Create Account
//             </button>
//           </div>

//           <div className="mt-6 relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Already have an account?</span>
//             </div>
//           </div>

//           <div className="text-center mt-2">
//             <a href="/signin" className="text-sm font-medium text-rose-700 hover:text-rose-800">
//               Sign in to your account
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
return (
    <div className="min-h-screen flex">
      {/* Left side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-50 items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <img 
            src={logo} 
            alt="Company Logo" 
            className="mx-auto mb-8"
          />
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Welcome to Our Business Community
          </h1>
          <p className="text-gray-600 text-lg">
            Join our resilient network of industry leaders and innovators.
          </p>
        </div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src="/api/placeholder/200/60" 
              alt="Company Logo" 
              className="mx-auto"
            />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Create a new account</h2>
            <p className="text-gray-600 mt-2">Access your business dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#a02350] focus:border-transparent focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>            

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#a02350] focus:border-transparent focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#a02350] focus:border-transparent focus:outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#a02350] focus:border-transparent focus:outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#a02350] text-white py-2.5 rounded-md hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a02350]"
              >
                Create Account
              </button>
            </div>

            <div className="text-center space-y-4">              
              <div className="text-sm text-gray-600">
                <span>Already have an account? </span>
                <a 
                  href="/signin" 
                  className="text-[#a02350] hover:underline font-medium"
                >
                  Sign in
                </a>
              </div>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-[#a02350] hover:underline">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="/privacy" className="text-[#a02350] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUpPage;