import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EventsAPI } from '../services/EventsAPI';
import EventCard from '../components/EventCard';

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await EventsAPI.getAllEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = [...events];

    // Filter by category
    if (filter !== 'all') {
      filtered = filtered.filter(event => event.category === filter);
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.event_date) - new Date(b.event_date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'location':
          return a.location_name.localeCompare(b.location_name);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  }, [events, filter, sortBy]);

  const categories = [...new Set(events.map(event => event.category))];

  if (loading) {
    return (
      <div className="loading">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>All Pet-Friendly Events</h1>
          <p>Discover pet-friendly activities, trainings, hikes and socials</p>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <div className="filters-section" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div>
                <label htmlFor="category-filter" style={{ marginRight: '0.5rem' }}>Filter by Category:</label>
                <select 
                  id="category-filter"
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="sort-filter" style={{ marginRight: '0.5rem' }}>Sort by:</label>
                <select 
                  id="sort-filter"
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="date">Date</option>
                  <option value="title">Title</option>
                  <option value="location">Location</option>
                </select>
              </div>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center">
              <p>No events found matching your criteria.</p>
              <Link to="/" className="btn">Explore Locations</Link>
            </div>
          ) : (
            <div className="grid grid-2">
              {filteredEvents.map((event) => (
                <div key={event.id}>
                  <EventCard event={event} />
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                    <Link to={`/location/${event.location_id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                      📍 {event.location_name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllEventsPage;
