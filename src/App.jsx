import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ErrorBoundary from './components/ErrorBoundary'; // The missing import

// Import global styles
import './App.css';
import './pages/AboutPage.css';
import './components/ThemeToggle.css';

function App() {
  const basename = import.meta.env.PROD ? '/bro-ker-react/' : '/';
  
  return (
    <ThemeProvider>
      <Router basename={basename}>
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