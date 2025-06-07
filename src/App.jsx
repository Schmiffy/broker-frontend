// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // <-- THE MISSING IMPORT
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ErrorBoundary from './components/ErrorBoundary';

// Import global styles
import './App.css';
import './pages/AboutPage.css';
import './components/ThemeToggle.css';

function App() {
  // No basename needed for a root S3 deployment
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <ErrorBoundary>
                <DashboardPage />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/about" 
            element={
              <ErrorBoundary>
                <AboutPage />
              </ErrorBoundary>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;