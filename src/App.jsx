import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage'; // Import the new page
import DashboardPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import ErrorBoundary from './components/ErrorBoundary';

// Import all styles
import './App.css';
import './pages/AboutPage.css';
import './components/ThemeToggle.css';
import './pages/LandingPage.css'; // Add the new stylesheet

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* The Landing Page is now the home page */}
          <Route path="/" element={<LandingPage />} />

          {/* The main app is now at /dashboard */}
          <Route
            path="/dashboard"
            element={
              <ErrorBoundary>
                <DashboardPage />
              </ErrorBoundary>
            }
          />

          {/* About page remains the same */}
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