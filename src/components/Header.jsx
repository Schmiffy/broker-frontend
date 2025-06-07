// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Header() {
  return (
    <header>
      {/* Wrap the image in a Link component */}
      <Link to="/">
        <img id="site-logo" src="/logo.png" alt="Bro-ker Logo" />
      </Link>
    </header>
  );
}

export default Header;