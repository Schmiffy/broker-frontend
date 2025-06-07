import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';

// Import global styles that apply to all pages
import './App.css';
import './pages/AboutPage.css'; 

function App() {
  return (
    <Router basename="/bro-ker-react/">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;