// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ... other imports

function App() {
  // REMOVE the conditional basename logic. 
  // We are deploying to the root, so no basename is needed.

  return (
    <ThemeProvider>
      {/* Remove the basename prop. It defaults to "/" which is correct for S3. */}
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
