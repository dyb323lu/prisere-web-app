import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import logo from './assets/Prisere-logo-transparent.png';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
          {/* <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Welcome to Our Business Community
          </h1> */}
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
            <h2 className="text-2xl font-semibold text-gray-800">Sign in to your account</h2>
            <p className="text-gray-600 mt-2">Access your business dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-[#a02350] text-white py-2.5 rounded-md hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a02350]"
              >
                Sign in
              </button>
            </div>

            <div className="text-center space-y-4">
              <a 
                href="/forgot-password"
                className="block text-sm text-[#a02350] hover:underline"
              >
                Forgot your password?
              </a>
              
              <div className="text-sm text-gray-600">
                <span>Don't have an account? </span>
                <a 
                  href="/signup" 
                  className="text-[#a02350] hover:underline font-medium"
                >
                  Create an account
                </a>
              </div>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
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
  );
};

export default SignInPage;