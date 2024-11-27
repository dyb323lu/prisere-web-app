import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  Save,
  Edit2
} from 'lucide-react';

const BusinessProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    businessName: 'Your Business Name',
    ownerName: 'John Doe',
    location: '123 Business Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '(555) 123-4567',
    email: 'contact@yourbusiness.com',
    website: 'www.yourbusiness.com',
    established: '2020',
    description: 'A brief description of your business and its services.',
    industry: 'Technology',
    employeeCount: '1-50'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const InputField = ({ label, name, value, icon: Icon }) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
          {isEditing ? (
            <input
              type="text"
              name={name}
              value={editedProfile[name]}
              onChange={handleInputChange}
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            <div className="pl-10 p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
              {profile[name]}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Business Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="inline-flex items-center px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          {isEditing ? (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-5 w-5 mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Basic Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Business Name"
              name="businessName"
              value={profile.businessName}
              icon={Building2}
            />
            <InputField 
              label="Owner Name"
              name="ownerName"
              value={profile.ownerName}
              icon={User}
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Phone Number"
              name="phone"
              value={profile.phone}
              icon={Phone}
            />
            <InputField 
              label="Email Address"
              name="email"
              value={profile.email}
              icon={Mail}
            />
            <InputField 
              label="Website"
              name="website"
              value={profile.website}
              icon={Globe}
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Street Address"
              name="location"
              value={profile.location}
              icon={MapPin}
            />
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={editedProfile.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                    {profile.city}
                  </div>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="state"
                    value={editedProfile.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                    {profile.state}
                  </div>
                )}
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="zipCode"
                    value={editedProfile.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                    {profile.zipCode}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Industry"
              name="industry"
              value={profile.industry}
              icon={Building2}
            />
            <InputField 
              label="Established"
              name="established"
              value={profile.established}
              icon={Calendar}
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Description
              </label>
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedProfile.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-700">
                  {profile.description}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;