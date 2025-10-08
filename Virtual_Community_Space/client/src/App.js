import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LocationDetailPage from './pages/LocationDetailPage';
import AllEventsPage from './pages/AllEventsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<AllEventsPage />} />
            <Route path="/events" element={<AllEventsPage />} />
            <Route path="/location/:id" element={<LocationDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
