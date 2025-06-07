import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';

// Import global styles
import './App.css';
import './pages/AboutPage.css';
import './components/ThemeToggle.css';

// Determine the basename based on the environment
// In production (build), use the repo name. In development, use root.
const basename = import.meta.env.PROD ? '/bro-ker-react/' : '/';

function App() {
  return (
    <ThemeProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;