const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const LocationsAPI = {
  // Get all locations
  getAllLocations: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/locations`);
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  },

  // Get a specific location by ID
  getLocationById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/locations/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching location:', error);
      throw error;
    }
  },

  // Get events for a specific location
  getLocationEvents: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/locations/${id}/events`);
      if (!response.ok) {
        throw new Error('Failed to fetch location events');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching location events:', error);
      throw error;
    }
  }
};
