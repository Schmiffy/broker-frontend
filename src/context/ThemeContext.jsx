import React, { createContext, useState, useEffect, useMemo } from 'react';

// Function to determine the initial theme
const getInitialTheme = () => {
    // 1. Check for a user's saved preference in local storage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme;
    }

    // 2. If no preference, check the time of day
    // Let's consider "day" to be from 6 AM to 6 PM (18:00)
    const hour = new Date().getHours();
    const isDayTime = hour > 6 && hour < 18;
    return isDayTime ? 'light' : 'dark';
};

// Create the context
export const ThemeContext = createContext();

// Create the provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    // Effect to apply the theme class to the body and save to local storage
    useEffect(() => {
        // Remove previous theme classes
        document.body.classList.remove('light-theme', 'dark-theme');
        // Add the new theme class
        document.body.classList.add(`${theme}-theme`);
        // Save the user's choice
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    // useMemo helps prevent unnecessary re-renders of consuming components
    const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};