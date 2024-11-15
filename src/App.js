import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bell, Settings, Search, Home, FileText, DollarSign, Users, MoreHorizontal } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';

import About from './About';
import Overview from './Overview';
import SignUpPage from './Signup';
import SignInPage from './Signin';
import logo from './assets/Prisere-logo-transparent.png';
import Alerts from './components/alerts';
import NotificationsPage from './Notifications';
import Dashboard from './Dashboard';

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with Prisere theme */}
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white p-6 shadow-md transition-all duration-300 relative`}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-white rounded-full p-1.5 border shadow-md hover:bg-gray-50"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className={`${isCollapsed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div className="flex items-center mb-8">
            <img src={logo} alt="Prisere Logo" className={isCollapsed ? 'hidden' : 'h-12'} />
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for..."
                className={`w-full pl-10 p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#a02350] focus:border-transparent ${isCollapsed ? 'hidden' : ''}`}
              />
            </div>
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            {[
              { to: "/", icon: <Home size={20} />, label: "Home" },
              { to: "/claims", icon: <FileText size={20} />, label: "Claims" },
              { to: "/accounting", icon: <DollarSign size={20} />, label: "Accounting" },
              { to: "/suppliers", icon: <Users size={20} />, label: "Suppliers" },
              { to: "/notifications", icon: <Bell size={20} />, label: "Notifications" },
              { to: "/settings", icon: <Settings size={20} />, label: "Settings" }
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center p-2 rounded transition-colors
                    ${location.pathname === item.to 
                      ? 'bg-[#a02350] text-white' 
                      : 'text-gray-600 hover:bg-[#a02350]/10'
                    }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className={`${isCollapsed ? 'hidden' : ''} font-medium`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/claims" element={
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-[#a02350] mb-4">Claims</h1>
              <p className="text-gray-600">Claims management system</p>
            </div>
          } />
          <Route path="/accounting" element={
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-[#a02350] mb-4">Accounting</h1>
              <p className="text-gray-600">Financial management system</p>
            </div>
          } />
          <Route path="/suppliers" element={
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-[#a02350] mb-4">Suppliers</h1>
              <p className="text-gray-600">Supplier management system</p>
            </div>
          } />
          <Route path="/settings" element={
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold text-[#a02350] mb-4">Settings</h1>
              <p className="text-gray-600">System settings and configurations</p>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;