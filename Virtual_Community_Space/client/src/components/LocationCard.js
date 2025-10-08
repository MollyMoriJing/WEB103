import React from 'react';
import { Link } from 'react-router-dom';

const LocationCard = ({ location }) => {
  return (
    <Link to={`/location/${location.id}`} className="location-card">
      <img 
        src={location.image_url} 
        alt={location.name}
        className="location-image"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500';
        }}
      />
      <div className="location-content">
        <h3 className="location-name">{location.name}</h3>
        <p className="location-description">{location.description}</p>
        <p className="location-address">{location.address}</p>
      </div>
    </Link>
  );
};

export default LocationCard;
