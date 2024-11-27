import React, { useState } from 'react';
import { Check, Circle, Search, Trash2 } from 'lucide-react';

// Main container component that handles the view state
const NotificationsContainer = () => {
  return <NotificationsPage />;
};

// NotificationsPage component
const NotificationsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New Document Shared',
      message: 'Sarah shared "Q4 Report" with you',
      time: '2 min ago',
      read: false,
      category: 'documents'
    },
    {
      id: 2,
      type: 'success',
      title: 'Claim Approved',
      message: 'Your recent claim has been approved',
      time: '1 hour ago',
      read: false,
      category: 'claims'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Deadline Approaching',
      message: 'Document submission due in 24 hours',
      time: '3 hours ago',
      read: true,
      category: 'deadlines'
    },
    {
      id: 4,
      type: 'info',
      title: 'Team Meeting Scheduled',
      message: 'Weekly sync scheduled for tomorrow at 10 AM',
      time: '5 hours ago',
      read: true,
      category: 'meetings'
    },
    {
      id: 5,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment for claim #1234 has been processed',
      time: '1 day ago',
      read: true,
      category: 'payments'
    }
  ]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <Circle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-blue-500" />;
    }
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'documents', label: 'Documents' },
    { id: 'claims', label: 'Claims' },
    { id: 'deadlines', label: 'Deadlines' },
    { id: 'meetings', label: 'Meetings' },
    { id: 'payments', label: 'Payments' }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notification.read;
    return notification.category === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              Stay updated with your latest activities and updates
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          {/* Filters and Search Bar */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                      ${selectedFilter === filter.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search notifications..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${
                  !notification.read ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {notification.time}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.message}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        {notification.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{' '}
                  <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">20</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsContainer;