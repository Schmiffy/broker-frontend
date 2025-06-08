import React, { useContext } from 'react'; // Import useContext
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import ThemeToggle from './ThemeToggle';
import './Header.css';

function Header() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to landing page after logout
    };

    return (
        <header className="main-header">
            <div className="header-content">
                <div className="header-left">
                    <NavLink to="/" className="header-logo-link">
                        <img src="/logo.png" alt="Bro-ker Logo" className="header-logo" />
                    </NavLink>
                </div>
                <nav className="header-nav">
                    <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                    <NavLink to="/about" className="nav-link">About</NavLink>
                </nav>
                <div className="header-right">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="auth-button">Logout</button>
                    ) : (
                        <NavLink to="/auth" className="auth-button">Login / Sign Up</NavLink>
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

export default Header;
