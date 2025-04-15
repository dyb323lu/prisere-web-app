// src/nav_tabs/Accounting.js
import React, { useState } from 'react';
import { DollarSign, Filter, Plus, Download, Trash2, Edit, X, Save, AlertTriangle } from 'lucide-react';

const AccountingPage = () => {
  // Sample data states
  const [typicalExpenses, setTypicalExpenses] = useState([
    { id: 1, description: 'Office Supplies', amount: 250.00, date: '2023-05-15', category: 'Operations' },
    { id: 2, description: 'Team Lunch', amount: 120.50, date: '2023-05-18', category: 'Team Building' },
  ]);

  const [extraordinaryExpenses, setExtraordinaryExpenses] = useState([
    { id: 1, description: 'Emergency Repairs', amount: 1500.00, date: '2023-05-10', category: 'Facilities' },
  ]);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [currentFormData, setCurrentFormData] = useState({
    type: 'typical',
    description: '',
    amount: '',
    date: '',
    category: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!currentFormData.description.trim()) errors.description = 'Description is required';
    if (!currentFormData.amount || isNaN(currentFormData.amount) || parseFloat(currentFormData.amount) <= 0) {
      errors.amount = 'Valid amount is required';
    }
    if (!currentFormData.date) errors.date = 'Date is required';
    if (!currentFormData.category.trim()) errors.category = 'Category is required';
    return errors;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Start editing an expense
  const handleEdit = (expense, expenseType) => {
    setEditingExpense({ ...expense, expenseType });
    setCurrentFormData({
      type: expenseType,
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date,
      category: expense.category
    });
    setShowForm(true);
  };

  // Delete an expense with confirmation
  const handleDelete = (id, expenseType) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      if (expenseType === 'typical') {
        setTypicalExpenses(typicalExpenses.filter(exp => exp.id !== id));
      } else {
        setExtraordinaryExpenses(extraordinaryExpenses.filter(exp => exp.id !== id));
      }
    }
  };

  // Submit form (both add and edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const expenseData = {
      id: editingExpense ? editingExpense.id : Math.max(...[...typicalExpenses, ...extraordinaryExpenses].map(e => e.id), 0) + 1,
      description: currentFormData.description.trim(),
      amount: parseFloat(currentFormData.amount),
      date: currentFormData.date,
      category: currentFormData.category.trim()
    };

    if (currentFormData.type === 'typical') {
      if (editingExpense) {
        setTypicalExpenses(typicalExpenses.map(exp => 
          exp.id === editingExpense.id ? expenseData : exp
        ));
      } else {
        setTypicalExpenses([...typicalExpenses, expenseData]);
      }
    } else {
      if (editingExpense) {
        setExtraordinaryExpenses(extraordinaryExpenses.map(exp => 
          exp.id === editingExpense.id ? expenseData : exp
        ));
      } else {
        setExtraordinaryExpenses([...extraordinaryExpenses, expenseData]);
      }
    }

    handleCloseForm();
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExpense(null);
    setCurrentFormData({
      type: 'typical',
      description: '',
      amount: '',
      date: '',
      category: ''
    });
    setFormErrors({});
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#a02350] flex items-center gap-2">
          <DollarSign size={24} /> Accounting
        </h1>
        <div className="flex gap-3">
          <button 
            className="btn bg-[#a02350] text-white hover:bg-[#a02350]/90"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} className="mr-2" /> Add Expense
          </button>
        </div>
      </div>

      {/* Expense Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
              </h2>
              <button onClick={handleCloseForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expense Type</label>
                  <select
                    name="type"
                    className="w-full p-2 border rounded"
                    value={currentFormData.type}
                    onChange={handleInputChange}
                    disabled={!!editingExpense}
                  >
                    <option value="typical">Typical Expense</option>
                    <option value="extraordinary">Extraordinary Expense</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <input
                    type="text"
                    name="description"
                    className={`w-full p-2 border rounded ${formErrors.description ? 'border-red-500' : ''}`}
                    value={currentFormData.description}
                    onChange={handleInputChange}
                  />
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertTriangle size={14} className="mr-1" /> {formErrors.description}
                    </p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Amount ($) *</label>
                    <input
                      type="number"
                      name="amount"
                      step="0.01"
                      className={`w-full p-2 border rounded ${formErrors.amount ? 'border-red-500' : ''}`}
                      value={currentFormData.amount}
                      onChange={handleInputChange}
                    />
                    {formErrors.amount && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertTriangle size={14} className="mr-1" /> {formErrors.amount}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date *</label>
                    <input
                      type="date"
                      name="date"
                      className={`w-full p-2 border rounded ${formErrors.date ? 'border-red-500' : ''}`}
                      value={currentFormData.date}
                      onChange={handleInputChange}
                    />
                    {formErrors.date && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertTriangle size={14} className="mr-1" /> {formErrors.date}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <input
                    type="text"
                    name="category"
                    className={`w-full p-2 border rounded ${formErrors.category ? 'border-red-500' : ''}`}
                    value={currentFormData.category}
                    onChange={handleInputChange}
                  />
                  {formErrors.category && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertTriangle size={14} className="mr-1" /> {formErrors.category}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    className="btn bg-gray-200 hover:bg-gray-300"
                    onClick={handleCloseForm}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn bg-[#a02350] text-white hover:bg-[#a02350]/90 flex items-center"
                  >
                    <Save size={18} className="mr-2" />
                    {editingExpense ? 'Update' : 'Save'} Expense
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Typical Expenses Section */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Typical Expenses</h2>
          <div className="flex gap-2">
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Description</th>
                <th className="text-left p-3">Category</th>
                <th className="text-right p-3">Amount</th>
                <th className="text-left p-3">Date</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {typicalExpenses.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{expense.description}</td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3 text-right">${expense.amount.toFixed(2)}</td>
                  <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleEdit(expense, 'typical')}
                      className="text-gray-500 hover:text-[#a02350] mr-2"
                      aria-label="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(expense.id, 'typical')}
                      className="text-gray-500 hover:text-red-500"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Extraordinary Expenses Section */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Extraordinary Expenses</h2>
          <div className="flex gap-2">
            <button className="btn bg-gray-100 hover:bg-gray-200">
              <Filter size={18} className="mr-2" /> Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Description</th>
                <th className="text-left p-3">Category</th>
                <th className="text-right p-3">Amount</th>
                <th className="text-left p-3">Date</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {extraordinaryExpenses.map((expense) => (
                <tr key={expense.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{expense.description}</td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3 text-right">${expense.amount.toFixed(2)}</td>
                  <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleEdit(expense, 'extraordinary')}
                      className="text-gray-500 hover:text-[#a02350] mr-2"
                      aria-label="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(expense.id, 'extraordinary')}
                      className="text-gray-500 hover:text-red-500"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Typical</h3>
          <p className="text-2xl font-semibold">
            ${typicalExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Extraordinary</h3>
          <p className="text-2xl font-semibold">
            ${extraordinaryExpenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-sm font-medium text-gray-500">Combined Total</h3>
          <p className="text-2xl font-semibold">
            ${
              (typicalExpenses.reduce((sum, e) => sum + e.amount, 0) + 
              extraordinaryExpenses.reduce((sum, e) => sum + e.amount, 0))
              .toFixed(2)
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountingPage;