import React, { useState } from 'react';
import { Bell, X, Check, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationDropdown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  
  const [alerts] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New Document Shared',
      message: 'Sarah shared "Q4 Report" with you',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Claim Approved',
      message: 'Your recent claim has been approved',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Deadline Approaching',
      message: 'Document submission due in 24 hours',
      time: '3 hours ago',
      read: true
    }
  ]);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <Circle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Circle className="w-4 h-4 text-blue-500" />;
    }
  };
  const handleViewAll = () => {
    setDropdownVisible(false);
    // Open notifications page in a new tab
    // window.open('/notifications', '_blank');
    navigate('/notifications');
  };
  
  return (
    <div className="relative">
      <div className="relative">
        <button 
          className="p-2 bg-gray-200 rounded-full"
          onClick={toggleDropdown}
        >
          <Bell className="" />
          {alerts.some(alert => !alert.read) && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>
      </div>

      {dropdownVisible && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-200 ease-out">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
            <h3 className="font-semibold text-gray-700">Notifications</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{alerts.length} new</span>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`flex items-start p-4 hover:bg-gray-50 transition-colors duration-200 ${
                  !alert.read ? 'bg-blue-50/40' : ''
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(alert.type)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <button className="w-full px-4 py-2 text-sm text-center text-gray-600 hover:text-gray-900 transition-colors duration-200" onClick={handleViewAll}>
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;

