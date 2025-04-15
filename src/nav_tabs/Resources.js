// src/nav_tabs/Resources.js
import React, { useState } from 'react';
import { FileText, Download, Plus, X, Check, AlertTriangle, Edit, Trash2 } from 'lucide-react';



const ResourcesPage = () => {
  // Sample data states
  const [checklists, setChecklists] = useState([
    { 
      id: 1, 
      title: 'Emergency Preparedness Checklist', 
      type: 'checklist', 
      category: 'General',
      description: 'Essential items and steps for immediate disaster response',
      file: '/resources/emergency-checklist.pdf'
    },
    { 
      id: 2, 
      title: 'Post-Flood Recovery Checklist', 
      type: 'checklist', 
      category: 'Natural Disasters',
      description: 'Step-by-step guide for business recovery after flooding',
      file: '/resources/flood-recovery-checklist.pdf'
    }
  ]);

  const [templates, setTemplates] = useState([
    { 
      id: 1, 
      title: 'Business Continuity Plan Template', 
      type: 'template', 
      category: 'Planning',
      description: 'Editable document to create your business continuity strategy',
      file: '/resources/bcp-template.docx'
    }
  ]);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [currentFormData, setCurrentFormData] = useState({
    type: 'checklist',
    title: '',
    category: '',
    description: '',
    file: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!currentFormData.title.trim()) errors.title = 'Title is required';
    if (!currentFormData.category.trim()) errors.category = 'Category is required';
    if (!currentFormData.description.trim()) errors.description = 'Description is required';
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

  // Start editing a resource
  const handleEdit = (resource) => {
    setEditingResource(resource);
    setCurrentFormData({
      type: resource.type,
      title: resource.title,
      category: resource.category,
      description: resource.description,
      file: resource.file
    });
    setShowForm(true);
  };

  // Delete a resource with confirmation
  const handleDelete = (id, resourceType) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      if (resourceType === 'checklist') {
        setChecklists(checklists.filter(item => item.id !== id));
      } else {
        setTemplates(templates.filter(item => item.id !== id));
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

    const resourceData = {
      id: editingResource ? editingResource.id : Math.max(...[...checklists, ...templates].map(r => r.id), 0) + 1,
      title: currentFormData.title.trim(),
      type: currentFormData.type,
      category: currentFormData.category.trim(),
      description: currentFormData.description.trim(),
      file: currentFormData.file || `/resources/${currentFormData.title.toLowerCase().replace(/\s+/g, '-')}.${currentFormData.type === 'checklist' ? 'pdf' : 'docx'}`
    };

    if (currentFormData.type === 'checklist') {
      if (editingResource) {
        setChecklists(checklists.map(item => 
          item.id === editingResource.id ? resourceData : item
        ));
      } else {
        setChecklists([...checklists, resourceData]);
      }
    } else {
      if (editingResource) {
        setTemplates(templates.map(item => 
          item.id === editingResource.id ? resourceData : item
        ));
      } else {
        setTemplates([...templates, resourceData]);
      }
    }

    handleCloseForm();
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingResource(null);
    setCurrentFormData({
      type: 'checklist',
      title: '',
      category: '',
      description: '',
      file: ''
    });
    setFormErrors({});
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-[#a02350] flex items-center gap-2">
          <FileText size={24} /> Resources
        </h1>
        <div className="flex gap-3">
          <button 
            className="btn bg-[#a02350] text-white hover:bg-[#a02350]/90"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} className="mr-2" /> Add Resource
          </button>
        </div>
      </div>

      {/* Resource Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </h2>
              <button onClick={handleCloseForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Resource Type</label>
                  <select
                    name="type"
                    className="w-full p-2 border rounded"
                    value={currentFormData.type}
                    onChange={handleInputChange}
                    disabled={!!editingResource}
                  >
                    <option value="checklist">Checklist</option>
                    <option value="template">Template</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    className={`w-full p-2 border rounded ${formErrors.title ? 'border-red-500' : ''}`}
                    value={currentFormData.title}
                    onChange={handleInputChange}
                  />
                  {formErrors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertTriangle size={14} className="mr-1" /> {formErrors.title}
                    </p>
                  )}
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
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <textarea
                    name="description"
                    rows={3}
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
                
                <div>
                  <label className="block text-sm font-medium mb-1">File URL</label>
                  <input
                    type="text"
                    name="file"
                    className="w-full p-2 border rounded"
                    value={currentFormData.file}
                    onChange={handleInputChange}
                    placeholder="Will auto-generate if empty"
                  />
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
                    <Check size={18} className="mr-2" />
                    {editingResource ? 'Update' : 'Save'} Resource
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Checklists Section */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Checklists</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklists.map((checklist) => (
            <div key={checklist.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{checklist.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{checklist.category}</p>
                  <p className="text-gray-700 mb-3">{checklist.description}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(checklist)}
                    className="text-gray-500 hover:text-[#a02350]"
                    aria-label="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(checklist.id, 'checklist')}
                    className="text-gray-500 hover:text-red-500"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <a 
                href={checklist.file} 
                download
                className="btn bg-[#a02350] text-white hover:bg-[#a02350]/90 inline-flex items-center mt-2"
              >
                <Download size={16} className="mr-2" /> Download
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Templates Section */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Templates</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{template.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{template.category}</p>
                  <p className="text-gray-700 mb-3">{template.description}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(template)}
                    className="text-gray-500 hover:text-[#a02350]"
                    aria-label="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(template.id, 'template')}
                    className="text-gray-500 hover:text-red-500"
                    aria-label="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <a 
                href={template.file} 
                download
                className="btn bg-[#a02350] text-white hover:bg-[#a02350]/90 inline-flex items-center mt-2"
              >
                <Download size={16} className="mr-2" /> Download
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;