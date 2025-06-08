import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Create this new CSS file

// You can use simple SVGs for icons or install a library like react-icons
const ChartIcon = () => <svg /* SVG code for a chart */ xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
const LockIcon = () => <svg /* SVG code for a lock */ xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const CodeIcon = () => <svg /* SVG code for code */ xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;


function LandingPage() {
    return (
        <div className="landing-container">
            {/* <nav className="landing-nav">
                <img src="/logo.png" alt="Bro-ker Logo" className="nav-logo" />
                <Link to="/dashboard" className="nav-button">Login/Sign Up</Link>
            </nav> */}

            <main>
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-headline">Track Your Investments. Privately.</h1>
                        <p className="hero-subheadline">
                            A modern, open-source portfolio tracker that runs entirely in your browser.
                            No accounts, no tracking, no data harvesting. Ever.
                        </p>
                        <Link to="/dashboard" className="cta-button-primary">Go to Dashboard</Link>
                        <Link to="/about" className="cta-button-secondary">Learn More</Link>
                    </div>
                </section>

                <section id="why-us" className="why-section">
                    <div className="feature-card">
                        <LockIcon />
                        <h3>Complete Privacy</h3>
                        <p>Your portfolio data is stored only on your device and never sent to a server.</p>
                    </div>
                    <div className="feature-card">
                        <ChartIcon />
                        <h3>Real-Time Insights</h3>
                        <p>Monitor your performance with live price updates and relevant company news.</p>
                    </div>
                    <div className="feature-card">
                        <CodeIcon />
                        <h3>100% Open Source</h3>
                        <p>Inspect the code, contribute, or host it yourself. Full transparency is built-in.</p>
                    </div>
                </section>
{/* TODO late */}
                {/* <section className="how-it-works-section">
                    <h2>How We Protect Your Privacy</h2>
                    <div className="privacy-content">
                        <img src="/privacy-diagram.png" alt="Diagram showing data flow" className="privacy-diagram" />
                        <p>
                            When you add a stock, Bro-ker saves it to your browser's <strong>Local Storage</strong>.
                            To get prices and news, your browser directly asks a financial data API for the information.
                            Your portfolio data is never uploaded, synced, or stored on any central server. This simple, powerful design ensures only you have access to your financial information.
                        </p>
                    </div>
                </section> */}

                <section className="final-cta-section">
                    <h2>Ready to Take Control?</h2>
                    <p>No sign-up required. Launch the app and start tracking in seconds.</p>
                    <Link to="/dashboard" className="cta-button-primary large">Launch Bro-ker Now</Link>
                </section>
            </main>

            <footer className="landing-footer">
                <p>© {new Date().getFullYear()} Bro-ker. All data is for informational purposes only.</p>
            </footer>
        </div>
    );
}

export default LandingPage;
