import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Filter, ChevronDown, MoreVertical, X, Edit, Trash2 } from 'lucide-react';

const ClaimsDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [filters, setFilters] = useState({
    priority: '',
    type: '',
    dateRange: ''
  });

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSelectedClaim(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sample claims data with different statuses
  const initialClaims = [
    {
      id: 1,
      claimNumber: 'CLM-2024-001',
      claimant: 'John Doe',
      type: 'Property Damage',
      status: 'In Progress',
      amount: '$2,500.00',
      date: '2024-03-15',
      priority: 'High'
    },
    {
      id: 2,
      claimNumber: 'CLM-2024-002',
      claimant: 'Jane Smith',
      type: 'General liability insurance',
      status: 'Pending Review',
      amount: '$5,000.00',
      date: '2024-03-14',
      priority: 'Medium'
    },
    {
      id: 3,
      claimNumber: 'CLM-2024-003',
      claimant: 'Robert Johnson',
      type: 'Workers\' compensation insurance',
      status: 'Completed',
      amount: '$3,750.00',
      date: '2024-03-13',
      priority: 'Low'
    },
  ];

  const [claims, setClaims] = useState(initialClaims);

  // Filter claims by status (Active, Pending, Completed, All)
  const filteredByStatus = claims.filter(claim => {
    if (selectedTab === 'active') return claim.status === 'In Progress';
    if (selectedTab === 'pending') return claim.status === 'Pending Review';
    if (selectedTab === 'completed') return claim.status === 'Completed';
    return true; // 'All Claims'
  });

  // Search function (searches claimNumber, claimant, and type)
  const searchedClaims = filteredByStatus.filter(claim => {
    const searchLower = searchTerm.toLowerCase();
    return (
      claim.claimNumber.toLowerCase().includes(searchLower) ||
      claim.claimant.toLowerCase().includes(searchLower) ||
      claim.type.toLowerCase().includes(searchLower)
    );
  });

  // Handle opening the edit modal
  const handleEditClaim = (claim) => {
    setSelectedClaim(claim);
    setShowEditModal(true);
  };

  // Handle deleting a claim
  const handleDeleteClaim = (id) => {
    setClaims(claims.filter(claim => claim.id !== id));
    setShowDeleteModal(false);
    setSelectedClaim(null);
  };

  // Handle updating a claim
  const handleUpdateClaim = (updatedClaim) => {
    setClaims(claims.map(claim => 
      claim.id === updatedClaim.id ? updatedClaim : claim
    ));
    setShowEditModal(false);
  };

  // Handle adding a new claim
  const handleAddClaim = (newClaim) => {
    // Generate a new ID (in a real app, this would come from your backend)
    const newId = Math.max(...claims.map(c => c.id), 0) + 1;
    const claimWithId = {
      ...newClaim,
      id: newId,
      claimNumber: `CLM-${new Date().getFullYear()}-${String(newId).padStart(3, '0')}`
    };
    setClaims([...claims, claimWithId]);
    setShowNewClaimModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Claims Management</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Actions Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search claims..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Filter Button */}
            <button 
              className="flex items-center px-4 py-2 border rounded-lg bg-white hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              <span>Filters</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>

          {/* New Claim Button */}
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => setShowNewClaimModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>New Claim</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <div className="flex space-x-8">
            {['Active', 'Pending', 'Completed', 'All Claims'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 border-b-2 ${
                  selectedTab === tab.toLowerCase()
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Claims Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claim Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Claimant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchedClaims.length > 0 ? (
                  searchedClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {claim.claimNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {claim.claimant}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${claim.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            claim.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {claim.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {claim.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${claim.priority === 'High' ? 'bg-red-100 text-red-800' :
                            claim.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'}`}>
                          {claim.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <div ref={dropdownRef} className="inline-block">
                          <button 
                            className="text-gray-400 hover:text-gray-500"
                            onClick={() => setSelectedClaim(selectedClaim?.id === claim.id ? null : claim)}
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                          {selectedClaim?.id === claim.id && (
                            <div className="absolute right-10 top-0 z-50 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                              <div className="py-1">
                                <button
                                  onClick={() => handleEditClaim(claim)}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedClaim(claim);
                                    setShowDeleteModal(true);
                                  }}
                                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                      No claims found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 bg-white mt-4 border rounded-lg">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{searchedClaims.length}</span> of{' '}
                <span className="font-medium">{searchedClaims.length}</span> results
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold">Delete Claim</h3>
              <button 
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedClaim(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">Are you sure you want to delete claim {selectedClaim.claimNumber}?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedClaim(null);
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteClaim(selectedClaim.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Claim Modal */}
      {showEditModal && selectedClaim && (
        <EditClaimModal
          claim={selectedClaim}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateClaim}
        />
      )}

      {/* New Claim Modal */}
      {showNewClaimModal && (
        <NewClaimModal
          onClose={() => setShowNewClaimModal(false)}
          onSubmit={handleAddClaim}
        />
      )}
    </div>
  );
};

// Edit Claim Modal Component
const EditClaimModal = ({ claim, onClose, onUpdate }) => {
  const [editedClaim, setEditedClaim] = useState(claim);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedClaim(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedClaim);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Edit Claim</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Claim Number</label>
            <input
              type="text"
              name="claimNumber"
              value={editedClaim.claimNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Claimant Name</label>
            <input
              type="text"
              name="claimant"
              value={editedClaim.claimant}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={editedClaim.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="text"
              name="amount"
              value={editedClaim.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={editedClaim.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={editedClaim.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Pending Review">Pending Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={editedClaim.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// New Claim Modal Component
const NewClaimModal = ({ onClose, onSubmit }) => {
  const [newClaim, setNewClaim] = useState({
    claimant: '',
    type: '',
    status: 'Pending Review',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    priority: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClaim(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newClaim);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Create New Claim</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Claimant Name</label>
            <input
              type="text"
              name="claimant"
              value={newClaim.claimant}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={newClaim.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="text"
              name="amount"
              value={newClaim.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={newClaim.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={newClaim.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Pending Review">Pending Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={newClaim.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimsDashboard;