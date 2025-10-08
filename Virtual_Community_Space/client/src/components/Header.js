import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Pet Friendly Place Finder
        </Link>
        <nav className="nav">
          <Link to="/">All Pet Events</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
