import React, { useState, useEffect } from 'react';
import { AlertCircle, Search, Calendar, MapPin, AlertTriangle } from 'lucide-react';

const DisastersList = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        setLoading(true);
        // FEMA API endpoint for disaster declarations
        const response = await fetch(
          'https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$top=100&$orderby=declarationDate desc'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch disaster data');
        }

        const data = await response.json();
        
        // Transform FEMA data to match our component's structure
        const transformedData = data.DisasterDeclarationsSummaries.map(disaster => ({
          id: disaster.disasterNumber,
          title: disaster.title || `${disaster.designatedArea} - ${disaster.incidentType}`,
          type: disaster.incidentType,
          location: disaster.designatedArea,
          county: `${disaster.designatedArea}, ${disaster.state}`,
          status: disaster.declaredCountyArea ? 'Active' : 'Closed',
          severity: getSeverityFromType(disaster.incidentType),
          lastUpdated: disaster.declarationDate,
          description: `${disaster.incidentType} in ${disaster.designatedArea}, ${disaster.state}. Declaration #${disaster.disasterNumber}`,
          affectedPopulation: 'Data not available',
          emergencyContacts: '1-800-621-FEMA',
          evacuationZones: ['Contact local authorities'],
          state: disaster.state,
          declarationType: disaster.declarationType
        }));

        setDisasters(transformedData);
        setError(null);
      } catch (err) {
        setError('Failed to load disaster data. Please try again later.');
        console.error('Error fetching disaster data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
  }, []);

  // Helper function to determine severity based on incident type
  const getSeverityFromType = (incidentType) => {
    const highSeverityTypes = ['Hurricane', 'Tornado', 'Earthquake', 'Tsunami'];
    const mediumSeverityTypes = ['Flood', 'Fire', 'Severe Storm(s)', 'Severe Ice Storm'];
    
    if (highSeverityTypes.some(type => incidentType.includes(type))) {
      return 'High';
    } else if (mediumSeverityTypes.some(type => incidentType.includes(type))) {
      return 'Medium';
    }
    return 'Low';
  };

  // Filter disasters based on search query
  const filteredDisasters = disasters.filter(disaster =>
    disaster.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disaster.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disaster.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disaster.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get severity color and background
  const getSeverityStyles = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return {
          text: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200'
        };
      case 'medium':
        return {
          text: 'text-orange-500',
          bg: 'bg-orange-50',
          border: 'border-orange-200'
        };
      case 'low':
        return {
          text: 'text-yellow-500',
          bg: 'bg-yellow-50',
          border: 'border-yellow-200'
        };
      default:
        return {
          text: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200'
        };
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          <AlertTriangle className="h-6 w-6 mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">FEMA Disaster Declarations</h1>
        <h2 className="text-xl text-gray-600 mb-6">Recent Disasters</h2>
        
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location, county, or disaster type..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Disasters list */}
      <div className="space-y-6">
        {filteredDisasters.length > 0 ? (
          filteredDisasters.map(disaster => {
            const severityStyles = getSeverityStyles(disaster.severity);
            
            return (
              <div 
                key={disaster.id} 
                className={`border rounded-lg p-6 ${severityStyles.bg} ${severityStyles.border} shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-grow">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <AlertCircle className={`h-6 w-6 ${severityStyles.text} flex-shrink-0 mt-1`} />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {disaster.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className={`inline-flex items-center ${severityStyles.text} text-sm`}>
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {disaster.severity} Severity
                          </span>
                          <span className="inline-flex items-center text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(disaster.lastUpdated)}
                          </span>
                          <span className="inline-flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {disaster.county}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Location:</span> {disaster.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Type:</span> {disaster.type}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Declaration Type:</span> {disaster.declarationType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">State:</span> {disaster.state}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Emergency Contact:</span> {disaster.emergencyContacts}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-4">
                      {disaster.description}
                    </p>

                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        FEMA #{disaster.id}
                      </span>
                      {disaster.evacuationZones.map((zone, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {zone}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-8">
            No disasters found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default DisastersList;