import React, { createContext, useState, useMemo, useCallback } from 'react';

// Create the context
export const AuthContext = createContext(null);

// Create the Provider component
export const AuthProvider = ({ children }) => {
    // Check localStorage for an existing token on initial load
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const login = useCallback((token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    }, []);

    const logout = useCallback(() => {
        // Clear all auth-related items from localStorage
        localStorage.removeItem('authToken');
        
        // Clear application state
        setAuthToken(null);

        // Clear any cached API data
        if (typeof window !== 'undefined' && window.clearApiCache) {
            window.clearApiCache();
        }
    }, []);

    // useMemo ensures the context value object is stable, preventing unnecessary re-renders
    const contextValue = useMemo(() => ({
        authToken,
        isLoggedIn: !!authToken, // A handy boolean flag
        login,
        logout,
    }), [authToken, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
