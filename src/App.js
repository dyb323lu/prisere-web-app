import React from 'react';
import { Bell, Settings, Search, Home, FileText, DollarSign, Users, MoreHorizontal } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import About from './About';
import Overview from './Overview';

const Dashboard = () => {
  const location = useLocation();

  // Function to check if a path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gray-300 mr-2"></div>
          <span className="text-xl font-semibold">Logo</span>
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for..."
            className="w-full p-2 border rounded"
          />
        </div>
        <nav>
          <ul className="space-y-2">
            <li><Link to="/" className="flex items-center p-2 bg-gray-200 rounded"><Home className="mr-2" /> Home</Link></li>
            <li><a href="#" className="flex items-center p-2"><FileText className="mr-2" /> Claims</a></li>
            <li><a href="#" className="flex items-center p-2"><DollarSign className="mr-2" /> Accounting</a></li>
            <li><a href="#" className="flex items-center p-2"><Users className="mr-2" /> Suppliers</a></li>
            <li><a href="#" className="flex items-center p-2"><Settings className="mr-2" /> Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-200 rounded-full"><Bell /></button>
            <button className="p-2 bg-gray-200 rounded-full"><Settings /></button>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        <nav className="mb-8">
          <ul className="flex space-x-6 border-b">
            <li>
              <Link
                to="/overview"
                className={`pb-2 border-b-2 ${isActivePath('/overview') ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300 transition-colors`}
              >
                Overview
              </Link>
            </li>
            <li><a href="#" className="pb-2 border-b-2 border-transparent">Tasks <span className="ml-1 px-2 py-1 bg-gray-200 rounded-full text-xs">7</span></a></li>
            <li>
              <Link
                to="/"
                className={`pb-2 border-b-2 ${isActivePath('/') ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300 transition-colors`}
              >
                Documents
              </Link>
            </li>
            {/* <li><a href="#" className={`pb-2 border-b-2 border-blue-500`}>Documents <span className="ml-1 px-2 py-1 bg-gray-200 rounded-full text-xs">2</span></a></li> */}
            <li><a href="#" className="pb-2 border-b-2 border-transparent">Reports</a></li>
            <li><a href="#" className="pb-2 border-b-2 border-transparent text-gray-400">Admin</a></li>
            <li><a href="#" className="pb-2 border-b-2 border-transparent"><MoreHorizontal /></a></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Disaster Declared in your state</h2>
                      <p className="text-sm text-gray-500">Description + Time period</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">Build Claim</button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Documents</h2>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
              </div>

              <table className="w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left">
                      <input type="checkbox" className="mr-2" />
                      Name
                    </th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 4].map((index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">
                        <input type="checkbox" className="mr-2" />
                        <span className="inline-block w-8 h-8 bg-gray-200 rounded-full mr-2"></span>
                        Expense {index} receipt
                      </td>
                      <td className="p-3">Cell Text</td>
                      <td className="p-3">Cell Text</td>
                      <td className="p-3">Cell Text</td>
                      <td className="p-3">Cell Text</td>
                      <td className="p-3"><span className="px-2 py-1 bg-gray-200 rounded-full text-xs">Badge</span></td>
                      <td className="p-3"><MoreHorizontal /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          } />
          <Route path="overview" element={<Overview />} />
          <Route path="about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
