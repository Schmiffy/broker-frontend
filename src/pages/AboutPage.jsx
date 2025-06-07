import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './AboutPage.css'; // We'll create this for custom styling

function AboutPage() {
  return (
    <div className="about-container">
      <header>
        <img id="site-logo" src="/logo.png" alt="Bro-ker Logo" />
      </header>
      <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
        <ThemeToggle />
      </div>

      <div className="about-content">
        <h1>What is Bro-ker?</h1>
        <p>
          <strong>Bro-ker</strong> is a sleek, modern, and privacy-focused portfolio tracker. It's designed for investors who want to monitor their stock holdings without giving their data away to large corporations.
        </p>

        <h2>How It Works</h2>
        <ul className="features-list">
          <li>
            <strong>Your Data, Your Browser:</strong> Your entire portfolio is stored securely in your browser's local storage. Nothing is ever sent to a server, ensuring complete privacy. If you clear your browser data, your portfolio will be gone, so be mindful!
          </li>
          <li>
            <strong>Real-Time* Data:</strong> The app fetches near real-time stock prices and the latest company news from a reliable financial data API. Data is automatically refreshed every 30 seconds to keep you up-to-date.
          </li>
          <li>
            <strong>At-a-Glance Insights:</strong> The dashboard provides a clear overview of your holdings, including quantity, average cost, current value, and your total profit or loss for each position, both in absolute and percentage terms.
          </li>
          <li>
            <strong>Stay Informed:</strong> A dedicated news widget aggregates the latest headlines for the specific stocks in your portfolio, helping you stay on top of market-moving events.
          </li>
        </ul>

        <h2>Tech Stack</h2>
        <p>
          This "fancy" application is built with a modern web development stack:
        </p>
        <ul className="tech-stack-list">
          <li><strong>ReactJS:</strong> For building a fast, component-based user interface.</li>
          <li><strong>Vite:</strong> As a lightning-fast build tool and development server.</li>
          <li><strong>React Router:</strong> For client-side navigation between pages.</li>
          <li><strong>Pure CSS:</strong> Styled with modern CSS, including variables for easy theming and a responsive design that works on both desktop and mobile.</li>
          <li><strong>GitHub Actions & AWS S3:</strong> For automated, continuous deployment to a scalable and reliable cloud hosting solution.</li>
        </ul>

        <div className="back-to-app">
          <Link to="/dashboard" className="button-link"> {/* Changed from "/" to "/dashboard" */}
            ← Back to My Portfolio
          </Link>
        </div>
      </div>
    </div>

  );
}

export default AboutPage;