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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white p-6 shadow-md transition-all duration-300 relative`}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-white rounded-full p-1.5 border shadow-md"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className={`${isCollapsed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div className="flex items-center mb-8">
            <img src={logo} alt="Logo" className={isCollapsed ? 'hidden' : ''} />
          </div>
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for..."
              className={`w-full p-2 border rounded ${isCollapsed ? 'hidden' : ''}`}
            />
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/" className={`flex items-center p-2 ${location.pathname === '/' ? 'bg-gray-200' : ''} rounded`}>
                <Home className="mr-2" />
                <span className={`${isCollapsed ? 'hidden' : ''}`}>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/claims" className={`flex items-center p-2 ${location.pathname === '/claims' ? 'bg-gray-200' : ''} rounded`}>
                <FileText className="mr-2" />
                <span className={`${isCollapsed ? 'hidden' : ''}`}>Claims</span>
              </Link>
            </li>
            <li>
              <Link to="/accounting" className={`flex items-center p-2 ${location.pathname === '/accounting' ? 'bg-gray-200' : ''} rounded`}>
                <DollarSign className="mr-2" />
                <span className={`${isCollapsed ? 'hidden' : ''}`}>Accounting</span>
              </Link>
            </li>
            <li>
              <Link to="/suppliers" className={`flex items-center p-2 ${location.pathname === '/suppliers' ? 'bg-gray-200' : ''} rounded`}>
                <Users className="mr-2" />
                <span className={`${isCollapsed ? 'hidden' : ''}`}>Suppliers</span>
              </Link>
            </li>
            <li>
              <Link to="/notifications" className={`flex items-center p-2 ${location.pathname === '/notifications' ? 'bg-gray-200' : ''} rounded`}>
                <Bell className="mr-2" />
                <span className={`${isCollapsed ? 'hidden' : ''}`}>Notifications</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className={`flex items-center p-2 ${location.pathname === '/settings' ? 'bg-gray-200' : ''} rounded`}>
                <Settings className="mr-2" />
                <span className={`${isCollapsed ? 'hidden' : ''}`}>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
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
          <Route path="/claims" element={<div>Claims Page</div>} />
          <Route path="/accounting" element={<div>Accounting Page</div>} />
          <Route path="/suppliers" element={<div>Suppliers Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;