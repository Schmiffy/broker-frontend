import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeToggle.css'; // We'll create this CSS file next

function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext);

    const isDark = theme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <span className="icon">{isDark ? '🌙' : '☀️'}</span>
        </button>
    );
}

export default ThemeToggle;