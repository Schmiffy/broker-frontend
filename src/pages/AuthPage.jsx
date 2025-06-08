import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fakeAuthAPI } from '../api/authAPI';
import './AuthPage.css'; // We'll create this file next

function AuthPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode);
        setError(null);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            let response;
            if (isLoginMode) {
                response = await fakeAuthAPI.login(email, password);
            } else {
                response = await fakeAuthAPI.signup(email, password);
            }
            login(response.token); // Update auth state via context
            navigate('/dashboard'); // Redirect to dashboard on success
        } catch (err) {
            setError(err.message || 'Something went wrong, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required minLength="6" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <div className="form-actions">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Sending...' : (isLoginMode ? 'Login' : 'Create Account')}
                        </button>
                        <button type="button" className="toggle-button" onClick={switchModeHandler}>
                            Switch to {isLoginMode ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthPage;