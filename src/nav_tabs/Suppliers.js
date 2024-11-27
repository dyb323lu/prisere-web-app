import React, { useState, useEffect, useCallback } from 'react';
import { Plus, X, MoreVertical, Phone, Mail, MapPin, Building2, CreditCard, ClipboardList, AlertTriangle } from 'lucide-react';

const FEMA_API_URL = 'https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries';
const POLLING_INTERVAL = 1800000; // 30 minutes
const STORAGE_KEY = 'supplierManagementData';

const fetchDisasterData = async () => {
  try {
    const response = await fetch(`${FEMA_API_URL}?$filter=incidentEndDate eq null`);
    const data = await response.json();
    return data.DisasterDeclarationsSummaries || [];
  } catch (error) {
    console.error('Error fetching disaster data:', error);
    return [];
  }
};

const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

const SupplierManagement = () => {
  const [disasterAreas, setDisasterAreas] = useState(new Map());
  const [lastChecked, setLastChecked] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [suppliers, setSuppliers] = useState(() => loadFromLocalStorage());
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [formData, setFormData] = useState({
    companyName: 'Example Company',
    contactName: 'big guys',
    email: 'example@email.com',
    phone: '101',
    address: 'Baker Street',
    county: 'Orange',
    state: 'NY',
    zipCode: '10001',
    taxId: '',
    paymentTerms: '',
    notes: ''
  });

  useEffect(() => {
    saveToLocalStorage(suppliers);
  }, [suppliers]);
  
  const checkSupplierDisasterStatus = useCallback(async () => {
    const disasters = await fetchDisasterData();
    const newDisasterAreas = new Map();

    suppliers.forEach(supplier => {
      const isAffected = disasters.some(disaster => 
        disaster.state === supplier.state && 
        (disaster.designatedArea === `${supplier.county}` || 
         disaster.designatedArea === 'Statewide')
      );
      
      if (isAffected) {
        newDisasterAreas.set(supplier.id, true);
      }
    });

    setDisasterAreas(newDisasterAreas);
    setLastChecked(new Date());
  }, [suppliers]);

  // Add this effect
  useEffect(() => {
    checkSupplierDisasterStatus();
    const interval = setInterval(checkSupplierDisasterStatus, POLLING_INTERVAL);
    
    return () => clearInterval(interval);
  }, [checkSupplierDisasterStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSupplier = {
      id: Date.now(),
      ...formData
    };
    const updatedSuppliers = [...suppliers, newSupplier];
    setSuppliers(updatedSuppliers);
    saveToLocalStorage(updatedSuppliers); // Explicit save
    setIsOpen(false);
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      county: '',
      state: '',
      zipCode: '',
      taxId: '',
      paymentTerms: '',
      notes: ''
    });
  };

  const handleDeleteSupplier = (supplierId) => {
    const updatedSuppliers = suppliers.filter(supplier => supplier.id !== supplierId);
    setSuppliers(updatedSuppliers);
    saveToLocalStorage(updatedSuppliers); // Explicit save
    setActiveDropdown(null);
  };

  const toggleDropdown = (supplierId) => {
    setActiveDropdown(activeDropdown === supplierId ? null : supplierId);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
          <p className="text-sm text-gray-600 mt-2">Manage your supplier information</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5" />
          Add New Supplier
        </button>
      </div>

      {/* Suppliers List */}
      <div className="mt-8">
        {suppliers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers yet</h3>
            <p className="text-gray-500">Click "Add New Supplier" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
              <div
              key={supplier.id}
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border 
                ${disasterAreas.has(supplier.id) 
                  ? 'border-red-200 bg-red-50' 
                  : 'border-gray-100'}`}
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {supplier.companyName}
                        </h3>
                        {disasterAreas.has(supplier.id) && (
                          <div className="flex items-center gap-2 mt-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-red-600">Located in disaster area</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{supplier.contactName}</p>
                    </div>
                    <div className="relative ml-2">
                      <button 
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(supplier.id);
                        }}
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      
                      {activeDropdown === supplier.id && (
                        <>
                          <div className="fixed inset-0" onClick={handleClickOutside} />
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
                            <button
                              onClick={() => handleDeleteSupplier(supplier.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              Delete Supplier
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      <Phone className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="truncate">{supplier.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      <Mail className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="truncate">{supplier.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                      <span className="truncate">{`${supplier.county}, ${supplier.state} ${supplier.zipCode}`}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Tax ID</p>
                        <p className="text-sm font-medium text-gray-900">{supplier.taxId || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Terms</p>
                        <p className="text-sm font-medium text-gray-900">{supplier.paymentTerms || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  {lastChecked && (
                    <div className="text-xs text-gray-400 mt-2 text-right">
                      Last checked: {lastChecked.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Supplier</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Company Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tax ID/VAT Number
                    </label>
                    <input
                      type="text"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        County
                      </label>
                      <input
                        type="text"
                        name="county"
                        value={formData.county}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Terms
                    </label>
                    <input
                      type="text"
                      name="paymentTerms"
                      value={formData.paymentTerms}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement;