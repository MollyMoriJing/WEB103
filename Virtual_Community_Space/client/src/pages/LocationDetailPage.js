import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LocationsAPI } from '../services/LocationsAPI';
import EventCard from '../components/EventCard';

const LocationDetailPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setLoading(true);
        const [locationData, eventsData] = await Promise.all([
          LocationsAPI.getLocationById(id),
          LocationsAPI.getLocationEvents(id)
        ]);
        setLocation(locationData);
        setEvents(eventsData);
      } catch (err) {
        setError('Failed to load location data. Please try again later.');
        console.error('Error fetching location data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading location details...</p>
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

  if (!location) {
    return (
      <div className="error">
        <p>Location not found.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="location-header">
        <div className="container">
          <div className="location-header-content">
            <img 
              src={location.image_url} 
              alt={location.name}
              className="location-header-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500';
              }}
            />
            <div className="location-header-info">
              <h1>{location.name}</h1>
              <p>{location.description}</p>
              <p className="address">{location.address}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <h2 className="section-title">Events at {location.name}</h2>
          {events.length === 0 ? (
            <div className="text-center">
              <p>No events scheduled at this location yet.</p>
              <Link to="/" className="btn">Explore Other Locations</Link>
            </div>
          ) : (
            <div className="grid grid-2">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LocationDetailPage;
