import React, {useState} from 'react';
import { ChevronLeft, ChevronRight, Bell, Settings, Search, Home, FileText, DollarSign, Users, MoreHorizontal } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import About from './About';
import Overview from './Overview';
import SignUpPage from './Signup';
import SignInPage from './Signin';
import logo from './assets/Prisere-logo-transparent.png';
import Alerts from './components/alerts';
import NotificationsPage from './Notifications';
import DocumentTab from './Documents';

const Dashboard = () => {
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);  
  const [activeTab, setActiveTab] = useState('documents'); // Add this state

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  
  // Function to check if a path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'documents':
        return <DocumentTab />;
      case 'tasks':
        return ;
      case 'reports':
        return ;
      case 'admin':
        return ;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
     {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* <button className="p-2 bg-gray-200 rounded-full"><Bell /></button> */}
            <button className="p-2 bg-gray-200 rounded-full" onClick={toggleDropdown}>
              <Alerts />
            </button>
            
            <button className="p-2 bg-gray-200 rounded-full"><Settings /></button>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        <nav className="mb-8">
          <ul className="flex space-x-6 border-b">
            <li>
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'overview' ? 'border-blue-500' : 'border-transparent'
                } hover:border-blue-300 transition-colors`}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'tasks' ? 'border-blue-500' : 'border-transparent'
                } hover:border-blue-300 transition-colors`}
              >
                Tasks
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('documents')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'documents' ? 'border-blue-500' : 'border-transparent'
                } hover:border-blue-300 transition-colors`}
              >
                Documents
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('reports')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'reports' ? 'border-blue-500' : 'border-transparent'
                } hover:border-blue-300 transition-colors`}
              >
                Reports
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('admin')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'admin' ? 'border-blue-500' : 'border-transparent'
                } hover:border-blue-300 transition-colors`}
              >
                Admin
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('add_morehorizontalicon')}
                className={`pb-2 border-b-2 ${
                  activeTab === 'admin' ? 'border-blue-500' : 'border-transparent'
                } hover:border-blue-300 transition-colors`}
              >
                add_morehorizontalicon
              </button>
            </li>
            {/* ... other navigation items ... */}
          </ul>
        </nav>

        {renderContent()}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<SignUpPage />} /> */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/" element={<Dashboard />}>
        <Route path="overview" element={<Overview />} />
        <Route path="about" element={<About />} />
      </Route>
      </Routes>
    </Router>
  );
};

export default Dashboard;
