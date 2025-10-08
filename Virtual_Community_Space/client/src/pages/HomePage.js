import React, { useState, useEffect } from 'react';
import { LocationsAPI } from '../services/LocationsAPI';
import LocationCard from '../components/LocationCard';

const HomePage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const data = await LocationsAPI.getAllLocations();
        setLocations(data);
      } catch (err) {
        setError('Failed to load locations. Please try again later.');
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading locations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Pet Friendly Place Finder</h1>
          <p>Find the best pet-friendly spots and events near you</p>
        </div>
      </section>

      <section className="locations-section">
        <div className="container">
          <h2 className="section-title">Explore Pet-Friendly Locations</h2>
          <div className="grid grid-2">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
