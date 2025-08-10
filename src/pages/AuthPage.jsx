import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../api/authAPI';

import './AuthPage.css';

function AuthPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [apiError, setApiError] = useState(null);

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode);
        setApiError(null);
    };

    const onSubmit = async (data) => {
        setApiError(null);
        const { email, password } = data;

        try {
            let response;
            if (isLoginMode) {
                response = await authAPI.login(email, password);
            } else {
                response = await authAPI.signup(email, password);
            }


            login(response.IdToken);
            navigate('/dashboard');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setApiError(err.response.data.message);
            } else {
                setApiError('Something went wrong, please try again.');
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="error-text">{errors.email.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="error-text">{errors.password.message}</p>}
                    </div>
                    {apiError && <p className="error-text">{apiError}</p>}
                    <div className="form-actions">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : (isLoginMode ? 'Login' : 'Create Account')}
                        </button>
                        <button
                            type="button"
                            className="toggle-button"
                            onClick={switchModeHandler}
                            disabled={isSubmitting}
                        >
                            Switch to {isLoginMode ? 'Sign Up' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthPage;
