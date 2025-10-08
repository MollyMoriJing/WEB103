const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const EventsAPI = {
  // Get all events
  getAllEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Get a specific event by ID
  getEventById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  },

  // Get upcoming events
  getUpcomingEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/upcoming`);
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming events');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  },

  // Get events by category
  getEventsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/category/${encodeURIComponent(category)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events by category');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching events by category:', error);
      throw error;
    }
  }
};
