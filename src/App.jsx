import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext'; // Correct import

// Layouts and Pages
import MainLayout from './components/MainLayout'; // Import the new layout
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ErrorBoundary from './components/ErrorBoundary';



// Import all styles
import './App.css';
// ... other style imports

function App() {
  return (
    <AuthProvider>

      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={
                <ErrorBoundary>
                  <LandingPage />
                </ErrorBoundary>
              } />
              <Route
                path="/dashboard"
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
              <Route path="/auth" element={
                <ErrorBoundary>
                  <AuthPage />
                </ErrorBoundary>
              } />
            </Route>

          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>

  );
}

export default App;