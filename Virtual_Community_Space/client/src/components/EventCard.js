import React from 'react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = (dateString) => {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diff = eventDate - now;

    if (diff < 0) {
      return { text: 'Event has passed', isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return { text: `${days}d ${hours}h ${minutes}m`, isPast: false };
    } else if (hours > 0) {
      return { text: `${hours}h ${minutes}m`, isPast: false };
    } else {
      return { text: `${minutes}m`, isPast: false };
    }
  };

  const getEventImage = (category) => {
    const map = {
      'Community': 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=1200',
      'Training': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200',
      'Social': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200',
      'Adoption': 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=1200',
      'Outdoors': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
      'Education': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200'
    };
    return map[category] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200';
  };

  const timeInfo = getTimeRemaining(event.event_date);
  const coverImage = getEventImage(event.category);

  return (
    <div className={`hover-card ${timeInfo.isPast ? 'event-past' : ''}`}>
      <img className="hover-card-image" src={coverImage} alt={event.title}
        onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200'}} />

      <div className="hover-card-overlay">
        <div className="overlay-content">
          <h3 className="event-title">{event.title}</h3>
          <div className="event-date">{formatDate(event.event_date)}</div>
          <div className={`event-countdown ${timeInfo.isPast ? 'past' : ''}`}>{timeInfo.text}</div>
          <p className="event-description">{event.description}</p>
          <div className="event-meta">
            <span className="event-category">{event.category}</span>
            <span className="event-attendance">{event.current_attendees}/{event.max_attendees} attendees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
