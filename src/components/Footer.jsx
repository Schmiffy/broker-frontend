import React from 'react';

// Basic inline styles for the footer for now
const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop: '40px',
    backgroundColor: 'var(--container-bg)',
    borderTop: '1px solid var(--input-border)',
    fontSize: '0.9rem',
    opacity: '0.7',
};

function Footer() {
    return (
        <footer style={footerStyle}>
            <p>© {new Date().getFullYear()} Bro-ker. Your data is private.</p>
            <p>All data is for informational purposes only. Not financial advice.</p>
        </footer>
    );
}

export default Footer;